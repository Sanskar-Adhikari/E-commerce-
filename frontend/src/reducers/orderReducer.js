import {CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CLEAR_ERRORS,
        MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,MY_ORDERS_FAIL,
        ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL,
        ALL_ORDERS_REQUEST,ALL_ORDERS_SUCCESS,ALL_ORDERS_FAIL,
        UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,UPDATE_ORDER_FAIL,UPDATE_ORDER_RESET,
        DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS,DELETE_ORDER_FAIL,DELETE_ORDER_RESET} from "../constants/orderConstant"


/**/
/*
newOrderReducer()
NAME
    newOrderReducer 
SYNOPSIS
    newOrderReducer = (state ,action)
    state -> object - the current state of the order
    action -> object - an object containing the type and payload of the action being dispatched
DESCRIPTION
    This function takes in the current state of the order and an action and updates the new state of the order based on the action type.
RETURNS
    An object with the new state of the order after the action has been applied.
*/
/**/
export const newOrderReducer = (state = {}, action) => {
  switch(action.type){
    case CREATE_ORDER_REQUEST:
        // Set loading to true while making the request
        return {
          ...state,
          loading: true,
        };

    case CREATE_ORDER_SUCCESS:
        // Set loading to false and store the order details in state when order creation is successful
        return {
          loading: false,
          order: action.payload,
        };

    case CREATE_ORDER_FAIL:
        // Set loading to false and store the error message in state when order creation fails
        return {
          loading: false,
          error: action.payload,
        };

    case CLEAR_ERRORS:
        // Clear any existing error message from state
        return {
          ...state,
          error: null,
        };

    default:
        // Return the current state for any unknown action type
        return state;
    }
}
/* newOrderReducer = (state ,action) */



/**/
/*
myOrdersReducer
NAME
    myOrdersReducer 
SYNOPSIS
    myOrderReducer = (state ,action)
    state ->  object - the current state of the user's orders with  a default value of an object containing an empty order array
    action -> object - an object containing the type and payload of the action being dispatched
DESCRIPTION
    This function takes in the current state of the orders and an action and returns the new state of the orders based on the action type.
RETURNS
    An object with the new state of the orders after the action has been applied
*/
/**/
export const myOrdersReducer = (state = { orders: [] }, action) => {
switch (action.type) {
  case MY_ORDERS_REQUEST:
    // Set loading to true to indicate that a request is in progress
    return {
      loading: true,
    };

  case MY_ORDERS_SUCCESS:
    // Set loading to false and save the received orders in the state
    return {
      loading: false,
      orders: action.payload,
    };

  case MY_ORDERS_FAIL:
    // Set loading to false and save the error message in the state
    return {
      loading: false,
      error: action.payload,
    };

  case CLEAR_ERRORS:
    // Clear any error message that might be stored in the state
    return {
      ...state,
      error: null,
    };

  default:
    // Return the current state if the action type is not recognized
    return state;
  }
};
/* myOrderReducer = (state ,action) */



/**/
/*
orderDetailsReducer
NAME
    orderDetailsReducer 
SYNOPSIS
    orderDetailsReducer = (state ,action)
    state ->  object - the current state of the order details
    action -> object - an object containing the type and payload of the action being dispatched
DESCRIPTION
    This reducer function updates the state with the details of a single order based on the action type.
RETURNS
    An object with the updated state of the order details
*/
/**/
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    
    // when ORDER_DETAILS_REQUEST action is dispatched, set loading to true
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    // when ORDER_DETAILS_SUCCESS action is dispatched, set loading to false and update the order with the payload
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    // when ORDER_DETAILS_FAIL action is dispatched, set loading to false and add the error to the state
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    
    // when CLEAR_ERRORS action is dispatched, set error to null
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    // default case: return the current state
    default:
      return state;
  }
};
/* orderDetailsReducer = (state ,action) */



/**/
/*
allOrdersReducer
NAME
    allOrdersReducer 
SYNOPSIS
    allOrdersReducer = (state ,action)
    state ->  object - the current state of the user's orders  with  a default value of an object containing an empty order array
    action -> object - an object containing the type and payload of the action being dispatched
DESCRIPTION
    This reducer handles the state for all orders fetched from the backend.
    Depending on the type of action, it updates the state
RETURNS
    The updated state object.
*/
/**/
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    // Set loading to true when request for all orders is made
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };
  
    // Set loading to false and update orders array when all orders are successfully fetched
    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
  
    // Set loading to false and update error message when there is an error fetching all orders
    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
  
    // Clear error message from state when CLEAR_ERRORS action is dispatched
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
  
    // Return current state by default when no matching action type is found
    default:
      return state;
  }
};
/* allOrdersReducer = (state ,action) */



/**/
/*
orderReducer
NAME
    orderReducer 
SYNOPSIS
    orderReducer = (state ,action)
    state ->  object - the current state of the user's orders
    action -> object - an object containing information about the action being performed
DESCRIPTION
    This reducer handles actions related to updating or deleting a user's order.
RETURNS
    The updated state object
*/
/**/
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    // When an update or delete order request is made, set the loading state to true
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // When an update order request is successful, set the loading state to false and update the isUpdated state with the payload
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    // When a delete order request is successful, set the loading state to false and update the isDeleted state with the payload
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    // When an update or delete order request fails, set the loading state to false and update the error state with the payload
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    // When an update order reset action is dispatched, set the isUpdated state to false
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    // When a delete order reset action is dispatched, set the isDeleted state to false
    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
      
    // When a clear errors action is dispatched, set the error state to null
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    // If none of the above actions match, return the current state
    default:
      return state;
  }
};
/* orderReducer = (state ,action) */
