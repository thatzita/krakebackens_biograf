import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import Admin from "../admin/Admin";

import { Button, Input, Icon, Item, Segment, Grid } from "semantic-ui-react";

import {
  getAllMovies,
  moviePopup,
  deleteMovie
} from "../../actions/movieActions";
import "./movies.css";

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      movies: [],
      movieInfo: {},
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

  showPopup(movie) {
    this.props.moviePopup(movie);
  }
  deleteMovie(movie) {
    this.props.deleteMovie(movie);
  }

  componentDidMount() {
    this.props.getAllMovies();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movies: nextProps.movies,
      movieInfo: nextProps.movieInfo,
      profile: nextProps.profile.profile
    });
  }

  render() {
    const { movies } = this.state.movies;
    const { showMore } = this.state;
    let showMoreContentButton;
    let movieContent;

    if (movies !== undefined) {
      if (this.props.movies.movies.length > showMore) {
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

      let filteredMovies = this.props.movies.movies.filter(movie => {
        return (
          movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
        );
      });
      let movieItem = filteredMovies.map(movie => {
        return (
          <Item key={movie.imdb_id}>
            <Item.Image
              className="posterImg"
              size="tiny"
              onClick={e => this.showPopup(movie)}
              src={movie.poster}
            />
            <Item.Content>
              <Item.Header>
                {movie.title} ( {movie.release.substring(0, 4)} ){" "}
                <em style={{ fontSize: "1rem", color: "gray" }}>
                  {" "}
                  - {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                </em>{" "}
              </Item.Header>
              {/* <Item.Meta>
                <span className="boldSpan"> {movie.release}</span>
              </Item.Meta> */}
              <Item.Extra>
                {movie.genres.map((genre, i) => {
                  return (
                    <span key={i} className="date">
                      {genre}{" "}
                    </span>
                  );
                })}
              </Item.Extra>

              {/* <Item.Meta>
                <Icon name="time" color="black" />
                <span className="cinema boldSpan">{movie.runtime} min</span>
              </Item.Meta> */}
            </Item.Content>
            <Button.Group className="addMovieBtnGroup">
              <Button
                basic
                style={{ height: "2.5rem", bottom: "0" }}
                onClick={e => this.deleteMovie(movie)}
                attached="bottom"
                floated="right"
              >
                <Icon name="delete" />
                Ta bort
              </Button>
              <Button
                color="violet"
                style={{ height: "2.5rem", bottom: "0" }}
                onClick={e => this.showPopup(movie)}
                attached="bottom"
                floated="right"
              >
                <Icon name="edit" />
                Ändra
              </Button>
            </Button.Group>
          </Item>
        );
      });

      movieContent = (
        <div>
          <br />
          <br />
          {/* <h2>Filmdatabas</h2> */}
          <Segment style={{ boxShadow: " 5px 5px 5px 0px rgba(0,0,0,0.75)" }}>
            <Item.Group divided>{movieItem.slice(0, showMore)}</Item.Group>
          </Segment>
        </div>
      );
    } else {
      movieContent = "";
    }

    return (
      <div className="movies">
        <div className="containerMovies">
          <h1 className="title">
            <Icon name="film" />
            Filmer
          </h1>
          <hr />
          <br />
          <Admin />
          <div className="searchContainer">
            <Input
              className="movieSearch"
              placeholder="Sök i databasen..."
              onChange={this.onChange}
              value={this.state.search}
              name="search"
            />

            <Link to="/addmovie">
              <Button color="green">
                <Icon name="add" />
                Lägg till i databasen
              </Button>
            </Link>
          </div>
          <Popup />
          <br />
          {movieContent}
        </div>
        <div className="loadMoreBtnContainer">{showMoreContentButton}</div>
        <br />
      </div>
    );
  }
}

Movies.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  // movieInfo: PropTypes.func.isRequired,
  // popupMovie: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  {
    getAllMovies,
    moviePopup,
    deleteMovie
  }
)(Movies);
