import axios from "axios";
import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS,CLEAR_ERRORS,
    REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST,REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL, 
    LOGOUT_SUCCESS,LOGOUT_FAIL, 
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, 
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, 
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, 
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, 
    ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL, 
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, 
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, 
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } 
    from "../constants/userConstant"


/**/
/*
login
NAME
    login 
SYNOPSIS
    login = (email, password) => async (dispatch)
    email -> a string representing the user's email
    password -> a string representing the user's password
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to authenticate a user by sending a request to the server with their email and password.
    It first dispatches a LOGIN_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the email and password and waits for the response.
    If the request is successful, it dispatches a LOGIN_SUCCESS action with the user data.
    If the request fails, it dispatches a LOGIN_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const login = (email, password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST})
        const config={
            headers:{"Content-Type":"application/json"}
        }
        const {data} = await axios.post(
            `/api/v1/login`,
            {email,password},
            config
        )
        dispatch({type:LOGIN_SUCCESS, payload:data.user})
    }
    catch(e){
        dispatch({type:LOGIN_FAIL, payload:e.response.data.message})
    }
}
/* login = (email, password) => async (dispatch) */



/**/
/*
register
NAME
    register
SYNOPSIS
    register = (userData) => async (dispatch)
    userData -> an object containing the user's registration data
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to register a new user by sending a request to the server with the user's registration data.
    It first dispatches a REGISTER_USER_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the user's registration data and waits for the response.
    If the request is successful, it dispatches a REGISTER_USER_SUCCESS action with the details of the registered user.
    If the request fails, it dispatches a REGISTER_USER_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const register = (userData) => async (dispatch) => {
  try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = {
          headers: { "Content-Type": "multipart/form-data" }
      };
      const { data } = await axios.post(
          `/api/v1/register`, userData, config
      )
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
  } catch (e) {
      dispatch({ type: REGISTER_USER_FAIL, payload: e.response.data.message })
  }
}
/* register = (userData) => async (dispatch) */



/**/
/*
loadUser
NAME
    loadUser 
SYNOPSIS
    loadUser = () => async (dispatch)
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function sends a request to the server to load the user data.
    It first dispatches a LOAD_USER_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to get the user data and waits for the response.
    If the request is successful, it dispatches a LOAD_USER_SUCCESS action with the user data.
    If the request fails, it dispatches a LOAD_USER_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const loadUser = ()=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST})
        const {data} = await axios.get(
            `/api/v1/me`,
        )
        dispatch({type:LOAD_USER_SUCCESS, payload:data.user})
    }
    catch(e){
        dispatch({type:LOAD_USER_FAIL, payload:e.response.data.message})
    }
}
/* loadUser = () => async (dispatch) */



/**/
/*
logout
NAME
  logout 
SYNOPSIS
    logout = () => async (dispatch)
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function sends a request to the server to log out the user.
    It dispatches a LOGOUT_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to logout the user and waits for the response.
    If the request is successful, it dispatches a LOGOUT_SUCCESS action to indicate that the user has been logged out.
    If the request fails, it dispatches a LOGOUT_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const logout = ()=>async(dispatch)=>{
    try{   
        await axios.get(
            `/api/v1/logout`,
        )
        dispatch({type:LOGOUT_SUCCESS})
    }
    catch(e){
        dispatch({type:LOGOUT_FAIL, payload:e.response.data.message})
    }
}
/* logout = () => async (dispatch) */



/**/
/*
updateProfile
NAME
    updateProfile 
SYNOPSIS
    updateProfile = (userData) => async (dispatch)
    userData -> an object containing the user profile data to be updated
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to update a user's profile by sending a request to the server with the updated data.
    It first dispatches a UPDATE_PROFILE_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the updated user profile data and waits for the response.
    If the request is successful, it dispatches a UPDATE_PROFILE_SUCCESS action with the success message
    If the request fails, it dispatches a UPDATE_PROFILE_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.put(`/api/v1/me/update`, userData, config);
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
/* updateProfile = (userData) => async (dispatch) */



/**/
/*
updatePassword
NAME
    updatePassword
SYNOPSIS
    updatePassword = (passwords) => async (dispatch)
    passwords -> an object containing the old password and the new password
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to update a user's password by sending a request to the server with the updated password.
    It first dispatches a UPDATE_PASSWORD_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the old password and the new password, and waits for the response.
    If the request is successful, it dispatches a UPDATE_PASSWORD_SUCCESS action with the success message
    If the request fails, it dispatches a UPDATE_PASSWORD_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/password/update`,
        passwords,
        config
      );
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
/* updatePassword = (passwords) => async (dispatch) */



/**/
/*
forgotPassword
NAME
    forgotPassword
SYNOPSIS
    forgotPassword = (email) => async (dispatch)
    email -> a string containing the email address of the user requesting a password reset
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to request a password reset for a user's account.
    It first dispatches a FORGOT_PASSWORD_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the email address of the user requesting the reset and waits for the response.
    If the request is successful, it dispatches a FORGOT_PASSWORD_SUCCESS action with the success message.
    If the request fails, it dispatches a FORGOT_PASSWORD_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const forgotPassword = (email)=>async(dispatch)=>{
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST})
        const config={
            headers:{"Content-Type":"application/json"}
        }
        const {data} = await axios.post(
            `/api/v1/password/forgot`,
            email,
            config
        )
        dispatch({type:FORGOT_PASSWORD_SUCCESS, payload:data.message})
    }
    catch(e){
        dispatch({type:FORGOT_PASSWORD_FAIL, payload:e.response.data.message})
    }
}
/* forgotPassword = (email) => async (dispatch) */



/**/
/*
resetPassword
NAME
    resetPassword 
SYNOPSIS
    resetPassword = (token, passwords) => async (dispatch)
    token -> a string containing the password reset token
    passwords -> an object containing the new passwords to be set
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to reset a user's password by sending a request to the server with the new passwords and the password reset token.
    It first dispatches a RESET_PASSWORD_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the new passwords and the password reset token and waits for the response.
    If the request is successful, it dispatches a RESET_PASSWORD_SUCCESS action.
    If the request fails, it dispatches a RESET_PASSWORD_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const resetPassword = (token, passwords)=>async(dispatch)=>{
    try{
        dispatch({type:RESET_PASSWORD_REQUEST})
        const config={
            headers:{"Content-Type":"application/json"}
        }
        const {data} = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        )
        dispatch({type:RESET_PASSWORD_SUCCESS, payload:data.success})
    }
    catch(e){
        dispatch({type:RESET_PASSWORD_FAIL, payload:e.response.data.message})
    }
}
/* resetPassword = (token, passwords) => async (dispatch) */



/**/
/*
getAllUsers
NAME
    getAllUsers  -- admin route
SYNOPSIS
    getAllUsers = () => async (dispatch)
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to get all users from the server.
    It first dispatches an ALL_USERS_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to get all the users and waits for the response.
    If the request is successful, it dispatches an ALL_USERS_SUCCESS action with the list of all the users.
    If the request fails, it dispatches an ALL_USERS_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/users`);
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };
/* getAllUsers = () => async (dispatch) */



/**/
/*
getUserDetails
NAME
    getUserDetails
SYNOPSIS
    getUserDetails = (id) => async (dispatch)
    id -> the id of the user to get details for
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to get the details of a specific user by sending a request to the server with the user id.
    It first dispatches a USER_DETAILS_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the user id and waits for the response.
    If the request is successful, it dispatches a USER_DETAILS_SUCCESS action with the details of the requested user.
    If the request fails, it dispatches a USER_DETAILS_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
/* getUserDetails = (id) => async (dispatch) */


/**/
/*
updateUser
NAME
    updateUser  -- admin route
SYNOPSIS
    updateUser = (id, userData) => async (dispatch)
    id -> the ID of the user to update
    userData -> an object containing the updated user data
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to update a user's details by sending a request to the server with the updated data.
    It first dispatches a UPDATE_USER_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server with the updated user data and waits for the response.
    If the request is successful, it dispatches a UPDATE_USER_SUCCESS action with the details of the updated user.
    If the request fails, it dispatches a UPDATE_USER_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
      );
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
/* updateUser = (id, userData) => async (dispatch) */



/**/
/*
deleteUser
NAME
    deleteUser -- admin route
SYNOPSIS
    deleteUser = (id) => async (dispatch)
    id -> the user ID of the user to be deleted
    dispatch -> the function to dispatch an action
DESCRIPTION
    This function is used to delete a user by sending a request to the server.
    It first dispatches a DELETE_USER_REQUEST action to indicate that the request is being made.
    Then it sends an API request to the server to delete the user with the given user ID and waits for the response.
    If the request is successful, it dispatches a DELETE_USER_SUCCESS action with the details of the deleted user.
    If the request fails, it dispatches a DELETE_USER_FAIL action with the error message.
RETURNS
    This function does not return anything, but dispatches actions to update the state of the application with the result of the request.
*/
/**/
export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
/* deleteUser = (id) => async (dispatch) */

  
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

    