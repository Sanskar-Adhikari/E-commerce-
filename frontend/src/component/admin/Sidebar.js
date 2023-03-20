import React from "react";
import "./sidebar.css";
import profilepng from "../extra/profilepng.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";


/**/
/*
Sidebar()
NAME
    Sidebar
SYNOPSIS
    Sidebar();
DESCRIPTION
    This is a React component that displays a sidebar for the admin dashboard. It includes links to the homepage, admin dashboard, products (with sub-links to view all products and create a new product), 
    orders, users, and product reviews. The products link includes a TreeView component to display the sub-links. The component utilizes various icons from material-ui/icons to enhance the visual display of the sidebar.
RETURNS
    Returns the JSX for the admin sidebar.
*/
/**/
const Sidebar = () => {
  return (
    <div className="parent-container ">
      <div className="sidebar">
        {/* Link to go back to the homepage */}
        <Link to="/">
          <img src={profilepng} alt="seniorproject" />
        </Link>

        {/* Link to the admin dashboard */}
        <Link to="/admin/dashboard">
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>

        <Link>
          {/* TreeView with Products menu */}
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}>

            <TreeItem nodeId="1" label="Products">
              {/* Link to view all products */}
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>

              {/* Link to create a new product */}
              <Link to="/admin/product">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>

        {/* Link to view all orders */}
        <Link to="/admin/orders">
          <p>
            <ListAltIcon />
            Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p>
            <PeopleIcon /> Users
          </p>
        </Link>

        {/* Link to view all product reviews */}
        <Link to="/admin/reviews">
          <p>
            <RateReviewIcon />
            Reviews
          </p>
        </Link>
      </div>
    </div>
  );
};
/* Sidebar(); */

export default Sidebar;
