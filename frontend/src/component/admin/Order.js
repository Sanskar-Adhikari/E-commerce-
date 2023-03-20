import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors,deleteOrder,getAllOrders,} from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import TopHeading from "../TopHeading";
import { useNavigate } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";


/**/
/*
Order()
NAME
    Order
SYNOPSIS
    Order();
    No props passed.
DESCRIPTION
    This is a React component that displays a table of all orders fetched from the backend. It includes columns for
    order ID, status, items quantity, and total amount, as well as buttons for editing and deleting individual orders.
    It also includes logic for handling successful and failed order deletions/update, and displaying error and success messages.
RETURNS
    Returns the JSX for getting all the Order details for admin users.
*/
/**/
const Order = () => {
  // Initializing the necessary hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  // Getting the necessary state variables from the Redux store
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  // Set up an effect hook to handle changes
  useEffect(() => {
    // Handling errors related to fetching all orders
    if (error) 
    {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Handling errors related to deleting an order
    if (deleteError) 
    {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    // Handling successful order deletion
    if (isDeleted) 
    {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    // Fetching all orders
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  // Handling the order deletion
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  // Setting up the rows and columns for the data grid
  const rows = [];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.3 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.1,
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
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            {/* Link to the order details page */}
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            {/* Button to delete the order */}
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  // push rows for the DataGrid
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      {/* Page heading */}
      <TopHeading title="All orders--admin" />
      <div className="dashboard">
        {/* Sidebar Component */}
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          {/* Data grid to display the list of orders */}
          <DataGrid
            rows={rows}  // rows to be displayed
            columns={columns}  // columns to be displayed
            pageSize={10}  // number of rows per page
            disableSelectionOnClick   // disable row selection on click
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
/* Order(); */

export default Order;
