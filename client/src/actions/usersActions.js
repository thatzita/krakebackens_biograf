import axios from "axios";

import { GET_ALL_USERS } from "./types";

export const getAllUsers = () => dispatch => {
  axios
    .get("/api/users/allusers")
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Profilen laddas
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   };
// };
