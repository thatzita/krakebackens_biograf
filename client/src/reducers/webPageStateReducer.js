import {
  ADMIN_PAGE_TRUE,
  ADMIN_PAGE_FALSE
  // CURRENT_CLOSE_UP_MOVIE_ID,
  // REMOVE_CURRENT_CLOSE_UP_MOVIE_ID
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADMIN_PAGE_TRUE:
      return {
        ...state,
        adminPage: true
      };
    case ADMIN_PAGE_FALSE:
      return {
        ...state,
        adminPage: false
      };
    // case CURRENT_CLOSE_UP_MOVIE_ID:
    //   return {
    //     ...state,
    //     currentCloseUpMovieId: action.payload
    //   };
    // case REMOVE_CURRENT_CLOSE_UP_MOVIE_ID:
    //   return {
    //     ...state,
    //     currentCloseUpMovieId: action.payloads
    //   };
    default:
      return state;
  }
}
