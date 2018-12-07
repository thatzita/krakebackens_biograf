import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { seatNameConverter } from "../common/seatingFunctions";
import {
  Button,
  Divider,
  Segment,
  Card,
  Image,
  Icon,
  Confirm
} from "semantic-ui-react";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import "./profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      show: false
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
  show = () => {
    this.setState({ open: true });
  };
  handleConfirm = () => {
    this.onDeleteClick();
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    let loggedInProfile;
    const profile = this.state.profile;
    const { open } = this.state;

    if (profile) {
      //   let vipPlats;
      let vipInfo;

      if (profile.vip.status) {
        let seating = seatNameConverter(profile.vip.seat);
        vipInfo = {
          vipStatus: `VIP-medlem`,
          vipPlats: ` ${seating}`
        };
      } else {
        vipInfo = {
          vipStatus: `Medlem`,
          vipPlats: `-`
        };
      }

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
            <Card className="containerInPopup">
              <Image
                className="crowPicture"
                src="krakebackens_logo.png"
                size="medium"
                circular
                centered
              />
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
                // onClick={this.onDeleteClick.bind(this)}
                onClick={e => this.show()}
              >
                Ta bort konto
              </Button>
              <Confirm
                open={open}
                className="confirmDeleteUser"
                header="Du är på väg att ta ditt konto"
                content="Är du säker att du vill ta bort ditt konto? Det går inte att få tillbaka kontot!"
                cancelButton="Gå tillbaka"
                confirmButton="Ta bort"
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
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
