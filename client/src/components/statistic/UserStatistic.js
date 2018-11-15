import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./statistic.css";
import { Statistic, List, Divider, Icon, Image } from "semantic-ui-react";

import { getAllUsers } from "../../actions/usersActions";

class UserStatistic extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users
    });
  }

  seasonUsers() {
    const { users } = this.state.users;
    let seasonStats = users.reduce(function(acc, obj) {
      return acc + obj.stats.season;
    }, 0);

    return seasonStats;
  }

  totalUsers() {
    const { users } = this.state.users;
    let totalStats = users.reduce(function(acc, obj) {
      return acc + obj.stats.total;
    }, 0);

    return totalStats;
  }

  topUsersThisSeason() {
    const { users } = this.state.users;
    let newList = users.sort(function(a, b) {
      return parseFloat(b.stats.season) - parseFloat(a.stats.season);
    });
    return newList.slice(0, 5);
  }

  topUsersInTotal() {
    const { users } = this.state.users;
    let newList = users.sort(function(a, b) {
      return parseFloat(b.stats.total) - parseFloat(a.stats.total);
    });
    return newList.slice(0, 5);
  }

  render() {
    //state
    const { users } = this.state.users;

    //Content
    let userContent;
    let userContentTopList;

    if (users) {
      //Stats
      let seasonUserStats = this.seasonUsers();
      let totalUserStats = this.totalUsers();
      let topUserSeason = this.topUsersThisSeason();
      let topUserTotal = this.topUsersInTotal();

      userContent = (
        <div>
          <Statistic.Group>
            <Statistic>
              <Statistic.Value>{seasonUserStats}</Statistic.Value>
              <Statistic.Label>Besök i år</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{totalUserStats}</Statistic.Value>
              <Statistic.Label>besökare totalt</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{users.length}</Statistic.Value>
              <Statistic.Label>medlemmar (inklusive gästkonto)</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>
      );

      userContentTopList = (
        <div className="tableContainer">
          <div className="firstList">
            <h2>Top 5 besökare i år</h2>

            <List size="large" animated verticalAlign="middle">
              {topUserSeason.map(user => {
                return (
                  <List.Item key={user._id}>
                    <Icon
                      name="user circle outline"
                      size="big"
                      color="violet"
                    />
                    <List.Content>
                      <List.Header>{user.username}</List.Header>
                      <strong>{user.stats.season}</strong>
                      <Divider />
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </div>
          <div className="secondList">
            <h2>Top 5 genom tiderna</h2>
            <List size="large" animated verticalAlign="middle">
              {topUserTotal.map(user => {
                return (
                  <List.Item key={user._id}>
                    <Icon
                      name="user circle outline"
                      size="big"
                      color="violet"
                    />
                    <List.Content>
                      <List.Header>{user.username}</List.Header>
                      <strong>{user.stats.total}</strong>
                      <Divider />
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </div>
        </div>
      );
    } else {
      userContent = "";
      userContentTopList = "";
    }

    return (
      <React.Fragment>
        <h2>Statistik från medlemmar</h2>
        {userContent}
        <br />
        <Divider />
        <br />
        {userContentTopList}
        <br />
        <Divider />
      </React.Fragment>
    );
  }
}

UserStatistic.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    getAllUsers
  }
)(UserStatistic);
