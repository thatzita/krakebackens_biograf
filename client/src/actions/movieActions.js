import axios from "axios";
import {
  GET_MOVIES,
  GET_ERRORS,
  MOVIE_POPUP,
  MOVIE_POPUP_CLOSE,
  SEARCH_MOVIE_TMDB,
  IMDB_POPUP,
  IMDB_POPUP_CLOSE,
  MOVIE_ADDED_SUCCESS,
  DELETE_MOVIE_DB,
  UPDATE_MOVIE_DB
} from "./types";

export const getAllMovies = movieData => dispatch => {
  axios
    .get("/api/movies/allmovies")
    .then(res => {
      let movieList = res.data.movies;

      dispatch(getMovieList(movieList));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getMovieList = success => {
  return {
    type: GET_MOVIES,
    payload: success
  };
};

export const moviePopup = movieData => {
  return {
    type: MOVIE_POPUP,
    payload: movieData
  };
};
export const moviePopupClose = () => {
  return {
    type: MOVIE_POPUP_CLOSE,
    payload: {}
  };
};

//TMDB
export const searchMovie = movieData => dispatch => {
  let url = "https://api.themoviedb.org/3/search/movie?query=";

  let key = "&api_key=1ca6bbafafae8cf950e1fbb80a4824c7";
  axios.get(url + movieData + key).then(res => {
    let movieList = res.data.results;
    dispatch(showMoviesFound(movieList));
  });
};

export const showMoviesFound = movieData => {
  return {
    type: SEARCH_MOVIE_TMDB,
    payload: movieData
  };
};

//IMDB POPUP

export const imdbPopup = movieId => dispatch => {
  let url = "https://api.themoviedb.org/3/movie/";
  let key = "?api_key=1ca6bbafafae8cf950e1fbb80a4824c7&language=sv";
  axios.get(url + movieId + key).then(res => {
    let movie = res.data;
    dispatch(showSpecificMovie(movie));
  });
};

export const imdbPopupClose = () => {
  return {
    type: IMDB_POPUP_CLOSE,
    payload: {}
  };
};

export const showSpecificMovie = movieData => {
  return {
    type: IMDB_POPUP,
    payload: movieData
  };
};

//LÄGG TILL I DB
export const addToMovieDb = addToDb => dispatch => {
  axios.post("/api/movies/addmovie", addToDb).then(res => {
    let success = {
      title: "Film tillagd!",
      msg: "Filmen finns nu i databasen"
    };
    dispatch(movieAddedSuccess(success));
  });
  // .catch(err => {
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   });
  // });
};

export const movieAddedSuccess = success => {
  return {
    type: MOVIE_ADDED_SUCCESS,
    payload: success
  };
};

//DELETE FRÅN DB
export const deleteMovie = movie => dispatch => {
  let objId = movie._id;
  axios.delete("/api/movies", { data: { objId } }).then(res => {
    if (res) {
      dispatch(movieDeleteSuccess(movie));
    } else {
      console.log("Något gick fel.");
    }
  });
};

export const movieDeleteSuccess = deletedMovie => {
  return {
    type: DELETE_MOVIE_DB,
    payload: deletedMovie
  };
};

//UPPDATERA DB
export const updateDb = updatedMovie => dispatch => {
  axios.post("/api/movies/update", { data: { updatedMovie } }).then(res => {
    if (res) {
      dispatch(movieUpdated(updatedMovie));
    }
  });
};

export const movieUpdated = updated => {
  return {
    type: UPDATE_MOVIE_DB,
    payload: updated
  };
};
