import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./statistic.css";
import {
  Statistic,
  List,
  Divider,
  Icon,
  Button,
  Confirm
} from "semantic-ui-react";

import {
  getAllUsers,
  resetStats,
  saveUserStatsToArchive
} from "../../actions/usersActions";

class UserStatistic extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userStatistic: {
        season: 0
      },
      show: false
    };
  }

  handleConfirm = () => {
    this.resetSeasonStats();
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

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

  guestStatsTotal() {
    const { users } = this.state.users;
    let guest;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === "charliegh.christyana@moneyln.com") {
        //Dummy mail, existerar inte
        guest = users[i];
      }
    }
    return guest.stats.total;
  }

  guestStatsSeason() {
    const { users } = this.state.users;
    let guest;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === "charliegh.christyana@moneyln.com") {
        //Dummy mail, existerar inte
        guest = users[i];
      }
    }
    return guest.stats.season;
  }

  topUsersThisSeason() {
    const { users } = this.state.users;
    let newList = users.sort(function(a, b) {
      return parseFloat(b.stats.season) - parseFloat(a.stats.season);
    });

    for (let i = 0; i < newList.length; i++) {
      if (newList[i].email === "charliegh.christyana@moneyln.com") {
        //Dummy mail, existerar inte
        newList.splice(i, 1);
        break;
      }
    }

    return newList.slice(0, 5);
  }

  topUsersInTotal() {
    const { users } = this.state.users;
    let newList = users.sort(function(a, b) {
      return parseFloat(b.stats.total) - parseFloat(a.stats.total);
    });

    for (let i = 0; i < newList.length; i++) {
      if (newList[i].email === "charliegh.christyana@moneyln.com") {
        //Dummy mail, existerar inte
        newList.splice(i, 1);
        break;
      }
    }

    return newList.slice(0, 5);
  }

  show = () => {
    this.setState({ open: true });
  };

  resetSeasonStats() {
    let topUsers = this.topUsersThisSeason();
    let newTopUsers = topUsers.map(user => {
      return `${user.username} - ${user.stats.season} besök`;
    });

    let seasonViewings = this.seasonUsers();

    let dateObj = new Date();

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getUTCDate();

    let newDate = `${year}-${month}-${day}`;

    let objToArchive = {
      seasonUserViewings: seasonViewings,
      seasonTopUsers: newTopUsers,
      archivedDate: newDate
    };

    this.props.resetStats();
    this.props.saveUserStatsToArchive(objToArchive);
  }

  render() {
    //state
    const { users } = this.state.users;
    const { open } = this.state;

    //Content
    let userContent;
    let userContentTopList;

    if (users) {
      //Stats
      let guestUserTotal = this.guestStatsTotal();
      let guestUserSeason = this.guestStatsSeason();
      let seasonUserStats = this.seasonUsers();
      let totalUserStats = this.totalUsers();
      let topUserSeason = this.topUsersThisSeason();
      let topUserTotal = this.topUsersInTotal();

      userContent = (
        <div className="statsFromUsers">
          <Statistic.Group size="small" className="userGroup">
            <Statistic>
              <Statistic.Value>{seasonUserStats}</Statistic.Value>
              <Statistic.Label>Besök i år</Statistic.Label>
            </Statistic>
            <span
              style={{
                borderRight: "1px solid grey",
                height: "5rem",
                opacity: "0.5"
              }}
            />
            <Statistic>
              <Statistic.Value>{guestUserSeason}</Statistic.Value>
              <Statistic.Label>gäster i år</Statistic.Label>
            </Statistic>
            <span
              style={{
                borderRight: "1px solid grey",
                height: "5rem",
                opacity: "0.5"
              }}
            />

            <Statistic>
              <Statistic.Value>{totalUserStats}</Statistic.Value>
              <Statistic.Label>besökare totalt</Statistic.Label>
            </Statistic>
            <span
              style={{
                borderRight: "1px solid grey",
                height: "5rem",
                opacity: "0.5"
              }}
            />

            <Statistic>
              <Statistic.Value>{guestUserTotal}</Statistic.Value>
              <Statistic.Label>gäster totalt</Statistic.Label>
            </Statistic>
            <span
              style={{
                borderRight: "1px solid grey",
                height: "5rem",
                opacity: "0.5"
              }}
            />

            <Statistic>
              <Statistic.Value>{users.length}</Statistic.Value>
              <Statistic.Label>medlemmar </Statistic.Label>
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
        <br />
        {userContent}
        <br />
        <br />

        {userContentTopList}
        <br />
        <div
          style={{ position: "absolute", left: "47%", marginLeft: "-100px" }}
        >
          <Button
            style={{ margin: "0 auto" }}
            basic
            color="purple"
            onClick={e => this.show()}
          >
            Nollställ årets användarstatistik
          </Button>
          <Confirm
            open={open}
            className="confirmDeleteMovie"
            header="Nollställa årets statistik"
            content="Är du säker på att du vill nollställa statistiken för alla användare?"
            cancelButton="Gå tillbaka"
            confirmButton="Nollställ"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        </div>
      </React.Fragment>
    );
  }
}

UserStatistic.propTypes = {
  saveUserStatsToArchive: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  resetStats: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    saveUserStatsToArchive,
    getAllUsers,
    resetStats
  }
)(UserStatistic);
