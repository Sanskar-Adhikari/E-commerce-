import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";


/**/
/*
Cart()
NAME
    Cart
SYNOPSIS
    Cart();
DESCRIPTION
    This component is used to display the items present in the cart, along with their quantities and subtotals. 
    It also allows the user to increase or decrease the quantity of an item in the cart, and to remove an item from the cart. 
    If there are no items in the cart, it displays a message to that effect and provides a link to view products. If there are items in the cart, 
    it displays the total price of all the items in the cart, along with a checkout button that redirects to the shipping page.
RETURNS
    Returns a JSX element that displays the items in the cart, along with their quantities and subtotals, and provides options to modify or remove them.
*/
/**/
const Cart = () => {
  // Import necessary hooks and functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select relevant data from the Redux store
  const { cartItems } = useSelector((state) => state.cart);

  // Function to increase the quantity of a cart item
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  // Function to decrease the quantity of a cart item
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  // Function to delete an item from the cart
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  // Function to handle the checkout process
  const checkoutHandler = () => {
    navigate(`/shipping`);
  };

  return (
    <Fragment>
      {/* Check if cart is empty */}
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in the Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          {/* Render cart items */}
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>

            {/* Map through cart items and render each item */}
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  {/* Render cart item card */}
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    {/* Decrease quantity */}
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>

                    {/* Display current quantity */}
                    <input type="number" value={item.quantity} readOnly />

                    {/* Increase quantity */}
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Render subtotal */}
                  <p className="cartSubTotal">{`$${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            {/* Render gross total and checkout button */}
            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross total</p>
                {/* Calculate and display gross total */}
                <p>{`$${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              {/* Render checkout button */}
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
/* Cart(); */

export default Cart;
