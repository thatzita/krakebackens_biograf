import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Store https://redux.js.org/api/createstore
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import AdminHome from './components/admin/AdminHome';
import Login from './components/auth/Login';
import Apply from './components/auth/Apply';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import Mainpage from './components/main/Mainpage';
import Profile from './components/profile/Profile';
import ChangePassword from './components/profile/ChangePassword';
import Movies from './components/movies/Movies';
import AddMovie from './components/movies/AddMovie';
import Admin from './components/admin/Admin';
import Users from './components/users/Users';
import Statistic from './components/statistic/Statistic';
import Seating from './components/seating/Seating';
import ArchiveMain from './components/archive/ArchiveMain';
import Bookings from './components/admin/Bookings';
import AboutUs from './components/aboutus';

import CreateMonEvent from './components/admin/monMovies/CreateMonEvent';
import CreateMonMovie from './components/admin/monMovies/CreateMonMovie';
import UpdateMonMovie from './components/admin/monMovies/UpdateMonMovie';
import MonMovieList from './components/admin/monMovies/MonMovieList';

import MovieCloseUp from './components/main/MovieCloseUp';

//FÖR ADMINS, SKA INTE VARA I LANDING
import Register from './components/auth/Register';

import './App.css';

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
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div
            className='App'
            style={{ backgroundColor: 'rgb(0,0,0)', height: '100vh' }}
          >
            <Navbar />

            <Route exact path='/' component={Landing} />
            <div className='containerApp'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/apply' component={Apply} />
              <Route exact path='/forgot' component={Forgot} />
              <Route exect path='/reset/:token' component={Reset} />

              <Switch>
                <AdminRoute
                  exact
                  path='/moviearchive'
                  component={ArchiveMain}
                />
                <AdminRoute exact path='/bookings' component={Bookings} />
                <PrivateRoute exact path='/seating' component={Seating} />
                <AdminRoute exact path='/adminhome' component={AdminHome} />
                <AdminRoute
                  exact
                  path='/updatemovie'
                  component={UpdateMonMovie}
                />
                <AdminRoute
                  exact
                  path='/monMovieList'
                  component={MonMovieList}
                />
                <AdminRoute
                  exact
                  path='/createMonMovie'
                  component={CreateMonMovie}
                />
                <AdminRoute
                  exact
                  path='/createMonEvent'
                  component={CreateMonEvent}
                />
                <PrivateRoute
                  exact
                  path='/movieselection'
                  component={MovieCloseUp}
                />
                <PrivateRoute exact path='/mainpage' component={Mainpage} />
                <PrivateRoute exact path='/aboutus' component={AboutUs} />
                <PrivateRoute exact path='/profile' component={Profile} />
                <PrivateRoute
                  exact
                  path='/changepassword'
                  component={ChangePassword}
                />
                <AdminRoute exact path='/users' component={Users} />
                <PrivateRoute exact path='/movies' component={Movies} />
                <AdminRoute exact path='/addmovie' component={AddMovie} />
                <AdminRoute exact path='/admin' component={Admin} />
                <AdminRoute exact path='/register' component={Register} />
                <AdminRoute exact path='/statistic' component={Statistic} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
