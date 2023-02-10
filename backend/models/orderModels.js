const mongoose = require("mongoose");
const { isNumberObject } = require("util/types");

const orderSchema = new mongoose.Schema({

    shippingInfo:{
        address:{
            type:String, 
            reqired:true
        },
        city:{
            type:String, 
            reqired:true
        },
        state:{
            type:String, 
            reqired:true}
            ,
        country:{
            type:String, 
            reqired:true
        },
        zipCode:{
            type:Number,
            required:true,
        },
        phoneNo:{
            type:Number,
            required:true
        },
    },

    orderItems:[
        {
        name:{
            type:String, 
            reqired:true,
        },
        price:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        product:{
            type: mongoose.Schema.ObjectId,
            ref:"Product",
            required:true,
        },
    }
    ],
    user:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },

    paymentInfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true
        },
    },
    paidAt:{
        type:Date,
        required:true,
    },
    itemsPrice:{
        type:Number,
        default:0,
        required:true

    },
    taxPrice:{
        type:Number,
        required:true,
        default:0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0,
        

    },
    totalPrice:{
        type:Number,
        required:true,
        default:0,
        
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing",
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model("Order",orderSchema);