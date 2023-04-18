const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const ErrorHandler= require("../utils/errorhandler")
const User= require("../models/userModel");
const sendToken = require("../utils/jwttoken")
const sendEmail =  require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")


/**/
/*
registerUser()
NAME
    registerUser - Registers a new user.
SYNOPSIS
    registerUser = async(req, res, next);
    req -> Request object that contains the user's name, email, password and avatar.
    res -> Response object that carries the registration status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Registers a new user by creating a new user in the database with the provided name, email, password, and avatar.
    The user's avatar is also uploaded to the cloud using Cloudinary API.
RETURNS
    Returns a token in cookies as a part of the response object if successful in creating a new user.
*/
/**/
exports.registerUser= catchAsyncErrors(async(req,res,next)=>{
    const myCloud =  await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const {name,email, password}= req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
    });
//login immediately after registering.
sendToken(user, 201, res);
})
/* registerUser = async(req, res, next); */



/**/
/*
loginUser()
NAME
    loginUser - Authenticate and login a user.
SYNOPSIS
    loginUser = async(req, res, next);
    req -> Request object that contains the user's email and password.
    res -> Response object that carries the user information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Authenticates the user's email and password, and logs in the user if the credentials are valid. 
    It also sends a token to the client, which validates the client and the client can use to access restricted resources.
RETURNS
    Returns the user information as a part of the response object, along with a token, if successful in authenticating the user.
*/
/**/
exports.loginUser= catchAsyncErrors(async(req,res,next)=>{
    const {email, password}= req.body;

    if(!email || !password)
    {
        return next(new ErrorHandler("Please enter email and password", 400))
    }
    const user= await User.findOne({email}).select("+password"); //becasue we have password select= false we need to + it here
    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password",401)) //401 = unauthorized
    }

    const isMatch = await user.comparePassword(password); 
    if(!isMatch)
    {
        return next(new ErrorHandler("Invalid email or password",401))  //do not want to say password because any person who are ramdomly trying to login might figure out there exists an user with this email

    }
    sendToken(user, 200, res);
})
/* loginUser = async(req, res, next); */



/**/
/*
logout()
NAME
    logout - Logs out the current user 
SYNOPSIS
    logout = async(req, res, next);
    req -> Request object
    res -> Response object that carries the success message and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Removes the authentication token cookie from the client to log out the current user.
RETURNS
    Returns the success message as a part of the response object if successful in logging out the user.
*/
/**/
exports.logout = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token", null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Log out successful"

    })
})
/* logout = async(req, res, next); */



/**/
/*
forgotPass()
NAME
    forgotPass - Sends an email to the user with a reset password link upon request.
SYNOPSIS
    forgotPass = async(req, res, next);
    req -> Request object that contains the user's email.
    res -> Response object that carries the status message back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Searches for the user with the provided email address, generates a reset token, 
    and sends an email containing the reset password link to the user.
    If the email is valid, a success message is sent to the client. 
RETURNS
    Returns a success message if the email containing the reset password link is sent to the user, 
    otherwise returns an error message.
*/
/**/
exports.forgotPass = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) 
    {
        return next(new ErrorHandler("User with this email cannot be found", 404));
    }

    //getting reset token from our method
    const resetToken = user.getResetPasswordToken();

    //the user model is already made before getting resettoken so we must save first in user model
    await user.save({
        validateBeforeSave: false
    });

    const resetPassUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `We received a request to reset the password for your user account. If you made this request,
    please click on the link below to reset your password:\n\n\n${resetPassUrl}\n\n\n
    If you did not make this request, you can safely ignore this email. Your password will not be reset without clicking on the link above.
    \n Have a great day ahead.\n\n\n\n Best,
    \n`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password recovery requested",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email successfully sent to ${user.email}`,
        })
    } catch (e) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({
            validateBeforeSave: false
        });
        return next(new ErrorHandler(e.message, 500));
    }
})
/* forgotPass = async(req, res, next); */



/**/
/*
resetPass()
NAME
    resetPass - Reset the password of a user.
SYNOPSIS
    resetPass = async(req, res, next);
    req -> Request object that contains the reset password token and the new password.
    res -> Response object that carries the user information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Reset the password of a user using the reset password token, which is sent to the user's email address when a password recovery request is made.
    If the token is valid and not expired, update the user's password in the database and return a new authentication token.
RETURNS
    Returns the user information as a part of the response object, along with a new token, if successful in resetting the user's password.
*/
/**/
exports.resetPass = catchAsyncErrors(async (req, res, next) => {
    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        },
    })

    if (!user)
    {
        return next(new ErrorHandler("Invalid Reset Password Token Expired", 400)) //400 = bad request
    }

    if (req.body.password !== req.body.confirmPassword) 
    {
        return next(new ErrorHandler("Password mismatch", 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res); //logging the user back in after reset password sucessful
})
/* resetPass = async(req, res, next); */



/**/
/*
getUserDetails()
NAME
    getUserDetails - Retrieve the details of a specific user.
SYNOPSIS
    getUserDetails = async(req, res, next);
    req -> Request object that contains the id of the user.
    res -> Response object that carries the user details and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Retrieves the details of a specific user identified by the given id from the database, and sends the user information to the client.
RETURNS
    Returns the user information as a part of the response object, if successful in retrieving the user details.
*/
/**/
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
            success:true,
            user
        })
})
/* getUserDetails = async(req, res, next); */



/**/
/*
updateProfile()
NAME
    updateProfile - Update user's profile details.
SYNOPSIS
    updateProfile = async(req, res, next);
    req -> Request object that contains the updated user information such as name, email and avatar.
    res -> Response object that carries the success status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Updates the user's profile with the new information such as name, email and avatar. If the user uploads a new avatar,
    the function deletes the old one and uploads the new one to Cloudinary. 
RETURNS
    Returns the success status code with success flag set to true if successful in updating the user's profile.
*/
/**/
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== "")
    {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});
/* updateProfile = async(req, res, next); */



/**/
/*
updatePass()
NAME
    updatePass - Update user's password.
SYNOPSIS
    updatePass = async(req, res, next);
    req -> Request object that contains the old password, new password and confirm password.
    res -> Response object that carries the success status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Updates the user's password with the new one. Before updating, the function checks if the old password is correct and
    if the new password and confirm password match. After updating the password, the function logs the user back in.
RETURNS
    Returns the success status code with success flag set to true if successful in updating the user's password.
*/
/**/
exports.updatePass = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isMatch = await user.comparePassword(req.body.oldPassword ); 
    if(!isMatch)
    {
        return next(new ErrorHandler("incorrect old password",400))  
    }
    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("incorrect passwords",400))
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})
/* updatePass = async(req, res, next); */



/**/
/*
getUsers()
NAME
    getUsers - Retrieve all user's data for an admin user.
SYNOPSIS
    getUsers = async(req, res, next);
    req -> Request object
    res -> Response object that carries the success status code and users data back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Retrieves all user data from the database and returns it to the admin user. Only accessible by admin users.
RETURNS
    Returns the success status code and all user data to the client.
*/
/**/
exports.getUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    })
})
/* getUsers = async(req, res, next); */



/**/
/*
getSingleUsers()
NAME
    getSingleUsers - Get details of a single user by ID.
SYNOPSIS
    getSingleUsers = async(req, res, next);
    req -> Request object that contains the user ID.
    res -> Response object that carries the success status code back to the client along with the user's details.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Fetches details of a single user identified by the provided ID. If the user does not exist, the function sends an
    error response back to the client.
RETURNS
    Returns the user details and success flag set to true if successful in fetching the user's details.
*/
/**/
exports.getSingleUsers = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler("User does not exist",400));
    }
    res.status(200).json({
        success:true,
        user,
    })
})
/* getSingleUsers = async(req, res, next); */



/**/
/*
updateRole()
NAME
    updateRole - Update user's role
SYNOPSIS
    updateRole = async(req, res, next);
    req -> Request object that contains the updated user information such as name, email, and role, and the user ID.
    res -> Response object that carries the success status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Updates the user profile identified by the provided ID with the new role information 
    If the user does not exist, the function sends an error response back to the client.
RETURNS
    Returns the success status code with success flag set to true if successful in updating the user's role.
*/
/**/
exports.updateRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData= {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
    let user = User.findById(req.params.id)
    if(!user)
    {
        return next(new ErrorHandler("user does not exist"));
    }
     user= await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true
    })
})
/*  updateRole = async(req, res, next); */



/**/
/*
deleteUser()
NAME
    deleteUser - Delete a user by ID. It is admin route
SYNOPSIS
    deleteUser = async(req, res, next);
    req -> Request object that contains the user ID.
    res -> Response object that carries the success status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    Deletes a user identified by the provided ID. If the user does not exist, the function sends an error response back
    to the client. The function also deletes the user's avatar image from the Cloudinary service.
RETURNS
    Returns the success status code with success flag set to true if successful in deleting the user.
*/
/**/
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user)
    {
        return next(new ErrorHandler("user does not exist",400));
    }
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();
    res.status(200).json({
        success:true,
        message:"Deletion successful"
    })
})
/* deleteUser = async(req, res, next); */
