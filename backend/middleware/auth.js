const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User= require("../models/userModel");

exports.isAuthUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;  //{token} because i dont need token ibject but only token itself
    
    if(!token)
    {
        return next(new ErrorHandler("Please login to access", 401))
    }

    const decodedData= jwt.verify(token, process.env.JWT_SECRET);
    req.user=await User.findById(decodedData.id);  //this id was created on getjwttoken function which we are accessing here
    next();
});

exports.authorizeRoles= (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return  next(new ErrorHandler(`Role: ${req.user.role} is not authorized to access this resource`,403));
        }
        next();
    }
}
