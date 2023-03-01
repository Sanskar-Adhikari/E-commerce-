const Product= require("../models/productModel")
const ErrorHandler= require("../utils/errorhandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//creating product -- admin
exports.createProduct= catchAsyncErrors(async(req,res,next)=>{

    req.body.user= req.user.id;
    const product= await Product.create(req.body);
    res.status(201).json({     //means created
        success:true,
        product,
    })  

});

//get all products
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

//delete a product
exports.deleteProduct= catchAsyncErrors(async(req,res,next)=>{
    const product= await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("product not found",404) );
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"deleted the product successfully"
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

    const isReviewed = product.reviews.find(r=>r.user.toString()===req.user._id.toString())
    if(isReviewed)
    {
        product.reviews.forEach(r=>{
            if(r.user.toString()===req.user._id.toString())
            {
            r.rating=rating,
            r.comment = comment
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
        sucess:true
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
        sucess:true,
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
        sucess:true,
    })
})
