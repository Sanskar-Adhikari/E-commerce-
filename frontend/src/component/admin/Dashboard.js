import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import TopHeading from '../TopHeading.js';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto';
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProduct } from '../../actions/ProductActions.js';

const Dashboard = () => {
  let outOfStock = 0;
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  console.log(products)


  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    useEffect(() => {
      dispatch(getAdminProduct());
    }, [dispatch]);


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
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["blue"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 4000],
          },
        ],
      };
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
            <p>{products&&products.length}</p>
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

      <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutChart} />
        </div>

    </div>
  </div>
  )
}

export default Dashboard