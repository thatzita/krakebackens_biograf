import {
  GET_MOVIES,
  MOVIE_POPUP,
  MOVIE_POPUP_CLOSE,
  SEARCH_MOVIE_TMDB,
  IMDB_POPUP,
  IMDB_POPUP_CLOSE,
  MOVIE_ADDED_SUCCESS,
  DELETE_MOVIE_DB,
  UPDATE_MOVIE_DB,
  RESET_MOVIE_SUCCESS,
} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  //Om det blir en success kommer state uppdateras med information
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case MOVIE_POPUP:
      return {
        ...state,
        showOrHide: true,
        movieInfo: action.payload,
      };
    case MOVIE_POPUP_CLOSE:
      return {
        ...state,
        showOrHide: false,
        movieInfo: action.payload,
      };
    case SEARCH_MOVIE_TMDB:
      return {
        ...state,
        moviesFound: action.payload.results,
        totalMoviePage: action.payload.total_pages,
        activePage: action.payload.page,
      };
    case RESET_MOVIE_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case IMDB_POPUP:
      return {
        ...state,
        showOrHideImdb: true,
        movieInfo: action.payload,
      };
    case IMDB_POPUP_CLOSE:
      return {
        ...state,
        showOrHideImdb: false,
        movieInfo: action.payload,
      };

    case MOVIE_ADDED_SUCCESS:
      return {
        ...state,
        showOrHideImdb: false,
        success: action.payload,
      };
    case DELETE_MOVIE_DB:
      let newMovieState = removeMovie(action.payload, state.movies);
      return {
        ...state,
        movies: newMovieState,
      };
    case UPDATE_MOVIE_DB:
      let updatedMovieState = updateMovie(action.payload, state.movies);

      return {
        ...state,
        movies: updatedMovieState,
      };
    default:
      return state;
  }
}

function removeMovie(deleteData, movieArray) {
  let updatedMovieList = movieArray.filter((listItem) => {
    return listItem !== deleteData;
  });
  return updatedMovieList;
}

function updateMovie(updateData, movieArray) {
  let newState = movieArray;
  for (let i = 0; i < newState.length; i++) {
    if (updateData.id === newState[i]._id) {
      newState[i].title = updateData.title;
      newState[i].description = updateData.description;
      newState[i].crowRating = updateData.crowRating;
    }
  }
  return newState;
}
