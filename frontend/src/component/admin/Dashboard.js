import React from 'react'
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import TopHeading from '../TopHeading.js';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="dashboard">
    <TopHeading title="Dashboard - Admin Panel" />
    <Sidebar />

    <div className="dashboardContainer">
      <Typography component="h1">Dashboard</Typography>

      <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br /> 33
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Product</p>
            <p>3</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>3</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>3</p>
          </Link>
        </div>
      </div>

    </div>
  </div>
  )
}

export default Dashboard