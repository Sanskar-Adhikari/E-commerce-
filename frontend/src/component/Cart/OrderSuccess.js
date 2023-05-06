import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import TopHeading from "../TopHeading";


/**/
/*
OrderSuccess()
NAME
    OrderSuccess
SYNOPSIS
    OrderSuccess();
DESCRIPTION
    This component displays a success message after the order is successfully placed.
RETURNS
    A div containing a success message with a link to view orders
*/
/**/
const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      {/* Title for the ORDER SUCCESS section */}
      <TopHeading title="ORDER PLACED"/>
      <CheckCircleIcon />
      <Typography>Your Order has been successfully placed </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};
/* OrderSuccess(); */

export default OrderSuccess;