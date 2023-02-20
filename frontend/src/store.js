import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productDetailsReducer, productReducer } from './reducers/productReducer';

const store = configureStore({
  reducer: {
    // combine your reducers here
    products:productReducer,
    productDetails:productDetailsReducer,
  },
  middleware: [thunk],
  devTools: true, // enable the Redux DevTools browser extension
});

export default store;
