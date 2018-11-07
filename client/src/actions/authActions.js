import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_CREATED,
  FORGOT_USER
} from "./types";

//Skickas till reducer
//Används för att skapa användare. ADMIN ska använda denna. Ändra history(vart man hamnar efter att ha skapat användare)
//Kan skicka tillbaka ett response istället och tömma fälten
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    // .then(res => history.push("/login"))
    .then(res => {
      let success = {
        title: "Användare skapad!",
        msg: "Ett mail har skickats till " + userData.email + "."
      };
      dispatch(creationSuccess(success));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login med token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //localStorage, spara token
      //localStorage tar bara strings
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //Token ska vara i header - separatfil
      setAuthToken(token);
      //Decode token med jwt-decode för att få användardata
      const decoded = jwt_decode(token); //all information om användare inklusive token

      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Sätta vem som är inloggad just nu
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const creationSuccess = success => {
  return {
    type: USER_CREATED,
    payload: success
  };
};

export const forgotSuccess = success => {
  return {
    type: FORGOT_USER,
    payload: success
  };
};

//Logga ut
export const logoutUser = () => dispatch => {
  //Ta bort token från localStorage
  localStorage.removeItem("jwtToken");
  //Ta bort auth header så att användaren måste logga in igen
  setAuthToken(false); //kolla filen setAuthToken.js, true = lägg till header, false = ta bort header

  //Set currentUser till {} och isAuthenticated till false
  dispatch(setCurrentUser({})); //kolla authReducer.js för mer information
};

//Glömt lösenord, skicka mail till användaren med instruktioner
export const forgotPassword = data => dispatch => {
  axios
    .post("/api/users/forgot", data)
    .then(res => {
      console.log("1");
      console.log(data);
      console.log("____");
      let success = {
        title: "Epost skickad!",
        msg: "Ett mail har skickats till " + data.email + "."
      };
      dispatch(forgotSuccess(success));
    })
    .catch(err => {
      //TODO: fixa errors
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
