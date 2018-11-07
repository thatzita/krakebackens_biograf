import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Store https://redux.js.org/api/createstore
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Apply from "./components/auth/Apply";
import Forgot from "./components/auth/Forgot";
import Reset from "./components/auth/Reset";
import Mainpage from "./components/main/Mainpage";
import Profile from "./components/profile/Profile";

//FÖR ADMINS, SKA INTE VARA I LANDING
import Register from "./components/auth/Register";

import "./App.css";

//kolla om token finns
if (localStorage.jwtToken) {
  //Sätter vi till header auth
  setAuthToken(localStorage.jwtToken);
  //Avkoda token för att se vem det är som är inloggad
  const decoded = jwt_decode(localStorage.jwtToken);
  //Applicera user och isAuthenticated i state
  store.dispatch(setCurrentUser(decoded));
  //kolla om token gått ut
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logga ut
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    //redirect till landing
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/apply" component={Apply} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/reset/:token" component={Reset} />
              {/* Ska vara privat route */}
              <Route exact path="/register" component={Register} />

              <Switch>
                <PrivateRoute exact path="/mainpage" component={Mainpage} />
                <PrivateRoute exact path="/profile" component={Profile} />
                {/* <PrivateRoute exact path="/register" component={Register} /> */}
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
