import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Store https://redux.js.org/api/createstore
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Apply from "./components/auth/Apply";
import Forgot from "./components/auth/Forgot";

//FÖR ADMINS, SKA INTE VARA I LANDING
import Register from "./components/auth/Register";

import "./App.css";

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
              <Route exact path="/register" component={Register} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
