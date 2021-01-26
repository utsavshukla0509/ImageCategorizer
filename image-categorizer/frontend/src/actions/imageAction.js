import Axios from "axios";
import { 
  GET_IMAGES_SUCCESS, GET_IMAGES_ERROR,
  GET_GENRES_SUCCESS, GET_GENRES_ERROR,
  DELETE_IMAGE_SUCCESS,DELETE_IMAGE_ERROR,
  SHOW_LOADER,HIDE_LOADER,
  SHOW_PAGE_LOADER,HIDE_PAGE_LOADER,
} from "./actionTypes";

export const getImages = (label) => {
  return async (dispatch) => {
    dispatch({type : SHOW_PAGE_LOADER});
    try {
      // console.log("genre",genre);
      // if(genre === undefined){genre = "All";}
      const result =  await Axios.get("/image/getimages/"+"/"+label, {
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('name')}` 
        }
      });
      // console.log("multiple");
      // console.log(result);
      if(result.data.length === 0){
        dispatch({type : HIDE_PAGE_LOADER});
      }
      else{
        dispatch({type : HIDE_PAGE_LOADER});
        dispatch({ type: GET_IMAGES_SUCCESS, payload: result.data});
      }
    } catch (error) {
      dispatch({ type: GET_IMAGES_ERROR, error });
    }
  };
};

export const addImage = (img) => {

  console.log("imageList",img);

  let formData = new FormData();
  // formData.append("path",Date.now() + "-" + img.name);
  // formData.append("image", img);



  img.forEach((oneImg)=>{
    formData.append("image[]",oneImg);  
  })
  formData.append("userId", localStorage.getItem('name'));


  return async (dispatch) => {
    dispatch({type : SHOW_LOADER});
    try {
      const promise1 = await Axios.post("/image/addimage",formData, {
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('name')}` 
        }
      });
      const promise2 = await Axios.get("/label/getlabels/", {
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('name')}` ,
          "content-type": "multipart/form-data"
        }
      });
      
      // console.log("addimage");
      Promise.all([promise1, promise2])
      .then(function(result) {
        // console.log(result[0]);
        // console.log(result[1]);
        dispatch({type : HIDE_LOADER});
        dispatch({ type: GET_IMAGES_SUCCESS, payload: result[0].data});
        dispatch({ type: GET_GENRES_SUCCESS, payload: result[1].data });
      });

    } catch (error) {
      dispatch({ type: GET_IMAGES_ERROR, error });
    }
  };
};

// export const deleteImage = (image_url) => {
//     return async (dispatch) => {
//       try {
  
//         const result = await Axios.delete("/api/images/deleteimage",{"user_id" : localStorage.getItem("name"),"image_url":image_url});
//         console.log("multiplegenres");
//         console.log(result); 
//         dispatch({ type: DELETE_IMAGE_SUCCESS, payload: result.data });
//       } catch (error) {
//         dispatch({ type: DELETE_IMAGE_ERROR, error });
//       }
//     };
//   };

export const showLoader = () => dispatch => {
  dispatch({
    type : SHOW_LOADER
  })
};

export const hideLoader = () => dispatch => {
  dispatch({
    type : HIDE_LOADER
  })
};

export const showPageLoader = () => dispatch => {
  dispatch({
    type : SHOW_PAGE_LOADER
  })
};

export const hidePageLoader = () => dispatch => {
  dispatch({
    type : HIDE_PAGE_LOADER
  })
};

