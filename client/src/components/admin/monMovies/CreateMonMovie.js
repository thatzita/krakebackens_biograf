import React, { Component } from "react";
// import { Segment, Input, Table, Header, Image, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import { getAllMovies } from "../../../actions/movieActions";
import { postMonmovie } from "../../../actions/monMovieActions";

import DateTimePicker from "./DateTimePicker";
import MoviePicker from "./MoviePicker";
import ChooseSaloon from "./ChooseSaloon";
import PreviewSubmitMonMovie from "./PreviewSubmitMonMovie";
import Admin from "../../admin/Admin";
import "./monMovies.css";

class CreateMonMovie extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      date: "",
      time: "",
      movieId: "",
      saloon: "1",
      eventObject: {},
      previewPage: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getAllMovies();
  }

  onSubmitEvent = () => {
    // console.log("date ", this.state.date);
    // console.log("time ", this.state.time);

    let createDate = new Date(this.state.date + "T" + this.state.time);
    let utc_time = createDate.toUTCString();

    let createDate_1 = new Date(this.state.date + "T" + this.state.time);
    let createDate_2 = new Date(this.state.date + "T" + this.state.time);
    let cancelTime = new Date(
      createDate_1.setHours(createDate_1.getHours() - 2)
    );
    let reminderTime = new Date(
      createDate_2.setHours(createDate_2.getHours() - 6)
    );

    let cancel_utc_time = cancelTime.toUTCString();
    let reminder_utc_time = reminderTime.toUTCString();

    let monMovieDb = {
      mov: this.state.eventObject,
      date: this.state.date,
      time: this.state.time,
      utc_time: utc_time,
      cancel_utc_time: cancel_utc_time,
      reminder_utc_time: reminder_utc_time,
      saloon: this.state.saloon
    };
    this.props.postMonmovie(monMovieDb);
  };

  onSearch = value => {
    this.setState({ search: value });
  };

  handleTimeChange = (e, { name, value }) => this.setState({ [name]: value });

  handleChange = value => {
    this.setState({ saloon: value });
  };

  selectMovie = (id, movies) => {
    let movId;
    if (id) {
      if (this.state.movieId === id) {
        movId = "";
        this.setState({ movieId: movId, eventObject: {} });
      } else {
        movId = id;
        let objArray = movies.filter(obj => obj._id === movId);
        this.setState({ movieId: movId, eventObject: objArray[0] || {} });
      }
    }
  };

  goToOrLeavePreviewPage = bol => {
    window.scrollTo(0, 0);
    this.setState({ previewPage: bol });
  };

  render() {
    console.log(this.state);

    let movies = this.props.movies || [];

    let movieList =
      this.state.search.length <= 0
        ? []
        : movies.filter(movie => {
            return (
              movie.title
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          });

    const createPage = (
      <React.Fragment>
        <Admin />
        <MoviePicker
          movieId={this.state.movieId}
          onSearch={this.onSearch}
          selectMovie={this.selectMovie}
          movieList={movieList}
          movies={movies}
          eventObject={this.state.eventObject}
        />
        <ChooseSaloon
          handleChange={this.handleChange}
          saloon={this.state.saloon}
        />
        <DateTimePicker
          eventObject={this.state.eventObject}
          handleTimeChange={this.handleTimeChange}
          movieId={this.state.movieId}
          date={this.state.date}
          time={this.state.time}
          goToOrLeavePreviewPage={this.goToOrLeavePreviewPage}
        />
      </React.Fragment>
    );

    const previewSubmitPage = (
      <React.Fragment>
        <PreviewSubmitMonMovie
          eventObject={this.state.eventObject}
          movies={movies}
          saloon={this.state.saloon}
          date={this.state.date}
          time={this.state.time}
          goToOrLeavePreviewPage={this.goToOrLeavePreviewPage}
          onSubmitEvent={this.onSubmitEvent}
        />
      </React.Fragment>
    );
    console.log(this.state.saloon);

    return (
      // <React.Fragment>
      <div className="containerMonMoviesCreateBackground">
        <div className="containerMonMoviesCreate">
          {this.state.previewPage ? previewSubmitPage : createPage}
        </div>
      </div>
      // </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies
});

export default connect(
  mapStateToProps,
  { getAllMovies, postMonmovie }
)(CreateMonMovie);
