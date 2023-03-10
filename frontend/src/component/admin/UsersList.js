import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/ProductActions";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import TopHeading from "../TopHeading";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../actions/UserAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";


const UserList = () => {
    //const {id}  = useParams();
   // console.log(id);
const navigate= useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, users, loading } = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message,
      } = useSelector((state) => state.profile);

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
        alert.success(message);
        navigate("/admin/users");
        dispatch({ type: DELETE_USER_RESET });
      }
  
      dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);



      const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
      };
    


    const rows = [];
    const columns = [
        { field: "id", headerName: "User's ID", minWidth: 170, flex: 0.7 },
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 300,
          flex: 1,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.4,
        },
    
        {
          field: "role",
          headerName: "Role",
          type: "number",
          minWidth: 150,
          flex: 0.4,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
                )
          }}]


          users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <Fragment>
        <TopHeading title="All USERS--admin"/>
        <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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

export default UserList