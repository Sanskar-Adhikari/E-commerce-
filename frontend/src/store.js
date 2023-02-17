import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productReducer } from './reducers/productReducer';

const store = configureStore({
  reducer: {
    // combine your reducers here
    products:productReducer,
  },
  middleware: [thunk],
  devTools: true, // enable the Redux DevTools browser extension
});

export default store;
