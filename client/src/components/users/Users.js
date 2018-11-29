import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UserPopup from "./UserPopup";
import Admin from "../admin/Admin";

import { Button, Input, Icon, Item, Segment, Confirm } from "semantic-ui-react";
import { getAllUsers, userPopup, deleteUser } from "../../actions/usersActions";
import "./users.css";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      users: [],
      user: {},
      userInfo: {},
      search: "",
      showMore: 5,
      open: false
    };
    this.onChange = this.onChange.bind(this);
  }

  show = user => {
    this.setState({ open: true, user: user });
  };

  handleConfirm = () => {
    this.deleteUser(this.state.user);
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

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
    window.scrollTo(0, 50);
    this.props.userPopup(user);
  }

  deleteUser(user) {
    this.props.deleteUser(user);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile.profile,
      userInfo: nextProps.userInfo,
      users: nextProps.users
    });
  }
  render() {
    const { users } = this.state.users;
    const { showMore, open, result } = this.state;
    let showMoreContentButton;
    let userContent;

    if (users !== undefined) {
      if (this.props.users.users.length > showMore) {
        showMoreContentButton = (
          <Button color="violet" onClick={e => this.showMoreContent()}>
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
            <Icon
              className="userIconPointer"
              name="user circle outline"
              size="big"
              color="violet"
              onClick={e => this.showUserPopup(user)}
            />
            <Item.Content>
              <Item.Header>{user.username}</Item.Header>
              <Item.Meta className="ItemEmail">
                <Icon name="mail" />

                <em
                  style={{
                    fontSize: "1rem",
                    color: "gray"
                  }}
                >
                  {user.email}
                </em>
              </Item.Meta>
              <Item.Meta>
                <span className="boldSpan">
                  Status:{" "}
                  {user.vip.status ? (
                    <Icon name="star" color="yellow" />
                  ) : (
                    <Icon name="star" />
                  )}
                </span>
              </Item.Meta>
            </Item.Content>
            <Item.Group>
              <Button
                color="blue"
                onClick={e => this.showUserPopup(user)}
                attached="bottom"
                floated="right"
              >
                <Icon name="eye" className="editIcon" /> Mer info
              </Button>

              <Button
                basic
                // onClick={e => this.deleteUser(user)}
                onClick={e => this.show(user)}
                attached="bottom"
                floated="right"
              >
                <Icon name="delete" />
                Ta bort
              </Button>
              <Confirm
                open={open}
                className="confirmDeleteUser"
                cancelButton="Gå tillbaka"
                confirmButton="Ta bort"
                header="Du är på väg att ta bort en medlem"
                content="Är du säker? Det går inte att återställa en borttagen medlem."
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
            </Item.Group>
          </Item>
        );
      });

      userContent = (
        <div>
          <Item.Group divided>{userCards.slice(0, showMore)}</Item.Group>
        </div>
      );
    } else {
      userContent = "";
    }

    return (
      <div className="members">
        <div className="containerMembers">
          <h1 className="title">
            <Icon name="users" />
            Medlemmar
          </h1>
          <hr />
          <br />
          <Admin />
          <div className="searchContainer">
            <Input
              placeholder="Sök efter medlem..."
              onChange={this.onChange}
              value={this.state.search}
              name="search"
              className="userSearch"
            />
            <Link to="/register">
              <Button color="green">
                <Icon name="add" />
                Lägg till ny medlem
              </Button>
            </Link>
          </div>
          <UserPopup />
          <br />
          <br />
          <Segment style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}>
            {userContent}
          </Segment>
        </div>

        <div className="loadMoreBtnContainer">{showMoreContentButton}</div>
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
