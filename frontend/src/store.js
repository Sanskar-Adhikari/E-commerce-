import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {newProductReducer,newReviewReducer,productDetailsReducer,productReducer,
productReviewsReducer,productsReducer,reviewReducer} from "./reducers/productReducer";
import {allUsersReducer,forgotPasswordReducer,profileReducer,userDetailsReducer,userReducer,} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {allOrdersReducer,myOrdersReducer,newOrderReducer,orderDetailsReducer,orderReducer,} from "./reducers/orderReducer";


/**/
/*
configureStore
NAME
    configureStore 
SYNOPSIS
    configureStore(reducer, middleware, devTools, preloadedState)
    reducer -> An object containing Redux reducers to combine
    middleware -> An array of middleware functions to apply
    devTools -> A boolean to enable or disable the Redux DevTools browser extension
    preloadedState -> An initial state to load into the store
DESCRIPTION
    This function creates a Redux store with the given parameters. It combines the reducers and applies the middleware.
    It also sets the preloaded state and enables the Redux DevTools browser extension if devTools is true.
RETURNS
   The created Redux store object
*/
/**/
const store = configureStore({
  reducer: {
    // combining reducers here
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
  },

   // applying middleware
  middleware: [thunk],
  devTools: true,

  // initial state
  preloadedState: {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  },
});

 /* configureStore(reducer, middleware, devTools, preloadedState) */
export default store;
