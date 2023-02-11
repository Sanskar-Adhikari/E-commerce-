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

    let totalAmount = 0;  //to show total sales of a admin
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        orders,
    })
})

//update order status --admin
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(order.orderStatus ==="Delivered")
    {
        return next(new ErrorHandler("you have already delivered this product", 400));
    }
    order.orderItems.forEach(async (my_order)=>{
        await updateStock(my_order.product, my_order.quantity);
    })

    order.orderStatus = req.body.status;
    if(req.body.status==="Delivered")
    {   
        order.deliveredAt= Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock = product.stock- quantity;
    await product.save({validateBeforeSave:false});

}

//delete order --admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler("order not found!",404));
    }
    await order.remove()
    res.status(200).json({
        success:true,
    })
})





