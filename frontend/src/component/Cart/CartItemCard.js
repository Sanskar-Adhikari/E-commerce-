import React from 'react'
import { Link } from 'react-router-dom'
import "./CartItemCard.css"


/**/
/*
CartItemCard()
NAME
    CartItemCard
SYNOPSIS
    CartItemCard();
DESCRIPTION
    
RETURNS
    
*/
/**/
const CartItemCard = ({item, deleteCartItems}) => {
  return (
  <div className='CartItemCard'>
    <img src={item.image} alt="Asd"/>
    <div>
      <Link to={`/product/${item.product}`}>{item.name}</Link>
      <span>{`Price: $ ${item.price}`}</span>
      <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
    </div>
  </div>
  )
}
/* CartItemCard(); */

export default CartItemCard