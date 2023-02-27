import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { profileReducer, userReducer } from './reducers/userReducer';

const store = configureStore({
  reducer: {
    // combine your reducers here
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
  },
  middleware: [thunk],
  devTools: true, // enable the Redux DevTools browser extension
});

export default store;
