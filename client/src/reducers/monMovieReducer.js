import {
  GET_MONMOVIES,
  GET_CLOSEUP_MONMOVIE,
  POST_MONMOVIE,
  DELETE_MONMOVIE,
  UPDATE_MONMOVIE,
  GET_ARCHIVED_MOVIES
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  // console.log('reducer starts')
  switch (action.type) {
    case GET_ARCHIVED_MOVIES:
      console.log(action.payload);
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
      // console.log('payload ',action.payload);
      return {
        ...state,
        monMovies: action.payload
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
    default:
      return state;
  }
}

const removeMonMovie = (deleteItem, stateArray) => {
  let updatedList = stateArray.filter(item => item !== deleteItem);
  return updatedList;
};
