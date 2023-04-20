import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { clearErrors } from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import TopHeading from "../TopHeading.js";
import { useNavigate, useParams } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { getUserDetails, updateUser } from "../../actions/UserAction";
import LoadingScreen from "../LoadingComponent/LoadingScreen";


/**/
/*
UpdateUser()
NAME
    UpdateUser
SYNOPSIS
    UpdateUser();
DESCRIPTION
    It is a React functional component that allows an admin user to update the details of a specific user. 
    It fetches the user details from the Redux store and displays them in a form. When the user submits the form,
    the updated user details are sent to the server to be saved.
RETURNS
    The UpdateUser component, which displays a form to update a user's details.
*/
/**/
const UpdateUser = () => {
  // Import necessary hooks and functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  // Select data from the Redux store
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  // Define state variables and set their initial values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // Get the user ID from the URL parameters
  const { id } = useParams();
  const userId = id;

  // When the component mounts, fetch the user details and update the state
  useEffect(() => {
    // If the user ID in the URL doesn't match the ID of the user in the Redux store,
    // fetch the user details using the ID from the URL
    if (user && user._id !== userId) 
    {
      dispatch(getUserDetails(userId));
    }
    // Otherwise, update the state with the user details from the Redux store
    else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) 
    {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) 
    {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Updated!");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  // When the form is submitted, update the user profile
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      {/* Page title */}
      <TopHeading title="Update User" />
      <div className="dashboard">
        {/* Sidebar component*/}
        <SideBar />
        <div className="newProductContainer">
          {/* Show loading screen when `loading` is true */}
          {loading ? (
            <LoadingScreen />
          ) : (
            // Update user form

            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              {/* Input field for user's name */}
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Input field for user's email */}
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Dropdown to select user's role */}
              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Update Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              {/* Button to submit the form */}
              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update user
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};
/* UpdateUser(); */

export default UpdateUser;
