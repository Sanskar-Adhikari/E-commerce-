import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import HomeIcon from "@mui/icons-material/Home";
import "./Header.css";


/**/
/*
UserOptions()
NAME
    UserOptions
SYNOPSIS
    UserOptions({user});
    {user} - The current (logged in) user object.
DESCRIPTION
    This component renders a dropdown menu with options based on the user's role.(like admin or regular user)
RETURNS
    The UserOptions component.
*/
/**/
const UserOptions = ({ user }) => {

  // Get cart items from the global state using useSelector
  const { cartItems } = useSelector((state) => state.cart);

  // Getnecessary functions and hooks
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set up state for the open/closed status of the speed dial
  const [open, setOpen] = useState(false);

  // Options for the SpeedDial component
  const options = [
    { icon: <HomeIcon />, name: "Home", func: home },

    {
      icon: <ProductionQuantityLimitsIcon />,
      name: "Products",
      func: products,
    },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "burlywood" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length}))`,
      func: cart,
    },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  // If user is an admin, add a Dashboard option to the options list
  if (user.role === "admin") {
    options.push({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  // Functions to navigate to different pages
  function home() {
    navigate("/");
  }
  function products() {
    navigate("/products");
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  // Function to log out the user.
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout was successful");
  }

  return (
    <div className="speedDialContainer">
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedIcon"
            
            // if user avatar exists, use it, otherwise use default image
            src={user.avatar.url ? user.avatar.url : "/logo512.png"}
            alt="ProfilePicture"
          />
        }
        className="MuiSpeedDial-root"
      >
        {
          // create a SpeedDialAction for each option
          options.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
            />
          ))
        }
      </SpeedDial>
    </div>
  );
};
/* UserOptions({user}); */

export default UserOptions;
