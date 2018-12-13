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
  Icon,
  Form,
  Checkbox
} from "semantic-ui-react";

class DbPopup extends Component {
  constructor() {
    super();
    this.state = {
      showOrHideImdb: false,
      movieInfo: {},
      title: "",
      description: "",
      dvdOrBluRay: null
    };
    this.editValues = this.editValues.bind(this);
  }

  handleChange = (e, { value }) => this.setState({ dvdOrBluRay: value });

  closePopup() {
    this.props.imdbPopupClose();
    this.setState({
      title: "",
      description: ""
    });
  }

  saveToDb() {
    let { movieInfo, title, description, dvdOrBluRay } = this.state;

    let genreArray = movieInfo.genres.map(genre => {
      return genre.name;
    });

    let urlForImg = "http://image.tmdb.org/t/p/original";

    let movieDb;

    if (movieInfo.backdrop_path === null) {
      urlForImg = "";
      movieInfo.backdrop_path = "curtain.jpg";
    }

    if (movieInfo.poster_path === null) {
      urlForImg = "";
      movieInfo.poster_path = "poster_not_available.jpg";
    }

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
        rating: movieInfo.vote_average,
        dvdOrBluRay: this.state.dvdOrBluRay
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
        rating: movieInfo.vote_average,
        dvdOrBluRay: this.state.dvdOrBluRay
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
        rating: movieInfo.vote_average,
        dvdOrBluRay: this.state.dvdOrBluRay
      };
    } else if (movieInfo.overview === "") {
      movieDb = {
        title: movieInfo.title,
        description: "Beskrivning saknas, hojta på kråkan så fixar han det!",
        background: urlForImg + movieInfo.backdrop_path,
        poster: urlForImg + movieInfo.poster_path,
        runtime: movieInfo.runtime,
        genres: genreArray,
        imdb_id: movieInfo.imdb_id,
        release: movieInfo.release_date,
        rating: movieInfo.vote_average,
        dvdOrBluRay: this.state.dvdOrBluRay
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
        rating: movieInfo.vote_average,
        dvdOrBluRay: this.state.dvdOrBluRay,
        trailer: null
      };
    }

    this.props.addToMovieDb(movieDb, movieInfo.id);
    this.setState({
      title: "",
      description: "",
      dvdOrBluRay: ""
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
      showOrHideImdb: nextProps.movies.showOrHideImdb,
      dvdOrBluRay: "bluRay"
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
                alt="Bild saknas"
                onError={e => {
                  e.target.src = "curtain.jpg";
                }}
              />
              <Image
                size="small"
                className="imageBorder"
                floated="right"
                src={posterUrl + movieInfo.poster_path}
                alt="Bild saknas"
                onError={e => {
                  e.target.src = "poster_not_available.jpg";
                }}
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
                {movieInfo.title}
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

              <Form>
                <Form.Field>
                  <Checkbox
                    radio
                    label="Blu-ray"
                    name="checkboxRadioGroup"
                    value="bluRay"
                    checked={this.state.dvdOrBluRay === "bluRay"}
                    onChange={this.handleChange}
                  />

                  <Checkbox
                    style={{ marginLeft: "1rem" }}
                    radio
                    label="DVD"
                    name="checkboxRadioGroup"
                    value="dvd"
                    checked={this.state.dvdOrBluRay === "dvd"}
                    onChange={this.handleChange}
                  />
                  <Checkbox
                    style={{ marginLeft: "1rem" }}
                    radio
                    label="USB"
                    name="checkboxRadioGroup"
                    value="usb"
                    checked={this.state.dvdOrBluRay === "usb"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
              <br />
              <span className="date boldSpan">Beskrivning:</span>
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
                  Beskrivning saknas, hojta på kråkan så fixar han det!
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
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
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
