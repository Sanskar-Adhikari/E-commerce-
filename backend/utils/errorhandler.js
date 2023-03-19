class ErrorHandler extends Error{

    /**/
    /*
    ErrorHandler constructor
    NAME
        constructor - Custom error handler class
    SYNOPSIS
        constructor(message, statusCode)
        message --> message to display as an error message
        statusCode --> HTTP status code to return
    DESCRIPTION
        The ErrorHandler class is used as a custom error handler for the application. It extends the Error class and adds a status code property to the error object. This makes it easier to handle errors throughout the application and return appropriate status codes to the client.
    RETURNS
        Nothing. The constructor is used to initialize the ErrorHandler object with a message and a status code.
    */
    constructor(message, statusCode)
    {
        super(message);  //inheriting construtor of Error class
        this.statusCode= statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    /* constructor(message, statusCode) */
}
    

module.exports = ErrorHandler