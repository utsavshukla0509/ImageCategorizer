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
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_ERROR,
    UPLOAD_USER_IMAGE_SUCCESS,
    UPLOAD_USER_IMAGE_ERROR,
    DELETE_USER_IMAGE_SUCCESS,
    DELETE_USER_IMAGE_ERROR,
    FORGOT_UPDATE_SUCCESS,
    FORGOT_UPDATE_ERROR,
    FORGOT_VERIFY_SUCCESS,
    FORGOT_VERIFY_ERROR,
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
          userData: action.payload.userInfo,
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

        case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        authMessage: action.payload.msg,
      };

    case PROFILE_UPDATE_ERROR:
      return {
        ...state,
        authMessage: action.error.response.data.msg,
      };

    case UPLOAD_USER_IMAGE_SUCCESS:
      return {
        ...state,
        userData: action.payload.userInfo,
        authMessage: action.payload.msg,
      };
    case UPLOAD_USER_IMAGE_ERROR:
      return {
        ...state,
        authMessage: action.error.response.data.msg,
      };

      case DELETE_USER_IMAGE_SUCCESS:
      return {
        ...state,
        authMessage: action.payload.msg,
      };
    case DELETE_USER_IMAGE_ERROR:
      return {
        ...state,
        authMessage: action.error.response.data.msg,
      };

      case FORGOT_VERIFY_SUCCESS:
        return {
          ...state,
          status : action.payload.status,
          authMessage: action.payload.msg,
        };
  
      case FORGOT_VERIFY_ERROR:
        return {
          ...state,
          authMessage: action.error.response.data.msg,
        };

        case FORGOT_UPDATE_SUCCESS:
        return {
          ...state,
          isVerify : action.payload.verified,
          status : action.payload.code === "1" ? false : true,
          authMessage: action.payload.msg,
        };
  
      case FORGOT_UPDATE_ERROR:
        return {
          ...state,
          authMessage: action.error.response.data.msg,
        };
  
      default:
        return state;
    }
  }
  