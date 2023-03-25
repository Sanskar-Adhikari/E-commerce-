import React, { useState, useEffect } from "react";
import "./Login.css";
import logos from "../UserLogin/logoa.jpeg";
import { clearErrors, updatePassword } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import TopHeading from "../TopHeading";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LoadingScreen from "../LoadingComponent/LoadingScreen";


/**/
/*
UpdatePassword
NAME
    UpdatePassword
SYNOPSIS
    UpdatePassword()
DESCRIPTION
    This function renders a form to allow the user to update their password.
RETURNS
    jsx that renders form to update password.
*/
/**/
const UpdatePassword = () => {
  // Define constants for navigation, alerts, and dispatch
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  // Use the useSelector hook to get the error, isUpdated, and loading state values from the store
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  // Define state variables for oldPassword, newPassword, and confirmPassword
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Define function to handle password update form submission
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object and add the values of oldPassword, newPassword, and confirmPassword to it
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    // Dispatch the updatePassword action with the form data
    dispatch(updatePassword(myForm));
  };

  // Define an effect hook to handle changes in error, isUpdated, and navigation state values
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password update success");
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [alert, dispatch, error, isUpdated, navigate]);

  return (
    <div>
      {/* If the 'loading' state is true, render the loading screen component */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>

          {/* displaying page title */}
          <TopHeading title="UPDATE PASSWORD" />

          <div className="top login-card-container">
            <div className="login-card">
              <div className="login-card-logo">
                <img src={logos} alt="logo" />
              </div>
              <div className="login-card-header">
                <h1>Update Profile</h1>
              </div>
              <form
                // A form element that calls the 'updatePasswordSubmit' function on submit
                className="updateform login-card-form shiftToNeutralForm "
                onSubmit={updatePasswordSubmit}
              >

                {/* input box for old password */}
                <div className="form-item">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                {/* input box for new password */}
                <div className="form-item">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                {/* input box for confirming new password */}
                <div className="form-item">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Re-enter"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* A submit button */}
                <input type="submit" value="Update" className="loginBtn" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* UpdatePassword() */
export default UpdatePassword;
