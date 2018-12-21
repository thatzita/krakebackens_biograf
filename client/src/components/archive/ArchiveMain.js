import React, { Component } from "react";
import { connect } from "react-redux";
import Admin from "../admin/Admin";
import MovieArchive from "./Archive";
import UserArchive from "./UserArchive";
import EventArchive from "./EventArchive";

import { Button, Icon } from "semantic-ui-react";

class ArchiveMain extends Component {
  constructor() {
    super();
    this.state = {
      movieArchive: false,
      userArchive: false,
      eventArchive: false
    };
  }
  handleClick(e) {
    if (e.target.name === "movieArchive") {
      this.setState({
        [e.target.name]: !this.state.movieArchive,
        userArchive: false,
        eventArchive: false
      });
    } else if (e.target.name === "eventArchive") {
      this.setState({
        [e.target.name]: !this.state.eventArchive,
        movieArchive: false,
        userArchive: false
      });
    } else {
      this.setState({
        [e.target.name]: !this.state.userArchive,
        movieArchive: false,
        eventArchive: false
      });
    }
  }
  render() {
    return (
      <div className="movies">
        <div className="containerMovies">
          <h1 className="title">
            <Icon name="archive" />
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
            <Button onClick={e => this.handleClick(e)} name="eventArchive">
              <Icon name="calendar check outline" />
              Event
            </Button>
          </Button.Group>
          <Admin />
          {this.state.movieArchive ? <MovieArchive /> : ""}
          {this.state.userArchive ? <UserArchive /> : ""}
          {this.state.eventArchive ? <EventArchive /> : ""}
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
