import {CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CLEAR_ERRORS,
  MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,MY_ORDERS_FAIL} from "../constants/orderConstant"
import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
try{
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }; 
      const { data } = await axios.post("/api/order/new", order, config);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

}catch(er){
    dispatch({
        type:CREATE_ORDER_FAIL,
        payload: er.response.data.message,
      });
}


}

// get my orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/orders/me");

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (er) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: er.response.data.message,
    });
  }
};


//clear errors

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  