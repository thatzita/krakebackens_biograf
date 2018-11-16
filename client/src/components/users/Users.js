import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UserPopup from "./UserPopup";
import Admin from "../admin/Admin";

import { Button, Input, Icon, Item, Divider, Grid } from "semantic-ui-react";
import { getAllUsers, userPopup, deleteUser } from "../../actions/usersActions";
import "./users.css";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      users: [],
      userInfo: {},
      search: "",
      showMore: 5
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  showMoreContent() {
    this.setState({
      showMore: this.state.showMore + 5
    });
  }

  showUserPopup(user) {
    console.log(user);
    this.props.userPopup(user);
  }

  deleteUser(user) {
    this.props.deleteUser(user);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      profile: nextProps.profile.profile,
      userInfo: nextProps.userInfo,
      users: nextProps.users
    });
  }
  render() {
    const { users } = this.state.users;
    const { showMore } = this.state;
    let showMoreContentButton;
    let userContent;

    if (users !== undefined) {
      if (this.props.users.users.length > showMore) {
        showMoreContentButton = (
          <Button basic color="purple" onClick={e => this.showMoreContent()}>
            Ladda fler medlemmar
          </Button>
        );
      } else {
        showMoreContentButton = "";
      }

      let filteredUsers = this.props.users.users.filter(user => {
        return (
          user.username
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      });
      let userCards = filteredUsers.map(user => {
        return (
          <Item key={user._id}>
            <Item.Content>
              <Item.Header>{user.username}</Item.Header>
              <Item.Meta>
                <span className="boldSpan"> {user.email}</span>
              </Item.Meta>
              <Item.Meta>
                <span className="boldSpan">
                  Status:{" "}
                  {user.vip.status
                    ? `VIP med plats ${user.vip.seat}`
                    : "Medlem"}
                </span>
              </Item.Meta>
            </Item.Content>
            <Item.Group>
              <Button
                basic
                color="red"
                onClick={e => this.deleteUser(user)}
                icon
                attached="bottom"
                floated="right"
              >
                <Icon color="red" name="delete" className="deleteIcon" />
              </Button>
              <Button
                basic
                color="green"
                onClick={e => this.showUserPopup(user)}
                icon
                attached="bottom"
                floated="right"
              >
                <Icon color="green" name="edit" className="editIcon" />
              </Button>
            </Item.Group>
          </Item>
        );
      });

      userContent = (
        <div>
          <br />

          <Item.Group divided>{userCards.slice(0, showMore)}</Item.Group>
        </div>
      );
    } else {
      userContent = "";
    }

    return (
      <div className="members">
        <div className="containerMembers">
          <h1>Medlemmar</h1>
          <hr />
          <Admin />
          <Input
            placeholder="Sök efter medlem..."
            onChange={this.onChange}
            value={this.state.search}
            name="search"
          />
          <Link to="/register">
            <Button basic color="violet">
              <Icon name="plus" />
              Lägg till ny medlem
            </Button>
          </Link>
          <UserPopup />

          {userContent}
        </div>

        <br />
        <Grid verticalAlign="middle" columns={4} centered>
          {showMoreContentButton}
        </Grid>
      </div>
    );
  }
}

Users.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  users: state.users
});

export default connect(
  mapStateToProps,
  {
    getAllUsers,
    userPopup,
    deleteUser
  }
)(Users);