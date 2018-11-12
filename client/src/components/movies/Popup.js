import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { moviePopupClose } from "../../actions/movieActions";
import { Button, Header, Container, Divider, Image } from "semantic-ui-react";

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      showOrHide: false,
      movieInfo: {}
    };
  }

  closePopup() {
    this.props.moviePopupClose();
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
          <Header as="h1" inverted color="grey">
            {movieInfo.title}
          </Header>
          <Divider />
          <Container className="containerInPopup" textAlign="justified">
            <span className="date">Släpptes: {movieInfo.release}</span>
            <p>{movieInfo.description}</p>
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
          <Button.Group>
            <Button inverted color="purple" onClick={e => this.closePopup()}>
              Stäng
            </Button>
            <Button
              inverted
              color="red"
              onClick={e => this.deleteFromDb(movieInfo.imdb_id)}
            >
              Ta bort från databasen
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

Popup.propTypes = {
  moviePopupClose: PropTypes.func.isRequired,
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
    moviePopupClose
  }
)(Popup);
