//Vår root-reducers
//Alla reducers hamnar här
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
// import profileReducer from "./profileReducer";
import applicationReducer from "./applicationReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  // profile: profileReducer,
  success: applicationReducer
});
//this.props.auth osv...
