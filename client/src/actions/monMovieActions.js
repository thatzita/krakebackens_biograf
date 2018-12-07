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
  // console.log('fetching all monMovies');

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
  // console.log('posting movie');
  // console.log(data);
  axios
    .post("/api/monthlyMovies/uploadMoviePremiere", data)

    .then(res => {
      // console.log(res);
      dispatch({
        type: POST_MONMOVIE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// GET ALL MONMOVIES
export const getAllMonMovies = () => dispatch => {
  // console.log('fetching all monMovies');

  axios
    .get("/api/monthlyMovies/getAllMonthlyMovies")
    .then(res => {
      // console.log(res.data.monMovies);
      dispatch({
        type: GET_MONMOVIES,
        payload: res.data.monMovies
      });
    })
    .catch(err => console.log(err));
};

// GET SPESIFIC MOVIE
export const getSpecificMonMovie = data => dispatch => {
  // console.log(data);

  axios
    .get("/api/monthlyMovies/singlemovie/", {
      params: {
        id: data
      }
    })
    .then(res => {
      // console.log("get res ", res.data.movie);

      dispatch({
        type: GET_CLOSEUP_MONMOVIE,
        payload: res.data.movie
      });
    })
    .catch(err => console.log(err));
};

// DELETE A MONMOVIE
export const deleteMonMovie = movie => dispatch => {
  // console.log('Delete action starting');
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
        console.log("något gick fel vid delete action monmovie");
      }
    })
    .catch(err => console.log(err));
};

// complete user booking
export const completeAndSaveBooking = bookingObj => dispatch => {
  axios
    .post("/api/monthlyMovies/completeAndSaveBooking", bookingObj)
    .then(res => {
      console.log("response form booking", res);
      if (res) {
        dispatch({
          type: COMPLETE_BOOKING,
          payload: res.data
        });
      } else {
        console.log("något gick fel med response för bokning");
      }
    })
    .catch(err => console.log(err));
};

export const removePreviousMoveBookingInformation = () => dispatch => {
  dispatch({
    type: END_BOOKING_ON_SUCCESS,
    payload: undefined
  });
};
