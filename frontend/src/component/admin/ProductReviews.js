import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews
} from "../../actions/ProductActions";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET, DELETE_REVIEW_RESET } from "../../constants/productConstants";
import TopHeading from "../TopHeading";
import { useNavigate } from "react-router-dom";
import Star from "@material-ui/icons/Star";
const ProductReviews = () => {
    //const {id}  = useParams();
   // console.log(id);
const navigate= useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error: deleteError, isDeleted  } = useSelector((state) => state.review);
    const {error, reviews,loading } = useSelector((state) => state.productReviews
    );
    const [productId, setProductId] = useState("")
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success("Review Deleted!!");
        navigate("/admin/reviews");
        dispatch({ type: DELETE_REVIEW_RESET });
      }
  
    }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);



      const deleteReviewHandler = (id) => {
        dispatch(deleteReviews(id, productId));
      };
    
const productReviewSubmitHandler = (e)=>{
e.preventDefault();
dispatch(getAllReviews(productId))
}

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
                return(
                  <Fragment>

            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
                )
          }}]


          reviews &&
    reviews.forEach((item) => {
      rows.push({
        id:item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });
  return (
    <Fragment>
        <TopHeading title="All reviews --admin"/>
        <div className="dashboard">
        <SideBar />
        <div className="productListContainer">

        <form
          className="createProductForm"
          onSubmit={productReviewSubmitHandler}
        >
          <h1>ALL REVIEWS</h1>

          <div>
            <Star />
            <input
              type="text"
              placeholder="Name"
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>


          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false || setProductId===""?true:false}
          >
            View Reviews
          </Button>
        </form>
  
{reviews && reviews.length > 0? 
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />:<h1 className="noHeading">No reviews yet</h1>}
        </div>
        </div>
        </Fragment>
  )
}

export default ProductReviews