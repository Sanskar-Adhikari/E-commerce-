import React, {  useState } from 'react'
import {SpeedDial, SpeedDialAction} from "@material-ui/lab"
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import { useNavigate } from 'react-router-dom';
import {useAlert} from "react-alert";
import{logout} from "../../actions/UserAction"
import { useDispatch, useSelector } from 'react-redux';
import "./Header.css"

const UserOptions = ({user}) => {
  const {cartItems} = useSelector((state)=>state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen]= useState(false);
    const alert=useAlert();
    const options = [
      { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"burlywood":"unset"}} />, name: `Cart(${cartItems.length}))`, func: cart },
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];

      if(user.role==="admin"){
        options.push(  { icon: <DashboardIcon />, name: "Dashboard", func: dashboard },)
      }


function dashboard(){
    navigate("/admin/dashboard");
}

function orders(){
    navigate("/orders");
}

function account(){
    navigate("/account");
}

function cart(){
  navigate("/cart");
}
function logoutUser(){
    dispatch(logout());
    alert.success("Logout was successful");
}


return (
  <div className="speedDialContainer">
    <SpeedDial 
      ariaLabel='SpeedDial tooltip example'
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      open={open}
      direction="down"
      icon={
        <img className='speedIcon'
          src={user.avatar.url? user.avatar.url:"/logo512.png"}
          alt="ProfilePicture"/>
      }
      className="MuiSpeedDial-root">
        {
          options.map((item)=>(<SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>))
        }
    </SpeedDial>
  </div>
)}

export default UserOptions;
