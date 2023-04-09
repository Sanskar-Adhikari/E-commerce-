const app = require("./app");
const dotenv= require("dotenv");
const connectDataBase= require("./config/database")
const cloudinary = require("cloudinary")

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server shutting down because of uncaught exception`);
    process.exit(1); // Exit the Node.js process with a failure code (1)
});

// Load environment variables from the .env file
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

// Connect to the database
connectDataBase();

// Configure the cloudinary module with API credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.COUDINARY_SECRET,
});

// Start the server and listen for incoming requests
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server shutting down due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1); // Exit the Node.js process with a failure code (1)
    });
});
  
