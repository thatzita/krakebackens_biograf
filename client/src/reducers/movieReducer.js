import {
  GET_MOVIES,
  MOVIE_POPUP,
  MOVIE_POPUP_CLOSE,
  SEARCH_MOVIE_TMDB,
  IMDB_POPUP,
  IMDB_POPUP_CLOSE,
  MOVIE_ADDED_SUCCESS,
  DELETE_MOVIE_DB,
  UPDATE_MOVIE_DB
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  //Om det blir en success kommer state uppdateras med information
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case MOVIE_POPUP:
      return {
        ...state,
        ...(state.showOrHide = true),
        movieInfo: action.payload
      };
    case MOVIE_POPUP_CLOSE:
      return {
        ...state,
        ...(state.showOrHide = false),
        movieInfo: action.payload
      };
    case SEARCH_MOVIE_TMDB:
      return {
        ...state,
        moviesFound: action.payload
      };
    case IMDB_POPUP:
      return {
        ...state,
        ...(state.showOrHideImdb = true),
        movieInfo: action.payload
      };
    case IMDB_POPUP_CLOSE:
      return {
        ...state,
        ...(state.showOrHideImdb = false),
        movieInfo: action.payload
      };

    case MOVIE_ADDED_SUCCESS:
      return {
        ...state,
        ...(state.showOrHideImdb = false)
      };
    case DELETE_MOVIE_DB:
      let newMovieState = removeMovie(action.payload, state.movies);
      return {
        ...state,
        movies: newMovieState
      };
    default:
      return state;
  }
}

function removeMovie(deleteData, movieArray) {
  let updatedMovieList = movieArray.filter(listItem => {
    return listItem !== deleteData;
  });
  return updatedMovieList;
}
