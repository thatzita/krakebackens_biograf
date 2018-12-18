import {
  GET_MONMOVIES,
  GET_CLOSEUP_MONMOVIE,
  POST_MONMOVIE,
  DELETE_MONMOVIE,
  UPDATE_MONMOVIE,
  COMPLETE_BOOKING,
  GET_ARCHIVED_MOVIES,
  END_BOOKING_ON_SUCCESS,
  UPDATE_BOOKING
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ARCHIVED_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case POST_MONMOVIE:
      return {
        ...state,
        monMovies: [...state.monMovies, action.payload]
      };
    case GET_MONMOVIES:
      return {
        ...state,
        monMovies: action.payload
      };
    case UPDATE_MONMOVIE:
      // console.log("state before", state.monMovies);
      let updatedMonMovieList = filterUpdate(action.payload, state.monMovies);
      // console.log("state ", state.monMovies);
      // console.log("reducer new ", updatedMonMovieList);

      return {
        ...state,
        monMovies: updatedMonMovieList
      };
    case DELETE_MONMOVIE:
      let newMonMovieState = removeMonMovie(action.payload, state.monMovies);
      return {
        ...state,
        monMovies: newMonMovieState
      };
    case GET_CLOSEUP_MONMOVIE:
      return {
        ...state,
        movieCloseUp: action.payload
      };
    case COMPLETE_BOOKING:
      return {
        ...state,
        bookingResult: action.payload
        // movieCloseUp: action.payload.movie
      };
    case END_BOOKING_ON_SUCCESS:
      return {
        ...state,
        bookingResult: action.payload
      };
    case UPDATE_BOOKING:
      let monMovieListAfterRemovedBooking = filterUpdate(
        action.payload,
        state.monMovies
      );

      return {
        ...state,
        monMovies: monMovieListAfterRemovedBooking
      };
    default:
      return state;
  }
}

const removeMonMovie = (deleteItem, stateArray) => {
  let updatedList = stateArray.filter(item => item !== deleteItem);
  return updatedList;
};

const filterUpdate = (updatedItem, currentArray = []) => {
  let updatedList = currentArray.map(x => {
    if (x._id === updatedItem._id) {
      // console.log(x.title);
      x = updatedItem;
      return x;
    } else {
      return x;
    }
  });
  // console.log("update ", updatedList);
  return updatedList;
};
