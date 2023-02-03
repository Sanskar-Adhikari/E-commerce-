const getJWTToken = require("jsonwebtoken");
const bcryptjs= require("bcryptjs");
const mongoose  = require("mongoose");
const validator = require ("validator");
const crypto = require("crypto")  //built in
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[20,"max 20 characters allowed"],
        minLength:[3,"min 3 characters required"]
    },

    email:{
        type:String,
        required:[true, "Please enter email address" ],
        required: true,
        unique : true,
        validate:[validator.isEmail,"Invalid, please enter a valid email"]
    },

    password:{
        type:String,
        required:[true,"Please enter password"],
        maxlength:[20,"max 20 characters allowed"],
        minLength:[6,"min 6 characters required"],
        select:false,  //whenever we select or find user we dont want password to show up

    },

    avatar: 
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
        role:{
            type:String,
            default:"user"
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date,
});

//hasing password before saving
//not using arrow function because we cannot use this in arrow function
userSchema.pre("save",async function (next)
{
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 12);
})

//JWT token
userSchema.methods.getJWTToken = function(){
    return getJWTToken.sign({
        id:this._id
    }, process.env.JWT_SECRET, 
    {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

//compare password
userSchema.methods.comparePassword = async function (enteredPass){
    return await bcryptjs.compare(enteredPass, this.password)
}

//reset password token generation
userSchema.methods.getResetPasswordToken =  function(){
    //get token
    const resetToken= crypto.randomBytes(15).toString("hex");

    //hash and add to user schema
    this.resetPasswordToken = crypto.createHash("sha256")
                                    .update(resetToken)
                                    .digest("hex");
    this.resetPasswordExpire = Date.now()+20 * 60 * 1000;  //20 mins
    return resetToken;
}

module.exports= mongoose.model("User", userSchema);