import React, { Component } from "react";
import { Menu, Segment, Image } from "semantic-ui-react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { goToAdminPage } from "../../actions/webPageStateActions";

import "./navbar.css";
import {
  MAIN,
  HEM,
  OM_OSS,
  ANSOK_MEDLEMSKAP,
  LOGGA_IN,
  LOGGA_UT,
  ADMIN,
  FILMSORTIMENT,
  EVENTS,
  FILMER,
  PROFIL
} from "./layoutConstants";
import { KRAKEBACKENS_BIOGRAF } from "./layoutTexts";

class Navbar extends Component {
  constructor() {
    super();
    this.state = { activeItem: "home" };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === FILMER) {
      window.scrollTo({ top: 550, behavior: "smooth" });
    }
    if (name === EVENTS) {
      window.scrollTo({ top: 1000, behavior: "smooth" });
    }
    if (name === MAIN || name === HEM) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  onLogoutClick = event => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    let { activeItem } = this.state;
    const { isAuthenticated } = this.props.auth;
    const { admin } = this.props.auth.user;

    return (
      <React.Fragment>
        {!(localStorage.adminPage || false) ? (
          <React.Fragment>
            <Segment id="main-menu-nav-style">
              <Menu inverted secondary>
                <Menu.Item
                  header
                  className="no-padding"
                  as={Link}
                  to={isAuthenticated ? "/mainpage" : "/"}
                  name={MAIN}
                  active={activeItem === MAIN}
                  onClick={this.handleItemClick}
                >
                  <div className="hide-logo">
                    <Image
                      className="image-size-60"
                      src="krakelogo.gif"
                      onError={e => {
                        e.target.src =
                          "https://firebasestorage.googleapis.com/v0/b/krakebackensbiograf-c3aa9.appspot.com/o/krakebackens_logo.png?alt=media&token=4c75370b-fa7d-4838-af81-040c458dd767";
                      }}
                    />
                  </div>
                  <h2 className="biograf-title hide-text">
                    {KRAKEBACKENS_BIOGRAF}
                  </h2>
                </Menu.Item>
                <Menu.Menu className="menu-flex-container" position="right">
                  <Menu.Item
                    as={Link}
                    to="/mainpage"
                    name={HEM}
                    active={activeItem === HEM}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    as={Link}
                    to="/aboutus"
                    name={OM_OSS}
                    active={activeItem === OM_OSS}
                    onClick={this.handleItemClick}
                    content={OM_OSS}
                  />
                  <Menu.Item
                    as={Link}
                    to="/profile"
                    name={PROFIL}
                    active={activeItem === PROFIL}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    as={Link}
                    to="/mainpage"
                    name={FILMER}
                    active={activeItem === FILMER}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    as={Link}
                    to="/mainpage"
                    name={EVENTS}
                    active={activeItem === EVENTS}
                    onClick={this.handleItemClick}
                  />
                  {isAuthenticated && admin !== true && (
                    <Menu.Item
                      as={Link}
                      to="/movies"
                      name={FILMSORTIMENT}
                      active={activeItem === FILMSORTIMENT}
                      onClick={this.handleItemClick}
                      content={FILMSORTIMENT}
                    />
                  )}
                  {admin && (
                    <Menu.Item
                      as={Link}
                      to="/adminhome"
                      name={ADMIN}
                      active={activeItem === ADMIN}
                      onClick={() => this.props.goToAdminPage(true)}
                    />
                  )}
                  <Menu.Item />

                  {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/"
                      header
                      name={LOGGA_UT}
                      active={activeItem === LOGGA_UT}
                      onClick={event => this.onLogoutClick(event)}
                      content={LOGGA_UT}
                    />
                  ) : (
                    <React.Fragment>
                      <Menu.Item
                        as={Link}
                        to="/login"
                        header
                        name={LOGGA_IN}
                        content={LOGGA_IN}
                      />
                      <Menu.Item
                        as={Link}
                        to="/apply"
                        header
                        name={ANSOK_MEDLEMSKAP}
                        content={ANSOK_MEDLEMSKAP}
                      />
                    </React.Fragment>
                  )}
                </Menu.Menu>
              </Menu>
            </Segment>
            <Segment className="segment-height-40" />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  adminPage: state.adminPage.adminPage
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile,
    goToAdminPage
  }
)(Navbar);
