import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import { Segment} from 'semantic-ui-react';


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
      mainpageContent = <h2>Laddar innehåll...</h2>;
    } else {
      mainpageContent = <h2>Välkommen {user.username}</h2>;
    }

    return (
      <Segment>
      <div className="mainpage">
        <div className="container">
          <h1>Kråkebackens biograf</h1>
          {mainpageContent}
        </div>
      </div>
      </Segment>
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
