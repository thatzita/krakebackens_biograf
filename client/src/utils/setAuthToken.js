import axios from "axios";

//Axios default, vad vi ska sätta i alla headers
const setAuthToken = token => {
  if (token) {
    //Applicera på alla requests om token finns
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Ta bort header med auth om den inte finns
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
