import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Popup from "./Popup";

import { Card, Image, Button, Input, Icon } from "semantic-ui-react";

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
      movieInfo: {}
    };
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
      movieInfo: nextProps.movieInfo
    });
  }
  render() {
    const { movies } = this.state.movies;

    let movieContent;

    if (movies !== undefined) {
      let movieCards = movies.map(movie => {
        return (
          <Card key={movie.imdb_id}>
            {/* <Card fluid key={movie.imdb_id}> */}
            {/* <Image className="posterImg" src={movie.poster} /> */}
            <Image src={movie.poster} />
            {/* <Image size="small" src={movie.poster} /> */}
            <Card.Content>
              <Card.Header>{movie.title}</Card.Header>
              <Card.Meta>
                <span className="date">Släpptes: {movie.release}</span>
              </Card.Meta>
              <Card.Description>
                {movie.genres.map((genre, i) => {
                  return (
                    <span key={i} className="date">
                      {genre} |{" "}
                    </span>
                  );
                })}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <p className="date">Speltid: {movie.runtime}</p>
            </Card.Content>
            <Icon.Group>
              <Icon
                onClick={e => this.deleteMovie(movie)}
                className="deleteIcon"
                color="red"
                name="delete"
              />
              <Icon
                onClick={e => this.showPopup(movie)}
                className="editIcon"
                color="green"
                name="edit"
              />
            </Icon.Group>
          </Card>
        );
      });

      movieContent = (
        <div>
          <br />
          <h2>Filmdatabas</h2>
          <Card.Group>{movieCards}</Card.Group>
        </div>
      );
    } else {
      movieContent = "";
    }

    return (
      <div className="movies">
        <div className="container">
          <h1>Filmer</h1>
          <hr />
          <Input
            icon={{ name: "search", circular: true, link: true }}
            placeholder="Search..."
          />

          <Button color="purple">
            <Icon name="plus" />
            Lägg till film i databasen
          </Button>

          <Popup />

          {movieContent}
        </div>
      </div>
    );
  }
}

Movies.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  // movieInfo: PropTypes.func.isRequired,
  // popupMovie: PropTypes.object.isRequired,
  //   auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //   profile: state.profile,
  //   auth: state.auth
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
