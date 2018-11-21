import {
  ADMIN_PAGE_TRUE,
  ADMIN_PAGE_FALSE,
  CURRENT_CLOSE_UP_MOVIE_ID,
  REMOVE_CURRENT_CLOSE_UP_MOVIE_ID
} from "./types";

// Change or leave admon page, send in a true or false value
export const goToAdminPage = value => dispatch => {
  if (value) {
    dispatch({
      type: ADMIN_PAGE_TRUE
    });
    localStorage.setItem("adminPage", true);
  } else {
    dispatch({
      type: ADMIN_PAGE_FALSE
    });
    localStorage.removeItem("adminPage");
  }
};

export const setCurrentCloseUpMovieId = (bol, id) => dispatch => {
  if (bol) {
    dispatch({
      type: CURRENT_CLOSE_UP_MOVIE_ID,
      payload: id
    });
    localStorage.setItem("activeMovieId", id);
  } else {
    dispatch({
      type: REMOVE_CURRENT_CLOSE_UP_MOVIE_ID,
      payload: ""
    });
    localStorage.removeItem("activeMovieId");
  }
};
