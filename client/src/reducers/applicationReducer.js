import { USER_REQUEST } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        success: action.payload
      };
    default:
      return state;
  }
}
