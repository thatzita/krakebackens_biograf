import axios from "axios";
import { GET_MOVIES, GET_ERRORS } from "./types";

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
