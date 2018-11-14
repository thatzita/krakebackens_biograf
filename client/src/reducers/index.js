//Vår root-reducers
//Alla reducers hamnar här
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import applicationReducer from "./applicationReducer";
import movieReducer from "./movieReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  success: applicationReducer,
  movies: movieReducer,
  users: usersReducer
});
//this.props.auth osv...
