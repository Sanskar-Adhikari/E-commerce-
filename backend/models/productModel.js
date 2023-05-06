const mongoose= require("mongoose");


/**/
/*
Product Schema
NAME
    productSchema
SYNOPSIS
    productSchema= new mongoose.Schema
    This schema defines the structure of the "Product" in the "products" collection in MongoDB.
DESCRIPTION
    A Mongoose schema for defining the structure of a product document in the MongoDB database. The schema includes the
    product name, description, price, ratings, images, category, stock, number of reviews, reviews, user, and creation date.
RETURNS
    The Product schema instance.
*/
/**/
const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        reuqired:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[5,"Price cannot exceed 5 digits"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please enter product category"],
    },
    Stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[3,"Stock cannot be more than 3 digit"],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:
            {
                type: mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:
    {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
/* productSchema= new mongoose.Schema */
module.exports=mongoose.model("Product",productSchema);
