import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";


/**/
/*
addItemsToCart
NAME
    addItemsToCart - Add items to the cart
SYNOPSIS
    addItemsToCart = (id, quantity) => async (dispatch, getState)
    id -> the ID of the product to be added to the cart
    quantity -> the number of products to be added to the cart
    dispatch -> the function to dispatch an action
    getState -> the function to get the current state of the application
DESCRIPTION
    This function is used to add a certain quantity of a product to the cart.
    It first makes an API request to get the details of the product with the given ID,
    and then dispatches an action with the product information and quantity to be added to the cart.
    The cartItems are also stored in the local storage.
RETURNS
    This function does not return anything, but dispatches an action to add the product to the cart and store it in the local storage.
*/
/**/
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/v1/product/${id}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity
        }
    })
    localStorage.setItem(
        'cartItems', JSON.stringify(getState().cart.cartItems)
    )
}
/* addItemsToCart = (id, quantity) => async (dispatch, getState) */



/**/
/*
removeItemsFromCart
NAME
    removeItemsFromCart - Removes an item from the cart
SYNOPSIS
    removeItemsFromCart = async(id, dispatch, getState);
    id -> The id of the product to be removed from the cart.
    dispatch -> Redux store dispatch method.
    getState -> Redux store getState method.
DESCRIPTION
    This function removes the item with the specified id from the cart and updates the cart in the local storage as well.
RETURNS
    Nothing. The function only dispatches a Redux action and updates the local storage.
*/
/**/
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    })
    localStorage.setItem(
        'cartItems', JSON.stringify(getState().cart.cartItems)
    )
}
/* removeItemsFromCart = async(id, dispatch, getState); */



/**/
/*
saveShippingInfo()
NAME
    saveShippingInfo - Saves shipping information
SYNOPSIS
    saveShippingInfo = (data) =>async(dispatch)
    data -> An object that consists of shipping information like address, city, etc.
    dispatch -> Redux store dispatch method.
    getState -> the function to get the current state of the application
DESCRIPTION
    It receives the shipping information entered by the user, stores it in the state, and also stores it
    in the local storage.
RETURNS
    No return value.
*/
/**/
export const saveShippingInfo = (data) =>async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    })
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}
/* saveShippingInfo = (data) =>async(dispatch) */

