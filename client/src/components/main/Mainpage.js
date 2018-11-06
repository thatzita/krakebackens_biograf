import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";

class Mainpage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    // console.log(user);
    const { profile, loading } = this.props.profile;

    let mainpageContent;

    if (profile === null || loading) {
      mainpageContent = <h4>Laddar innehåll...</h4>;
    } else {
      mainpageContent = <h1>Välkommen {user.username}</h1>;
    }

    return (
      <div className="mainpage">
        <div className="container">
          <h1>Kråkebackens biograf</h1>
          {mainpageContent}
        </div>
      </div>
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Mainpage);
