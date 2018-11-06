import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, USER_CREATED } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  success: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_CREATED:
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
