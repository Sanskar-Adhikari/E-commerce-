const ErrorHandler = require("../utils/errorhandler");

/**/
/*
errorHandler()
NAME
    error - Middleware for handling errors.
SYNOPSIS
    error= (err, req, res, next);
    err -> The error that was caught.
    req -> Request object.
    res -> Response object.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    A middleware function for handling errors that are caught by other middleware functions in the pipeline. The function
    sets the status code and error message based on the type of error and sends it back to the client.
RETURNS
    Returns a JSON object with the error message and status code
*/
/**/
module.exports=(err,req,res, next)=>{
    err.statusCode= err.statusCode || 500
    err.message= err.message || "Internal server error";

    //invalid jwttoken
    if(err.name==="JsonWebTokenError")
    {
        const message = "json web token is invalid"
        err= new ErrorHandler(message, 400);
    }

    //jwt expired
    if(err.name==="TokenExpiredError")
    {
        const message = "json web token expired"
        err= new ErrorHandler(message, 400);
    }

    //database duplicate error
    if(err.code===11000)
    {
        const message = `Duplicate credentials found: ${Object.keys(err.keyValue)}`
        err= new ErrorHandler(message, 400);
    }
    
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
}
/* error= (err, req, res, next); */