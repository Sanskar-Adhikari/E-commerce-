const Order = require("../models/orderModels")    
const Product= require("../models/productModel")
const ErrorHandler= require("../utils/errorhandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");


/**/
/*
newOrder()
NAME
    newOrder - Creates a (new) order and stores it in the database.
SYNOPSIS
    newOrder = async(req, res, next);
    req -> Request object that consists of the order details.
    res -> Response object that will carry the order information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    It receives the information of the order posted by any user and saves it in the database.
RETURNS
    Returns the order information along with the status code 201 as a part of the response object if 
    successful in creating the order. Returns error message if not successful.
*/
/**/
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
/* newOrder = async(req, res, next); */



/**/
/*
getSingleOrder()
NAME
    getSingleOrder - Retrieves a single order from the database.
SYNOPSIS
    getSingleOrder = async(req, res, next);
    req -> Request object that consists of the order id.
    res -> Response object that will carry the order information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    It searches the database for a single order matching the order id provided in the request object and retrieves
    its details. If the order is found, it is returned along with a success status code of 200. If the order is not
    found, an error message is returned with a status code of 404.
RETURNS
    Returns the order information along with the status code 200 as a part of the response object if successful in
    retrieving the order. Returns error message if order not found.
*/
/**/
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
/* getSingleOrder = async(req, res, next); */



/**/
/*
myOrder()
NAME
    myOrder - Retrieves all the orders of the logged in user.
SYNOPSIS
    myOrder = async(req, res, next);
    req -> Request object that consists of the details of the logged in user.
    res -> Response object that will carry the order information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    It retrieves all the orders of the logged in user from the database.
RETURNS
    Returns the order information along with the status code 200 as a part of the response object.
*/
/**/
exports.myOrder = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json({
        success:true,
        orders,
    })
})
/* myOrder = async(req, res, next); */



/**/
/*
getAllOrder()
NAME
    getAllOrder - Returns all the orders from the database.
SYNOPSIS
    getAllOrder = async(req, res, next);
    res -> Response object that will carry the order information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    It fetches all the orders from the database.
RETURNS
    Returns the list of all the orders along with the status code 200 as a part of the response object.
*/
/**/
exports.getAllOrder = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount = 0;  //to show total sales of a admin
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        orders,
        totalAmount,
    })
})
/* getAllOrder = async(req, res, next); */



/**/
/*
updateOrder()
NAME
    updateOrder - Updates the status of an existing order in the database.
SYNOPSIS
    updateOrder = async(req, res, next);
    req -> Request object that consists of the order ID to be updated and the new status to be updated to.
    res -> Response object that will carry the success status back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    It receives the ID of the order to be updated along with the new status to be updated to. It then checks
    whether the order exists and whether it has already been delivered. If not, it updates the order status to
    the new status provided. If the new status is 'Shipped', it updates the stock of the products in the order.
RETURNS
    Returns the success status of the operation as a part of the response object if successful in updating
    the order. Returns error message if not successful.
*/
/**/
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler("order not found!",404));
    }
    if(order.orderStatus ==="Delivered")
    {
        return next(new ErrorHandler("you have already delivered this product", 400));
    }
    if(req.body.status==="Shipped")
    {
        order.orderItems.forEach(async (my_order)=>{
            await updateStock(my_order.product, my_order.quantity);
        })
    }
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
/* updateOrder = async(req, res, next); */



/**/
/*
updateStock()
NAME
    updateStock - Updates the stock quantity of a product in the database.
SYNOPSIS
    updateStock = async(id, quantity);
    id -> ID of the product whose stock quantity is to be updated.
    quantity -> Quantity to be updated for the product.
DESCRIPTION
    It updates the stock quantity of a product in the database after an order is placed.
RETURNS
    Returns nothing.
*/
/**/
async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock = product.stock- quantity;
    await product.save({validateBeforeSave:false});

}
/* updateStock = async(id, quantity); */



/**/
/*
deleteOrder()
NAME
    deleteOrder - Deletes an order from the database.
SYNOPSIS
    deleteOrder = async(req, res, next);
    req -> Request object that consists of the id of the order to be deleted.
    res -> Response object that will carry the success status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    It receives the id of the order to be deleted, and removes it from the database.
RETURNS
    Returns the success status code 200 as a part of the response object if
    successful in deleting the order. Returns error message if not successful.
*/
/**/
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
/* deleteOrder = async(req, res, next); */





