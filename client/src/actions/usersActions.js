import axios from "axios";

import {
  GET_ALL_USERS,
  USER_DELETE_DB,
  USER_POPUP,
  USER_POPUP_CLOSE
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

//Profilen laddas
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   };
// };
