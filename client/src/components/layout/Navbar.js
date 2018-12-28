import React, { Component } from "react";
import { Menu, Segment, Image } from "semantic-ui-react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { goToAdminPage } from "../../actions/webPageStateActions";

const tempMenuStyle = {
  backgroundColor: "#470877",
  borderRadius: "0",
  position: "fixed",
  width: "100%",
  zIndex: "2",
  top: "0",
  WebkitBoxShadow: "0 0 20px rgba(0,0,0,0.8)",
  MozBoxShadow: "0 0 20px rgba(0,0,0,0.8)",
  boxShadow: "0 0 20px rgba(0,0,0,0.8)"
};

class Navbar extends Component {
  constructor() {
    super();
    this.state = { activeItem: "home" };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === "Filmer") {
      window.scrollTo({ top: 550, behavior: "smooth" });
    }
    if (name === "Evenemang") {
      window.scrollTo({ top: 1000, behavior: "smooth" });
    }
    if (name === "Main" || name === "Hem") {
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

    let { isAuthenticated } = this.props.auth;
    let { admin } = this.props.auth.user;

    return (
      <React.Fragment>
        {!(localStorage.adminPage || false) ? (
          <React.Fragment>
            <Segment style={tempMenuStyle}>
              <Menu inverted secondary>
                <Menu.Item
                  header
                  style={{ padding: "0" }}
                  as={Link}
                  to={isAuthenticated ? "/mainpage" : "/"}
                  name="Main"
                  active={activeItem === "Main"}
                  onClick={this.handleItemClick}
                >
                  <Image
                    style={{ width: "60px" }}
                    src="krakelogo.gif"
                    onError={e => {
                      e.target.src =
                        "https://firebasestorage.googleapis.com/v0/b/krakebackensbiograf-c3aa9.appspot.com/o/krakebackens_logo.png?alt=media&token=4c75370b-fa7d-4838-af81-040c458dd767";
                    }}
                  />
                  <h2
                    style={{
                      fontWeight: "lighter",
                      padding: "0",
                      margin: "0 1rem"
                    }}
                  >
                    Kråkebackens biograf
                  </h2>
                </Menu.Item>

                <Menu.Menu position="right">
                  {/* {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/profile"
                      name="Biljetter"
                      active={activeItem === "Biljetter"}
                      onClick={this.handleItemClick}
                    />
                  ) : null} */}
                  {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/mainpage"
                      name="Hem"
                      active={activeItem === "Hem"}
                      onClick={this.handleItemClick}
                    />
                  ) : null}

                  {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/profile"
                      name="Profil"
                      active={activeItem === "Profil"}
                      onClick={this.handleItemClick}
                    />
                  ) : null}

                  {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/mainpage"
                      name="Filmer"
                      active={activeItem === "Filmer"}
                      onClick={this.handleItemClick}
                    />
                  ) : null}
                  {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/mainpage"
                      name="Evenemang"
                      active={activeItem === "Evenemang"}
                      onClick={this.handleItemClick}
                    />
                  ) : null}
                  {isAuthenticated && admin !== true ? (
                    <Menu.Item
                      as={Link}
                      to="/movies"
                      name="Filmsortiment"
                      active={activeItem === "Filmsortiment"}
                      onClick={this.handleItemClick}
                      content="Filmsortiment"
                    />
                  ) : null}

                  {/* {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/"
                      name="Om oss"
                      active={activeItem === "Om oss"}
                      onClick={this.handleItemClick}
                      content="Om oss"
                    />
                  ) : null} */}

                  {/* {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/mainpage"
                      name="Kontakta oss"
                      active={activeItem === "Kontakta oss"}
                      onClick={this.handleItemClick}
                      content="Kontakta oss"
                    />
                  ) : null} */}

                  {admin ? (
                    <Menu.Item
                      as={Link}
                      to="/adminhome"
                      name="Admin"
                      active={activeItem === "Admin"}
                      onClick={() => this.props.goToAdminPage(true)}
                    />
                  ) : (
                    ""
                  )}

                  <Menu.Item />

                  {isAuthenticated ? (
                    <Menu.Item
                      as={Link}
                      to="/"
                      header
                      name="Logga ut"
                      active={activeItem === "Logga ut"}
                      onClick={event => this.onLogoutClick(event)}
                      content="Logga ut"
                    />
                  ) : (
                    <React.Fragment>
                      <Menu.Item
                        as={Link}
                        to="/login"
                        header
                        name="Logga in"
                        // active={activeItem === "Logga in"}
                        // onClick={this.handleItemClick}
                        content="Logga in"
                      />

                      <Menu.Item
                        as={Link}
                        to="/apply"
                        header
                        name="Ansök om medlemskap"
                        // active={activeItem === "Logga in"}
                        // onClick={this.handleItemClick}
                        content="Ansök om medlemskap"
                      />
                    </React.Fragment>
                  )}
                </Menu.Menu>
              </Menu>
            </Segment>
            <Segment style={{ height: "40px" }} />
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
