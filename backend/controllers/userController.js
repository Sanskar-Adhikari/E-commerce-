const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const ErrorHandler= require("../utils/errorhandler")
const User= require("../models/userModel");
const sendToken = require("../utils/jwttoken")
const sendEmail =  require("../utils/sendEmail")
const crypto = require("crypto")  //built in
const cloudinary = require("cloudinary")
//register function
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

sendToken(user, 201, res);
})

//function for login
exports.loginUser= catchAsyncErrors(async(req,res,next)=>{
    const {email, password}= req.body;

    if(!email || !password)
    {
        return next(new ErrorHandler("Please enter email and password", 400))
    }
    const user= await User.findOne({email}).select("+password"); //becasue we have password select= false 
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401)) //401 = unauthorized
    }

    const isMatch = await user.comparePassword(password); 
    if(!isMatch){
        return next(new ErrorHandler("Invalid email or password",401))  //do not want to say password because any person who are ramdomly trying to login might figure out there exists an user with this email

    }

    sendToken(user, 200, res);
})


//function for logout
exports.logout = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token", null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        sucess:true,
        message:"Log out sucessful"

    })
})


//function for forgot password
exports.forgotPass= catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user)
    {
        return next(new ErrorHandler("User with this email cannot be found",404));
    }

    //getting reset token from our method
    const resetToken= user.getResetPasswordToken();
    
    //the user model is already made before getting resettoken so we must save first in user model
    await user.save({validateBeforeSave:false});

    const resetPassUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    
    const message = `We received a request to reset the password for your account. If you made this request,
    please click on the link below to reset your password:\n\n\n${resetPassUrl}\n\n\n
    If you did not make this request, you can safely ignore this email. Your password will not be reset without clicking on the link above.
    \n Have a great day ahead.\n\n\n\n Best,
    \n`;

    try
    {
        await sendEmail({
            email:user.email,
            subject:"Password recovery requested",
            message,
        });
        res.status(200).json({
            sucess:true,
            message:`Email sucessfully sent to ${user.email}`,
        })
    }
    catch(e)
    {
        user.resetPasswordToken= undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(e.message, 500));
        

    }
})


//function for reset password
exports.resetPass= catchAsyncErrors(async(req,res,next)=>{

        //creating token hash
       const resetPasswordToken = crypto.createHash("sha256")
       .update(req.params.token)
       .digest("hex");

       const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
       })

       if(!user){
        return next(new ErrorHandler("Invalid Reset Password Token Expired",400)) //400 = bad request
    }

    if(req.body.password !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password mismatch",400))
    }
    user.password = req.body.password;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);  //logging the user back in after reset password sucessful
})


//function for getting user detail
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);

        res.status(200).json({
            sucess:true,
            user
        })
})


//function for updating user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData= {
        name:req.body.name,
        email:req.body.email,
    }

    const user= await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true
    })
})



//function for updating user password
exports.updatePass = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");
    const isMatch = await user.comparePassword(req.body.oldPass ); 
    if(!isMatch){
        return next(new ErrorHandler("incorrect old password",400))  
    }

    if(req.body.newPass !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("incorrect passwords",400))
    }
    user.password = req.body.newPass;
    await user.save();
    sendToken(user, 200, res);
})


//get all users --admin
exports.getUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        sucess:true,
        users,
    })
})

//get single users --admin
exports.getSingleUsers = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user)
    {
        return next(new ErrorHandler("User does not exist",400));
    }

    res.status(200).json({
        sucess:true,
        user,
    })
})


//function for updating user role --admin
exports.updateRole = catchAsyncErrors(async(req,res,next)=>{

    const newUserData= {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }

    const user= await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true
    })
})


//function for delete user --admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user)
    {
        return next(new ErrorHandler("user does not exist",400));
    }

    await user.remove();
    res.status(200).json({
        success:true,
        message:"Deletion successful"
    })
})