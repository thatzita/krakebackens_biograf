import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
          <Link to="/mainpage">Biljetter</Link>
        </li>
        <li>
          <Link to="/mainpage">Profil</Link>
        </li>
        <li>
          <Link to="/mainpage">Filmer och trailers</Link>
        </li>
        <li>
          <Link to="/mainpage">Om oss</Link>
        </li>
        <li>
          <Link to="/mainpage">Kontakta oss</Link>
        </li>
        <li>
          <a href="#" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
          {/* <Link to="/" onClick={this.onLogoutClick.bind(this)}>
            Logga ut
          </Link> */}
        </li>
      </ul>
    );
    const guestLinks = (
      <ul>
        <li>
          <Link to="/login">Logga in</Link>
        </li>
        <li>
          <Link to="/register">Bli medlem</Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Kråkebackens biograf
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
