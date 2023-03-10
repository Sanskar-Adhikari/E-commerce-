import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import TopHeading from '../TopHeading';
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import "../Cart/ConfirmOrder.css"


import { Link, Navigate, useNavigate } from 'react-router-dom';
const ProcessOrder = () => {
    const {shippingInfo, cartItems} = useSelector((state)=>state.cart);
    const {user} = useSelector((state) => state.user)
const navigate= useNavigate();
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,0
      );

      const shippingCharges = subtotal > 300 ? 0 : 7;

      const tax = subtotal * 0.15;

      const totalPrice = subtotal + tax + shippingCharges;

      const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

        const proceedToPayment = () =>
        {
            const data={
                subtotal,
                tax,
                shippingCharges,
                totalPrice
            }
            sessionStorage.setItem("orderInfo", JSON.stringify(data))
            navigate("/process/payment");
        }

         
  return (
  <Fragment>
    <TopHeading title= "Confirm Order"/>
    <div className='dashboard'>
        <SideBar/>
        <div className='newProductContainer'>
        <div className='confirmOrderPage'>
        <div className='confirmshippingArea'>
    <Typography>Shipping Info</Typography>
    <div className='confirmshippingAreaBox'>
        <div>
            <p>Name:</p> <span>{user.name}</span>
        </div>
        <div>
            <p>Phone:</p> <span>{shippingInfo.phoneNo}</span>
        </div>
        <div>
            <p>Address:</p> <span>{address}</span>
        </div>

    </div>
    <div className='confirmCartItems'>
        <Typography>
            Your cart items are:
        </Typography>
        <div className='confirmCartItemsContainer'>
        {cartItems && cartItems.map((item)=>(
            <div key={item.product}>
                <img src={item.image} alt="Productname"/>
                <Link to={`/product/${item.product}`}>
                    {item.name}
                </Link>
                <span>
                    {item.quantity} * ${item.price} = {" "}<b>$${item.price*item.quantity}</b>
                </span>
                </div>

        ))}
        </div>

    </div>
        </div>

        <div>
                <div className='orderSummary'>
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Total:</p><span>${subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p><span>${shippingCharges}</span>
                        </div>
                        <div>
                            <p>TAX:</p><span>${tax}</span>
                        </div>
                    </div>
<p>
    <b>Total cost: </b>
</p>
<span>
    ${totalPrice}
</span>
                
<button style={{ marginTop: '30px', background:'lightblue',color:'purple' }} onClick={proceedToPayment}>Proceed</button>
                </div></div>

    </div>
        </div>
    </div>
  </Fragment>
  )
}
export default ProcessOrder