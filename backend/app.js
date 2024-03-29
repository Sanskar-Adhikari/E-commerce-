const express = require("express");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const errorMiddleware= require("./middleware/error");

// Load environment variables from the .env file
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
// Initialize the Express application
const app = express();

// Configure middleware for handling incoming requests
// Parse incoming requests with JSON payloads
app.use(express.json()); 

// Parse cookie headers and populate req.cookies
app.use(cookieParser()); 

// Parse incoming requests with URL-encoded payloads.
app.use(bodyParser.urlencoded({ extended: true })); 

// Enable file uploads
app.use(fileUpload()); 

// Define routes for handling incoming requests
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const path = require('path');

// Route for product-related requests
app.use("/api/v1", product); 

// Route for user-related requests
app.use("/api/v1", user); 

// Route for order-related requests
app.use("/api", order); 

// Route for payment-related requests
app.use("/api", payment); 


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// Configure middleware for handling errors
app.use(errorMiddleware);

// Export the configured Express application
module.exports = app;
