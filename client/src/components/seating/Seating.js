import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Image } from "semantic-ui-react";

import "./seatingTwo.css";
import DrawGrid from "./SeatingGrid";
import TicketDisplay from "./TicketDisplay";
import { getCurrentProfile } from "../../actions/profileActions";
import { getAllUsers } from "../../actions/usersActions";
import { completeAndSaveBooking } from "../../actions/monMovieActions";

class Seating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingObj: {},
      rowList: [],
      reservedList: [],
      memberList: [],
      profile: {}
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getCurrentProfile();
    this.props.getAllUsers();
    let { bookingObj } = this.props.location.state;

    if (bookingObj) {
      this.setState({
        bookingObj,
        rowList: bookingObj.seating
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      let firstMemberObj = {
        username: nextProps.profile.profile.username || "",
        id: nextProps.profile.profile.id || "",
        email: nextProps.profile.profile.email || ""
      };

      let value = this.state.memberList.some(x => x.id === firstMemberObj.id)
        ? this.state.memberList
        : [...this.state.memberList, firstMemberObj];

      this.setState({
        profile: nextProps.profile.profile,
        memberList: value
      });
    }
  }

  completeBooking = () => {
    let bookingBody = {
      movieId: this.state.bookingObj._id,
      seatResarvation: this.state.reservedList
    };

    console.log("sending: ", bookingBody);
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
          email: email
        };
        let newMemberList = [...this.state.memberList, memberObj];
        let updateReservedList = this.state.reservedList;
        updateReservedList.map((x, index) => {
          x.customer = newMemberList[index] || { username: "Gäst" };
        });

        this.setState({
          memberList: newMemberList,
          reservedList: updateReservedList
        });
      } else {
        console.log("du kan inte välja fler medemar ");
      }
    }
  };

  removeMemberFromBooking = id => {
    let newMemberList = this.state.memberList.filter(x => x.id !== id);
    let updateReservedList = this.state.reservedList;
    updateReservedList.map((x, index) => {
      x.customer = newMemberList[index] || { username: "Gäst" };
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
        x.customer = this.state.memberList[index] || { username: "Gäst" };
      });
      this.setState({ reservedList: newList });
    } else {
      if (this.state.reservedList.length < 4) {
        let newObj = this.shallowObjectCopy(obj);
        newObj.booked = true;
        newObj.customer = this.state.memberList[
          this.state.reservedList.length
        ] || { username: "Gäst" };
        this.setState({ reservedList: [...this.state.reservedList, newObj] });
        // console.log(this.state.rowList);
      } else {
        //TODO: skapa en notifikation till användaren att den har bokat max antalet av platser
        console.log("Du kan inte välja fler platser");
      }
    }
  };

  shallowObjectCopy = src => {
    return Object.assign({}, src);
  };

  render() {
    console.log("reserved: ", this.state.reservedList);
    console.log("rowList: ", this.state.rowList);
    console.log(this.state.bookingObj);

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
            />
          </div>
          <TicketDisplay
            completeBooking={this.completeBooking}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  users: state.users
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getAllUsers,
    completeAndSaveBooking
    //func goes here
  }
)(Seating);
