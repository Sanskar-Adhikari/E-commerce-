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


    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
}