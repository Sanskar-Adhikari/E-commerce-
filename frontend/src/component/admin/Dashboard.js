import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import TopHeading from '../TopHeading.js';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto';
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/ProductActions.js';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/UserAction.js';


/**/
/*
Dashboard()
NAME
    Dashboard 
SYNOPSIS
    Dashboard();
    No props passed.
DESCRIPTION
    This component is responsible for displaying a dashboard for an admin panel. It fetches data from the redux store
    and calculates values based on that data. It then displays that data in the form of charts and summaries.
RETURNS
    Returns the JSX for the dashboard of the admin panel.
*/
/**/
const Dashboard = () => {
  // Define initial values for state variables
  let outOfStock = 0;
  const dispatch = useDispatch();

  // Fetch data from redux store
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  // Count the number of products that are out of stock
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) 
      {
        outOfStock += 1;
      }
    });

  // Calculate the total amount of money earned from orders
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // Fetch data from the server when the component mounts
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  // Define data and options for doughnut chart
  const doughnutChart={
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  // Define data and options for line chart
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["blue"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  return (
    <div className="dashboard">
      {/* Top Heading Component */}
      <TopHeading title="Dashboard - Admin Panel" />
      
      {/* Sidebar Component */}
      <Sidebar />
  
      <div className="dashboardContainer">
        {/* Main Heading */}
        <Typography component="h1">Dashboard</Typography>
  
        {/* Summary of Total Amount, Products, Orders, and Users */}
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ${parseInt(totalAmount)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
            <p>Product</p>
              {/* Display total number of products */}
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              {/* Display total number of orders */}
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              {/* Display total number of users */}
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
  
        {/* Line chart to display Total Amount */}
        <div className="lineChart">
          <Line data={lineState} />
        </div>
  
        {/* Doughnut chart to display Product stock status. */}
        <div className="doughnutChart">
          <Doughnut data={doughnutChart} />
        </div>
      </div>
    </div>
  );
}
/* Dashboard(); */

export default Dashboard;