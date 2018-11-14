import {
  GET_ALL_USERS,
  USER_POPUP,
  USER_POPUP_CLOSE,
  USER_DELETE_DB
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    case USER_DELETE_DB:
      let newUserState = removeUser(action.payload, state.users);
      return {
        ...state,
        users: newUserState
      };
    case USER_POPUP:
      return {
        ...state,
        ...(state.showOrHide = true),
        userInfo: action.payload
      };
    case USER_POPUP_CLOSE:
      return {
        ...state,
        ...(state.showOrHide = false),
        userInfo: action.payload
      };
    default:
      return state;
  }
}

function removeUser(deleteData, userArray) {
  let updatedUserList = userArray.filter(listItem => {
    return listItem !== deleteData;
  });
  return updatedUserList;
}
