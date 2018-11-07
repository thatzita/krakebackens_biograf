import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, USER_CREATED, FORGOT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_CREATED:
      return {
        ...state,
        success: action.payload
      };
    case FORGOT_USER:
      console.log("2");
      console.log(action.payload);
      return {
        ...state,
        success: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
