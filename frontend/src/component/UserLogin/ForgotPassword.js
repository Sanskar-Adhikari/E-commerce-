import React, { useState, useEffect } from "react";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import TopHeading from "../TopHeading";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./Login.css";
import { clearErrors, forgotPassword } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import logos from "../UserLogin/logoa.jpeg";


/**/
/*
ForgotPassword
NAME
    ForgotPassword
SYNOPSIS
    ForgotPassword()
DESCRIPTION
    This component renders a form that allows users to enter their email address and submit it to receive a password reset link via email. 
RETURNS
    The jsx for ForgotPassword component.
*/
/**/
const ForgotPassword = () => {
  // Define variables and hooks for alert, dispatch, and state
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  // Function to handle form submission for forgot password
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  // Use effect hook to handle error and message alerts
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [alert, dispatch, error, message, user]);

  return (
    <div>
      {/* Check if the page is still loading */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {/* Display the page heading */}
          <TopHeading title="FORGOT PASSWORD" />

          <div className="top login-card-container">
            <div className=" login-card">
              <div className="login-card-logo">
                <img src={logos} alt="logo" />
              </div>
              <div className="login-card-header">

                {/* Display the page title */}
                <h1>Forgot Password</h1>
              </div>
              <form
                className="updateform login-card-form shiftToNeutralForm "
                onSubmit={forgotPasswordSubmit}
              >
              
                {/* Email input field */}
                <div className="form-item">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Submit button */}
                <input type="submit" value="Send" className="loginBtn" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ForgotPassword() */
export default ForgotPassword;
