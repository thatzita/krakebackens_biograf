import axios from "axios";
import {
  GET_MOVIES,
  GET_ERRORS,
  MOVIE_POPUP,
  MOVIE_POPUP_CLOSE,
  SEARCH_MOVIE_TMDB,
  IMDB_POPUP,
  IMDB_POPUP_CLOSE,
  MOVIE_ADDED_SUCCESS
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
  console.log(movieId);
  let url = "https://api.themoviedb.org/3/movie/";
  let key = "?api_key=1ca6bbafafae8cf950e1fbb80a4824c7&language=sv";
  axios.get(url + movieId + key).then(res => {
    let movie = res.data;
    // console.log(res.data);
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
  console.log(addToDb);
  axios.post("/api/movies/addmovie", addToDb).then(res => {
    console.log(res);
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
