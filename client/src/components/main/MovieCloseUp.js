import React, { Component } from "react";
import "./movieCloseUp.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";

import {
  getSpecificMonMovie,
  completeAndSaveBookingEvent,
  removePreviousMoveBookingInformation
} from "../../actions/monMovieActions";

import {
  Button,
  Header,
  Image,
  Segment,
  Menu,
  Icon,
  Table,
  Modal
} from "semantic-ui-react";

class MovieCloseUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      movieCloseUp: {},
      amountOfSeatBookings: 4,
      existingBookings: [],
      movieTrailer: null,
      modalOpen: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let { movieId, eventType } = this.props.location.state;
    this.props.getCurrentProfile();
    this.props.getSpecificMonMovie(movieId, eventType);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookingResult) {
      if (nextProps.bookingResult.success) {
        this.props.history.push({
          pathname: "/mainpage",
          state: { ticketBooked: true }
        });
      }
      this.props.removePreviousMoveBookingInformation();
    }
    if (
      nextProps.movieCloseUp &&
      nextProps.profile.profile &&
      nextProps.movieCloseUp.eventType === "movie"
    ) {
      let checkSeatBookings = nextProps.movieCloseUp.seating;

      let howManySeatsAreBooked = [];
      checkSeatBookings.map(array => {
        array.map(x => {
          if (x.responsible.hasOwnProperty("id")) {
            if (x.responsible.id === nextProps.profile.profile.id) {
              howManySeatsAreBooked.push(x);
            }
            return null;
          }
          return null;
        });
        return null;
      });

      this.setState({
        movieCloseUp: nextProps.movieCloseUp,
        amountOfSeatBookings: howManySeatsAreBooked.length,
        existingBookings: howManySeatsAreBooked
      });
    } else if (
      nextProps.movieCloseUp &&
      nextProps.profile.profile &&
      nextProps.movieCloseUp.eventType === "event"
    ) {
      let checkSeatBookings = nextProps.movieCloseUp.seating;

      let howManySeatsAreBooked = [];

      checkSeatBookings.map(x => {
        if (x.responsible.hasOwnProperty("id")) {
          if (x.responsible.id === nextProps.profile.profile.id) {
            howManySeatsAreBooked.push(x);
          }
          return null;
        }
        return null;
      });

      this.setState({
        movieCloseUp: nextProps.movieCloseUp,
        amountOfSeatBookings: howManySeatsAreBooked.length,
        existingBookings: howManySeatsAreBooked
      });
    }
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleItemClick = () => {
    let str = this.state.movieCloseUp.trailer;
    let find = "watch\\?v\\=";
    let reg = new RegExp(find, "g");
    str = str.replace(reg, "embed/");
    this.setState({ movieTrailer: str, modalOpen: true });
  };

  confirmBooking = () => {
    let eventCloseUp = this.state.movieCloseUp;
    let seating = this.state.movieCloseUp.seating;

    seating = seating.filter(seat => seat.booked !== true);

    let bookingBody = {
      movieId: this.state.movieCloseUp._id,
      seatResarvation: [
        {
          booked: true,
          customer: {
            username: this.props.profile.profile.username || "",
            id: this.props.profile.profile.id || "",
            email: this.props.profile.profile.email || "",
            status: 1
          },
          responsible: {
            username: this.props.profile.profile.username,
            id: this.props.profile.profile.id,
            email: this.props.profile.profile.email
          },
          eventType: eventCloseUp.eventType,
          poster: eventCloseUp.poster,
          row: 1,
          seat: seating[0].seat,
          seatNr: seating[0].seatNr,
          screeningDate: eventCloseUp.screeningDate,
          screeningTime: eventCloseUp.screeningTime,
          title: eventCloseUp.title,
          vip: false,
          _id: eventCloseUp._id
        }
      ],
      responsible: this.props.profile
    };

    this.props.completeAndSaveBookingEvent(bookingBody);
  };

  render() {
    const { activeItem, movieTrailer } = this.state;

    let movieObject = this.state.movieCloseUp; // movieItem[0] || {};
    let displayImage = movieObject.background || "skogdel3.jpg";
    let countSeats = movieObject.seating || [];
    let seatsThatAreLeft = [];

    if (movieObject.eventType === "movie") {
      countSeats.map(array => {
        let newArray = array.filter(x => x.booked === false);
        newArray.map(y => {
          seatsThatAreLeft.push(y);
          return null;
        });
        return null;
      });
    } else {
      let newArray = countSeats.filter(x => x.booked === false);
      newArray.map(y => {
        seatsThatAreLeft.push(y);
        return null;
      });
    }

    if (displayImage === "http://image.tmdb.org/t/p/originalnull") {
      displayImage = "curtain.jpg";
    }

    return (
      <React.Fragment>
        <div className="movieCloseUpContainer">
          <div className="movieDisplayandInformation">
            <div
              className="coverImage"
              style={{
                backgroundImage: "url(" + displayImage + ")",
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
                  {movieObject.saloon ? (
                    <strong>Kråkans premiär: </strong>
                  ) : (
                    <strong>Eventdag: </strong>
                  )}
                  {movieObject.screeningDate
                    ? movieObject.screeningDate
                    : "åååå-mm-dd"}
                </p>
                {movieObject.saloon ? (
                  <p>
                    {movieObject.runtime
                      ? Math.floor(movieObject.runtime / 60)
                      : "1"}
                    h {movieObject.runtime ? movieObject.runtime % 60 : "30"}min
                    |{" "}
                    {movieObject.genres
                      ? movieObject.genres.map(item => item + " ")
                      : "kärlek"}{" "}
                  </p>
                ) : (
                  ""
                )}
                <p>
                  <strong>Kråkan tycker: </strong>
                  {movieObject.crowRating
                    ? movieObject.crowRating
                    : "Kråkan har inte tyckt till än..."}
                </p>
                <p>
                  {movieObject.description
                    ? movieObject.description
                    : "beskrivning"}
                </p>

                <Segment raised inverted>
                  <h5>Meddelande:</h5>
                  {movieObject.saloon
                    ? movieObject.monMovieMessage
                    : movieObject.monEventMessage}
                </Segment>

                {movieObject.saloon ? (
                  <Modal
                    style={{ textAlign: "center", backgroundColor: "black" }}
                    trigger={
                      <Menu inverted secondary style={{ background: "none" }}>
                        <Menu.Item
                          name="trailer"
                          active={activeItem === "trailer"}
                          onClick={this.handleItemClick}
                        >
                          <Icon name="play" /> Spela trailer
                        </Menu.Item>
                      </Menu>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                  >
                    {
                      <React.Fragment>
                        <Icon
                          style={{
                            position: "absolute",
                            right: "-2.5rem",
                            fontSize: "2rem",
                            fontWeight: "100"
                          }}
                          color="red"
                          onClick={this.handleClose}
                          inverted
                          name="close"
                        />

                        {movieTrailer === "//youtube.com" ? (
                          <div
                            style={{
                              background: "black",
                              height: "400px",
                              border: "2px solid white"
                            }}
                          >
                            <Image
                              style={{
                                width: "300px",
                                top: "18%",
                                margin: "0 auto"
                              }}
                              src="krakebackens_logo.png"
                            />
                            <p
                              style={{
                                color: "white",
                                fontSize: "3rem",
                                textAlign: "center",
                                position: "relative",
                                top: "-21rem"
                              }}
                            >
                              Filmen saknar trailer
                            </p>
                          </div>
                        ) : (
                          <iframe
                            title="movie trailer"
                            width="900"
                            height="600"
                            src={movieTrailer}
                          />
                        )}
                      </React.Fragment>
                    }
                  </Modal>
                ) : (
                  ""
                )}
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
                    {movieObject.saloon ? (
                      <Table.HeaderCell>Salong</Table.HeaderCell>
                    ) : (
                      <Table.Cell />
                    )}
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

                    {movieObject.saloon ? (
                      <Table.Cell>{movieObject.saloon}</Table.Cell>
                    ) : (
                      <Table.Cell />
                    )}

                    <Table.Cell>{seatsThatAreLeft.length}</Table.Cell>

                    <Table.Cell textAlign="right">
                      {movieObject.saloon ? (
                        <Button
                          disabled={this.state.amountOfSeatBookings === 4}
                          as={Link}
                          to={{
                            pathname: "/seating",
                            state: {
                              bookingObj: movieObject,
                              amountOfSeatBookings: this.state
                                .amountOfSeatBookings,
                              existingBookings: this.state.existingBookings
                            }
                          }}
                          color="violet"
                        >
                          Boka
                        </Button>
                      ) : (
                        <Button
                          color="violet"
                          disabled={
                            this.state.amountOfSeatBookings === 1 ||
                            seatsThatAreLeft.length === 0
                          }
                          onClick={this.confirmBooking}
                        >
                          Boka
                        </Button>
                      )}
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
  profile: state.profile,
  movieCloseUp: state.monMovies.movieCloseUp,
  bookingResult: state.monMovies.bookingResult
});

export default connect(
  mapStateToProps,
  {
    getSpecificMonMovie,
    getCurrentProfile,
    completeAndSaveBookingEvent,
    removePreviousMoveBookingInformation
  }
)(MovieCloseUp);
