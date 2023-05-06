import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopHeading from "../TopHeading";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import "../Cart/ConfirmOrder.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {getOrderDetails,clearErrors,updateOrder,} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";


/**/
/*
ProcessOrder()
NAME
    ProcessOrder
SYNOPSIS
    ProcessOrder();
    No props passed.
DESCRIPTION
    This React component renders order details and form for processing an order. It allows for updating 
    of the order status and displays relevant order details.
RETURNS
    Returns the JSX for Processing Order.
*/
/**/
const ProcessOrder = () => {
  // Get the id parameter from the URL
  const { id } = useParams();

  // Initialize hooks for dispatching actions, displaying alerts, and accessing state
  const dispatch = useDispatch();
  const alert = useAlert();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  // Initialize local state for the order status
  const [status, setStatus] = useState("");

  // Function for handling form submission to update the order status
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    // Create a new FormData object and set the status field
    const myForm = new FormData();
    myForm.set("status", status);

    // Dispatch the updateOrder action with the id and the updated form data
    dispatch(updateOrder(id, myForm));
  };

  // UseEffect hook to handle error/success messages and dispatch necessary actions when the component mounts or updates
  useEffect(() => {
    if (error) 
    {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) 
    {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) 
    {
      alert.success("Order Updated!");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    // Dispatch getOrderDetails action to get the order details with the given id
    dispatch(getOrderDetails(id));
  }, [alert, dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      {/* Render the top heading */}
      <TopHeading title="Process Order" />

      <div className="dashboard">
        {/* Render the sidebar */}
        <SideBar />

        {/* Render either a loading screen or the order details */}
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="orderProductContainer">
            {/* Render the order details */}
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="confirmshippingArea">
                {/* Render the shipping information */}
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
                      {order &&
                        order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                {/* Render the payment information. */}
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

                {/* Render the order status */}
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

                {/* Render the cart items */}
                <div className="confirmCartItems">
                  <Typography>Your cart items are:</Typography>
                  <div className="confirmOrderItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product} className="orderItem">
                          <img src={item.image} alt="Productname" />
                          <Link to={`/product/${item.product}`}>
                            {item.name} 
                          </Link>
                          

                          <span>
                            {"  "}{item.quantity} * ${item.price} ={" "}
                            <b>${item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Render the order processing form */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="createProductForm"
                  encType="multipart/form-data"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Update Status</option>

                      {/* If the current order status is "Processing", allow the user to update it to "Shipped" */}
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {/* If the current order status is "Shipped", allow the user to update it to "Delivered" */}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  {/* Disable the "Update" button if the form is currently loading or the status has not been selected */}
                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
/* ProcessOrder(); */

export default ProcessOrder;
