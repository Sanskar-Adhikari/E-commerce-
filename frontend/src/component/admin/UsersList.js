import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/ProductActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import TopHeading from "../TopHeading";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../actions/UserAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";

/**/
/*
UserList()
NAME
    UserList 
SYNOPSIS
    UserList();
DESCRIPTION
    This component is responsible for rendering a list of all users in the admin dashboard. It uses the DataGrid 
    component from the @material-ui library to display the data in a table format. It fetches the user data from the backend and handle deletion of users as well.
RETURNS
Returns the JSX for the UserList component.
*/
/**/
const UserList = () => {
  // Import necessary hooks and functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  // Select relevant data from the Redux store
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  // Use the useEffect hook to handle the initial load of the page and to update the state variables when necessary
  useEffect(() => {
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

    if (isDeleted) 
    {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  // Function to handle deletion of a user
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  // Define rows and columns for the data table
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
        // Render the edit and delete buttons for each row
        return (
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
        );
      },
    },
  ];

  // Map over the users array and push each user's data into the rows array

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
      {/* Top heading component */}
      <TopHeading title="All USERS--admin" />
      <div className="dashboard">
        {/* Sidebar component */}
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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
/* UserList() */

export default UserList;
