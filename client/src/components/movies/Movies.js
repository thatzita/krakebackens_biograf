import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Image, Button, Input, Icon, Modal } from "semantic-ui-react";

import { getAllMovies } from "../../actions/movieActions";

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      open: false,
      movies: []
    };
  }

  showPopup() {
    this.setState({
      open: !this.state.open
    });
  }

  componentDidMount() {
    this.props.getAllMovies();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movies: nextProps.movies
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
              <a>Speltid: {movie.runtime}</a>
            </Card.Content>
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

          <Button onClick={this.showPopup.bind(this)} color="purple">
            <Icon name="plus" />
            Lägg till film
          </Button>

          {movieContent}
        </div>
      </div>
    );
  }
}

Movies.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
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
    getAllMovies
  }
)(Movies);
