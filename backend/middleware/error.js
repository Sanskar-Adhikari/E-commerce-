const ErrorHandler = require("../utils/errorhandler");

module.exports=(err, req,res, next)=>{
    err.statusCode= err.statusCode || 500
    err.message= err.message || "Internal server error";

    //invalid mongodb data such as product id
    if(err.name==="CastError")
    {
        const message = `invalid resource in mongodb: ${err.path}`
        err= new ErrorHandler(message, 400);
    }

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
    //databse duplicate error
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