import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { imdbPopupClose, addToMovieDb } from "../../actions/movieActions";
import {
  Button,
  Header,
  Container,
  Divider,
  Image,
  Icon
} from "semantic-ui-react";

class DbPopup extends Component {
  constructor() {
    super();
    this.state = {
      showOrHideImdb: false,
      movieInfo: {},
      title: "",
      description: ""
    };
    this.editValues = this.editValues.bind(this);
  }

  closePopup() {
    this.props.imdbPopupClose();
    this.setState({
      title: "",
      description: ""
    });
  }

  saveToDb() {
    let { movieInfo } = this.state;

    let genreArray = movieInfo.genres.map(genre => {
      return genre.name;
    });

    let urlForImg = "http://image.tmdb.org/t/p/original";
    let { title, description } = this.state;

    let movieDb;

    if (title === "" && description !== "") {
      movieDb = {
        title: movieInfo.title,
        description: description,
        background: urlForImg + movieInfo.backdrop_path,
        poster: urlForImg + movieInfo.poster_path,
        runtime: movieInfo.runtime,
        genres: genreArray,
        imdb_id: movieInfo.imdb_id,
        release: movieInfo.release_date
      };
    } else if (title !== "" && description === "") {
      movieDb = {
        title: title,
        description: movieInfo.overview,
        background: urlForImg + movieInfo.backdrop_path,
        poster: urlForImg + movieInfo.poster_path,
        runtime: movieInfo.runtime,
        genres: genreArray,
        imdb_id: movieInfo.imdb_id,
        release: movieInfo.release_date
      };
    } else if (title !== "" && description !== "") {
      movieDb = {
        title: title,
        description: description,
        background: urlForImg + movieInfo.backdrop_path,
        poster: urlForImg + movieInfo.poster_path,
        runtime: movieInfo.runtime,
        genres: genreArray,
        imdb_id: movieInfo.imdb_id,
        release: movieInfo.release_date
      };
    } else {
      movieDb = {
        title: movieInfo.title,
        description: movieInfo.overview,
        background: urlForImg + movieInfo.backdrop_path,
        poster: urlForImg + movieInfo.poster_path,
        runtime: movieInfo.runtime,
        genres: genreArray,
        imdb_id: movieInfo.imdb_id,
        release: movieInfo.release_date
      };
    }
    this.props.addToMovieDb(movieDb);
    this.setState({
      title: "",
      description: ""
    });
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

  changeInput(event) {
    let nameOfClass = event.target.className;
    this.editValues(nameOfClass, event.target.textContent);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movieInfo: nextProps.movies.movieInfo,
      showOrHideImdb: nextProps.movies.showOrHideImdb
    });
  }

  render() {
    let { showOrHideImdb } = this.state;
    let { movieInfo } = this.state;
    let moviePopup;

    if (showOrHideImdb) {
      let posterUrl = "http://image.tmdb.org/t/p/w300";

      moviePopup = (
        <div className="popup">
          <Image
            floated="right"
            className="imageBorder"
            size="large"
            src={posterUrl + movieInfo.backdrop_path}
          />
          <Image
            size="small"
            className="imageBorder"
            floated="right"
            src={posterUrl + movieInfo.poster_path}
          />

          <Header
            className="title"
            contentEditable={true}
            suppressContentEditableWarning="true"
            onInput={event => this.changeInput(event)}
            as="h1"
            inverted
            color="grey"
          >
            {movieInfo.title}
          </Header>
          <Divider />
          <Container className="containerInPopup">
            <span className="date boldSpan">{movieInfo.release_date}</span>
            <br />
            <br />
            <p
              className="description"
              contentEditable={true}
              suppressContentEditableWarning="true"
              onInput={event => this.changeInput(event)}
            >
              {movieInfo.overview}
            </p>
            <p>
              <strong>Genres:</strong> <br />
              {movieInfo.genres.map((genre, i) => {
                return (
                  <span key={i} className="date">
                    {genre.name}{" "}
                  </span>
                );
              })}
            </p>

            <Icon name="time" />
            <span className="date boldSpan">{movieInfo.runtime} min</span>
            <br />
            <br />
            <p className="date">
              <strong>Status:</strong> {movieInfo.status}
            </p>
          </Container>
          <Divider />
          <Button.Group>
            <Button inverted color="purple" onClick={e => this.closePopup()}>
              Stäng
            </Button>
            <Button inverted color="red" onClick={e => this.saveToDb()}>
              Spara till databasen
            </Button>
          </Button.Group>
        </div>
      );
    } else {
      moviePopup = "";
    }
    return <div>{moviePopup}</div>;
  }
}

DbPopup.propTypes = {
  imdbPopupClose: PropTypes.func.isRequired,
  addToMovieDb: PropTypes.func.isRequired,
  // movieInfo: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //   movieInfo: state.movieInfo,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    imdbPopupClose,
    addToMovieDb
  }
)(DbPopup);
