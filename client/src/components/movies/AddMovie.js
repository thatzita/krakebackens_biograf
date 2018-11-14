import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input, Divider, Button, Card, Image, Icon } from "semantic-ui-react";
import { searchMovie, imdbPopup } from "../../actions/movieActions";
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

  render() {
    let { moviesFound } = this.state;
    let movieList;
    let posterUrl = "http://image.tmdb.org/t/p/w300";

    if (moviesFound !== undefined) {
      let movieCards = moviesFound.map(movie => {
        return (
          <Card
            onClick={e => this.showPopup(movie.id)}
            value={movie.id}
            key={movie.id}
          >
            <Image
              className="posterImg"
              size="small"
              src={posterUrl + movie.poster_path}
              alt="Ingen bild hittades"
              onError={e => {
                e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg";
              }}
            />
            <Card.Content>
              <Card.Header>{movie.title}</Card.Header>
            </Card.Content>
          </Card>
        );
      });
      movieList = <Card.Group>{movieCards}</Card.Group>;
    } else {
      movieList = "";
    }

    return (
      <div className="containerAddmovie">
        <h1>Lägg till film</h1>
        <hr />
        <Admin />
        <Input
          name="searchedMovie"
          value={this.state.searchedMovie}
          onChange={this.onChange}
          placeholder="Skriv namn på film..."
        />
        <Button basic color="violet" type="submit" onClick={this.onSubmit}>
          Sök
        </Button>
        <Link to="/movies">
          <Button basic color="violet">
            <Icon name="left chevron" />
            Tillbaka till databasen
          </Button>
        </Link>
        <Divider />
        <DbPopup />
        {movieList}
      </div>
    );
  }
}

AddMovie.propTypes = {
  searchMovie: PropTypes.func.isRequired,
  imdbPopup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
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
    getCurrentProfile
  }
)(AddMovie);
