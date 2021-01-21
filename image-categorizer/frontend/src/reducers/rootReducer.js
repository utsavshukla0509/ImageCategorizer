import { combineReducers } from "redux";
import imageReducer from "./imageReducer";
import genreReducer from "./genreReducer";
import authReducer from "./authReducer";

export default combineReducers({
  image: imageReducer,
  genre :  genreReducer,
  auth : authReducer,
});
