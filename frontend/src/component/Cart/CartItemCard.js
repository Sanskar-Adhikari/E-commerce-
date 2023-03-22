import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";


/**/
/*
CartItemCard()
NAME
    CartItemCard
SYNOPSIS
    CartItemCard({item, deleteCartItems});
    item -> An object containing information about the item in the cart, including its name, image, product ID, and price.
    deleteCartItems -> A function that removes an item from the cart by its id.
DESCRIPTION
    This component renders a card with information about a item in the cart, including its name, image, and price. 
    It also provides an option to remove the item from the cart.
RETURNS
    Returns a JSX element that displays the information about the item in the cart, along with a button to remove it.
*/
/**/
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">

      {/* Display the image of the item */}
      <img src={item.image} alt="Asd" />
      <div>

        {/* Display the name of the item as a link to its product page */}
        <Link to={`/product/${item.product}`}>{item.name}</Link>

        {/* Display the price of the item */}
        <span>{`Price: $ ${item.price}`}</span>

        {/* Define a 'Remove' button that triggers the deleteCartItems function with the item's product ID as its argument */}
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};
/* CartItemCard({item, deleteCartItems}); */

export default CartItemCard;
