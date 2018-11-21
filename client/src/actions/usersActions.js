import axios from "axios";

import {
  GET_ALL_USERS,
  USER_DELETE_DB,
  USER_POPUP,
  USER_POPUP_CLOSE,
  RESET_USER_STATS
  // USER_STATS_TO_ARCHIVE
} from "./types";

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

export const deleteUser = user => dispatch => {
  let objId = user._id;
  if (window.confirm("Är du att du vill ta bort kontot?")) {
    axios.delete("/api/users/deleteuser", { data: { objId } }).then(res => {
      if (res) {
        dispatch(deleteUserSuccess(user));
      } else {
        console.log("Något gick fel.");
      }
    });
  }
};

export const userPopup = userData => {
  return {
    type: USER_POPUP,
    payload: userData
  };
};
export const userPopupClose = () => {
  return {
    type: USER_POPUP_CLOSE,
    payload: {}
  };
};

export const deleteUserSuccess = deletedUser => {
  return {
    type: USER_DELETE_DB,
    payload: deletedUser
  };
};

export const resetStats = () => dispatch => {
  if (window.confirm("Är du att du vill nollställa statistiken för året?")) {
    axios.get("/api/users/resetstats").then(res => {
      if (res) {
        let success = {
          msg: "Nollställning lyckades"
        };
        dispatch({
          type: RESET_USER_STATS,
          payload: success
        });
      } else {
        console.log("Något gick fel vid nollställning.");
      }
    });
  }
};

export const saveUserStatsToArchive = archiveData => dispatch => {
  axios.post("/api/stats/userarchive", archiveData).then(res => {
    if (res) {
      console.log("Sparat statistik i arkivet");
    } else {
      console.log("Något gick fel när datan skulle sparas till arkivet.");
    }
  });
};
