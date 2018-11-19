import { ADMIN_PAGE_TRUE, ADMIN_PAGE_FALSE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADMIN_PAGE_TRUE:
      return {
        ...state,
        adminPage: true
      };
    case ADMIN_PAGE_FALSE:
      return {
        ...state,
        adminPage: false
      };
    default:
      return state;
  }
}
