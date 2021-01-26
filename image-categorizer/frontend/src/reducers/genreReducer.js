import { 
    GET_GENRES_SUCCESS, GET_GENRES_ERROR ,
    GET_ALL_GENRES_SUCCESS, GET_ALL_GENRES_ERROR ,
    DOWNLOAD_GENRES_SUCCESS,DOWNLOAD_GENRES_ERROR, 
  } from "../actions/actionTypes";

  const initialState = {
    genreList: [],
    genreAllList : [],
    error : null,
  };


  export default function (state = initialState, action) {
    switch (action.type) {

      case GET_GENRES_SUCCESS:
        return {
          ...state,
          genreList: action.payload.data,
        };
  
      case GET_GENRES_ERROR:
        return {
          ...state,
          error: action.error.response.data.msg,
        };
  
        case GET_ALL_GENRES_SUCCESS:
        return {
          ...state,
          genreAllList: action.payload.data,
        };
  
      case GET_ALL_GENRES_ERROR:
        return {
          ...state,
          error: action.error.response.data.msg,
        };
  
        case DOWNLOAD_GENRES_SUCCESS:
        return {
          ...state,
        };
  
      case DOWNLOAD_GENRES_ERROR:
        return {
          ...state,
          error: action.error.response.data.msg,
        };
  
      default:
        return state;
    }
  }
  