import React, { Component } from "react";
import "./movieCloseUp.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    this.state = { activeItem: "" };
  }

  componentDidMount() {
    // let str = window.location.href;
    // let str = this.props.location.pathname;
    // console.log("location ", this.props.match.params);

    // let lineIndex = str.lastIndexOf("/");
    // let id = str.substring(lineIndex + 1);
    window.scrollTo(0, 0);
    let { movieId } = this.props.location.state;
    console.log(movieId);

    this.props.getSpecificMonMovie(movieId);
  }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleItemClick = () => {
    console.log("trailer");
  };

  render() {
    const { activeItem } = this.state;

    // console.log("props: ", this.props.movieCloseUp);

    let movieObject = this.props.movieCloseUp || {}; // movieItem[0] || {};
    let displayImage = movieObject.background || "default.jpg";
    let countSeats = movieObject.seating || [];
    // console.log("seats ", movieObject.seating || []);
    let seatsThatAreLeft = [];
    countSeats.map(array => {
      let newArray = array.filter(
        x => x.booked === false
        // &&
        // (x.seat !== "r1s1" && x.seat !== "r2s1" && x.seat !== "r3s1")
      );
      newArray.map(y => {
        seatsThatAreLeft.push(y);
      });
    });

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
              <Segment
                inverted
                style={{
                  background: "none",
                  border: "none",
                  boxShadow: "none"
                }}
              >
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

                <Menu inverted secondary style={{ background: "none" }}>
                  <Menu.Item
                    name="trailer"
                    active={activeItem === "trailer"}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="play" /> Spela trailer
                  </Menu.Item>
                </Menu>
              </Segment>
            </div>
          </div>
          <div className="movieDateTimeAndBooking">
            <Segment
              padded="very"
              style={{
                background: "none",
                border: "none",
                boxShadow: "none",
                paddingBottom: "15rem"
              }}
            >
              <Header inverted as="h2">
                Boka Biljetter
              </Header>
              <Table basic inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Datum</Table.HeaderCell>
                    <Table.HeaderCell>Tid</Table.HeaderCell>
                    <Table.HeaderCell>Platser</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {movieObject.screeningDate || "datum"}
                    </Table.Cell>
                    <Table.Cell>
                      {movieObject.screeningTime || "tid"}
                    </Table.Cell>
                    <Table.Cell>{seatsThatAreLeft.length}</Table.Cell>

                    <Table.Cell textAlign="right">
                      <Button
                        // disabled={Object.keys(movieObject).length === 0}
                        as={Link}
                        to={{
                          pathname: "/seating",
                          state: { bookingObj: movieObject }
                        }}
                        color="violet"
                      >
                        Boka
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
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
