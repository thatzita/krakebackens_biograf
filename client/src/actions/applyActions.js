import axios from "axios";
import { GET_ERRORS, USER_REQUEST } from "./types";

export const userRequest = (userData, history) => dispatch => {
  axios
    .post("/api/apply/form", userData)
    // .then(res => history.push("/login"))
    .then(res => {
      let success = {
        title: "Förfrågan skickad!",
        msg: "Du kommer få svar via mail om du blivit godkänd."
      };

      let errors = {};

      dispatch(requestSuccess(success));
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const requestSuccess = success => {
  return {
    type: USER_REQUEST,
    payload: success
  };
};
