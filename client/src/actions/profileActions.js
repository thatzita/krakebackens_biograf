import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Profilen laddas
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Ta bort kontot
export const deleteAccount = () => dispatch => {
  axios
    .delete("/api/users")
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
      localStorage.removeItem("jwtToken");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Rensa profilen som är inloggad
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
