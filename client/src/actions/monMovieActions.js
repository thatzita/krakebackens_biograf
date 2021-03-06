import {
  GET_MONMOVIES,
  GET_CLOSEUP_MONMOVIE,
  POST_MONMOVIE,
  POST_MON_EVENT,
  GET_MON_EVENTS,
  DELETE_MONMOVIE,
  UPDATE_MONMOVIE,
  COMPLETE_BOOKING,
  GET_ARCHIVED_MOVIES,
  END_BOOKING_ON_SUCCESS,
  UPDATE_BOOKING,
  COMPLETE_BOOKING_EVENT,
  UPDATE_BOOKING_EVENT,
  DELETE_MON_EVENT,
  UPDATE_MON_EVENT,
  GET_ARCHIVED_EVENTS
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

//GET ALL ARCHIVED EVENTS
export const getEventArchive = () => dispatch => {
  axios
    .get("/api/monthlyMovies/eventarchive")
    .then(res => {
      dispatch({
        type: GET_ARCHIVED_EVENTS,
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

export const postMonEvent = data => dispatch => {
  axios
    .post("/api/monthlyMovies/uploadEventPremiere", data)
    .then(res => {
      dispatch({
        type: POST_MON_EVENT,
        payload: res.data
      });
    })
    .catch(err => {
      throw err;
    });
};

// UPDATE monMovie
export const updateMonmovie = data => dispatch => {
  if (data.eventType === "movie") {
    data.seating.forEach(array => {
      array.forEach(title => {
        title.title = data.title;
      });
    });
    axios
      .post("/api/monthlyMovies/updateMonthlyMovie", data)
      .then(res => {
        dispatch({
          type: UPDATE_MONMOVIE,
          payload: res.data.monMovie
        });
      })
      .catch(err => {
        throw err;
      });
  } else {
    data.seating.forEach(seat => {
      seat.title = data.title;
    });
    axios
      .post("/api/monthlyMovies/updateMonthlyEvent", data)
      .then(res => {
        dispatch({
          type: UPDATE_MON_EVENT,
          payload: res.data.monEvent
        });
      })
      .catch(err => {
        throw err;
      });
  }
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

export const getAllMonEvents = () => dispatch => {
  axios
    .get("/api/monthlyMovies/getAllMonEvents")
    .then(res => {
      dispatch({
        type: GET_MON_EVENTS,
        payload: res.data.monEvent
      });
    })
    .catch(err => {
      throw err;
    });
};

// GET SPECIFIC MOVIE
export const getSpecificMonMovie = (data, eventType) => dispatch => {
  if (eventType === "event") {
    axios
      .get("/api/monthlyMovies/singleevent/", {
        params: {
          id: data
          // eventType: eventType
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
  } else {
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
  }
};

// DELETE A MONMOVIE
export const deleteMonMovie = movie => dispatch => {
  let objId = movie._id;
  if (movie.eventType === "movie") {
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
  } else {
    axios
      .delete("/api/monthlyMovies/deleteMonthlyEvent", { data: { objId } })
      .then(res => {
        if (res) {
          dispatch({
            type: DELETE_MON_EVENT,
            payload: movie
          });
        } else {
          console.log("Något gick fel när event skulle tas bort.");
        }
      })
      .catch(err => {
        throw err;
      });
  }
};

export const removeAndCancelMovieBooking = removeObj => dispatch => {
  axios
    .post("/api/monthlyMovies/removeMovieBooking", removeObj)
    .then(res => {
      if (res.data.monMovie) {
        dispatch({
          type: UPDATE_BOOKING,
          payload: res.data.monMovie
        });
      } else if (res.data.monEvent) {
        dispatch({
          type: UPDATE_BOOKING_EVENT,
          payload: res.data.monEvent
        });
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

export const completeAndSaveBookingEvent = bookingObj => dispatch => {
  axios
    .post("/api/monthlyMovies/completeAndSaveBookingEvent", bookingObj)
    .then(res => {
      if (res) {
        dispatch({
          type: COMPLETE_BOOKING_EVENT,
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
