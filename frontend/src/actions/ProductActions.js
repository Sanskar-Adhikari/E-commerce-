import axios from "axios";
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, 
  CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
  NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, 
  ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, 
  NEW_PRODUCT_REQUEST , NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, 
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, 
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, 
  ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, 
  DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, } 
  from "../constants/productConstants";



/**/
/*
getProduct
NAME
    getProduct -- list of products
SYNOPSIS
    getProduct = (keyword = "", currentPage = 1, price = [0, 3000], category, ratings = 0) => async (dispatch)
    keyword -> the search keyword to look for products
    currentPage -> the current page number to display
    price -> an array of two numbers representing the minimum and maximum prices to filter by
    category -> the category of products to filter by
    ratings -> the minimum rating to filter by
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to retrieve a list of products based on the provided search filters.
    It first dispatches an ALL_PRODUCT_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to retrieve the products based on the given filters and waits for the response.
    If the request is successful, it dispatches an ALL_PRODUCT_SUCCESS action with the retrieved products.
    If the request fails, it dispatches an ALL_PRODUCT_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const getProduct =
    (keyword = "", currentPage = 1, price = [0, 3000], category, ratings = 0) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });
            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            if (category)
            {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }
            const { data } = await axios.get(link);
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data
             });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message
            });
        }
    };
/* getProduct = (keyword = "", currentPage = 1, price = [0, 3000], category, ratings = 0) */



/**/
/*
getProductDetails
NAME
    getProductDetails
SYNOPSIS
    getProductDetails = (id) => async (dispatch)
    id -> the id of the product to retrieve
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to retrieve the details of a single product based on the provided product id.
    It first dispatches a PRODUCT_DETAILS_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to retrieve the product details based on the given id and waits for the response.
    If the request is successful, it dispatches a PRODUCT_DETAILS_SUCCESS action with the retrieved product details.
    If the request fails, it dispatches a PRODUCT_DETAILS_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* getProductDetails = (id) => async (dispatch) */



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
export const clearErrors=()=>async(dispatch)=>{
dispatch({type:CLEAR_ERRORS})
}
/*  clearErrors = () => async (dispatch) */



/**/
/*
newReview
NAME
    newReview
SYNOPSIS
    newReview = (reviewData) => async (dispatch)
    reviewData -> an object containing the details of the review to be added
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to add a new review to a product.
    It first dispatches a NEW_REVIEW_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to add the new review and waits for the response.
    If the request is successful, it dispatches a NEW_REVIEW_SUCCESS action with the success message.
    If the request fails, it dispatches a NEW_REVIEW_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* newReview = (reviewData) => async (dispatch) */



/**/
/*
getAdminProduct
NAME
    getAdminProduct  -- admin route
SYNOPSIS
    getAdminProduct = () => async (dispatch)
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to retrieve a list of products for the admin user.
    It first dispatches an ADMIN_PRODUCT_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to retrieve the products and waits for the response.
    If the request is successful, it dispatches an ADMIN_PRODUCT_SUCCESS action with the retrieved products.
    If the request fails, it dispatches an ADMIN_PRODUCT_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const getAdminProduct=()=>async(dispatch)=>{
  try{
    dispatch({type:ADMIN_PRODUCT_REQUEST});
    const {data}= await axios.get("/api/v1/admin/products");
    dispatch({
      type:ADMIN_PRODUCT_SUCCESS,
      payload:data.products,
    })
  }catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}
/* getAdminProduct = () => async (dispatch) */



/**/
/*
createProduct
NAME
    createProduct  -- admin route
SYNOPSIS
    createProduct = (productData) => async (dispatch)
    productData -> an object containing the details of the product to be created
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to create a new product by sending a request to the server with the details of the product.
    It first dispatches a NEW_PRODUCT_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the product data and waits for the response.
    If the request is successful, it dispatches a NEW_PRODUCT_SUCCESS action with the details of the created product.
    If the request fails, it dispatches a NEW_PRODUCT_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* createProduct = (productData) => async (dispatch) */



/**/
/*
deleteProduct
NAME
    deleteProduct -- admin route
SYNOPSIS
    deleteProduct = (id) => async (dispatch)
    id -> the id of the product to be deleted
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to delete a product by sending a request to the server with the product id.
    It first dispatches a DELETE_PRODUCT_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the product id and waits for the response.
    If the request is successful, it dispatches a DELETE_PRODUCT_SUCCESS action with the success message.
    If the request fails, it dispatches a DELETE_PRODUCT_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    console.log(`/api/v1/admin/product/${id}?id=${id}`);
    const { data } = await axios.delete(`/api/v1/admin/product/${id}?id=${id}`);
  

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* deleteProduct = (id) => async (dispatch) */



/**/
/*
updateProduct
NAME
    updateProduct -- admin route
SYNOPSIS
    updateProduct = (id, productData) => async (dispatch)
    id -> the ID of the product to be updated
    productData -> an object containing the updated details of the product
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to update an existing product by sending a request to the server with the updated details.
    It first dispatches a UPDATE_PRODUCT_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the updated product data and waits for the response.
    If the request is successful, it dispatches a UPDATE_PRODUCT_SUCCESS action with the details of the updated product.
    If the request fails, it dispatches a UPDATE_PRODUCT_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const updateProduct = (id,productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST});
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* updateProduct = (id, productData) => async (dispatch) */



/**/
/*
getAllReviews
NAME
    getAllReviews 
SYNOPSIS
    getAllReviews = (id) => async (dispatch)
    id -> the ID of the product to retrieve the reviews for
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to get all the reviews for a given product by sending a request to the server with the product ID.
    It first dispatches an ALL_REVIEW_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the product ID and waits for the response.
    If the request is successful, it dispatches an ALL_REVIEW_SUCCESS action with the array of reviews for the product.
    If the request fails, it dispatches an ALL_REVIEW_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* getAllReviews = (id) => async (dispatch) */



/**/
/*
deleteReviews
NAME
    deleteReviews -- admin route
SYNOPSIS
    deleteReviews = (reviewId, productId) => async (dispatch)
    reviewId -> the ID of the review to be deleted
    productId -> the ID of the product associated with the review
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to delete a review by sending a request to the server with the review ID and product ID.
    It first dispatches a DELETE_REVIEW_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the review and product IDs and waits for the response.
    If the request is successful, it dispatches a DELETE_REVIEW_SUCCESS action with a success message.
    If the request fails, it dispatches a DELETE_REVIEW_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
/* deleteReviews = (reviewId, productId) => async (dispatch) */

