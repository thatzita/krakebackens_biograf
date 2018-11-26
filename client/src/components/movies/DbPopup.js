import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { imdbPopupClose, addToMovieDb } from "../../actions/movieActions";
import {
  Button,
  Card,
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
        release: movieInfo.release_date,
        rating: movieInfo.vote_average
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
        release: movieInfo.release_date,
        rating: movieInfo.vote_average
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
        release: movieInfo.release_date,
        rating: movieInfo.vote_average
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
        release: movieInfo.release_date,
        rating: movieInfo.vote_average
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
      case "titlePopupDb":
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
          <Card className="containerInPopup">
            <div className="imgPosition">
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
            </div>
            <br />
            <div className="descriptionContainer">
              <h1
                className="titlePopupDb"
                contentEditable={true}
                suppressContentEditableWarning="true"
                onInput={event => this.changeInput(event)}
              >
                {movieInfo.title} ({movieInfo.release_date.substring(0, 4)})
              </h1>
              <hr />

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
                <strong>Betyg:</strong> {movieInfo.vote_average}
              </p>

              <p className="date">
                <strong>Status:</strong> {movieInfo.status}
              </p>
              {movieInfo.overview ? (
                <p
                  className="description"
                  contentEditable={true}
                  suppressContentEditableWarning="true"
                  onInput={event => this.changeInput(event)}
                >
                  {movieInfo.overview}
                </p>
              ) : (
                <p
                  className="description"
                  contentEditable={true}
                  suppressContentEditableWarning="true"
                  onInput={event => this.changeInput(event)}
                >
                  Beskrivning saknas
                </p>
              )}

              <Divider />
              <Button.Group fluid className="btnGroupPopup">
                <Button
                  style={{
                    width: "13rem",
                    marginLeft: "3rem",
                    marginRight: "3rem"
                  }}
                  color="green"
                  onClick={e => this.saveToDb()}
                >
                  <Icon name="add circle" className="editIcon" />
                  Spara till databasen
                </Button>
                <Button
                  style={{
                    width: "13rem",
                    marginLeft: "3rem",
                    marginRight: "3rem"
                  }}
                  onClick={e => this.closePopup()}
                >
                  {" "}
                  <Icon name="left chevron" />
                  Stäng
                </Button>
              </Button.Group>
            </div>
          </Card>
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
