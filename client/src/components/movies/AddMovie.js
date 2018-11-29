import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input, Segment, Button, Item, Image, Icon } from "semantic-ui-react";
import {
  searchMovie,
  imdbPopup,
  getMovieInfoAddtoDb
} from "../../actions/movieActions";
import DbPopup from "./DbPopup";
import { Link } from "react-router-dom";
import Admin from "../admin/Admin";
import { getCurrentProfile } from "../../actions/profileActions";

class AddMovie extends Component {
  constructor() {
    super();
    this.state = {
      moviesFound: [],
      searchedMovie: "",
      popupMovie: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      moviesFound: nextProps.movies.moviesFound,
      popupMovie: nextProps.movies.popupMovie,
      profile: nextProps.profile.profile
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    let { searchedMovie } = this.state;
    this.props.searchMovie(searchedMovie);
  }

  showPopup(movieId) {
    this.props.imdbPopup(movieId);
  }

  addToDb(movieId) {
    this.props.getMovieInfoAddtoDb(movieId);
  }

  render() {
    let { moviesFound } = this.state;
    let movieList;
    let posterUrl = "http://image.tmdb.org/t/p/w300";

    if (moviesFound !== undefined) {
      let movieCards = moviesFound.map(movie => {
        return (
          <Item value={movie.id} key={movie.id}>
            <Item.Image
              onClick={e => this.showPopup(movie.id)}
              className="posterImg"
              size="tiny"
              src={posterUrl + movie.poster_path}
              alt="Ingen bild hittades"
              onError={e => {
                e.target.src = "poster_not_available.jpg";
              }}
            />
            <Item.Content>
              <Item.Header>
                {movie.title} ( {movie.release_date.substring(0, 4)} ){" "}
              </Item.Header>
              <Item.Extra>&nbsp;</Item.Extra>
              <Button.Group className="addMovieBtnGroup">
                <Button
                  color="blue"
                  onClick={e => this.showPopup(movie.id)}
                  attached="bottom"
                  // floated="right"
                >
                  <Icon name="eye" className="editIcon" /> Mer info
                </Button>
                <Button
                  color="green"
                  onClick={e => this.addToDb(movie.id)}
                  attached="bottom"
                  // floated="right"
                >
                  <Icon name="add circle" className="editIcon" />
                  Lägg till
                </Button>
              </Button.Group>
            </Item.Content>
          </Item>
        );
      });
      movieList = <Item.Group divided> {movieCards}</Item.Group>;
    } else {
      movieList = <h1 style={{ textAlign: "center" }}>Sök efter film</h1>;
    }
    console.log(moviesFound);
    return (
      <div className="addMovie">
        <div className="containerAddmovie">
          <div className="addmovieDiv">
            <h1 className="title">
              <Icon name="film" />
              Lägg till film
            </h1>
            <hr />
            <br />
            <Admin />
            <div className="searchContainer">
              <Input
                className="movieSearch"
                name="searchedMovie"
                value={this.state.searchedMovie}
                onChange={this.onChange}
                placeholder="Skriv namn på film..."
              />
              <Button color="violet" type="submit" onClick={this.onSubmit}>
                Sök
              </Button>

              <Link to="/movies">
                <Button basic>
                  <Icon name="left chevron" />
                  Tillbaka till databasen
                </Button>
              </Link>
            </div>
            <br />
            <br />
            <DbPopup />
          </div>
          <Segment style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}>
            {movieList}
          </Segment>
        </div>
      </div>
    );
  }
}

AddMovie.propTypes = {
  searchMovie: PropTypes.func.isRequired,
  imdbPopup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getMovieInfoAddtoDb: PropTypes.func.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies,
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    searchMovie,
    imdbPopup,
    getCurrentProfile,
    getMovieInfoAddtoDb
  }
)(AddMovie);
