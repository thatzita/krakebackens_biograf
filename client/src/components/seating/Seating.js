import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Image } from "semantic-ui-react";

import "./seatingTwo.css";
import DrawGrid from "./SeatingGrid";
import TicketDisplay from "./TicketDisplay";
import LostSeatMessage from "./LostSeatMessage";
import { getCurrentProfile } from "../../actions/profileActions";
import { getAllUsers } from "../../actions/usersActions";
import {
  completeAndSaveBooking,
  removePreviousMoveBookingInformation,
  getSpecificMonMovie
} from "../../actions/monMovieActions";

class Seating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingObj: {},
      amountOfSeatBookings: 0,
      existingBookings: [],
      rowList: [],
      reservedList: [],
      memberList: [],
      profile: {},
      firstRefrech: true,
      popUpMessage: false,
      showFailMessage: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let {
      bookingObj,
      amountOfSeatBookings,
      existingBookings
    } = this.props.location.state;

    this.props.getCurrentProfile();
    this.props.getAllUsers();

    // console.log("bok ", amountOfSeatBookings);
    let sortExistingBookings = existingBookings.sort((x, y) => {
      if (x.customer.status > y.customer.status) {
        return -1;
      }
      if (x.customer.status < y.customer.status) {
        return 1;
      }
      return 0;
    });

    if (bookingObj) {
      this.props.getSpecificMonMovie(bookingObj._id);

      this.setState({
        bookingObj,
        amountOfSeatBookings: 4 - amountOfSeatBookings,
        existingBookings: sortExistingBookings.reverse(),
        rowList: bookingObj.seating
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      let firstMemberObj = {
        username: nextProps.profile.profile.username || "",
        id: nextProps.profile.profile.id || "",
        email: nextProps.profile.profile.email || "",
        status: 1
      };
      let { existingBookings } = this.props.location.state;
      let value = this.state.memberList.some(x => x.id === firstMemberObj.id)
        ? this.state.memberList
        : existingBookings.length > 0
        ? []
        : [...this.state.memberList, firstMemberObj];

      this.setState({
        profile: nextProps.profile.profile,
        memberList: value
      });
    }
    console.log(nextProps.bookingResult);

    if (nextProps.movieCloseUp && this.state.firstRefrech) {
      // console.log("first update");
      this.setState({
        bookingObj: nextProps.movieCloseUp,
        rowList: nextProps.movieCloseUp.seating
      });
    }

    if (nextProps.bookingResult) {
      let bookingResult = nextProps.bookingResult;
      if (bookingResult.success) {
        this.props.history.push("/mainpage");
        this.props.removePreviousMoveBookingInformation();
      } else {
        console.log(bookingResult.msg);
        // console.log("set new state");

        this.setState({
          bookingObj: bookingResult.movie,
          rowList: bookingResult.movie.seating,
          reservedList: [],
          firstRefrech: false,
          showFailMessage: true
        });
        this.props.removePreviousMoveBookingInformation();
        console.log("test: ", bookingResult.movie.seating);
      }
    }
  }

  completeBooking = () => {
    let bookingBody = {
      movieId: this.state.bookingObj._id,
      seatResarvation: this.state.reservedList
    };

    // console.log("sending: ", bookingBody);
    this.props.completeAndSaveBooking(bookingBody);
  };

  addMemberToBooking = (username, id, email) => {
    if (this.state.memberList.some(x => x.id === id)) {
      console.log("du har redan lagt till den här medlemmen");
    } else {
      if (this.state.memberList.length < 4) {
        let memberObj = {
          username: username,
          id: id,
          email: email,
          status: 2
        };
        let newMemberList = [...this.state.memberList, memberObj];
        let updateReservedList = this.state.reservedList;
        updateReservedList.map((x, index) => {
          x.customer = newMemberList[index] || {
            username: "Gäst",
            status: 3
          };
        });

        this.setState({
          memberList: newMemberList,
          reservedList: updateReservedList
        });
      } else {
        console.log("du kan inte välja fler medlemmar ");
      }
    }
  };

  removeMemberFromBooking = id => {
    let newMemberList = this.state.memberList.filter(x => x.id !== id);
    let updateReservedList = this.state.reservedList;
    updateReservedList.map((x, index) => {
      x.customer = newMemberList[index] || {
        username: "Gäst",
        status: 3
      };
    });
    this.setState({
      memberList: newMemberList,
      reservedList: updateReservedList
    });
  };

  reserveSeat = obj => {
    if (this.state.reservedList.some(x => x.seat === obj.seat)) {
      let newList = this.state.reservedList.filter(x => x.seat !== obj.seat);
      newList.map((x, index) => {
        x.customer = this.state.memberList[index] || {
          username: "Gäst",
          status: 3
        };
      });
      this.setState({ reservedList: newList });
    } else {
      if (this.state.reservedList.length < this.state.amountOfSeatBookings) {
        let newObj = this.shallowObjectCopy(obj);
        newObj.responsible = {
          username: this.state.profile.username,
          id: this.state.profile.id,
          email: this.state.profile.email
        };
        newObj.booked = true;
        newObj.customer = this.state.memberList[
          this.state.reservedList.length
        ] || {
          username: "Gäst",
          status: 3
        };
        this.setState({ reservedList: [...this.state.reservedList, newObj] });
        // console.log(this.state.rowList);
      } else {
        //TODO: skapa en notifikation till användaren att den har bokat max antalet av platser
        console.log("Du kan inte välja fler platser");
      }
    }
  };

  closeFailMessage = () => {
    this.setState({ showFailMessage: false });
  };

  shallowObjectCopy = src => {
    return Object.assign({}, src);
  };

  render() {
    console.log("reserved: ", this.state.reservedList);
    // console.log("rowList: ", this.state.rowList);
    // console.log(this.state.bookingObj);

    // console.log(this.state.profile);
    // let profile = this.props.profile.profile;
    let movie = this.state.bookingObj;
    let movieImage = movie.poster || "default.jpg";
    return (
      <div className="cinemaBackground">
        <div className="cinemaWrapper">
          <div className="bookingContainer">
            <Header
              inverted
              as="h2"
              style={{
                paddingBottom: "1rem",
                width: "100%",
                minWidth: "450px",
                // minWidth: "500px",
                // padding: "1rem 0",
                marginBottom: "2rem",
                borderBottom: "1px solid gray"
              }}
            >
              <Image src={movieImage} size="big" />
              <Header.Content>
                {movie.title}
                <Header.Subheader>
                  Datum: {movie.screeningDate || "ååååmmdd"}
                </Header.Subheader>
                <Header.Subheader>
                  Tid: {movie.screeningTime || "00:00"}
                </Header.Subheader>
              </Header.Content>
            </Header>
            <DrawGrid
              profile={this.state.profile}
              memberList={this.state.memberList}
              reserveSeat={this.reserveSeat}
              rowList={this.state.rowList}
              reservedList={this.state.reservedList}
              saloon={this.state.bookingObj.saloon || "2"}
            />
          </div>
          <TicketDisplay
            existingBookings={this.state.existingBookings}
            completeBooking={this.completeBooking}
            movieId={this.state.bookingObj._id}
            removeMemberFromBooking={this.removeMemberFromBooking}
            reservedList={this.state.reservedList}
            profile={this.state.profile}
            memberList={this.state.memberList}
            date={this.state.bookingObj.screeningDate}
            time={this.state.bookingObj.screeningTime}
            addMemberToBooking={this.addMemberToBooking}
            selectableMemberList={this.props.users.users || []}
          />
        </div>
        <LostSeatMessage
          closeFailMessage={this.closeFailMessage}
          showFailMessage={this.state.showFailMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  users: state.users,
  bookingResult: state.monMovies.bookingResult,
  movieCloseUp: state.monMovies.movieCloseUp
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getAllUsers,
    completeAndSaveBooking,
    removePreviousMoveBookingInformation,
    getSpecificMonMovie

    //func goes here
  }
)(Seating);
