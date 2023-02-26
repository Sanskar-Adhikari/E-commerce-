const app = require("./app");
const dotenv= require("dotenv");
const connectDataBase= require("./config/database")
const cloudinary = require("cloudinary")
//handling uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.massage}`);
    console.log(`Server shutting down becasue of Uncaught Exception`);
    process.exit(1);
})
//server
dotenv.config({path:"backend/config/config.env"});

//connect databse
connectDataBase();
cloudinary.config(
    {
        cloud_name : process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.COUDINARY_SECRET,
    }
);
const server= app.listen(process.env.PORT,()=>{
    console.log(`Server running on PORT: ${process.env.PORT}`)
})

//unhandled promise rejection 
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server shutting down due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
});

