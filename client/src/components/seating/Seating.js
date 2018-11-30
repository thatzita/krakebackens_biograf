import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Image } from "semantic-ui-react";

import "./seatingTwo.css";
import DrawGrid from "./SeatingGrid";
import TicketDisplay from "./TicketDisplay";
import SelectMemberModel from "./SelectMemberModel";
import { getCurrentProfile } from "../../actions/profileActions";
import { getAllUsers } from "../../actions/usersActions";

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
    console.log(nextProps.users.users);

    if (nextProps.profile.profile) {
      let firstMemberObj = {
        username: nextProps.profile.profile.username || "",
        id: nextProps.profile.profile.id || "",
        email: nextProps.profile.profile.email || ""
      };
      if (this.state.memberList.some(x => x.id === firstMemberObj.id)) {
      }

      let value = this.state.memberList.some(x => x.id === firstMemberObj.id)
        ? this.state.memberList
        : [...this.state.memberList, firstMemberObj];

      this.setState({
        profile: nextProps.profile.profile,
        memberList: value
      });
    }
  }

  addMemberToBooking = (username, id, email) => {
    if (this.state.memberList.some(x => x.id === id)) {
      console.log("du har redan lagt till den här medlemmen");
    } else {
      let memberObj = {
        username: username,
        id: id,
        email: email
      };

      this.setState({ memberList: [...this.state.memberList, memberObj] });
    }
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
        newObj.customer = this.state.memberList[
          this.state.reservedList.length
        ] || { username: "Gäst" };
        this.setState({ reservedList: [...this.state.reservedList, newObj] });
        console.log(this.state.rowList);
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
    console.log("reserve: ", this.state);
    console.log(this.state.profile);
    // let profile = this.props.profile.profile;
    let movie = this.state.bookingObj;
    let movieImage = movie.poster || "default.jpg";
    return (
      <div className="cinemaBackground">
        <Header
          inverted
          as="h2"
          style={{
            // width: "50%",
            minWidth: "500px",
            padding: "1rem 0",
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
        <div className="bookingContainer">
          <DrawGrid
            profile={this.state.profile}
            memberList={this.state.memberList}
            reserveSeat={this.reserveSeat}
            rowList={this.state.rowList}
            reservedList={this.state.reservedList}
          />
          <TicketDisplay
            reservedList={this.state.reservedList}
            profile={this.state.profile}
            date={this.state.bookingObj.screeningDate}
            time={this.state.bookingObj.screeningTime}
          />
        </div>
        <SelectMemberModel
          addMemberToBooking={this.addMemberToBooking}
          selectableMemberList={this.props.users.users || []}
        />
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
    getAllUsers
    //func goes here
  }
)(Seating);
