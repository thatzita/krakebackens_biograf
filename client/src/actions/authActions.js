import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Skickas till reducer
//Används för att skapa användare. ADMIN ska använda denna. Ändra history(vart man hamnar efter att ha skapat användare)
//Kan skicka tillbaka ett response istället och tömma fälten
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    // .then(res => console.log("Användare skapad"))
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

//Logga ut
export const logoutUser = () => dispatch => {
  //Ta bort token från localStorage
  localStorage.removeItem("jwtToken");
  //Ta bort auth header så att användaren måste logga in igen
  setAuthToken(false); //kolla filen setAuthToken.js, true = lägg till header, false = ta bort header

  //Set currentUser till {} och isAuthenticated till false
  dispatch(setCurrentUser({})); //kolla authReducer.js för mer information
};
