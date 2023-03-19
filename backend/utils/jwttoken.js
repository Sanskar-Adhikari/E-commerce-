/**/
/*
sendToken
NAME
    sendToken - Sends a JWT token in a cookie
SYNOPSIS
    sendToken = (user, statusCode, res);
    user -> User object for which token needs to be generated.
    statusCode -> HTTP status code to be sent as a part of the response object.
    res -> Response object that will carry the token in a cookie and the status code back to the client.
DESCRIPTION
    This function generates a JWT token using the 'getJWTToken' method and sends it in a cookie
    as a part of the response object. Along with the token, the function also sends the user information and the
    status code in the response object.
RETURNS
    Does not return anything.
*/
/**/
const sendToken=(user, statusCode, res)=>
{
    const token= user.getJWTToken();
    //options for cookie
    const options = {
        httpOnly:true,
        expire:new Date(Date.now+process.env.COOKIE_EXPIRE*24*3600*1000)  //millisecond
    }
    res.status(statusCode).cookie('token',token, options).json({
        success:true,
        user,
        token,
    })
}
/* sendToken = (user, statusCode, res); */
module.exports = sendToken;