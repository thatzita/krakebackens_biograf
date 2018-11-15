import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import "./admin.css";
import { getCurrentProfile } from "../../actions/profileActions";

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
    return (
      <div className="menuContainer">
        <Menu inverted vertical>
          <Menu.Item
            name="Hem"
            active={activeItem === "Hem"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/users"
            name="Medlemmar"
            active={activeItem === "Medlemmar"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/movies"
            name="Filmer"
            active={activeItem === "Filmer"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/monthlymovies"
            name="Månadens filmer"
            active={activeItem === "Månadens filmer"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/statistic"
            name="Statistik"
            active={activeItem === "Statistik"}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            as={Link}
            to="/mainpage"
            name="Tillbaka till Biografen"
            active={activeItem === "Tillbaka till Biografen"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
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
    getCurrentProfile
  }
)(Admin);
