import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Popup from "./Popup";

import { Button, Input, Icon, Item } from "semantic-ui-react";

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
          <Item key={movie.imdb_id}>
            <Item.Image
              className="posterImg"
              size="tiny"
              onClick={e => this.showPopup(movie)}
              src={movie.poster}
            />
            <Item.Content>
              <Item.Header>{movie.title}</Item.Header>
              <Item.Meta>
                <span className="boldSpan"> {movie.release}</span>
              </Item.Meta>
              <Item.Description>
                {movie.genres.map((genre, i) => {
                  return (
                    <span key={i} className="date">
                      {genre}{" "}
                    </span>
                  );
                })}
              </Item.Description>

              <Item.Meta>
                <Icon name="time" />
                <span className="cinema boldSpan">{movie.runtime} min</span>
              </Item.Meta>
            </Item.Content>
            <Item.Group attached="bottom">
              <Button
                basic
                color="red"
                onClick={e => this.deleteMovie(movie)}
                icon
                attached="bottom"
                floated="right"
              >
                <Icon color="red" name="delete" className="deleteIcon" />
              </Button>
              <Button
                basic
                color="green"
                onClick={e => this.showPopup(movie)}
                icon
                attached="bottom"
                floated="right"
              >
                <Icon color="green" name="edit" className="editIcon" />
              </Button>
            </Item.Group>
          </Item>
        );
      });

      movieContent = (
        <div>
          <br />
          <h2>Filmdatabas</h2>
          <Item.Group divided>{movieCards}</Item.Group>
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
  // auth: state.auth,
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
