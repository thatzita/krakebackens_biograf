import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  moviePopupClose,
  updateDb,
  deleteMovie
} from "../../actions/movieActions";
import { Button, Header, Container, Divider, Image } from "semantic-ui-react";

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      showOrHide: false,
      movieInfo: {},
      title: "",
      description: ""
    };
    this.editValues = this.editValues.bind(this);
  }

  closePopup() {
    this.props.moviePopupClose();
  }

  deleteMovie(movie) {
    this.props.deleteMovie(movie);
    this.props.moviePopupClose();
  }

  updateMovieDb() {
    let { movieInfo } = this.state;
    let { title, description } = this.state;
    let movieDb;

    if (title === "" && description !== "") {
      movieDb = {
        title: movieInfo.title,
        description: description,
        id: movieInfo._id
      };
    } else if (title !== "" && description === "") {
      movieDb = {
        title: title,
        description: movieInfo.description,
        id: movieInfo._id
      };
    } else if (title !== "" && description !== "") {
      movieDb = {
        title: title,
        description: description,
        id: movieInfo._id
      };
    } else {
      movieDb = {
        title: movieInfo.title,
        description: movieInfo.description,
        id: movieInfo._id
      };
    }
    this.props.updateDb(movieDb);
    this.closePopup();
  }

  changeInput(event) {
    let nameOfClass = event.target.className;
    this.editValues(nameOfClass, event.target.textContent);
  }

  editValues(nameOfClass, data) {
    switch (nameOfClass) {
      case "ui grey inverted header title":
        this.setState({
          title: data
        });
        break;
      case "description":
        this.setState({
          description: data
        });
        break;
      default:
    }
  }

  //TODO: Ta bort från DB
  deleteFromDb(movieId) {
    console.log(movieId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movieInfo: nextProps.movies.movieInfo,
      showOrHide: nextProps.movies.showOrHide
    });
  }

  render() {
    let { showOrHide } = this.state;
    let { movieInfo } = this.state;
    let moviePopup;

    if (showOrHide) {
      moviePopup = (
        <div className="popup">
          <Image.Group>
            <Image centered size="medium" src={movieInfo.poster} />
            <Image size="large" src={movieInfo.background} />
          </Image.Group>
          <Header
            as="h1"
            inverted
            color="grey"
            className="title"
            contentEditable={true}
            suppressContentEditableWarning="true"
            onInput={event => this.changeInput(event)}
          >
            {movieInfo.title}
          </Header>
          <Divider />
          <Container className="containerInPopup" textAlign="justified">
            <span className="date">Släpptes: {movieInfo.release}</span>
            <p
              className="description"
              contentEditable={true}
              suppressContentEditableWarning="true"
              onInput={event => this.changeInput(event)}
            >
              {movieInfo.description}
            </p>
            <p>
              Genres:{" "}
              {movieInfo.genres.map((genre, i) => {
                return (
                  <span key={i} className="date">
                    {genre} |{" "}
                  </span>
                );
              })}
            </p>
            <p className="date">Speltid: {movieInfo.runtime}</p>
          </Container>
          <Divider />
          {/* <Button.Group> */}
          <Button
            inverted
            color="green"
            onClick={e => this.updateMovieDb(movieInfo)}
          >
            Uppdatera databasen
          </Button>
          <Button
            inverted
            color="red"
            onClick={e => this.deleteMovie(movieInfo)}
          >
            Ta bort från databasen
          </Button>
          <Button inverted color="purple" onClick={e => this.closePopup()}>
            Stäng
          </Button>
          {/* </Button.Group> */}
        </div>
      );
    } else {
      moviePopup = "";
    }
    return <div>{moviePopup}</div>;
  }
}

Popup.propTypes = {
  moviePopupClose: PropTypes.func.isRequired,
  updateDb: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  // movieInfo: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movieInfo: state.movieInfo,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    moviePopupClose,
    deleteMovie,
    updateDb
  }
)(Popup);
