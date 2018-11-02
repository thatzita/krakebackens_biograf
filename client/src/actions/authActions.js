import { TEST_DISPATCH } from "./types";

//Skickas till reducer
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
