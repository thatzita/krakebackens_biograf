import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { seatNameConverter } from "../common/seatingFunctions";

// import { Button, Segment, Card, Image, Icon, Confirm } from "semantic-ui-react";
// import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

import {
  Button,
  Divider,
  Segment,
  Card,
  Image,
  Icon,
  Confirm
} from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileTicketDisplay from "./ProfileTicketDisplay";
import ProfileStatistik from "./ProfileStatistik";

import { getCurrentProfile } from "../../actions/profileActions";
import {
  getAllMonMovies,
  getAllMonEvents,
  removeAndCancelMovieBooking
} from "../../actions/monMovieActions";

import { Link } from "react-router-dom";
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
      monMovies: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getCurrentProfile();
    this.props.getAllMonMovies();
    this.props.getAllMonEvents();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.profile.profile) {
      this.setState({
        profile: nextProps.profile.profile,
        monMovies: nextProps.monMovies.monMovies,
        monEvents: nextProps.monMovies.monEvents
      });
    }
  }

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

    // console.log(specificMovie);
    if (eventType === "movie") {
      specificMovie = monMovies.filter(mov => mov.imdb_id === movieId);
      // if customer is the same as responsible send list and not one obj
      if (customerId === resonsibleId) {
        console.log("movie ", specificMovie[0]);
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

        // console.log("all res ", obj);
      } else {
        // let singleBooking = [];
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

      console.log("obj ", obj);
      this.props.removeAndCancelMovieBooking(obj);
    } else if (eventType === "event") {
      console.log("event");
      specificMovie = monEvents.filter(mov => mov._id === movieId);
      // if customer is the same as responsible send list and not one obj
      if (customerId === resonsibleId) {
        console.log("movie ", specificMovie[0]);
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
        console.log("obj to remove ", obj);
        this.props.removeAndCancelMovieBooking(obj);
      }
    }
  };

  shallowObjectCopy = src => {
    return Object.assign({}, src);
  };

  render() {
    console.log("state ", this.state);

    // let loggedInProfile;
    // const profile = this.state.profile;
    // const { open } = this.state;

    // if (profile) {
    //   //   let vipPlats;
    //   let vipInfo;

    //   if (profile.vip.status) {
    //     let seating = seatNameConverter(profile.vip.seat);
    //     vipInfo = {
    //       vipStatus: `VIP-medlem`,
    //       vipPlats: ` ${seating}`
    //     };
    //   } else {
    //     vipInfo = {
    //       vipStatus: `Medlem`,
    //       vipPlats: `-`
    //     };
    //   }

    //   loggedInProfile = (
    //     <div className="profileInfoContainer">
    //       <hr />
    //       <Segment
    //         inverted
    //         style={{
    //           marginBottom: "0rem",
    //           paddingBottom: "2rem"
    //         }}
    //       >
    //         <Card className="containerInPopup">
    //           <Image
    //             className="crowPicture"
    //             src="krakebackens_logo.png"
    //             size="medium"
    //             circular
    //             centered
    //           />
    //           <h1 style={{ textAlign: "center" }}>{profile.username}</h1>
    //           <h3
    //             className="whiteText"
    //             style={{ textAlign: "center", marginTop: "-1rem" }}
    //           >
    //             <Icon name="mail" />
    //             {profile.email}
    //           </h3>

    //           <Card.Content className="userStats">
    //             <h2
    //               className="whiteText"
    //               // style={{ textDecoration: "underline" }}
    //             >
    //               <Icon name="chart bar" />
    //               Statistik:
    //             </h2>
    //             <h4 className="whiteText">Antal besök i år:</h4>
    //             <span className="whiteText">{profile.stats.season}</span>
    //             <h4 className="whiteText">Antal besök totalt:</h4>
    //             <span className="whiteText">{profile.stats.total}</span>
    //           </Card.Content>

    //           <Card.Content className="userVip">
    //             <h2 className="whiteText">
    //               <Icon name="star" />
    //               VIP status:
    //             </h2>
    //             <p>{vipInfo.vipStatus}</p>
    //             <p>{vipInfo.vipPlats}</p>
    //           </Card.Content>
    //         </Card>
    //         <Button.Group className="profileButtons">
    //           <Button
    //             attached="bottom"
    //             className="deleteButton"
    //             onClick={e => this.show()}
    //           >
    //             Ta bort konto
    //           </Button>
    //           <Confirm
    //             open={open}
    //             className="confirmDeleteUser"
    //             header="Du är på väg att ta ditt konto"
    //             content="Är du säker att du vill ta bort ditt konto? Det går inte att få tillbaka kontot!"
    //             cancelButton="Gå tillbaka"
    //             confirmButton="Ta bort"
    //             onCancel={this.handleCancel}
    //             onConfirm={this.handleConfirm}
    //           />
    //           <Button className="UpdateButton" color="green" attached="bottom">
    //             Uppdatera konto
    //           </Button>
    //           <Link to="/changepassword">
    //             <Button className="linkedButton" attached="bottom" color="blue">
    //               Byt lösenord
    //             </Button>
    //           </Link>
    //         </Button.Group>
    //       </Segment>
    //     </div>
    //   );
    // } else {
    //   loggedInProfile = <h2>Laddar profil...</h2>;
    // }

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
