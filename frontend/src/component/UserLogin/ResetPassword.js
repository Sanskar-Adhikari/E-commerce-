import React, { useState, useEffect } from "react";
import "./Login.css";
import logos from "../UserLogin/logoa.jpeg";
import { clearErrors, resetPassword } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopHeading from "../TopHeading";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import { useParams } from "react-router-dom";


/**/
/*
ResetPassword
NAME
    ResetPassword
SYNOPSIS
    ResetPassword()
DESCRIPTION
    This component is responsible for rendering the reset password page, where users can reset their forgotten passwords. 
    It displays a form that allows users to enter their new password and confirm it. Once submitted, it sends a request to the server to update the password.
RETURNS
    This component returns the JSX for the reset password page.
*/
/**/
const ResetPassword = () => {
  // Define a constant variable 'token' from the URL parameters
  const { token } = useParams();

  // Define constant variables using hooks
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  // Define constant variables from the state using the 'useSelector' hook
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  // Define state variables for the password and confirm password fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission for resetting the password
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  // Perform actions on component mount and when the state changes
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password update success");
      navigate("/login");
    }
  }, [alert, dispatch, error, navigate, success]);

  return (
    <div>
      {/* Render a loading screen if `loading` is true */}
      {loading ? (
        <LoadingScreen />
      ) : (
        // Otherwise, render the update password form
        <div>
          {/* show page heading */}
          <TopHeading title="UPDATE PASSWORD" />
          <div className="top login-card-container">
            <div className="login-card">
              <div className="login-card-logo">
                <img src={logos} alt="logo" />
              </div>
              <div className="login-card-header">
                <h1>Update Profile</h1>
              </div>

              {/* Submitting the form will trigger `resetPasswordSubmit` function */}
              <form
                className="updateform login-card-form shiftToNeutralForm "
                onSubmit={resetPasswordSubmit}
              >
                {/* Input field for new password */}
                <div className="form-item">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Input field for re-entering the password */}
                <div className="form-item">
                  <LockIcon />

                  {/* Submit button */}
                  <input
                    type="password"
                    placeholder="Re-enter"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Update" className="loginBtn" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ResetPassword() */
export default ResetPassword;
