import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstants";
  

/**/
/*
cartReducer()
NAME
    cartReducer 
SYNOPSIS
    cartReducer = (state ,action)
    state -> object - the current state of the cart
    action -> object - an object containing the type and payload of the action being dispatched
DESCRIPTION
    This function takes in the current state of the cart and an action and returns the new state of the cart based on the action type.
RETURNS
    An object with the new state of the cart after the action has been applied
*/
/**/
export const cartReducer = (state = {cartItems: [], shippingInfo: {},},action) => {
// switch statement to handle different actions
    switch (action.type) {

        // case for adding an item to cart
        case ADD_TO_CART:
        const item = action.payload;
        const isItemExists = state.cartItems.find(
            (i) => i.product === item.product
        );

        // if item already exists in cart, update the quantity
        if (isItemExists) {
            return {
            ...state,
            cartItems: state.cartItems.map((i) =>
                i.product === isItemExists.product ? item : i
            ),
            };

        } else { // if item doesn't exist in cart, add it
            return {
            ...state,
            cartItems: [...state.cartItems, item],
            };
        }
    
        // case for removing an item from cart
        case REMOVE_CART_ITEM:
        return {
            ...state,
            cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
    
        // case for saving shipping information
        case SAVE_SHIPPING_INFO:
        return {
            ...state,
            shippingInfo: action.payload,
        };
    
        // default case to return the current state
        default:
        return state;
    }  
  };
  /* cartReducer = (state ,action) */

