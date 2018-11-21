import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import { getAllMonMovies } from "../../actions/monMovieActions";
import { setCurrentCloseUpMovieId } from "../../actions/webPageStateActions";
import { Segment } from "semantic-ui-react";

import MonMovieDisplay from "./MonMovieDisplay";
import MovieBackdropDisplay from "./MovieBackdropDisplay";
import MovieCloseUp from "./MovieCloseUp";

class Mainpage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getAllMonMovies();
  }
  render() {
    const { user } = this.props.auth;
    // console.log(user);
    const { profile, loading } = this.props.profile;

    const movieList = this.props.monMovies.monMovies || [];
    let randomMovieObj =
      movieList[Math.floor(Math.random() * movieList.length)] || {};

    // console.log(movieList);

    let mainpageContent;

    if (profile === null || loading) {
      mainpageContent = <h2>Laddar innehåll...</h2>;
    } else {
      mainpageContent = <h2>Välkommen {user.username}</h2>;
    }

    return (
      <React.Fragment>
        <Segment
          style={{
            backgroundColor: "rgb(0,0,0)",
            borderRadius: "0",
            padding: "1px 0 0 0"
          }}
        >
          <MovieBackdropDisplay monMovie={randomMovieObj} />
          {/* <div className="mainpage">
            <div className="containerMainpage">
              <h1>Kråkebackens biograf</h1>
              {mainpageContent}
            </div>
          </div> */}
          <MonMovieDisplay
            setCurrentCloseUpMovieId={this.props.setCurrentCloseUpMovieId}
            monMovies={movieList}
          />
          <MovieCloseUp
            currentCloseUpMovieId={this.props.currentCloseUpMovieId}
            monMovies={movieList}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

Mainpage.propTypes = {
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
  { getCurrentProfile, getAllMonMovies, setCurrentCloseUpMovieId }
)(Mainpage);
