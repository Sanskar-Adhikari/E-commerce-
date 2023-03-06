import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { newReviewReducer, productDetailsReducer, productReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import {cartReducer} from "./reducers/cartReducer"
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';
const store = configureStore({
  reducer: {
    // combine your reducers here
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder: newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
  },

  middleware: [thunk],
  devTools: true, // enable the Redux DevTools browser extension
  initialState : {
    cart:{
      cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
      shippingInfo:localStorage.getItem("shippingInfo")?
      JSON.parse(localStorage.getItem("shippingInfo")):{},
    },
  }

});


export default store;
