import Axios from "axios";
import { 
  GET_GENRES_SUCCESS, GET_GENRES_ERROR, 
  GET_ALL_GENRES_SUCCESS, GET_ALL_GENRES_ERROR,
} from "./actionTypes";


export const getGenres = () => {
    return async (dispatch) => {
      try {
        const result = await Axios.get("/label/getlabels",{
          headers: {
            'Authorization': `Beaver ${localStorage.getItem('name')}` 
          }
        });
        // console.log("multiplegenres");
        // console.log(result); 
        dispatch({ type: GET_GENRES_SUCCESS, payload: result.data });
      } catch (error) {
        dispatch({ type: GET_GENRES_ERROR, error });
      }
    };
  };
  
  
  export const getAllGenres = () => {
    return async (dispatch) => {
      try {
        const result = await Axios.get("/label/getsortedlabels", {
          headers: {
            'Authorization': `Beaver ${localStorage.getItem('name')}` 
          }
        });
        // console.log("sortedgenres");
        // console.log(result); 
        dispatch({ type: GET_ALL_GENRES_SUCCESS, payload: result.data });
      } catch (error) {
        dispatch({ type: GET_ALL_GENRES_ERROR, error });
      }
    };
  };
  