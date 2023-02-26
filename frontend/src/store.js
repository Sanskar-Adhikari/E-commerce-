import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

const store = configureStore({
  reducer: {
    // combine your reducers here
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
  },
  middleware: [thunk],
  devTools: true, // enable the Redux DevTools browser extension
});

export default store;
