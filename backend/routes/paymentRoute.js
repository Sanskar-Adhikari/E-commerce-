const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const router = express.Router();
const { isAuthUser } = require("../middleware/auth");


// Process payment using Stripe API
router.route("/payment/process").post(isAuthUser, processPayment);

// Get Stripe API key (particularly used in front end to get api key stored in .env file in client side)
router.route("/stripeapikey").get(isAuthUser, sendStripeApiKey);

module.exports= router;