import { USER_REQUEST } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  //Om det blir en success kommer state uppdateras med information
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
