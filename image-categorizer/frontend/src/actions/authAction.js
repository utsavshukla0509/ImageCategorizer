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
    UPLOAD_USER_IMAGE_SUCCESS,
    UPLOAD_USER_IMAGE_ERROR,
    DELETE_USER_IMAGE_SUCCESS,
    DELETE_USER_IMAGE_ERROR,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_ERROR,
    FORGOT_VERIFY_SUCCESS,
    FORGOT_VERIFY_ERROR,
    FORGOT_UPDATE_SUCCESS,
    FORGOT_UPDATE_ERROR,
  } from "./actionTypes";
  import Axios from "axios";
import axios from "axios";


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
      const result = await Axios.get("/user/getdetail",{
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('name')}` 
        }
      });
      // console.log("getawait userdetail");
      // console.log("hello",result); 
      dispatch({ type: GET_USER_DETAIL_SUCCESS, payload: result.data });
    }
    catch(error){
      dispatch({ type: GET_USER_DETAIL_ERROR, error });
    }
  };
};

export const addUserImage = (image) => {
  let formData = new FormData();
  formData.append("path",Date.now() + "-" + image.name);
  formData.append("image", image);
  formData.append("userId", localStorage.getItem('name'));

  return async (dispatch) => {
    try {
      const result = await Axios.put(
        "/user/addimage",formData,{
          headers: {
            'Authorization': `Beaver ${localStorage.getItem('name')}`,
            "content-type": "multipart/form-data" 
          }
        });
      // console.log("come");
      // console.log(result);
      dispatch({ type: UPLOAD_USER_IMAGE_SUCCESS, payload: result.data});
    } catch (error) {
      dispatch({ type: UPLOAD_USER_IMAGE_ERROR, error });
    }
  };
};

export const deleteUserImage = () => {

  return async (dispatch) => {
    try {
        const result = await axios(                                                                                                                                                                                                                                                   
          {                                                                                                                                                                                                                                                        
          method:'patch',                                                                                                                                                                                                                                          
          url:`http://localhost:8000/user/deleteimage`,                                                                                                                                                                                                          
          headers:{                                                                                                                                                                                                                                              
          Authorization: `Beaver ${localStorage.getItem('name')}` || null,                                                                                                                                                                                                           
          }                                                                                                                                                                                                                                                      
          });  

      // console.log("come");
      // console.log(result);
      dispatch({ type: DELETE_USER_IMAGE_SUCCESS, payload: result.data});
    } catch (error) {
      dispatch({ type: DELETE_USER_IMAGE_ERROR, error });
    }
  };
};




export const updateAndVerify = (credentials) => {
  return async (dispatch) => {
    try {
      // console.log("credentials");
      // console.log(credentials);
      const result = await Axios.patch("/user/updateandverify", credentials,{
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('name')}`
        }
      });
      // console.log("helle");
      // console.log(result);
      dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: result.data});
    } catch (error) {
      // console.log(error.response.data);
      dispatch({ type: PROFILE_UPDATE_ERROR, error });
    }
  };
};


export const forgotandverify = (email) => {
  return async (dispatch) => {
    try {
      const result = await Axios.post("/user/forgotandverify", {"email" : email,},{
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('name')}`
        }
      });
      // console.log("forgotandverify");
      // console.log(result);
      dispatch({ type: FORGOT_VERIFY_SUCCESS, payload: result.data});
    } catch (error) {
      dispatch({ type: FORGOT_VERIFY_ERROR, error });
    }
  };
};

export const forgotandupdate = (credentials) => {
  return async (dispatch) => {
    try {
      
      const result = await Axios.patch("/user/forgotandupdate", credentials,{
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('name')}`
        }
      });
      // console.log("forgotandupdate");
      // console.log(result);
      dispatch({ type: FORGOT_UPDATE_SUCCESS, payload: result.data});
    } catch (error) {
      dispatch({ type: FORGOT_UPDATE_ERROR, error });
    }
  };
};