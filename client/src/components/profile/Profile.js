import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProfileUnableToCancelMessage from "./ProfileUnableToCancelMessage";
import ProfileHeader from "./ProfileHeader";
import ProfileTicketDisplay from "./ProfileTicketDisplay";
import ProfileStatistik from "./ProfileStatistik";

import { getCurrentProfile } from "../../actions/profileActions";
import {
  getAllMonMovies,
  getAllMonEvents,
  removeAndCancelMovieBooking
} from "../../actions/monMovieActions";

import Footer from "../layout/Footer";
import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      show: false,
      profile: {
        username: "användarens namn",
        stats: { total: 0, season: 0 },
        vip: {
          status: false,
          seat: ""
        }
      },
      monMovies: [],
      showFailMessage: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getCurrentProfile();
    this.props.getAllMonMovies();
    this.props.getAllMonEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      this.setState({
        profile: nextProps.profile.profile,
        monMovies: nextProps.monMovies.monMovies,
        monEvents: nextProps.monMovies.monEvents
      });
    }
  }

  closeFailMessage = () => {
    this.setState({ showFailMessage: false });
  };

  removeBooking = (
    seatingObj,
    customerId,
    resonsibleId,
    movieId,
    eventType
  ) => {
    let monMovies = this.state.monMovies || [];
    let monEvents = this.state.monEvents || [];
    let obj;
    let specificMovie;

    if (eventType === "movie") {
      specificMovie = monMovies.filter(mov => mov.imdb_id === movieId);
      // if customer is the same as responsible send list and not one obj
      if (customerId === resonsibleId) {
        let allBookings = [];
        specificMovie[0].seating.map(array => {
          array.map(seat => {
            if (seat.responsible.id === resonsibleId) {
              let newMultipulSeatingObj = this.shallowObjectCopy(seat);
              newMultipulSeatingObj.customer = "";
              newMultipulSeatingObj.responsible = { id: "" };
              newMultipulSeatingObj.booked = false;
              allBookings.push(newMultipulSeatingObj);
            }
          });
        });

        obj = {
          reservations: allBookings,
          resonsibleId,
          movieId,
          responsibleMember: true
        };
      } else {
        let newSeatingObj = this.shallowObjectCopy(seatingObj);
        newSeatingObj.customer = "";
        newSeatingObj.responsible = { id: "" };
        newSeatingObj.booked = false;

        obj = {
          reservations: newSeatingObj,
          resonsibleId,
          movieId,
          responsibleMember: false
        };
      }

      this.props.removeAndCancelMovieBooking(obj);
    } else if (eventType === "event") {
      specificMovie = monEvents.filter(mov => mov._id === movieId);
      // if customer is the same as responsible send list and not one obj
      if (customerId === resonsibleId) {
        let allBookings = [];
        specificMovie[0].seating.map(array => {
          if (array.responsible.id === resonsibleId) {
            let newMultipulSeatingObj = this.shallowObjectCopy(array);
            newMultipulSeatingObj.customer = "";
            newMultipulSeatingObj.responsible = { id: "" };
            newMultipulSeatingObj.booked = false;
            allBookings.push(newMultipulSeatingObj);
          }
        });

        obj = {
          reservations: allBookings,
          resonsibleId,
          movieId,
          responsibleMember: true
        };
        this.props.removeAndCancelMovieBooking(obj);
      }
    }
    let todaysDate = new Date();

    if (
      specificMovie[0] &&
      todaysDate > new Date(specificMovie[0].cancel_utc_time)
    ) {
      this.setState({ showFailMessage: true });
    } else {
      this.props.removeAndCancelMovieBooking(obj);
    }
    // this.props.getAllMonMovies();
  };

  shallowObjectCopy = src => {
    return Object.assign({}, src);
  };

  render() {
    return (
      <div>
        <ProfileHeader profile={this.state.profile} />
        <ProfileStatistik profile={this.state.profile} />
        <ProfileTicketDisplay
          removeBooking={this.removeBooking}
          profile={this.state.profile}
          monMovies={this.state.monMovies}
          monEvents={this.state.monEvents}
        />
        <ProfileUnableToCancelMessage
          closeFailMessage={this.closeFailMessage}
          showFailMessage={this.state.showFailMessage}
        />
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  // deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  monMovies: state.monMovies
});
export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getAllMonMovies,
    removeAndCancelMovieBooking,
    getAllMonEvents
  }
)(Profile);
