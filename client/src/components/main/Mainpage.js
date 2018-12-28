import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import {
  getAllMonMovies,
  getAllMonEvents
} from "../../actions/monMovieActions";
import { Segment, Modal, Button } from "semantic-ui-react";
import Footer from "../layout/Footer";
import MonMovieDisplay from "./MonMovieDisplay";
import MovieBackdropDisplay from "./MovieBackdropDisplay";
// import MovieCloseUp from "./MovieCloseUp";

class Mainpage extends Component {
  state = { ticketBooked: false };

  show = () => this.setState({ ticketBooked: true });
  close = () => {
    this.props.history.push({
      state: { ticketBooked: false }
    });
    this.setState({ ticketBooked: false });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getCurrentProfile();
    this.props.getAllMonMovies();
    this.props.getAllMonEvents();
    if (localStorage.adminPage) {
      this.props.history.push("/adminhome");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state) {
      if (nextProps.location.state.ticketBooked) {
        this.setState({
          ticketBooked: true
        });
      }
    } else {
      this.setState({
        ticketBooked: false
      });
    }
  }
  render() {
    const { ticketBooked } = this.state;
    const eventList = this.props.monMovies.monEvents || [];
    const movieList = this.props.monMovies.monMovies || [];
    let randomMovieObj =
      movieList[Math.floor(Math.random() * movieList.length)] || {};

    return (
      <React.Fragment>
        <Segment
          style={{
            backgroundColor: "rgb(0,0,0)",
            borderRadius: "0",
            padding: "1px 0 0 0"
          }}
        >
          <Modal size="small" open={ticketBooked} onClose={this.close}>
            <Modal.Header>Tack för din bokning!</Modal.Header>
            <Modal.Content>
              <p>
                Ett bekräftelsemail har skickats till{" "}
                {this.props.auth.user.email}.
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.close}>Stäng</Button>
            </Modal.Actions>
          </Modal>
          <MovieBackdropDisplay monMovie={randomMovieObj} />
          <MonMovieDisplay monMovies={movieList} />
          <MonMovieDisplay monMovies={eventList} />
        </Segment>
        <Footer />
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
  movies: state.movies,
  profile: state.profile,
  auth: state.auth,
  monMovies: state.monMovies,
  currentCloseUpMovieId: state.adminPage.currentCloseUpMovieId
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getAllMonMovies,
    getAllMonEvents
  }
)(Mainpage);
