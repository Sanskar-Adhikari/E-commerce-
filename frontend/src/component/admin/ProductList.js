import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors,getAdminProduct,deleteProduct,} from "../../actions/ProductActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import TopHeading from "../TopHeading";
import { useNavigate } from "react-router-dom";


/**/
/*
ProductList()
NAME
    ProductList
SYNOPSIS
    ProductList();
    No props passed.
DESCRIPTION
    This is a React component that displays a table of all products fetched from the backend. It includes columns for
    product ID, name, stock, price, and buttons for editing and deleting individual products. It also includes logic
    for handling successful and failed product deletions/update, and displaying error and success messages.
RETURNS
    Returns the JSX for getting all the ProductList for admin users.
*/
/**/
const ProductList = () => {
  // Initialize hooks for navigation, dispatch, and alert
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  // Get error and products from the Redux store
  const { error, products } = useSelector((state) => state.products);

  // Get deleteError and isDeleted from the Redux store
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  // UseEffect hook to handle error/success messages and dispatch necessary actions when the component mounts or updates
  useEffect(() => {
    // Handle errors
    if (error) 
    {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) 
    {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    // Handle delete confirmation message and redirect to admin dashboard
    if (isDeleted) 
    {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    // Dispatch action to get all products from the Redux store
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  // Define function to handle delete product and dispatch action
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  // Define the rows and columns for the data grid
  const rows = [];
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.1 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 50,
      flex: 0.2,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 50,
      flex: 0.1,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 20,
      flex: 0.1,
    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Actions",
      minWidth: 50,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            {/* Link to the admin product page */}
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            {/* Button to delete the order */}
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  // Loop through the products array and add each item as a new row in the data grid.
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <Fragment>
      {/* Top heading component */}
      <TopHeading title="All products--admin" />

      <div className="dashboard">
        {/* Sidebar component */}
        <SideBar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          {/* DataGrid component */}
          <DataGrid
            rows={rows} // rows to be displayed
            columns={columns} // columns to be displayed
            pageSize={10} // number of rows per page
            disableSelectionOnClick // disable row selection on click
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
/* ProductList(); */

export default ProductList;
