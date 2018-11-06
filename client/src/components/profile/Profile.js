import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { getCurrentProfile } from "../../actions/profileActions";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
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
        vipInfo = {
          vipStatus: `Du är VIP`,
          vipPlats: `Din plats är ${profile.vip.seat}`
        };
      } else {
        vipInfo = {
          vipStatus: `Du är inte VIP`,
          vipPlats: `Du har ingen VIP-plats`
        };
      }

      let watchedMovies;
      if (profile.moviesViewed.length > 0) {
        watchedMovies = profile.moviesViewed.map((movie, i) => {
          return <li key={i}>{movie}</li>;
        });
      } else {
        watchedMovies = `Du har inte gått på bio än.`;
      }

      loggedInProfile = (
        <div>
          <h3>Användarenamn:</h3>
          <p>{profile.username}</p>
          <h3>Epost:</h3>
          <p>{profile.email}</p>
          <h3>Statistik:</h3>
          <h4>Antal besök i år:</h4>
          <p>{profile.stats.season}</p>
          <h4>Antal besök totalt:</h4>
          <p>{profile.stats.total}</p>
          <h3>VIP status:</h3>
          <p>{vipInfo.vipStatus}</p>
          <p>{vipInfo.vipPlats}</p>
          <h3>Filmer du sett:</h3>
          <ul>{watchedMovies}</ul>
        </div>
      );
    } else {
      loggedInProfile = <h2>Laddar profil...</h2>;
    }

    return (
      <div>
        <h1>Profilsida</h1>
        {loggedInProfile}
        <Button basic>Ta bort konto</Button>
        <Button primary>Uppdatera konto</Button>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
