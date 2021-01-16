import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNOUT,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    GET_OTP_SUCCESS,
    GET_OTP_ERROR,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_ERROR,
  } from "./actionTypes";
  import Axios from "axios";


  export const signIn = (credentials) => {
    return async (dispatch) => {
      try {
        // console.log(credentials);
        const result = await Axios.post("/user/signin", credentials);
        // console.log(result);
        dispatch({ type: LOGIN_SUCCESS, payload: result.data});
      } catch (error) {
        // console.log(error.response);
        dispatch({ type: LOGIN_ERROR, error });
      }
    };
  };
  
  export const signUp = (credentials) => {
    return async (dispatch) => {
      try {
        // console.log("credentials");
        // console.log(credentials); 
        const result = await Axios.post("/user/signup", credentials);
        // console.log("helle");
        // console.log(result);
        dispatch({ type: SIGNUP_SUCCESS, payload: result.data});
      } catch (error) {
        dispatch({ type: SIGNUP_ERROR, error });
      }
    };
  };

  
  export const signOut = () => {
    return (dispatch) => {
    dispatch({ type: SIGNOUT });
  };
};

export const getOTP = (email) => {
  return async (dispatch) => {
    try {
      // console.log(email);
      const result = await Axios.post("/user/generateotp",{"email" : email});
      // console.log("getawait otp");
      // console.log(result.data); 
      dispatch({ type: GET_OTP_SUCCESS, payload: result.data });
    } catch (error) {
      // console.log(error.response);
      // console.log(result);
      dispatch({ type: GET_OTP_ERROR, error });
    }
  };
};


export const userDetail = ()=>{
  return async (dispatch) => {
    try{
      // console.log("heyhey");
      const result = await Axios.get("/user/getdetail/" + localStorage.getItem("name"));
      // console.log("getawait userdetail");
      // console.log("hello",result); 
      dispatch({ type: GET_USER_DETAIL_SUCCESS, payload: result.data });
    }
    catch(error){
      dispatch({ type: GET_USER_DETAIL_ERROR, error });
    }
  };
};