import {
  GET_MONMOVIES,
  GET_CLOSEUP_MONMOVIE,
  POST_MONMOVIE,
  DELETE_MONMOVIE,
  UPDATE_MONMOVIE,
  COMPLETE_BOOKING,
  GET_ARCHIVED_MOVIES,
  END_BOOKING_ON_SUCCESS
} from "./types";

import axios from "axios";

//GET ALL ARCHIVED MOVIES
export const getAllMoviesArchive = () => dispatch => {
  axios
    .get("/api/monthlyMovies/moviearchive")
    .then(res => {
      dispatch({
        type: GET_ARCHIVED_MOVIES,
        payload: res.data.archive
      });
    })
    .catch(err => {
      throw err;
    });
};

// POST A MONMOVIE
export const postMonmovie = data => dispatch => {
  axios
    .post("/api/monthlyMovies/uploadMoviePremiere", data)
    .then(res => {
      dispatch({
        type: POST_MONMOVIE,
        payload: res.data
      });
    })
    .catch(err => {
      throw err;
    });
};

// GET ALL MONMOVIES
export const getAllMonMovies = () => dispatch => {
  axios
    .get("/api/monthlyMovies/getAllMonthlyMovies")
    .then(res => {
      dispatch({
        type: GET_MONMOVIES,
        payload: res.data.monMovies
      });
    })
    .catch(err => {
      throw err;
    });
};

// GET SPECIFIC MOVIE
export const getSpecificMonMovie = data => dispatch => {
  axios
    .get("/api/monthlyMovies/singlemovie/", {
      params: {
        id: data
      }
    })
    .then(res => {
      dispatch({
        type: GET_CLOSEUP_MONMOVIE,
        payload: res.data.movie
      });
    })
    .catch(err => {
      throw err;
    });
};

// DELETE A MONMOVIE
export const deleteMonMovie = movie => dispatch => {
  let objId = movie._id;
  axios
    .delete("/api/monthlyMovies/deleteMonthlyMovie", { data: { objId } })
    .then(res => {
      if (res) {
        dispatch({
          type: DELETE_MONMOVIE,
          payload: movie
        });
      } else {
        console.log("Något gick fel när film skulle tas bort.");
      }
    })
    .catch(err => {
      throw err;
    });
};

// complete user booking
export const completeAndSaveBooking = bookingObj => dispatch => {
  axios
    .post("/api/monthlyMovies/completeAndSaveBooking", bookingObj)
    .then(res => {
      if (res) {
        dispatch({
          type: COMPLETE_BOOKING,
          payload: res.data
        });
      } else {
        console.log("Något gick fel under bokningen.");
      }
    })
    .catch(err => {
      throw err;
    });
};

export const removePreviousMoveBookingInformation = () => dispatch => {
  dispatch({
    type: END_BOOKING_ON_SUCCESS,
    payload: undefined
  });
};
