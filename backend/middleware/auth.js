const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User= require("../models/userModel");


/**/
/*
isAuthUser()
NAME
    isAuthUser - Check if user is authenticated.
SYNOPSIS
    isAuthUser = async(req, res, next);
    req -> Request object that contains the JWT token in the cookie.
    res -> Response object that carries the error message back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    This middleware function checks if the user is authenticated by verifying the JWT token stored in the cookie.
    If the token is not present or is invalid, the function sends an error message back to the client.
RETURNS
    No return value. However, it adds the 'req.user' property if the user is authenticated and sends an error response
    back to the client if the user is not authenticated.
*/
/**/
exports.isAuthUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;  //{token} because i dont need token object but only token itself
    if(!token)
    {
        return next(new ErrorHandler("Please login to access", 401))
    }
    const decodedData= jwt.verify(token, process.env.JWT_SECRET);
    req.user=await User.findById(decodedData.id); 
    next();
});
/* isAuthUser = async(req, res, next); */



/**/
/*
authorizeRoles()
NAME
    authorizeRoles - Middleware function to authorize access based on user role.
SYNOPSIS
    authorizeRoles = (...roles) => (req, res, next);
    roles -> List of roles that are authorized to access the resource.
    req -> Request object that contains the user's role.
    res -> Response object.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Middleware function to check if the user's role is authorized to access the requested resource. If the user's role
    is not included in the list of authorized roles, the function sends an error response back to the client.
RETURNS
    Returns the next middleware function in the pipeline if the user's role is authorized to access the resource.
*/
/**/
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
        {
            return next(new ErrorHandler(`Role: ${req.user.role} is not authorized to access this resource`, 403));
        }
        next();
    }
}
/* authorizeRoles = (...roles) => (req, res, next); */

