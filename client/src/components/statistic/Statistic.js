import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./statistic.css";
import Admin from "../admin/Admin";
import UserStatistic from "./UserStatistic";

import { getAllUsers } from "../../actions/usersActions";

class Statistic extends Component {
  constructor() {
    super();
    this.state = {
      //   users: []
    };
  }

  //   componentDidMount() {
  //     this.props.getAllUsers();
  //   }

  //   componentWillReceiveProps(nextProps) {
  //     this.setState({
  //       users: nextProps.users
  //     });
  //   }

  render() {
    // const { users } = this.state.users;

    // if (users) {
    //   console.log(this.state.users);
    // }
    return (
      <div className="containerStatistic">
        <h1>Statistik</h1>
        <hr />
        <Admin />
        <UserStatistic />
      </div>
    );
  }
}

Statistic.propTypes = {
  //   getAllUsers: PropTypes.func.isRequired,
  //   users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //   users: state.users
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    // getAllUsers
  }
)(Statistic);
