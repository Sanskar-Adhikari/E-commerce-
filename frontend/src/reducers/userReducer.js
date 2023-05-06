import {
   LOGIN_REQUEST,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   CLEAR_ERRORS,
   REGISTER_USER_SUCCESS,
   REGISTER_USER_REQUEST,
   REGISTER_USER_FAIL,
   LOAD_USER_REQUEST,
   LOAD_USER_SUCCESS,
   LOAD_USER_FAIL,
   LOGOUT_SUCCESS,
   LOGOUT_FAIL,
   UPDATE_PROFILE_REQUEST,
   UPDATE_PROFILE_SUCCESS,
   UPDATE_PROFILE_RESET,
   UPDATE_PROFILE_FAIL,
   UPDATE_PASSWORD_REQUEST,
   UPDATE_PASSWORD_SUCCESS,
   UPDATE_PASSWORD_FAIL,
   UPDATE_PASSWORD_RESET,
   FORGOT_PASSWORD_FAIL,
   FORGOT_PASSWORD_REQUEST,
   FORGOT_PASSWORD_SUCCESS,
   RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAIL,
   ALL_USERS_REQUEST,
   ALL_USERS_SUCCESS,
   ALL_USERS_FAIL,
   DELETE_USER_REQUEST,
   DELETE_USER_SUCCESS,
   DELETE_USER_FAIL,
   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_FAIL,
   UPDATE_USER_RESET,
   DELETE_USER_RESET,
 } from "../constants/userConstant";
 
 /**/
 /*
 userReducer()
 NAME
     userReducer 
 SYNOPSIS
     userReducer = (state ,action)
     state -> an object representing the current state of the user, with properties such as loading, error, isAuth, and user data
     action -> an object containing the type of action being performed and any payload data associated with it
 DESCRIPTION
       This reducer function handles actions related to user authentication, such as login, registration, and logout. 
       It takes in a state object and an action object, and returns a new state object based on the action type. 
 RETURNS
       The updated state object based on the action type
 */
 /**/
 export const userReducer = (state = { user: {} }, action) => {
   switch (action.type) {
     // Set loading state to true and reset user authentication to false when requesting to login, register, or load user
     case LOGIN_REQUEST:
     case REGISTER_USER_REQUEST:
     case LOAD_USER_REQUEST:
       return {
         loading: true,
         isAuth: false,
       };
 
     // Set loading state to false, user authentication to true, and set user data when login, registration, or user load is successful
     case LOGIN_SUCCESS:
     case REGISTER_USER_SUCCESS:
     case LOAD_USER_SUCCESS:
       return {
         ...state,
         loading: false,
         isAuth: true,
         user: action.payload,
       };
 
     // Set loading state to false, user authentication to false, and set error message when login or registration fails
     case LOGIN_FAIL:
     case REGISTER_USER_FAIL:
       return {
         ...state,
         loading: false,
         isAuth: false,
         user: null,
         error: action.payload,
       };
 
     // Set loading state to false, reset user data, and set user authentication to false when logout is successful
     case LOGOUT_SUCCESS:
       return {
         loading: false,
         user: null,
         isAuth: false,
       };
 
     // Set loading state to false and set error message when logout fails
     case LOGOUT_FAIL:
       return {
         ...state,
         loading: false,
         error: action.payload,
       };
 
     // Set loading state to false, reset user data, and set user authentication to false when loading user fails
     case LOAD_USER_FAIL:
       return {
         loading: false,
         isAuth: false,
         user: null,
         error: action.payload,
       };
 
     // Reset error message to null
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
 /* userReducer = (state ,action) */
 
 /**/
 /*
 profileReducer()
 NAME
     profileReducer 
 SYNOPSIS
     profileReducer = (state ,action)
     state -> initial state for profileReducer
     action -> an object that contains information about the action that was performed
 DESCRIPTION
     This reducer handles state updates related to user profile management, such as updating the user profile, changing the user's password, deleting a user account.
 RETURNS
     The updated state of the user's profile
 */
 /**/
 export const profileReducer = (state = {}, action) => {
   switch (action.type) {
     case UPDATE_PROFILE_REQUEST:
     case UPDATE_PASSWORD_REQUEST:
     case UPDATE_USER_REQUEST:
     case DELETE_USER_REQUEST:
       // When any of these requests are made, set loading to true
       return {
         ...state,
         loading: true,
       };
 
     case UPDATE_PROFILE_SUCCESS:
     case UPDATE_PASSWORD_SUCCESS:
     case UPDATE_USER_SUCCESS:
       // When profile, password, or user is updated successfully, set loading to false and update isUpdated to true
       return {
         ...state,
         loading: false,
         isUpdated: action.payload,
       };
 
     case DELETE_USER_SUCCESS:
       // When user is successfully deleted, set loading to false and isDeleted to true with success message
       return {
         ...state,
         loading: false,
         isDeleted: action.payload.success,
         message: action.payload.message,
       };
 
     case UPDATE_PROFILE_FAIL:
     case UPDATE_PASSWORD_FAIL:
     case UPDATE_USER_FAIL:
     case DELETE_USER_FAIL:
       // If there is any error in updating profile, password, user or deleting user, set loading to false and set error
       return {
         ...state,
         loading: false,
         error: action.payload,
       };
 
     case UPDATE_PROFILE_RESET:
     case UPDATE_PASSWORD_RESET:
     case UPDATE_USER_RESET:
       // When profile, password, or user is reset, set isUpdated to false
       return {
         ...state,
         isUpdated: false,
       };
 
     case DELETE_USER_RESET:
       // When user deletion is reset, set isDeleted to false
       return {
         ...state,
         isDeleted: false,
       };
 
     case CLEAR_ERRORS:
       // Clear errors if any
       return {
         ...state,
         error: null,
       };
 
     // default case to return the current state
     default:
       return state;
   }
 };
 /* profileReducer = (state ,action) */
 
 /**/
 /*
 forgotPasswordReducer()
 NAME
     forgotPasswordReducer 
 SYNOPSIS
     forgotPasswordReducer = (state ,action)
     state -> The current state of the reducer.
     action -> The action object that contains information about the action to be performed.
 DESCRIPTION
       A reducer function that updates the state for forgot password and reset password requests.
 RETURNS
       The new state of the reducer.
 */
 /**/
 export const forgotPasswordReducer = (state = {}, action) => {
   switch (action.type) {
     // Set loading to true and reset any errors in state for forgot password and reset password requests
     case FORGOT_PASSWORD_REQUEST:
     case RESET_PASSWORD_REQUEST:
       return {
         ...state,
         loading: true,
         error: null,
       };
 
     // Set loading to false and update message in state for forgot password success
     case FORGOT_PASSWORD_SUCCESS:
       return {
         ...state,
         loading: false,
         message: action.payload,
       };
 
     // Set loading to false and update success in state for reset password success
     case RESET_PASSWORD_SUCCESS:
       return {
         ...state,
         loading: false,
         success: action.payload,
       };
 
     // Set loading to false and update error message in state for forgot password and reset password failures
     case FORGOT_PASSWORD_FAIL:
     case RESET_PASSWORD_FAIL:
       return {
         ...state,
         loading: false,
         error: action.payload,
       };
 
     // Clear any errors in state
     case CLEAR_ERRORS:
       return {
         ...state,
         error: null,
       };
 
     // If the action type is not recognized, return the current state
     default:
       return state;
   }
 };
 /* forgotPasswordReducer = (state ,action) */
 
 /**/
 /*
 allUsersReducer()
 NAME
     allUsersReducer 
 SYNOPSIS
     allUsersReducer = (state ,action)
     state ->  the initial state of the reducer, which includes an empty array of users
     action -> the action object containing type and payload properties
 DESCRIPTION
     A reducer function that handles actions related to retrieving all users from the database.
     The reducer updates the state of the users array based on the action type and payload.
 RETURNS
     The updated state object.
 */
 /**/
 export const allUsersReducer = (state = { users: [] }, action) => {
   switch (action.type) {
     case ALL_USERS_REQUEST:
       // set loading to true
       return {
         ...state,
         loading: true,
       };
     case ALL_USERS_SUCCESS:
       // set loading to false and update users
       return {
         ...state,
         loading: false,
         users: action.payload,
       };
     case ALL_USERS_FAIL:
       // set loading to false and update error message
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
 /* allUsersReducer = (state ,action) */
 
 /**/
 /*
 userDetailsReducer()
 NAME
     userDetailsReducer 
 SYNOPSIS
     userDetailsReducer = (state ,action)
     state ->  the current state of the userDetailsReducer
     action -> the action object containing the type and payload
 DESCRIPTION
     This reducer handles the state updates for retrieving user details from the database.
 RETURNS
     The updated state with the changes made according to the action type.
 */
 /**/
 export const userDetailsReducer = (state = { user: {} }, action) => {
   switch (action.type) {
     // case for requesting user details
     case USER_DETAILS_REQUEST:
       return {
         ...state,
         loading: true,
       };
 
     // case for successfully retrieving user details
     case USER_DETAILS_SUCCESS:
       return {
         ...state,
         loading: false,
         user: action.payload,
       };
 
     // case for failing to retrieve user details
     case USER_DETAILS_FAIL:
       return {
         ...state,
         loading: false,
         error: action.payload,
       };
 
     // case for clearing any errors in the state
     case CLEAR_ERRORS:
       return {
         ...state,
         error: null,
       };
 
     // default case to return the current state
     default:
       return state;
   }
 };
 /* userDetailsReducer = (state ,action) */
 