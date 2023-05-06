import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST ,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET
} from "../constants/productConstants"



/**/
/*
productsReducer()
NAME
    productsReducer 
SYNOPSIS
    productsReducer = (state ,action)
    state -> object - The current state of the products, with a default value of an object containing an empty products array
    action -> object - An object containing the type of the action and any payload data
DESCRIPTION
    This function handles actions related to product data, including fetching all products and products for the admin,
    as well as setting loading and error states and clearing errors.
RETURNS
    The updated state object based on the action type.
*/
/**/
export const productsReducer = (state = {products: [] }, action) => {
  switch (action.type) {
      // Set loading to true and empty products array for ALL_PRODUCT_REQUEST and ADMIN_PRODUCT_REQUEST
      case ALL_PRODUCT_REQUEST:
      case ADMIN_PRODUCT_REQUEST:
          return {
              loading: true,
              products: []
          }

      // Set loading to false and add products data for ALL_PRODUCT_SUCCESS
      case ALL_PRODUCT_SUCCESS:
          return {
              loading: false,
              products: action.payload.products,
              productsCount: action.payload.productsCount,
              resultPerPage: action.payload.resultPerPage,
              filteredProductsCount: action.payload.filteredProductsCount,
          }

      // Set loading to false and add products data for ADMIN_PRODUCT_SUCCESS
      case ADMIN_PRODUCT_SUCCESS:
          return{
              loading: false,
              products: action.payload,
          }

      // Set loading to false and add error for ALL_PRODUCT_FAIL and ADMIN_PRODUCT_FAIL
      case ALL_PRODUCT_FAIL:
      case ADMIN_PRODUCT_FAIL:
          return {
              loading: false,
              error: action.payload
          }

      // Set error to null for CLEAR_ERRORS
      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      // Return current state for default case
      default:
          return state
  }
}
/* productsReducer = (state ,action) */



/**/
/*
productDetailsReducer()
NAME
    productDetailsReducer 
SYNOPSIS
    productDetailsReducer = (state ,action)
    state -> object - the current state of the product details
    action -> object - the action object to be processed
DESCRIPTION
    This reducer handles actions related to fetching product details
RETURNS
    The new state after processing the action
*/
/**/
export const productDetailsReducer = (state = {
    product: {}
}, action) => {

  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
        // Set loading to true
        return {
            loading: true,
            ...state,
        }
    case PRODUCT_DETAILS_SUCCESS:
        // Set loading to false and update the product details
        return {
            loading: false,
            product: action.payload,
        }
    case PRODUCT_DETAILS_FAIL:
        // Set loading to false and update the error message
        return {
            loading: false,
            error: action.payload
        }
    case CLEAR_ERRORS:
        // Clear any error messages
        return {
            ...state,
            error: null
        }
    default:
        return state
  }
}
/* productDetailsReducer = (state ,action) */



/**/
/*
newReviewReducer()
NAME
    newReviewReducer 
SYNOPSIS
    newReviewReducer = (state ,action)
    state -> object - the current state of reviews
    action -> object - An object containing the type of the action and any payload data
DESCRIPTION
    This function updates the state of the application with respect to adding a new review for a product.
RETURNS
    The new state of the application
*/
/**/
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      // Set loading to true
      return {
        ...state,
        loading: true,
      }; 

    case NEW_REVIEW_SUCCESS:
      // Set loading to false and update success message
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_FAIL:
      // Set loading to false and update error message
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      // Reset success message to false
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      // Clear any errors in the state
      return {
        ...state,
        error: null,
      };

    default:
      // Return the current state if the action type is not recognized
      return state;
  }  
};
/* newReviewReducer = (state ,action) */



/**/
/*
newProductReducer()
NAME
    newProductReducer 
SYNOPSIS
    newProductReducer = (state ,action)
    state -> object - the current state of products
    action -> object - An object containing the type of the action and any payload data
DESCRIPTION
    This reducer handles the state update when a product is updated.
RETURNS
    Returns an updated state object according to the dispatched action.
*/
/**/
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      // Set loading to true
      return {
        ...state,
        loading: true,
      };

    case NEW_PRODUCT_SUCCESS:
        // Set loading to false and update success message and product data
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case NEW_PRODUCT_FAIL:
        // Set loading to false and update error message
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_PRODUCT_RESET:
        // Reset success message to false
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
        // Clear any errors in the state
      return {
        ...state,
        error: null,
      };

    default:
        // Return the current state if the action type is not recognized
      return state;
  }
};
/* newProductReducer = (state ,action) */



/**/
/*
productReducer()
NAME
    productReducer 
SYNOPSIS
    productReducer = (state ,action)
    state -> object - the current state of products
    action -> object - An object containing the type of the action and any payload data
DESCRIPTION
    Reducer function that handles actions related to products, such as deleting or updating a product.
RETURNS
    The new state of the products store.
*/
/**/
export const productReducer = (state = {}, action) => {
  switch (action.type) {
    // Set loading to true
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Set isDeleted to true when a product is successfully deleted
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    // Set isUpdated to true when a product is successfully updated
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    // Set loading to false and update error message if deleting or updating fails
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reset isDeleted to false when the delete product action is reset
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    // Reset isUpdated to false when the update product action is reset
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    // Clear any errors in the state
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    // Return the current state if the action type is not recognized
    default:
      return state;
  }
};
/* productReducer = (state ,action) */



/**/
/*
reviewReducer()
NAME
    reviewReducer 
SYNOPSIS
    reviewReducer = (state ,action)
    state -> an object representing the current state of the reviews
    action -> an object containing the type of action being performed and any payload data associated with it
DESCRIPTION
    This reducer function handles actions related to deleting reviews. It takes in a state object and an action object, and returns a new state object based on the action type.
RETURNS
    The updated state object based on the action type.
*/
/**/
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      // Set loading to true
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      // Set loading to false and update isDeleted value with the action payload
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAIL:
      // Set loading to false and update error message with the action payload
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      // Reset isDeleted value to false
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      // Clear any errors in the state
      return {
        ...state,
        error: null,
      };

    default:
      // Return the current state if the action type is not recognized
      return state;
  }
};
/* reviewReducer = (state ,action) */



/**/
/*
productReviewsReducer()
NAME
    productReviewsReducer 
SYNOPSIS
    productReviewsReducer = (state ,action)
    state -> an object representing the current state of the product reviews, with properties such as loading, error, and reviews
    action -> an object containing the type of action being performed and any payload data associated with it
DESCRIPTION
    This reducer function handles actions related to retrieving all reviews for a product. It takes in a state object and an action object, and returns a new state object based on the action type. 
RETURNS
    The updated state object based on the action type.
*/
/**/
export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
    //set loading to true
      return {
        ...state,
        loading: true,
      };

    case ALL_REVIEW_SUCCESS:
    //set loading to false and update reviews
      return {
        loading: false,
        reviews: action.payload,
      };
      
    case ALL_REVIEW_FAIL:
      //set loading to false and update error message
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      // clear any errors in the state
      return {
        ...state,
        error: null,
      };

    // If the action type is not recognized, return the current state
    default:
      return state;
  }
};
/* productReviewsReducer = (state ,action) */