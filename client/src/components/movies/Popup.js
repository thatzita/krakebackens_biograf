import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  moviePopupClose,
  updateDb,
  deleteMovie
} from "../../actions/movieActions";
import {
  Button,
  Header,
  Container,
  Divider,
  Image,
  Icon,
  Segment
} from "semantic-ui-react";

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      showOrHide: false,
      movieInfo: {},
      title: "",
      description: "",
      crowRating: ""
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
    let { title, description, crowRating } = this.state;
    let movieDb;

    if (title === "" && description === "" && crowRating === "") {
      movieDb = {
        title: movieInfo.title,
        description: movieInfo.description,
        crowRating: movieInfo.crowRating,
        id: movieInfo._id
      };
    } else if (title !== "" && description !== "" && crowRating !== "") {
      movieDb = {
        title: title,
        description: description,
        crowRating: crowRating,
        id: movieInfo._id
      };
    } else if (title !== "" && description === "" && crowRating === "") {
      movieDb = {
        title: title,
        description: movieInfo.description,
        crowRating: movieInfo.crowRating,
        id: movieInfo._id
      };
    } else if (title === "" && description !== "" && crowRating === "") {
      movieDb = {
        title: movieInfo.title,
        description: description,
        crowRating: movieInfo.crowRating,
        id: movieInfo._id
      };
    } else if (title === "" && description === "" && crowRating !== "") {
      movieDb = {
        title: movieInfo.title,
        description: movieInfo.description,
        crowRating: crowRating,
        id: movieInfo._id
      };
    } else if (title !== "" && description !== "" && crowRating === "") {
      movieDb = {
        title: title,
        description: description,
        crowRating: movieInfo.crowRating,
        id: movieInfo._id
      };
    } else if (title === "" && description !== "" && crowRating !== "") {
      movieDb = {
        title: movieInfo.title,
        description: description,
        crowRating: crowRating,
        id: movieInfo._id
      };
    } else if (title !== "" && description === "" && crowRating !== "") {
      movieDb = {
        title: title,
        description: movieInfo.description,
        crowRating: crowRating,
        id: movieInfo._id
      };
    }
    console.log(movieDb);
    // if (title === "" && description !== "") {
    //   movieDb = {
    //     title: movieInfo.title,
    //     description: description,
    //     id: movieInfo._id
    //   };
    // } else if (title !== "" && description === "") {
    //   movieDb = {
    //     title: title,
    //     description: movieInfo.description,
    //     id: movieInfo._id
    //   };
    // } else if (title !== "" && description !== "") {
    //   movieDb = {
    //     title: title,
    //     description: description,
    //     id: movieInfo._id
    //   };
    // } else {
    //   movieDb = {
    //     title: movieInfo.title,
    //     description: movieInfo.description,
    //     id: movieInfo._id
    //   };
    // }
    this.props.updateDb(movieDb);
    this.setState({
      title: "",
      description: ""
    });
    this.closePopup();
  }

  changeInput(event) {
    let nameOfClass = event.target.className;

    this.editValues(nameOfClass, event.target.textContent);
  }

  editValues(nameOfClass, data) {
    switch (nameOfClass) {
      case "title":
        this.setState({
          title: data
        });
        break;
      case "description":
        this.setState({
          description: data
        });
      case "crowRating":
        this.setState({
          crowRating: data
        });

        break;
      default:
    }
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
        // <div className="popup">
        <Segment inverted color="black">
          <div className="imgPosition">
            <Image
              // floated="right"
              // className="imageBorder"
              size="large"
              src={movieInfo.background}
            />
            <Image
              size="small"
              // className="imageBorder"
              // floated="right"
              src={movieInfo.poster}
            />
          </div>
          <Container fluid className="containerInPopup">
            <div className="descriptionContainer">
              <h1
                className="title"
                contentEditable={true}
                suppressContentEditableWarning="true"
                onInput={event => this.changeInput(event)}
              >
                {movieInfo.title}
              </h1>

              <span className="date boldSpan">{movieInfo.release}</span>
              <br />
              <br />

              <p
                className="description"
                contentEditable={true}
                suppressContentEditableWarning="true"
                onInput={event => this.changeInput(event)}
              >
                {movieInfo.description}
              </p>

              <br />

              <p>
                <strong>Genres:</strong> <br />
                {movieInfo.genres.map((genre, i) => {
                  return (
                    <span key={i} className="date">
                      {genre}{" "}
                    </span>
                  );
                })}
              </p>
              <Icon name="time" />
              <span className="date boldSpan">{movieInfo.runtime} min</span>
              <br />
              <br />
              <span className="date boldSpan">Betyg: {movieInfo.rating} </span>
              <br />
              <br />
              <span className="date boldSpan">
                Kråkan tycker till:
                <span
                  className="crowRating"
                  contentEditable={true}
                  suppressContentEditableWarning="true"
                  onInput={event => this.changeInput(event)}
                >
                  {movieInfo.crowRating}
                </span>
              </span>

              <br />
              <br />
              <Divider />
              <Button.Group>
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
                <Button
                  inverted
                  color="purple"
                  onClick={e => this.closePopup()}
                >
                  Stäng
                </Button>
              </Button.Group>
            </div>
          </Container>
        </Segment>
        // </div>
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
