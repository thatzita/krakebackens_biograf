import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import { getAllMonMovies } from "../../actions/monMovieActions";
import { Segment } from "semantic-ui-react";

import AdminMonMovieDisplay from "./AdminMonMovieDisplay";
import AdminBackdropDisplay from "./AdminBackdropDisplay";

class AdminMonMovie extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getAllMonMovies();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    const movieList = this.props.monMovies.monMovies || [];
    let randomMovieObj =
      movieList[Math.floor(Math.random() * movieList.length)] || {};

    let mainpageContent;

    if (profile === null || loading) {
      mainpageContent = <h2>Laddar innehåll...</h2>;
    } else {
      mainpageContent = <h2>Välkommen {user.username}</h2>;
    }

    return (
      <React.Fragment>
        <div className="adminMonMovieContainer">
          {/* <Segment
            style={{
              borderRadius: "0",
              padding: "1px 0 0 0",
              width: "500px",
              height: "300px",
              backgroundSize: "contain"
            }}
          > */}
          {/* <AdminBackdropDisplay
              style={{
                borderRadius: "0",
                padding: "1px 0 0 0",
                backgroundSize: "contain"
              }}
              monMovie={randomMovieObj}
            /> */}
          {/* <div className="adminMonMovieDisplayContainer"> */}
          <AdminMonMovieDisplay monMovies={movieList} />
          {/* </div> */}
          {/* </Segment> */}
        </div>
      </React.Fragment>
    );
  }
}

AdminMonMovie.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  monMovies: state.monMovies,
  currentCloseUpMovieId: state.adminPage.currentCloseUpMovieId
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getAllMonMovies
  }
)(AdminMonMovie);
