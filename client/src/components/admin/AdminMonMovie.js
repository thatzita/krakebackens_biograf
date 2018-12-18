import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import { getAllMonMovies } from "../../actions/monMovieActions";

import AdminMonMovieDisplay from "./AdminMonMovieDisplay";

class AdminMonMovie extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getAllMonMovies();
  }
  render() {
    const movieList = this.props.monMovies.monMovies || [];

    return (
      <React.Fragment>
        <div className="adminMonMovieContainer">
          <AdminMonMovieDisplay monMovies={movieList} />
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
  monMovies: state.monMovies
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getAllMonMovies
  }
)(AdminMonMovie);
