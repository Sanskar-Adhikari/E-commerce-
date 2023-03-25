import React, { Fragment, useEffect } from "react";
import TopHeading from "../TopHeading";
import { useSelector } from "react-redux";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";


/**/
/*
Profile
NAME
    Profile
SYNOPSIS
    Profile()
DESCRIPTION
    Renders the user's profile details, including their name, email, avatar, and date joined.
    Allows the user to edit their profile, change their password, and view their order history.
RETURNS
    JSX element with user's account details and links to edit profile, change password, and view order history
*/
/**/
const Profile = () => {
  // import the useNavigate and useSelector hooks
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  // redirect to login page if user is not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // render the component
  return (
    <Fragment>
      {/* show loading screen while data is being fetched */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Fragment>
          {/* show page heading */}
          <TopHeading title={`${user.name}'s Account`} />

          {/* show user's account details */}
          <div className="profileContainer">
            <div className="arrange">
              <h1>My Profile</h1>

              {/* user's image */}
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              {/* user's full name */}
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>

              {/* user's email address */}
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>

              {/* user's account creation date */}
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>

              {/* links to user's orders and password update page */}
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

/* Profile() */
export default Profile;
