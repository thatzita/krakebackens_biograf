import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import Admin from "../admin/Admin";
import Footer from "../layout/Footer";

import {
  Button,
  Input,
  Icon,
  Item,
  Segment,
  Confirm,
  Label
} from "semantic-ui-react";

import {
  getAllMovies,
  moviePopup,
  deleteMovie,
  resetMovieSuccess
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
  deleteMovie(movie) {
    this.props.deleteMovie(movie);
  }

  componentDidMount() {
    this.props.getAllMovies();
    this.props.resetMovieSuccess();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movies: nextProps.movies,
      movieInfo: nextProps.movieInfo,
      profile: nextProps.profile.profile
    });
  }

  show = movie => {
    this.setState({ open: true, movie: movie });
  };

  handleConfirm = () => {
    this.deleteMovie(this.state.movie);
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    const { movies } = this.state.movies;
    const { showMore, open } = this.state;
    let showMoreContentButton;
    let movieContent;
    let movieItem;

    if (movies !== undefined) {
      // this.props.movies.map(movie => {});

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

      if (this.props.auth.user.admin) {
        movieItem = filteredMovies.map(movie => {
          return (
            <Item key={movie.imdb_id}>
              <Item.Image
                className="posterImg"
                size="tiny"
                onClick={e => this.showPopup(movie)}
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
                  {movie.genres.map((genre, i) => {
                    return (
                      <span key={i} className="date">
                        {genre}{" "}
                      </span>
                    );
                  })}
                </Item.Extra>
                <br />
                {movie.dvdOrBluRay === "dvd" ? <Label>DVD</Label> : ""}
                {movie.dvdOrBluRay === "bluRay" ? <Label>Blu-ray</Label> : ""}
                {movie.dvdOrBluRay === "usb" ? <Label>USB</Label> : ""}
                <Button.Group className="addMovieBtnGroup">
                  <Button
                    basic
                    style={{ height: "2.5rem", bottom: "0" }}
                    onClick={e => this.show(movie)}
                    attached="bottom"
                    floated="right"
                  >
                    <Icon name="delete" />
                    Ta bort
                  </Button>
                  <Confirm
                    open={open}
                    className="confirmDeleteMovie"
                    header="Du är på väg att ta bort en film"
                    content="Är du säker att du vill ta bort filmen?"
                    cancelButton="Gå tillbaka"
                    confirmButton="Ta bort"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                  />
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
              </Item.Content>
            </Item>
          );
        });
      } else {
        movieItem = filteredMovies.map(movie => {
          return (
            <Item key={movie.imdb_id}>
              <Item.Image
                className="posterImg"
                size="tiny"
                onClick={e => this.showPopup(movie)}
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
                  {movie.genres.map((genre, i) => {
                    return (
                      <span key={i} className="date">
                        {genre}{" "}
                      </span>
                    );
                  })}
                </Item.Extra>
                <Button.Group className="addMovieBtnGroup">
                  <Button
                    color="blue"
                    style={{ height: "2.5rem", bottom: "0" }}
                    onClick={e => this.showPopup(movie)}
                    attached="bottom"
                    floated="right"
                  >
                    <Icon name="eye" />
                    Mer info
                  </Button>
                </Button.Group>
              </Item.Content>
            </Item>
          );
        });
      }

      movieContent = (
        <div className="movieAlign">
          <br />
          <br />
          <Segment
            className="containerMoviesUser"
            style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}
          >
            <Item.Group divided>{movieItem.slice(0, showMore)}</Item.Group>
          </Segment>
        </div>
      );
    } else {
      movieContent = "";
    }

    return (
      <div className={this.props.auth.user.admin ? "movies" : ""}>
        <div className={this.props.auth.user.admin ? "containerMovies" : ""}>
          <h1 className={this.props.auth.user.admin ? "title" : "userMovies"}>
            <Icon name="film" />
            {this.props.auth.user.admin
              ? "Filmer"
              : "Filmer i Kråkans sortiment"}
          </h1>

          {this.props.auth.user.admin ? (
            <hr />
          ) : (
            <hr style={{ width: "40rem" }} />
          )}
          {this.props.auth.user.admin ? <Admin /> : ""}
          {this.props.auth.user.admin ? (
            <Link to="/addmovie">
              <Button color="green" floated="right">
                <Icon name="add" />
                Lägg till nya filmer
              </Button>
            </Link>
          ) : (
            ""
          )}

          <div
            className="searchContainer"
            style={
              this.props.auth.user.admin
                ? { marginTop: "5rem", marginBottom: "-4rem" }
                : { marginTop: "1rem", marginBottom: "-4rem" }
            }
          >
            <Input
              style={{ zIndex: "1" }}
              className="movieSearch"
              placeholder="Sök i databasen..."
              onChange={this.onChange}
              value={this.state.search}
              name="search"
            />
          </div>
          <Popup />
          <br />
          {movieContent}
        </div>
        <div
          className={
            this.props.auth.user.admin
              ? "loadMoreBtnContainer"
              : "loadMoreBtnContainerUser"
          }
        >
          {showMoreContentButton}
        </div>
        <br />
        {this.props.auth.user.admin ? "" : <Footer />}
      </div>
    );
  }
}

Movies.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
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
    deleteMovie,
    resetMovieSuccess
  }
)(Movies);
