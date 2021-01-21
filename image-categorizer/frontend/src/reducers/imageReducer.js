import { GET_IMAGES_SUCCESS, GET_IMAGES_ERROR,
    UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_ERROR,
    SHOW_LOADER, HIDE_LOADER,
    SHOW_PAGE_LOADER, HIDE_PAGE_LOADER,
    DELETE_IMAGE_SUCCESS,DELETE_IMAGE_ERROR,
  } from "../actions/actionTypes";
  
  const initialState = {
    images : [],
    error : null,
    loading : false,
    loadingPage : false
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_IMAGES_SUCCESS:
        return {
          ...state,
          images: action.payload,
        };
  
      case GET_IMAGES_ERROR:
        return {
          ...state,
          error: action.error,
        };
      
      case UPLOAD_IMAGES_SUCCESS:
        return {
          ...state,
          images: action.payload,
        };
        
      case UPLOAD_IMAGES_ERROR:
        return {
        ...state,
        error: action.error,
      };  
  
        case SHOW_LOADER:
        return {
          ...state,
          loading : true,
        };
        case HIDE_LOADER:
        return {
          ...state,
          loading : false,
        };
  
        case SHOW_PAGE_LOADER:
        return {
          ...state,
          loadingPage : true,
        };
        
        case HIDE_PAGE_LOADER:
        return {
          ...state,
          loadingPage : false,
        };
  
        case DELETE_IMAGE_SUCCESS:
        return {
          ...state,
          images: action.payload,
        };
  
      case DELETE_IMAGE_ERROR:
        return {
          ...state,
          error: action.error,
        };
  
      default:
        return state;
    }
  }
  