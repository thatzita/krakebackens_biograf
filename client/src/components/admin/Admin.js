import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Segment, Icon, Button, Header, Image } from "semantic-ui-react";
import "./admin.css";
import { getCurrentProfile } from "../../actions/profileActions";
import { goToAdminPage } from "../../actions/webPageStateActions";

const adminNavbarStyle = {
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
};

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "home"
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile.profile
    });
  }

  render() {
    const { username } = this.props.auth.user;

    const { activeItem } = this.state;
    // className="menuContainer"
    return (
      <Segment inverted style={adminNavbarStyle}>
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
            {username}.
          </Header.Subheader>
        </Header>

        <Menu
          text
          inverted
          vertical
          style={{
            position: "relative",
            margin: "auto",
            textAlign: "center",
            marginBottom: "2rem"
          }}
        >
          <Menu.Item
            name="Logga ut"
            active={activeItem === "Logga ut"}
            onClick={this.handleItemClick}
          >
            Logga ut
          </Menu.Item>
        </Menu>

        <Menu
          inverted
          vertical
          style={{ position: "relative", margin: "auto" }}
        >
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
            name="Månadens filmer"
            active={activeItem === "Månadens filmer"}
            onClick={this.handleItemClick}
          >
            Månadens Filmer
            <Icon name="star" />
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
      //   </div>
    );
  }
}
Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    getCurrentProfile,
    goToAdminPage
  }
)(Admin);
