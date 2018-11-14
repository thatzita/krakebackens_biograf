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
