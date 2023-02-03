const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const ErrorHandler= require("../utils/errorhandler")
const User= require("../models/userModel");
const sendToken = require("../utils/jwttoken")
const sendEmail =  require("../utils/sendEmail")
//register function
exports.registerUser= catchAsyncErrors(async(req,res,next)=>{
    const {name,email, password}= req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample",
            url:"urasfasdasdasdl",
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
    \n-Sanskar`;

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