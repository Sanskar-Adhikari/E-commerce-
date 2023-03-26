import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TopHeading from "../TopHeading";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";


/**/
/*
ConfirmOrder()
NAME
    ConfirmOrder
SYNOPSIS
    ConfirmOrder();
DESCRIPTION
    A React component that renders a confirmation page for the user's order, including their shipping information 
    and cart items, as well as an order summary with subtotal, tax, shipping charges, and total price. 
    The component also includes a "Proceed" button that, when clicked, stores order information in session storage and navigates the user to the payment page.
RETURNS
    JSX element that renders the ConfirmOrder component
*/
/**/
const ConfirmOrder = () => {
  // Import necessary hooks and selectors
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Calculate subtotal by multiplying quantity with price for each cart item
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Calculate shipping charges
  const shippingCharges = subtotal > 300 ? 0 : 7;

  // Calculate tax
  const tax = subtotal * 0.15;

  // Calculate total price
  const totalPrice = subtotal + tax + shippingCharges;

  // Create address string
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  // Proceed to payment page
  const proceedToPayment = () => {
    const data = {
      subtotal,
      tax,
      shippingCharges,
      totalPrice,
    };

    // Store order information in sessionStorage
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    // Navigate to payment page
    navigate("/process/payment");
  };

  return (
    <Fragment>

      {/* TopHeading component with the title "Confirm Order" */}
      <TopHeading title="Confirm Order" />

      {/* CheckoutSteps component with the activeStep set to 1 */}
      <CheckoutSteps activeStep={1} />

      {/* main content of the Confirm Order page */}
      <div className="confirmOrderPage">
        <div className="confirmShippingArea">

          {/* Title for the shipping info section */}
          <div className="topics">
          <Typography>Shipping Info</Typography></div>

          {/* Shipping info details */}
          <div className="confirmshippingAreaBox">
            <div>
              <p>Name:</p> <span>{user.name}</span>
            </div>
            <div>
              <p>Phone:</p> <span>{shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p> <span>{address}</span>
            </div>
          </div>

          {/* Cart items section */}
          <div className="confirmCartItems">

            {/* Title for the cart items section */}
            <Typography>Your cart items are:</Typography>

            {/* List of cart items */}
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Productname" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} * ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Order summary section */}
        <div>
          <div className="orderSummary">

            {/* Title for the order summary section */}
            <Typography>Order Summary</Typography>

            {/* Order summary details */}
            <div>
              <div>
                <p>Total:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>TAX:</p>
                <span>${tax}</span>
              </div>
            </div>
            <p>

              {/* Total cost */}
              <b>Total cost: </b>
            </p>
            <span>${totalPrice}</span>
          </div>

          {/* Proceed to payment button */}
          <button className="proceed" onClick={proceedToPayment}>
            Proceed
          </button>
        </div>
      </div>
    </Fragment>
  );
};
/* ConfirmOrder(); */

export default ConfirmOrder;
