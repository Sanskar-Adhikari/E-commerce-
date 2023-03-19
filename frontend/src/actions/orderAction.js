import { CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CLEAR_ERRORS,
        MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,MY_ORDERS_FAIL,
        ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL,
        UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,UPDATE_ORDER_FAIL,
        DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS,DELETE_ORDER_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL} 
        from "../constants/orderConstant"
import axios from "axios";


/**/
/*
createOrder
NAME
    createOrder
SYNOPSIS
    createOrder = (order) => async (dispatch)
    order -> an object containing the details of the order to be created
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to create a new order and save it to the database.
    It first dispatches a CREATE_ORDER_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to create the order and waits for the response.
    If the request is successful, it dispatches a CREATE_ORDER_SUCCESS action with the order information.
    If the request fails, it dispatches a CREATE_ORDER_FAIL action with the error message.
RETURNS 
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const createOrder = (order) => async (dispatch) => {
  try {
      dispatch({
          type: CREATE_ORDER_REQUEST
      });
      const config = {
          headers: {
              "Content-Type": "application/json",
          },
      };
      const {data} = await axios.post("/api/order/new", order, config);
      dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: data
      });
  } catch (er) {
      dispatch({
          type: CREATE_ORDER_FAIL,
          payload: er.response.data.message,
      });
  }
}
/* createOrder = (order) => async (dispatch) */



/**/
/*
myOrders
NAME
    myOrders
SYNOPSIS
    myOrders = () => async (dispatch)
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to get the list of orders made by the currently logged-in user.
    It first dispatches a MY_ORDERS_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to get the list of orders made by the user and waits for the response.
    If the request is successful, it dispatches a MY_ORDERS_SUCCESS action with the list of orders.
    If the request fails, it dispatches a MY_ORDERS_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { data } = await axios.get("/api/orders/me");
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (er){
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: er.response.data.message,
    });
  }
};
/* myOrders = () => async (dispatch) */


/**/
/*
getOrderDetails
NAME
    getOrderDetails 
SYNOPSIS
    getOrderDetails = (id) => async (dispatch)
    id -> the ID of the order to get the details of
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to get the details of a specific order by sending an API request to the server with the ID of the order.
    It first dispatches an ORDER_DETAILS_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to get the details of the order with the given ID and waits for the response.
    If the request is successful, it dispatches an ORDER_DETAILS_SUCCESS action with the order details.
    If the request fails, it dispatches an ORDER_DETAILS_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/order/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (er) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: er.response.data.message,
    });
  }
};
/* getOrderDetails = (id) => async (dispatch) */



/**/
/*
clearErrors
NAME
    clearErrors 
SYNOPSIS
    clearErrors = () => async (dispatch)
    dispatch -> the function to dispatch an action
DESCRIPTION
    It dispatches a CLEAR_ERRORS action to indicate that the errors should be cleared.
RETURNS
    This function does not return anything, but dispatches an action to update the state of the application
*/
/**/
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
/*  clearErrors = () => async (dispatch) */



/**/
/*
getAllOrders
NAME
    getAllOrders  --admin route
SYNOPSIS
    getAllOrders = () => async (dispatch)
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to get all orders from the database.
    It first dispatches a ALL_ORDERS_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to get all orders and waits for the response.
    If the request is successful, it dispatches a ALL_ORDERS_SUCCESS action with the order information.
    If the request fails, it dispatches a ALL_ORDERS_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get("/api/admin/orders");
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (er) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: er.response.data.message,
    });
  }
};
/* getAllOrders = () => async (dispatch) */



/**/
/*
updateOrder
NAME
    updateOrder
SYNOPSIS
    updateOrder = (id, order) => async (dispatch)
    id -> the id of the order to be updated
    order -> an object containing the details of the order
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to update an existing order in the database.
    It first dispatches a UPDATE_ORDER_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to update the order and waits for the response.
    If the request is successful, it dispatches a UPDATE_ORDER_SUCCESS action with the success message.
    If the request fails, it dispatches a UPDATE_ORDER_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/order/${id}`,
      order,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* updateOrder = (id, order) => async (dispatch) */



/**/
/*
deleteOrder
NAME
    deleteOrder
SYNOPSIS
    deleteOrder = (id) => async (dispatch)
    id -> ID of the order to be deleted
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to delete an existing order from the database.
    It first dispatches a DELETE_ORDER_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to delete the order with the given ID and waits for the response.
    If the request is successful, it dispatches a DELETE_ORDER_SUCCESS action with the success message.
    If the request fails, it dispatches a DELETE_ORDER_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(`/api/admin/order/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* deleteOrder = (id) => async (dispatch) */
