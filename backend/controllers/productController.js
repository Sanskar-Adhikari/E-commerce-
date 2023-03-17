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



/**/
/*
getProductDetails()
NAME
    getProductDetails - Retrieve details for a specific product.
SYNOPSIS
    getProductDetails = async(req, res, next);
    req -> Request object that contains the ID of the product.
    res -> Response object that carries the product information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Retrieves details for a specific product using its ID.
RETURNS
    Returns the product information as a part of the response object if successful in retrieving the product.
*/
/**/
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
/*  getProductDetails = async(req, res, next); */



/**/
/*
updateProduct()
NAME
    updateProduct - Update a product by its ID. It is admin route
SYNOPSIS
    updateProduct = async(req, res, next);
    req -> Request object that contains the ID of the product to be updated and its updated information.
    res -> Response object that carries the updated product information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Updates the information for a specific product using its ID. It first checks if the product with the provided 
    ID exists in the database or not. If the product exists, it updates the product information by replacing the 
    old information with the new one. If the images are also included in the request body, then it 
    deletes the old images from the cloudinary and uploads the new images. 
RETURNS
    Returns the updated product information as a part of the response object if successful in updating the product.
*/
/**/
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product)
  {
      return next(new ErrorHandler("product not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string")
  {
      images.push(req.body.images);
  } else
  {
      images = req.body.images;
  }
  if (images !== undefined)
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
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  });
  res.status(200).json({
      success: true,
      product
  })
});
/* updateProduct = async(req, res, next); */



/**/
/*
deleteProduct()
NAME
    deleteProduct - Delete a specific product. It is an admin route
SYNOPSIS
    deleteProduct = async(req, res, next);
    req -> Request object that contains the ID of the product.
    res -> Response object that carries the status message back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Deletes a specific product using its ID and removes its images from Cloudinary.
RETURNS
    Returns a success message as a part of the response object if successful in deleting the product.
*/
/**/
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
  /* deleteProduct = async(req, res, next); */



/**/
/*
createProductReview()
NAME
    createProductReview - Create a review for a specific product.
SYNOPSIS
    createProductReview = async(req, res, next);
    req -> Request object that contains the rating, comment, and productId of the product.
    res -> Response object that carries a success status back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Creates a review for a specific product using the rating and comment provided in the request body.
    If the user has already reviewed the product it updates the old review with new one and changes
    the average star points as per the review as well.
RETURNS
    Returns a success status as a part of the response object if successful in creating the review.
*/
/**/
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
/* createProductReview = async(req, res, next); */



/**/
/*
getProductReviews()
NAME
    getProductReviews - Retrieve reviews for a specific product.
SYNOPSIS
    getProductReviews = async(req, res, next);
    req -> Request object that contains the ID of the product.
    res -> Response object that carries the reviews information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Retrieves reviews for a specific product using its ID.
RETURNS
    Returns the reviews information as a part of the response object if successful in retrieving the reviews for the product.
*/
/**/
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
/* getProductReviews = async(req, res, next); */



/**/
/*
deleteReviews()
NAME
    deleteReviews - Delete a review for a specific product.
SYNOPSIS
    deleteReviews = async(req, res, next);
    req -> Request object that contains the ID of the product and the ID of the review to be deleted.
    res -> Response object that carries the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Deletes a review for a specific product using the product ID and review ID. It also updates the product's ratings, number of reviews, 
    and the reviews array in the product document in the database.
RETURNS
    Returns a success message and the status code as a part of the response object if the review is successfully deleted.
*/
/**/
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
/* deleteReviews = async(req, res, next); */



/**/
/*
getAdminProducts()
NAME
    getAdminProducts - Retrieve all products for the admin.
SYNOPSIS
    getAdminProducts = async(req, res, next);
    req -> Request object.
    res -> Response object that carries the product information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Retrieves all products for the admin to manage.
RETURNS
    Returns the products information as a part of the response object if successful in retrieving all products for the admin.
*/
/**/
exports.getAdminProducts= catchAsyncErrors(async(req, res,next) =>{
const products= await Product.find()
    res.status(200).json({
        success:true,
        products,
    })
});
/* getAdminProducts = async(req, res, next); */
