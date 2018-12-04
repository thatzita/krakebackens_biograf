import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Popup from "./Popup";
import { Link } from "react-router-dom";
import Admin from "../admin/Admin";
import MovieArchive from "./Archive";
import UserArchive from "./UserArchive";

import {
  Button,
  Input,
  Icon,
  Item,
  Segment,
  Confirm,
  Label
} from "semantic-ui-react";

class ArchiveMain extends Component {
  constructor() {
    super();
    this.state = {
      movieArchive: false,
      userArchive: false
    };
  }
  handleClick(e) {
    if (e.target.name === "movieArchive") {
      this.setState({
        [e.target.name]: !this.state.movieArchive,
        userArchive: false
      });
    } else {
      this.setState({
        [e.target.name]: !this.state.userArchive,
        movieArchive: false
      });
    }
  }
  render() {
    return (
      <div className="movies">
        <div className="containerMovies">
          <h1 className="title">
            <Icon name="film" />
            Arkivet
          </h1>
          <hr />
          <br />
          <div className="searchContainer" />
          <Button.Group attached="bottom" style={{ left: "-2.5rem" }}>
            <Button onClick={e => this.handleClick(e)} name="movieArchive">
              <Icon name="film" />
              Filmer
            </Button>
            <Button onClick={e => this.handleClick(e)} name="userArchive">
              <Icon name="users" />
              Användare
            </Button>
          </Button.Group>
          <Admin />
          {this.state.movieArchive ? <MovieArchive /> : ""}
          {this.state.userArchive ? <UserArchive /> : ""}
          <br />
        </div>
        <div className="loadMoreBtnContainer">{}</div>
        <br />
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(ArchiveMain);
