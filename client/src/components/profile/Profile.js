import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Divider, Segment, Card, Image, Icon } from "semantic-ui-react";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import "./profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  onDeleteClick(event) {
    this.props.deleteAccount();
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile.profile
    });
  }

  render() {
    let loggedInProfile;
    const profile = this.state.profile;

    if (profile) {
      //   let vipPlats;
      let vipInfo;

      if (profile.vip.status) {
        console.log(profile.vip.status);
        vipInfo = {
          vipStatus: `VIP-medlem`,
          vipPlats: `VIP-plats: ${profile.vip.seat}`
        };
      } else {
        vipInfo = {
          vipStatus: `Medlem`,
          vipPlats: ``
        };
      }

      // let watchedMovies;
      // if (profile.moviesViewed.length > 0) {
      //   watchedMovies = profile.moviesViewed.map((movie, i) => {
      //     return <li key={i}>{movie}</li>;
      //   });
      // } else {
      //   watchedMovies = `Du har inte gått på bio än.`;
      // }

      loggedInProfile = (
        <div className="profileInfoContainer">
          <hr />
          <Segment
            inverted
            style={{
              marginBottom: "0rem",
              paddingBottom: "2rem"
            }}
          >
            {/* <Card fluid className="cardContainer"> */}
            <Card className="containerInPopup">
              <Image
                className="crowPicture"
                src="krakebackens_logo.png"
                size="medium"
                circular
                centered
              />
              {/* <Card.Header>{profile.username}</Card.Header> */}
              <h1 style={{ textAlign: "center" }}>{profile.username}</h1>
              <h3
                className="whiteText"
                style={{ textAlign: "center", marginTop: "-1rem" }}
              >
                <Icon name="mail" />
                {profile.email}
              </h3>

              <Card.Content className="userStats">
                <h2
                  className="whiteText"
                  // style={{ textDecoration: "underline" }}
                >
                  <Icon name="chart bar" />
                  Statistik:
                </h2>
                <h4 className="whiteText">Antal besök i år:</h4>
                <span className="whiteText">{profile.stats.season}</span>
                <h4 className="whiteText">Antal besök totalt:</h4>
                <span className="whiteText">{profile.stats.total}</span>
              </Card.Content>

              <Card.Content className="userVip">
                <h2
                  // style={{ textDecoration: "underline" }}
                  className="whiteText"
                >
                  <Icon name="star" />
                  VIP status:
                </h2>
                <p>{vipInfo.vipStatus}</p>
                <p>{vipInfo.vipPlats}</p>
              </Card.Content>

              {/* <h3>Filmer du sett:</h3>
              <ul>{watchedMovies}</ul> */}
            </Card>
            <Button.Group className="profileButtons">
              <Button
                attached="bottom"
                className="deleteButton"
                onClick={this.onDeleteClick.bind(this)}
              >
                Ta bort konto
              </Button>
              <Button className="UpdateButton" color="green" attached="bottom">
                Uppdatera konto
              </Button>
              <Link to="/changepassword">
                <Button className="linkedButton" attached="bottom" color="blue">
                  Byt lösenord
                </Button>
              </Link>
            </Button.Group>
          </Segment>
        </div>
      );
    } else {
      loggedInProfile = <h2>Laddar profil...</h2>;
    }

    return (
      <div>
        <h1 style={{ marginTop: "3rem", color: "white", textAlign: "center" }}>
          Profilsida
        </h1>

        {loggedInProfile}

        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Profile);
