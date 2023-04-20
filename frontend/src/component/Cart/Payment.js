import React, { Fragment, useEffect, useRef } from "react";
import "./payment.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import TopHeading from "../TopHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";


/**/
/*
Payment()
NAME
    Payment
SYNOPSIS
    Payment();
DESCRIPTION
    The Payment component renders a payment form with fields for card information
    and a submit button to complete a payment. The component uses
    Stripe library to handle the card inputs.
RETURNS
    returns a React fragment containing the payment form.
*/
/**/
const Payment = () => {
  // Define required hooks and variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);

  // Retrieve required information from store
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  // Define payment data object
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  // Define order object
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  // Define submit handler function
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      // Define config object
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make API call to process payment
      const { data } = await axios.post(
        "/api/payment/process",
        paymentData,
        config
      );

      // Retrieve client secret from response
      const client_secret = data.client_secret;

      // Confirm payment using Stripe
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      // Handle payment result
      if (result.error) 
      {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") 
        {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else 
        {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (er) 
    {
      payBtn.current.disabled = false;
      alert.error(er.response.data.message);
    }
  };

  // Handle errors
  useEffect(() => {
    if (error) 
    {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      {/* The TopHeading component renders a title for the payment section */}
      <TopHeading title="Payment" />

      {/* The CheckoutSteps component renders a progress bar showing the user's current step in the checkout process */}
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        {/* The paymentform form  */}
        <form className="paymentform" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Information</Typography>
          <div>
            {/* input for the card number input field */}
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>

          {/* input for the card expiry date input field*/}
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>

          {/* input for the card CVC input field */}
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          {/* The submit button triggers the submitHandler function when clicked */}
          <input
            type="submit"
            value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};
/* Payment(); */

export default Payment;
