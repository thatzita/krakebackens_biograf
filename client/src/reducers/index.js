//Vår root-reducers
//Alla reducers hamnar här
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import applicationReducer from "./applicationReducer";
import movieReducer from "./movieReducer";
import usersReducer from "./usersReducer";
import monMovieReducer from "./monMovieReducer";
import webPageStateReducer from "./webPageStateReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  success: applicationReducer,
  movies: movieReducer,
  users: usersReducer,
  monMovies: monMovieReducer,
  adminPage: webPageStateReducer
});
//this.props.auth osv...
