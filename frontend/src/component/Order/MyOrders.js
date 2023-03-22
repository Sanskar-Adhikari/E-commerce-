import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import TopHeading from "../TopHeading";


/**/
/*
MyOrders
NAME
    MyOrders
SYNOPSIS
    MyOrders()
DESCRIPTION
    The `MyOrders` component displays a table of orders for a specific user.
    It uses the `DataGrid` component from the Material-UI library to display the orders.
RETURNS
    This component renders order table for a specific user
*/
/**/
const MyOrders = () => {
  // Importing the necessary hooks,selectors and modules from ReactJS
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  // Defining columns for the table
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 400, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 0.5,

      // Setting a className for cells based on their content
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 215,
      flex: 0.42,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 1,
    },

    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,

      // Adding a link to each cell in this column to get order details
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  // Initializing an empty array for rows
  const rows = [];

  // Populating rows with data from the 'orders' array
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  // Running a useEffect hook to dispatch 'myOrders' action and handle errors
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Fetching the user's orders from the Redux store
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>

      {/* Displaying the user's name and "Orders" in the page heading */}
      <TopHeading title={`${user.name} - Orders`} />

      {loading ? (
        // If the orders are still loading, display a loading screen
        <LoadingScreen />
      ) : (

        // Otherwise, display the orders table
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          {/* Displaying the user's name again below the table */}
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};
/* MyOrders() */

export default MyOrders;
