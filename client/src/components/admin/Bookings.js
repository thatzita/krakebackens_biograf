import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Segment, Icon, Divider } from "semantic-ui-react";
import {
  getAllMonMovies,
  getAllMonEvents
} from "../../actions/monMovieActions";
import { getCurrentProfile } from "../../actions/profileActions";

import { seatNameConverter } from "../common/seatingFunctions";

import Admin from "./Admin";

class Bookings extends Component {
  constructor() {
    super();
    this.state = { monMovies: {}, monEvents: {} };
  }

  componentDidMount() {
    this.props.getAllMonMovies();
    this.props.getAllMonEvents();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      monMovies: nextProps.monMovies.monMovies,
      monEvents: nextProps.monMovies.monEvents
    });
  }

  render() {
    const { monMovies, monEvents } = this.state;

    let userBookedMovie = [];
    let userBookedEvent = [];
    let movieBookedContent;
    let eventBookedContent;

    if (monMovies !== undefined) {
      for (let i = 0; i < monMovies.length; i++) {
        // if (monMovies[i].saloon === "1") {
        monMovies[i].seating.forEach(movie => {
          movie.forEach(customer => {
            if (customer.customer !== "") {
              userBookedMovie.push({
                title: customer.title,
                screeningDate: customer.screeningDate,
                screeningTime: customer.screeningTime,
                seat: customer.seat,
                username: customer.customer.username,
                email: customer.customer.email
              });
            }
          });
        });
        // }
      }

      let movieItemToRender = userBookedMovie.map((customer, index) => {
        return (
          <React.Fragment key={index}>
            <List.Item>
              <List.Header>{customer.title}</List.Header>
              <List.Content style={{ marginTop: "5px" }}>
                <Icon name="user" color="black" />
                {customer.username}
              </List.Content>
              <List.Content style={{ marginTop: "5px" }}>
                <Icon name="mail" color="black" />
                {customer.email}
              </List.Content>
              <List.Content style={{ marginTop: "5px" }}>
                <Icon name="calendar" color="black" />
                {customer.screeningDate}
                &nbsp; -&nbsp;{customer.screeningTime}
              </List.Content>
              <List.Content style={{ marginTop: "5px" }}>
                <strong style={{ color: "black" }}>Plats:</strong>{" "}
                {seatNameConverter(customer.seat)}
              </List.Content>
            </List.Item>
            <Divider />
          </React.Fragment>
        );
      });

      movieBookedContent = (
        <div className="movieAlign">
          <h2 style={{ marginLeft: "5px" }}>Filmer</h2>
          <Segment
            className="containerMoviesUser"
            style={{
              boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)"
            }}
          >
            <List selection>{movieItemToRender}</List>
          </Segment>
        </div>
      );
    }

    if (monEvents !== undefined) {
      for (let i = 0; i < monEvents.length; i++) {
        monEvents[i].seating.map(customer => {
          if (customer.booked) {
            userBookedEvent.push({
              title: monEvents[i].title,
              screeningDate: monEvents[i].screeningDate,
              screeningTime: monEvents[i].screeningTime,
              username: customer.customer.username,
              email: customer.customer.email
            });
          }
          return null;
        });
      }

      let eventItemToRender = userBookedEvent.map((customer, index) => {
        return (
          <React.Fragment key={index}>
            <List.Item>
              <List.Header>{customer.title}</List.Header>
              <List.Content style={{ marginTop: "5px" }}>
                <Icon name="user" color="black" />
                {customer.username}
              </List.Content>
              <List.Content style={{ marginTop: "5px" }}>
                <Icon name="mail" color="black" />
                {customer.email}
              </List.Content>
              <List.Content style={{ marginTop: "5px" }}>
                <Icon name="calendar" color="black" />
                {customer.screeningDate}
                &nbsp; -&nbsp;{customer.screeningTime}
              </List.Content>
            </List.Item>
            <Divider />
          </React.Fragment>
        );
      });

      eventBookedContent = (
        <div className="movieAlign">
          <br />
          <br />
          <h2 style={{ marginLeft: "5px" }}>Evenemag</h2>
          <Segment
            className="containerMoviesUser"
            style={{
              boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)"
            }}
          >
            <List selection>{eventItemToRender}</List>
          </Segment>
        </div>
      );
    }

    return (
      <div className="movies">
        <div className="containerMovies">
          <h1 className="title">
            <Icon name="ticket" />
            Bokningar
          </h1>

          {this.props.auth.user.admin ? (
            <hr />
          ) : (
            <hr style={{ width: "40rem" }} />
          )}
          <Admin />

          {movieBookedContent}
          <br />
          <br />
          {eventBookedContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  monMovies: state.monMovies,
  monEvents: state.monEvents
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getAllMonMovies,
    getAllMonEvents
  }
)(Bookings);
