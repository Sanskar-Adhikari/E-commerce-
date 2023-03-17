/**/
/*
efunc()
NAME
    efunc() - Function to catch any asynchronous errors that occur in the application.
SYNOPSIS
    efunc => (req,res,next);
    efunc -> The async function to be wrapped to catch any errors.
    req -> Request object.
    res -> Response object.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Wraps an async function to catch any errors that occur within the application. This function catches the errors and
    passes them to the next middleware function in the pipeline.
RETURNS
    Returns a function that catches any errors that occur in the wrapped async function.
*/
/**/
module.exports= efunc => (req,res,next)=>{
    Promise.resolve(efunc(req,res,next)).catch(next);
};
/* efunc => (req,res,next); */
