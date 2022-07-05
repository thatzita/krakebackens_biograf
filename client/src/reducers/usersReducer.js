import {
  GET_ALL_USERS,
  USER_POPUP,
  USER_POPUP_CLOSE,
  USER_DELETE_DB,
  RESET_USER_STATS,
  USER_ARCHIVE,
  UPDATE_USER
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      let updateUserArr = updatedUser(action.payload, state.users);
      return {
        ...state,
        userInfo: action.payload,
        users: updateUserArr
      };
    case USER_ARCHIVE:
      return {
        ...state,
        userArchive: action.payload
      };
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
        showOrHide:true,
        userInfo: action.payload
      };
    case USER_POPUP_CLOSE:
      return {
        ...state,
        showOrHide: false,
        userInfo: action.payload
      };
    case RESET_USER_STATS:
      let resetStats = resetUserStats(state.users);
      return {
        ...state,
        users: resetStats
      };
    default:
      return state;
  }
}

function resetUserStats(userArray) {
  let newArray = userArray;
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].stats.season) {
      newArray[i].stats.season = 0;
    }
  }
  return newArray;
}

function removeUser(deleteData, userArray) {
  let updatedUserList = userArray.filter(listItem => {
    return listItem !== deleteData;
  });
  return updatedUserList;
}

function updatedUser(data, array) {
  let newUserArr = array.map(user => {
    if (user.email === data.email) {
      return (user = data);
    } else {
      return user;
    }
  });
  return newUserArr;
}
