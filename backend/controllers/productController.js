const Product= require("../models/productModel")
const ErrorHandler= require("../utils/errorhandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary")


/**/
/*
createProduct()
NAME
    createProduct - Create a new product. This is a admin function
SYNOPSIS
    createProduct = async (req, res, next);
    req -> Request object that consists of the product details.
    res -> Response object that will carry the product information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    It creates a new product by uploading the product image to Cloudinary and then storing the product details
    in the database.
RETURNS
    Returns the product information as a part of the response object if successfully created.
*/
/**/
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string")
  {
      images.push(req.body.images);
  } else 
  {
      images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
      });

      imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
      });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product,
  });
});
/* createProduct = async (req, res, next); */



/**/
/*
getAllProducts()
NAME
    getAllProducts - Retrieves all products from the database.
SYNOPSIS
    getAllProducts = async(req, res, next);
    req -> Request object that may contain pagination, filtering and searching parameters.
    res -> Response object that carries the products information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Retrieves all the products from the database with optional pagination, filtering, and searching functionality.
    It uses ApiFeatures to apply pagination, filtering, and searching on the query.
RETURNS
    Returns the products information along with the status code as a part of the response object.
*/
/**/
exports.getAllProducts= catchAsyncErrors(async(req, res,next) =>{
    const resultPerPage=8;
    const productsCount = await Product.countDocuments();
    const apiFeature= new ApiFeatures(Product.find(), req.query).search()
    .filter()

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage)
    products = await apiFeature.query.clone();
    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    })
});
/* getAllProducts = async(req, res, next); */




//get product details
exports.getProductDetails= catchAsyncErrors(async(req,res,next)=>{
    const product= await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("product not found",404) );
    }
    res.status(200).json({
        success:true,
        product
    });

});

//update product --admin
exports.updateProduct= catchAsyncErrors(async(req,res,next)=>{
    let product =  await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("product not found",404) );
    }

    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  if(images!== undefined)
  {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }

          const imagesLinks = [];
  
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "products",
            });
        
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
          req.body.images = imagesLinks;


  }
    product= await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });


//function to create new review or update the review
exports.createProductReview= catchAsyncErrors(async(req,res,next)=>{
    const {rating, comment, productId}= req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((r)=>r.user.toString()===req.user._id.toString())
    if(isReviewed)
    {
        product.reviews.forEach((r)=>{
            if(r.user.toString()===req.user._id.toString())
            {
            (r.rating=rating),
            (r.comment = comment)
        }
        })
    }
    else
    {
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length    
    }
    let average=0
    product.reviews.forEach(r=>{
        average+=r.rating
    })
    product.ratings =average / product.reviews.length
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true
    })
})

//get all reviews of one product
exports.getProductReviews = catchAsyncErrors (async(req, res, next)=>{
    const product = await Product.findById(req.query.id);
    if(!product)
    {
        return next(new ErrorHandler("product not found",404) );
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
})

//delete review
exports.deleteReviews = catchAsyncErrors (async(req, res, next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product)
    {
        return next(new ErrorHandler("product not found",404) );
    }

    const reviews = product.reviews.filter((r)=>r._id.toString()!== req.query.id.toString())
    let average=0
    reviews.forEach((r)=>{
        average+=r.rating
    })
    let ratings = 0;
    if(reviews.length===0)
    {
        ratings=0;
    }
    else
    {
        ratings= average / reviews.length;
    }
    const numberOfReviews = reviews.length;
    
    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews, 
            ratings, 
            numberOfReviews,
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
    res.status(200).json({
        success:true,
    })
})


//get all products--admin
exports.getAdminProducts= catchAsyncErrors(async(req, res,next) =>{
const products= await Product.find()
    res.status(200).json({
        success:true,
        products,
    })
});