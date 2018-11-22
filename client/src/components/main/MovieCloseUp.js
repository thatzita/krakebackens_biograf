import React, { Component } from "react";
import "./movieCloseUp.css";
import { connect } from "react-redux";

import {
  getSpecificMonMovie
  // getAllMonMovies
} from "../../actions/monMovieActions";

import {
  Button,
  Dimmer,
  Reveal,
  Header,
  Image,
  Segment,
  Menu,
  Icon,
  Table
} from "semantic-ui-react";

class MovieCloseUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let str = window.location.href;
    // let str = this.props.location.pathname;
    // console.log("location ", this.props.match.params);

    // let lineIndex = str.lastIndexOf("/");
    // let id = str.substring(lineIndex + 1);
    let { movieId } = this.props.location.state;
    console.log(movieId);

    this.props.getSpecificMonMovie(movieId);
  }

  render() {
    console.log("props: ", this.props);

    let movieObject = this.props.movieCloseUp || {}; // movieItem[0] || {};
    let displayImage =
      movieObject.background ||
      "default.jpg" ||
      "http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg";

    return (
      <React.Fragment>
        <div className="movieCloseUpContainer">
          <div className="movieDisplayandInformation">
            <div
              className="coverImage"
              style={{
                backgroundImage: "url(" + displayImage + ")",
                backgroundSize: "cover",
                WebkitBackgroundSize: "cover",
                MozBackgroundSize: "cover",
                OBackgroundSize: "cover",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}
            />
            <div className="movieDescription">
              <Segment inverted>
                <h1>
                  {movieObject.title ? movieObject.title : "Titel"} (
                  {movieObject.release
                    ? movieObject.release.substring(0, 4)
                    : "2018"}
                  )
                </h1>
                <p>
                  Premiär:{" "}
                  {movieObject.screeningDate
                    ? movieObject.screeningDate
                    : "åååå-mm-dd"}
                </p>
                <p>
                  {movieObject.runtime
                    ? Math.floor(movieObject.runtime / 60)
                    : "1"}
                  h {movieObject.runtime ? movieObject.runtime % 60 : "30"}min |{" "}
                  {movieObject.genres
                    ? movieObject.genres.map(item => item + " ")
                    : "kärlek"}{" "}
                </p>
                <p>
                  {movieObject.description
                    ? movieObject.description
                    : "beskrivning"}
                </p>

                <Menu>
                  <Menu.Item>
                    <Icon name="play" /> Spela trailer
                  </Menu.Item>
                </Menu>
              </Segment>
            </div>
          </div>
          <div>
            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell textAlign="right">None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell textAlign="right">Requires call</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jill</Table.Cell>
                  <Table.Cell>Denied</Table.Cell>
                  <Table.Cell textAlign="right">None</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movieCloseUp: state.monMovies.movieCloseUp
  // monMovies: state.monMovies
});

export default connect(
  mapStateToProps,
  {
    getSpecificMonMovie
    // getAllMonMovies
  }
)(MovieCloseUp);
