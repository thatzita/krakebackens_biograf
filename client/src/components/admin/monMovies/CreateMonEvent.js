import React, { Component } from "react";
import {
  Segment,
  Header,
  Dropdown,
  Icon,
  Form,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllMovies } from "../../../actions/movieActions";
import { postMonEvent } from "../../../actions/monMovieActions";

import DateTimePickerEvent from "./DateTimePickerEvent";
import PreviewSubmitEvent from "./PreviewSubmitEvent";
import MonEventMessage from "./MonEventMessage";
import MonMovieCrowRating from "./MonMovieCrowRating";
import Admin from "../../admin/Admin";
import "./monMovies.css";
import { numberOfSeats } from "./numberOfSeats.js";

class CreateMonEvent extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      time: "",
      description: "",
      seat: null,
      title: "",

      previewPage: false,
      crowRating: "",
      monEventMessage: ""
    };
    this.seatValue = this.seatValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getAllMovies();
  }

  seatValue(e, { value }) {
    // e.persist();

    this.setState({
      seat: value
    });
  }

  onSubmitEvent = () => {
    let createDate = new Date(this.state.date + "T" + this.state.time);
    let utc_time = createDate.toUTCString();
    let createDate_1 = new Date(this.state.date + "T" + this.state.time);
    let createDate_2 = new Date(this.state.date + "T" + this.state.time);
    let cancelTime = new Date(
      createDate_1.setHours(createDate_1.getHours() - 2)
    );
    let reminderTime = new Date(
      createDate_2.setHours(createDate_2.getHours() - 24)
    );

    let cancel_utc_time = cancelTime.toUTCString();
    let reminder_utc_time = reminderTime.toUTCString();
    let eventObject = {
      title: this.state.title,
      description: this.state.description,
      poster: "krakebackens_logo.png",
      background: "skogdel3.jpg",
      crowRating: this.state.crowRating
    };

    let monEventDb = {
      event: eventObject,
      date: this.state.date,
      time: this.state.time,
      utc_time: utc_time,
      cancel_utc_time: cancel_utc_time,
      reminder_utc_time: reminder_utc_time,
      seat: this.state.seat,
      crowRating: this.state.crowRating,
      monEventMessage: this.state.monEventMessage
    };
    this.props.postMonEvent(monEventDb);
  };

  handleTimeChange = (e, { name, value }) => this.setState({ [name]: value });

  handleChange = value => {
    this.setState({ saloon: value });
  };

  handleTextarea = (name, value) => {
    if (name === "crowRating") {
      this.setState({ crowRating: value });
    } else {
      this.setState({ monEventMessage: value });
    }
  };

  goToOrLeavePreviewPage = bol => {
    window.scrollTo(0, 0);
    this.setState({ previewPage: bol });
  };

  render() {
    const { title, description } = this.state;
    let eventObject = {
      title: this.state.title,
      description: this.state.description,
      seat: this.state.seat,
      crowRating: this.state.crowRating
    };
    const createPage = (
      <React.Fragment>
        <Admin />
        <Header as="h2" dividing>
          <Header.Content
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              margin: "1rem"
            }}
          >
            <div>
              <Icon name="calendar check outline" />
              Skapa evenemang
            </div>
            <Button basic position="right" as={Link} to="/MonMovieList">
              <Icon name="left chevron" />
              Tillbaka
            </Button>
          </Header.Content>
        </Header>

        <Segment>
          <Header>
            <Icon name="users" />
            Evenemang information
          </Header>
          <Form>
            <Form.Field>
              <label>Titel</label>
              <input
                name="title"
                value={title}
                onChange={this.onChange}
                placeholder="Namn på evenemanget"
              />
            </Form.Field>
            <Form.Field>
              <label>Beskrivning</label>
              <textarea
                name="description"
                value={description}
                onChange={this.onChange}
                placeholder="Beskrivning av evenemanget"
              />
            </Form.Field>
          </Form>
        </Segment>
        <MonEventMessage
          monEventMessage={this.state.monEventMessage}
          handleTextarea={this.handleTextarea}
        />
        <MonMovieCrowRating
          crowRating={this.state.crowRating}
          handleTextarea={this.handleTextarea}
        />
        <Segment>
          <Header>
            <Icon name="comment outline" />
            Antal platser
          </Header>
          <Dropdown
            placeholder="Välj antal platser"
            search
            selection
            options={numberOfSeats}
            onChange={this.seatValue}
          />
        </Segment>
        <DateTimePickerEvent
          // eventObject={this.state.eventObject}
          handleTimeChange={this.handleTimeChange}
          // movieId={this.state.movieId}
          date={this.state.date}
          time={this.state.time}
          goToOrLeavePreviewPage={this.goToOrLeavePreviewPage}
        />
      </React.Fragment>
    );

    const previewSubmitPage = (
      <React.Fragment>
        <PreviewSubmitEvent
          eventObject={eventObject}
          // movies={movies}
          // saloon={this.state.saloon}
          date={this.state.date}
          time={this.state.time}
          goToOrLeavePreviewPage={this.goToOrLeavePreviewPage}
          onSubmitEvent={this.onSubmitEvent}
          monEventMessage={this.state.monEventMessage}
          crowRating={this.state.crowRating}
        />
      </React.Fragment>
    );

    return (
      <div
        style={{
          backgroundColor: " #f8f8ff",
          // width: "100%"
          width: "100%",
          height: "auto",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "flex-end",
          // backgroundColor: "#f4f4f4",
          padding: "2rem"
        }}
      >
        {/* <div className="containerMonMoviesCreateBackground"> */}
        <div
          style={{
            marginRight: "5rem",
            marginBottom: "2rem",
            width: "60%",
            minWidth: "300px",

            position: "relative",
            height: "100%"
          }}
          className="containerMonMoviesCreate"
        >
          {this.state.previewPage ? previewSubmitPage : createPage}
        </div>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies
});

export default connect(
  mapStateToProps,
  { getAllMovies, postMonEvent }
)(CreateMonEvent);
