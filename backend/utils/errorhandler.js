class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);  //inheriting construtor of Error class
        this.statusCode= statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler