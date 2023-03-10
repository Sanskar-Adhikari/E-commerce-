import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteOrder,
  getAllOrders
} from "../../actions/orderAction";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import TopHeading from "../TopHeading";
import { useNavigate } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";


const Order = () => {
    //const {id}  = useParams();
   // console.log(id);
const navigate= useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order
    );
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
        alert.success("Order Deleted Successfully");
        navigate("/admin/orders");
        dispatch({ type: DELETE_ORDER_RESET });
      }
      dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);



      const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
      };
    


    const rows = [];
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 333, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
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
            flex: 0.5,
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
                )
          }}]


          orders &&
          orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty:item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <Fragment>
        <TopHeading title="All orders--admin"/>
        <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
        </div>
        </Fragment>
  )
}

export default Order