const getJWTToken = require("jsonwebtoken");
const bcryptjs= require("bcryptjs");
const mongoose  = require("mongoose");
const validator = require ("validator");
const crypto = require("crypto") 


/**/
/*
User Schema
NAME
    userSchema
SYNOPSIS
    userSchema = new mongoose.Schema
    This schema defines the structure of the "User" in the "users" collection in MongoDB.
DESCRIPTION
    A Mongoose schema for defining the structure of a user document in the MongoDB database. The schema includes the
    user's name, email address, password, avatar image, role, creation date, and fields for password reset.
RETURNS
    The User schema instance
*/
/**/
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
        createdAt:{
            type:Date,
            default:Date.now
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date,
});
/* userSchema = new mongoose.Schema */



/**/
/* 
userSchema.pre
NAME
    userSchema.pre("save")
SYNOPSIS
    userSchema.pre("save",async function (next)
    This middleware is used to hash the user's password before saving the user document to the database.
DESCRIPTION
    This pre-save middleware function is used in the userSchema to hash the user's password using bcryptjs hashing algorithm
    with a salt value of 12. 
RETURNS
    Nothing. The function modifies the password field of the user document in place with hashed version. 
*/
/**/
userSchema.pre("save",async function (next)
{
    //not using arrow function because we cannot use 'this' in arrow function
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 12);
})
/* userSchema.pre("save",async function (next) */



/**/
/*
userSchema.methods.getJWTToken
NAME
    userSchema.methods.getJWTToken
SYNOPSIS
    userSchema.methods.getJWTToken = function()
    This is a function returning token. Has no parameters. It uses the user id of that particular instance when this function is called.
DESCRIPTION
    This function is used to generate a JSON Web Token (JWT) for a user document in the database.
    The JWT contains the user's id and is signed using the secret key stored in the environment variable JWT_SECRET.
    The token expires after a set amount of time stored in the environment variable JWT_EXPIRE.
RETURNS
    A string containing the signed JWT token.
*/
/**/
userSchema.methods.getJWTToken = function(){
    return getJWTToken.sign({
        id:this._id
    }, process.env.JWT_SECRET, 
    {
        expiresIn: process.env.JWT_EXPIRE,
    });
}
/* userSchema.methods.getJWTToken = function() */



/**/
/*
userSchema.methods.comparePassword
NAME
    userSchema.methods.comparePassword
SYNOPSIS
    userSchema.methods.comparePassword = async function(enteredPass)
    enteredPass -> The string passed as parameter which will be obtained from the password field in login page.
DESCRIPTION
    This function is used to compare the entered password with the password stored in the user document.
    The entered password is hashed using bcryptjs algorithm and compared with the hashed password stored in the user document.
RETURNS
    A boolean value indicating whether the entered password matches the stored password or not.
*/
/**/
userSchema.methods.comparePassword = async function (enteredPass){
    return await bcryptjs.compare(enteredPass, this.password)
}
/* userSchema.methods.comparePassword = async function(enteredPass) */



/**/
/*
getResetPasswordToken()
NAME
    getResetPasswordToken - Generates a reset password token for the user.
SYNOPSIS
    getResetPasswordToken = function();
DESCRIPTION
    This method generates a reset password token for the user, adds it to the user schema and returns it. It also adds the
    expire time for the generated resetPasswordToken
RETURNS
    Returns the reset password token generated for the user.
*/
/**/
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
/* getResetPasswordToken = function(); */


module.exports= mongoose.model("User", userSchema);