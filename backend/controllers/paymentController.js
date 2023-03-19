const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const stripe= require("stripe")(process.env.STRIPE_API_SECRET);


/**/
/*
processPayment()
NAME
    processPayment - Processes payment using Stripe API.
SYNOPSIS
    processPayment = async(req, res, next);
    req -> Request object that consists of the payment details.
    res -> Response object that will carry the payment information and the status code back to the client.
    next -> The next middleware function in the pipeline.
DESCRIPTION
    It processes the payment using Stripe API and creates a new payment intent.
RETURNS
    Returns the payment information along with the client secret key as a part of the response object if
    successful in creating the payment intent.
*/
/**/
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: {
            company: "Senior Project",
        },
    })
    res.status(200)
        .json({
            success: true,
            client_secret: myPayment.client_secret,
        })
})
/* processPayment = async(req, res, next); */



/**/
/*
sendStripeApiKey()
NAME
    sendStripeApiKey - Sends the Stripe API key to the client.
SYNOPSIS
    sendStripeApiKey = async(res);
    res -> Response object that will carry the API key information and the status code back to the client.
DESCRIPTION
    It sends the Stripe API key to the client as a part of the response object. We have stored
    api key in dot env file for security in server side so this function will make that key available in client side
RETURNS
    Returns the API key information as a part of the response object.
*/
/**/
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  });
  
/* sendStripeApiKey = async(res); */
