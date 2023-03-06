import React from 'react';
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import LoadingScreen from '../LoadingComponent/LoadingScreen';

const ProtectedRoute = ({ isAdmin, ...rest }) => {
  const { loading, isAuth, user } = useSelector((state) => state.user);

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

export default ProtectedRoute;
