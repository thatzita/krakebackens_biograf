import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Input,
  Segment,
  Button,
  Item,
  Icon,
  Message,
  Pagination
} from "semantic-ui-react";
import {
  searchMovie,
  imdbPopup,
  getMovieInfoAddtoDb,
  resetMovieSuccess
} from "../../actions/movieActions";
import DbPopup from "./DbPopup";
import { Link } from "react-router-dom";
import Admin from "../admin/Admin";
import { getCurrentProfile } from "../../actions/profileActions";

class AddMovie extends Component {
  constructor() {
    super();
    this.state = {
      moviesFound: [],
      // Lägg till page
      searchedMovie: "",
      activePage: 1,
      totalMoviePage: 1,
      popupMovie: null,
      success: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.increasePage = this.increasePage.bind(this);
    // this.decreasePage = this.decreasePage.bind(this);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.onSubmit(e, activePage);
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movies.success !== undefined) {
      setTimeout(() => {
        this.setState({
          success: null
        });
      }, 3500);

      this.setState({
        moviesFound: nextProps.movies.moviesFound,
        popupMovie: nextProps.movies.popupMovie,
        profile: nextProps.profile.profile,
        success: nextProps.movies.success
      });
    } else {
      this.setState({
        moviesFound: nextProps.movies.moviesFound,
        popupMovie: nextProps.movies.popupMovie,
        profile: nextProps.profile.profile,
        totalMoviePage: nextProps.movies.totalMoviePage,
        activePage: nextProps.movies.activePage
      });
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.key === "Enter") {
      this.onSubmit(event);
    }
  }

  onSubmit(event, page) {
    this.props.resetMovieSuccess();

    if (page === undefined || page < 1) {
      page = 1;
      this.setState({
        activePage: 1
      });
    }
    event.preventDefault();
    let { searchedMovie } = this.state;

    this.props.searchMovie(searchedMovie, page);
  }

  showPopup(movieId) {
    this.props.resetMovieSuccess();
    this.props.imdbPopup(movieId);
  }

  addToDb(movieId) {
    this.props.getMovieInfoAddtoDb(movieId);
  }

  // increasePage = event => {
  //   let count = this.state.activePage + 1;

  //   this.setState({ activePage: this.state.activePage + 1 });
  //   this.onSubmit(event, count);
  // };
  // decreasePage = event => {
  //   let count = this.state.activePage - 1;
  //   this.setState({ activePage: this.state.activePage - 1 });
  //   this.onSubmit(event, count);
  // };

  render() {
    let { moviesFound, success } = this.state;

    let movieList;
    let posterUrl = "http://image.tmdb.org/t/p/w300";

    if (moviesFound !== undefined) {
      let movieCards = moviesFound.map(movie => {
        return (
          <Item value={movie.id} key={movie.id}>
            <Item.Image
              onClick={e => this.showPopup(movie.id)}
              className="posterImg"
              size="tiny"
              src={posterUrl + movie.poster_path}
              alt="Ingen bild hittades"
              onError={e => {
                e.target.src = "poster_not_available.jpg";
              }}
            />
            <Item.Content>
              <Item.Header>
                {movie.title} ( {movie.release_date.substring(0, 4)} ){" "}
              </Item.Header>
              <Item.Extra>&nbsp;</Item.Extra>
              <Button.Group className="addMovieBtnGroup">
                <Button
                  color="blue"
                  onClick={e => this.showPopup(movie.id)}
                  attached="bottom"
                >
                  <Icon name="eye" className="editIcon" /> Mer info
                </Button>
                <Button
                  color="green"
                  onClick={e => this.addToDb(movie.id)}
                  attached="bottom"
                >
                  <Icon name="add circle" className="editIcon" />
                  Lägg till
                </Button>
              </Button.Group>
            </Item.Content>
          </Item>
        );
      });
      movieList = <Item.Group divided> {movieCards}</Item.Group>;
    } else {
      movieList = <h1 style={{ textAlign: "center" }}>Sök efter film</h1>;
    }
    return (
      <div className="addMovie">
        <div className="containerAddmovie">
          <div className="addmovieDiv">
            <h1 className="title">
              <Icon name="film" />
              Lägg till film
            </h1>
            <hr />
            <br />
            <Admin />
            <div className="searchContainer">
              <Input
                className="movieSearch"
                name="searchedMovie"
                value={this.state.searchedMovie}
                onChange={this.onChange}
                onKeyPress={this.onChange}
                placeholder="Skriv namn på film..."
              />
              <Button color="violet" type="submit" onClick={this.onSubmit}>
                Sök
              </Button>

              <Link to="/movies">
                <Button basic>
                  <Icon name="left chevron" />
                  Tillbaka till databasen
                </Button>
              </Link>
            </div>
            {success ? (
              <div
                style={{
                  position: "fixed",
                  width: "25rem",
                  zIndex: "15",
                  top: "20%",
                  left: "22rem"
                }}
              >
                <Message
                  className="addedSuccessful"
                  floating
                  success
                  header={success.title}
                  content={success.msg}
                />
              </div>
            ) : (
              ""
            )}
            <br />
            <br />
            <DbPopup />
          </div>
          <Segment style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}>
            {movieList}
          </Segment>
          <div style={{ padding: "0", margin: "0", textAlign: "center" }}>
            <Pagination
              onPageChange={this.handlePaginationChange}
              activePage={
                this.props.movies.activePage !== undefined
                  ? this.props.movies.activePage
                  : 1
              }
              totalPages={
                this.props.movies.totalMoviePage !== undefined
                  ? this.props.movies.totalMoviePage
                  : 1
              }
            />
          </div>
          {/* {this.state.moviesFound !== undefined ? (
            <Button.Group fluid>
              <Button
                color="violet"
                // style={{ width: "45%" }}
                onClick={this.decreasePage}
              >
                Föregående sida
              </Button>
              <div style={{ padding: "0px 10px" }} />
              <Button
                // style={{ width: "45%" }}
                color="violet"
                onClick={this.increasePage}
              >
                Nästa sida
              </Button>
            </Button.Group>
          ) : (
            ""
          )} */}
        </div>
      </div>
    );
  }
}

AddMovie.propTypes = {
  searchMovie: PropTypes.func.isRequired,
  imdbPopup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getMovieInfoAddtoDb: PropTypes.func.isRequired
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
    getCurrentProfile,
    getMovieInfoAddtoDb,
    resetMovieSuccess
  }
)(AddMovie);
