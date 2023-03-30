import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import "./orderDetails.css";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import TopHeading from "../TopHeading";


/**/
/*
OrderDetails
NAME
    OrderDetails
SYNOPSIS
    OrderDetails()
DESCRIPTION
    The OrderDetails component displays the details of a particular order
    such as the order number, shipping information, payment details,
    order status, and the list of ordered items.
RETURNS
    This component returns a JSX element for displaying order details
*/
/**/
const OrderDetails = () => {
  // Importing the necessary hooks
  const dispatch = useDispatch();
  const alert = useAlert();

  // Destructuring the required values from the Redux store state object.
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { id } = useParams();

  // Using the useEffect hook to trigger an action when the component mounts or updates.
  useEffect(() => {
    // If there is an error, display it using the alert function and clear the error from the Redux store.
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Dispatch the getOrderDetails action to get the details of the order with the specified ID.
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {
        // if loading, render the LoadingScreen component, otherwise render the order details.
        loading ? (
          <LoadingScreen />
        ) : (
          <Fragment>

            {/* Display the page heading */}
            <TopHeading title="Order Details" />
            <div className="orderDetailsPage">
              <div className="orderDetailsContainer">
                <Typography component="h1">

                  {/* Display the order ID */}
                  Order #{order && order._id}
                </Typography>

              <div>
                {/* Display the shipping information */}
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                {/* Display the payment information */}
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "Paid"
                        : "Not Paid"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                {/* Display the order status */}
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Display the order items */}
              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ${item.price} ={" "}
                          <b>${item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              </div>
            </div>
          </Fragment>
        )
      }
    </Fragment>
  );
};

/* OrderDetails() */
export default OrderDetails;
