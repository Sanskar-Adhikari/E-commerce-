const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const ErrorHandler= require("../utils/errorhandler")
const User= require("../models/userModel");
const sendToken = require("../utils/jwttoken")
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
    req.cookie("token", null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        sucess:true,
        message:"Log out sucessful"

    })
})
