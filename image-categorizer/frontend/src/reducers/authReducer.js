import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNOUT,
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
    GET_OTP_SUCCESS,
    GET_OTP_ERROR,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_ERROR,
  } from "../actions/actionTypes";
  
  const initState = {
    loggedIn: (localStorage.getItem('loggedIn')==='true') || false,
    userData: {},
    authMessage: null,
    status : false,
    isVerify : false
  };
  
  export default function (state = initState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          loggedIn: action.payload.status,
          userData: action.payload.data,
          authMessage: action.payload.msg,
        };
      case LOGIN_ERROR:
        return {
          ...state,
          authMessage: action.error.response.data.msg,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          status: action.payload.status,
          userData: action.payload.data,
          authMessage: action.payload.msg,
        };
  
      case SIGNUP_ERROR:
        return {
          ...state,
          authMessage: action.error.response.data.msg,
        };
  
      case SIGNOUT:
        return {
          ...state,
          userData: {},
          loggedIn: false,
          authMessage: null,
        };
  
        case GET_OTP_SUCCESS:
        return {
          authMessage: action.payload.msg,
          isVerify : action.payload.status
        };
  
        case GET_OTP_ERROR:
        return {
          authMessage: action.error.response.data.msg,
        };
  
        case GET_USER_DETAIL_SUCCESS:
        return {
          ...state,
          userData: action.payload.data,
        };
      case GET_USER_DETAIL_ERROR:
        return {
          ...state,
          authMessage: action.error.response.data.msg,
        };
  
      default:
        return state;
    }
  }
  