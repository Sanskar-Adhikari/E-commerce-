const Order = require("../models/orderModels")    
const Product= require("../models/productModel")
const ErrorHandler= require("../utils/errorhandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");


//create new order
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    }= req.body;

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        order,
    });


});



//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order)
    {
        return next(new ErrorHandler("order not found!",404));
    }
    res.status(200).json({
        success:true,
        order,
    })
})


//get logged in user single order
exports.myOrder = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders,
    })
})


//get all orders
exports.getAllOrder = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        orders,
    })
})




