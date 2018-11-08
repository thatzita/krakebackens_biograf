import { GET_MOVIES } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  //Om det blir en success kommer state uppdateras med information
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    default:
      return state;
  }
}
