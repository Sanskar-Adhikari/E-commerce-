import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors,getAllReviews,deleteReviews,} from "../../actions/ProductActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import TopHeading from "../TopHeading";
import { useNavigate } from "react-router-dom";
import Star from "@material-ui/icons/Star";


/**/
/*
ProductReviews()
NAME
    ProductReviews
SYNOPSIS
    ProductReviews();
    No props passed.
DESCRIPTION
    This is a React component that displays form to enter product id and then displays a table of all reviews for a product fetched from the backend. It includes columns for
    review ID, name, comment, rating, and buttons for deleting individual reviews. It also includes logic for handling successful
    and failed review deletions, and displaying error and success messages. 
RETURNS
    Returns the JSX for getting all the product reviews for admin users.
*/
/**/
const ProductReviews = () => {
  // Initialize state variables using React hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  // Use 'useSelector' to extract state from Redux store
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const [productId, setProductId] = useState("");

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

    // Handle successful review deletion
    if (isDeleted) 
    {
      alert.success("Review Deleted!!");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

  // function to handle delete review
  const deleteReviewHandler = (id) => {
    dispatch(deleteReviews(id, productId));
  };

  //functions to handle get product reviews
  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  // Define the table rows and columns
  const rows = [];
  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  // Loop through the reviews array and add each item as a new row in the data grid
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });
  return (
    <Fragment>
      {/* Top heading component */}
      <TopHeading title="All reviews --admin" />

      <div className="dashboard">
        {/* Sidebar component */}
        <SideBar />
        <div className="productListContainer">
          <form
            className="createProductForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1>ALL REVIEWS</h1>
            <div>
              {/* Star rating component */}
              <Star />

              {/* Input for product ID */}
              <input
                type="text"
                placeholder="Name"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            {/* Button to view product reviews */}
            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || setProductId === "" ? true : false
              }
            >
              View Reviews
            </Button>
          </form>

          {/* If there are reviews, display them in a table */}
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            // If there are no reviews, display a message
            <h1 className="noHeading">No reviews yet</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};
/* ProductReviews(); */

export default ProductReviews;
