import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Segment, Icon, Button, Header, Image } from "semantic-ui-react";

import {
  getCurrentProfile,
  clearCurrentProfile
} from "../../actions/profileActions";
import { goToAdminPage } from "../../actions/webPageStateActions";
import { logoutUser } from "../../actions/authActions";

import "./admin.css";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "home",
      hideAdminMenu: true
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile.profile,
      hideAdminMenu: nextProps.hideAdminMenu
    });
  }

  logoutUserAndClearProfile() {
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    localStorage.removeItem("adminPage");
  }

  render() {
    const { username } = this.props.auth.user;

    const { activeItem, hideAdminMenu } = this.state;

    return (
      <div>
        <Segment
          inverted
          style={{
            display: hideAdminMenu ? "none" : "block",
            borderRadius: "0",
            position: "fixed",
            zIndex: "2",
            margin: "0",
            left: "0",
            top: "0",
            height: "100vh",
            width: "20%",
            minWidth: "230px",
            maxWidth: "300px"
          }}
        >
          <div
            onClick={() => {
              this.setState({ hideAdminMenu: true });
            }}
          >
            X
          </div>
          <Header
            dividing
            inverted
            as="h3"
            textAlign="center"
            style={{ marginTop: "2rem" }}
          >
            <Image
              src="krakebackens_logo.png"
              style={{ width: "80px", marginBottom: "1rem" }}
            />
            <br />
            Välkommen
            <Header.Subheader style={{ marginTop: "0.5rem" }}>
              {username}
            </Header.Subheader>
          </Header>

          <Menu
            inverted
            vertical
            style={{ position: "relative", margin: "auto" }}
          >
            <Menu.Menu
              style={{
                margin: "auto",
                textAlign: "center",
                marginBottom: "2rem"
              }}
            >
              <Menu.Item
                name="Logga ut"
                active={activeItem === "Logga ut"}
                onClick={() => this.logoutUserAndClearProfile()}
              >
                Logga ut
              </Menu.Item>
            </Menu.Menu>

            <Menu.Item
              as={Link}
              to="/adminhome"
              name="Hem"
              active={activeItem === "Hem"}
              onClick={this.handleItemClick}
            >
              Hem
              <Icon name="home" />
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/users"
              name="Medlemmar"
              active={activeItem === "Medlemmar"}
              onClick={this.handleItemClick}
            >
              Medlemmar
              <Icon name="users" />
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/movies"
              name="Filmer"
              active={activeItem === "Filmer"}
              onClick={this.handleItemClick}
            >
              Filmer
              <Icon name="film" />
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/monMovieList"
              name="Kommande filmer"
              active={activeItem === "Kommande filmer"}
              onClick={this.handleItemClick}
            >
              Kommande filmer
              <Icon name="star" />
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/bookings"
              name="Bokningar"
              active={activeItem === "Bokningar"}
              onClick={this.handleItemClick}
            >
              Bokningar
              <Icon name="ticket" />
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/statistic"
              name="Statistik"
              active={activeItem === "Statistik"}
              onClick={this.handleItemClick}
            >
              Statistik
              <Icon name="chart bar" />
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/moviearchive"
              name="Arkivet"
              active={activeItem === "Arkivet"}
              onClick={this.handleItemClick}
            >
              Arkivet
              <Icon name="archive" />
            </Menu.Item>
          </Menu>

          <Button
            style={{ marginTop: "4rem" }}
            inverted
            basic
            as={Link}
            to="/mainpage"
            name="Tillbaka till Biografen"
            active={activeItem === "Tillbaka till Biografen"}
            onClick={() => this.props.goToAdminPage(false)}
          >
            <Icon name="left angle" />
            Tillbaka till Biografen
          </Button>
        </Segment>
      </div>
    );
  }
}
Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    clearCurrentProfile,
    logoutUser,
    getCurrentProfile,
    goToAdminPage
  }
)(Admin);
