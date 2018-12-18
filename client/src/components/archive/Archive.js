import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Input, Icon, Item, Segment, Label } from "semantic-ui-react";

import { moviePopup } from "../../actions/movieActions";
import { getAllMoviesArchive } from "../../actions/monMovieActions";
import "../movies/movies.css";

class Archive extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      monMovies: [],
      movieInfo: {},
      search: "",
      showMore: 10,
      show: false,
      movie: {}
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
      showMore: this.state.showMore + 10
    });
  }

  showPopup(movie) {
    this.props.moviePopup(movie);
  }

  componentDidMount() {
    this.props.getAllMoviesArchive();
  }

  bookedSeats(movie) {
    let count = 0;

    if (movie.saloon === "2" && movie.fullyBooked === false) {
      movie.seating[0].map(seat => {
        if (seat.booked) {
          count++;
        }
      });
      movie.seating[1].map(seat => {
        if (seat.booked) {
          count++;
        }
      });
      return count + " bokade";
    } else if (movie.fullyBooked) {
      return (count = "Fullbokad");
    }

    if (movie.saloon === "1" && movie.fullyBooked === false) {
      movie.seating[0].map(seat => {
        if (seat.booked) {
          count++;
        }
      });
      movie.seating[1].map(seat => {
        if (seat.booked) {
          count++;
        }
      });
      movie.seating[2].map(seat => {
        if (seat.booked) {
          count++;
        }
      });
      return count + " bokade";
    } else if (movie.fullyBooked) {
      return (count = "Fullbokad");
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      monMovies: nextProps.monMovies,
      movieInfo: nextProps.movieInfo,
      profile: nextProps.profile.profile
    });
  }

  render() {
    const { movies } = this.state.monMovies;
    const { showMore, open } = this.state;
    let showMoreContentButton;
    let movieContent;

    if (movies !== undefined) {
      if (this.props.monMovies.movies.length > showMore) {
        showMoreContentButton = (
          <Button
            className="loadMoreBtn"
            color="violet"
            onClick={e => this.showMoreContent()}
          >
            Ladda mer filmer
          </Button>
        );
      } else {
        showMoreContentButton = "";
      }

      let filteredMovies = this.props.monMovies.movies.filter(movie => {
        return (
          movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
        );
      });
      let movieItem = filteredMovies.map((movie, index) => {
        return (
          <Item key={index}>
            <Item.Image
              className="posterImg"
              size="tiny"
              src={movie.poster}
              onError={e => {
                e.target.src = "poster_not_available.jpg";
              }}
            />

            <Item.Content>
              <Item.Header>
                {movie.title} ( {movie.release.substring(0, 4)} ){" "}
                <em style={{ fontSize: "1rem", color: "gray" }}>
                  {" "}
                  - {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                </em>{" "}
              </Item.Header>

              <Item.Extra>
                <p>
                  <Icon name="calendar" />
                  {movie.screeningDate}
                </p>
                <p>
                  <Icon name="clock" />
                  {movie.screeningTime}
                </p>
              </Item.Extra>
              <Item.Extra>
                <Label>Salong {movie.saloon}</Label>
                <Label>{this.bookedSeats(movie)}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      });
      movieItem.reverse();

      movieContent = (
        <div>
          <br />
          <br />
          <Segment style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}>
            <Item.Group divided>{movieItem.slice(0, showMore)}</Item.Group>
          </Segment>
        </div>
      );
    } else {
      movieContent = "";
    }

    return (
      <React.Fragment>
        <div style={{ marginTop: "3rem" }} className="searchContainer">
          <Input
            className="movieSearch"
            placeholder="Sök i arkivet..."
            onChange={this.onChange}
            value={this.state.search}
            name="search"
          />
        </div>
        <br />
        {movieContent}
        <div style={{ marginLeft: "-2rem" }} className="loadMoreBtnContainer">
          {showMoreContentButton}
        </div>
        <br />
      </React.Fragment>
    );
  }
}

Archive.propTypes = {
  getAllMoviesArchive: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  monMovies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  monMovies: state.monMovies
});

export default connect(
  mapStateToProps,
  {
    getAllMoviesArchive,
    moviePopup
  }
)(Archive);
