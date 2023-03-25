import React from 'react';
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import LoadingScreen from '../LoadingComponent/LoadingScreen';


/**/
/*
ProtectedRoute
NAME
    ProtectedRoute
SYNOPSIS
    ProtectedRoute({ isAdmin, ...rest })
    isAdmin -> boolean flag indicating if the user needs to be an admin
    ...rest -> rest parameters to pass along any additional props to the component
DESCRIPTION
    A component to protect a route based on user authentication and role.
RETURNS
    Returns a React component that either renders a loading screen, redirects to the login page,
    or renders the protected component based on user authentication and role.
*/
/**/
const ProtectedRoute = ({ isAdmin, ...rest }) => {

  //useSelector hook to get details from the Redux store
  const { loading, isAuth, user } = useSelector((state) => state.user);

  //Check if the page is still loading
  if (loading===true) {
    return <LoadingScreen/>;
  }

  if (!isAuth) {
    // Redirect unauthenticated users to the login page.
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    // If the user is not an admin but isAdmin flag is set to true, redirect to login page.
    return <Navigate to="/login" />;
  }

  // Render the protected component.
  return <Outlet {...rest} />;
}

/* ProtectedRoute({ isAdmin, ...rest }) */
export default ProtectedRoute;
