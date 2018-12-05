import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./statistic.css";
import {
  Statistic,
  List,
  Divider,
  Icon,
  Image,
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
    // console.log("clear stats");
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

  topUsersThisSeason() {
    const { users } = this.state.users;
    let newList = users.sort(function(a, b) {
      return parseFloat(b.stats.season) - parseFloat(a.stats.season);
    });

    return newList.slice(0, 3);
  }

  topUsersInTotal() {
    const { users } = this.state.users;
    let newList = users.sort(function(a, b) {
      return parseFloat(b.stats.total) - parseFloat(a.stats.total);
    });
    return newList.slice(0, 3);
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
      let seasonUserStats = this.seasonUsers();
      let totalUserStats = this.totalUsers();
      let topUserSeason = this.topUsersThisSeason();
      let topUserTotal = this.topUsersInTotal();

      userContent = (
        <div className="statsFromUsers">
          <Statistic.Group className="userGroup">
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
        {/* <h2>Statistik från medlemmar</h2> */}
        <br />
        {userContent}
        <br />
        {/* <Divider /> */}
        <br />
        <br />
        {userContentTopList}
        <br />
        <div
          style={{ position: "absolute", left: "50%", marginLeft: "-100px" }}
        >
          <Button
            style={{ margin: "0 auto" }}
            basic
            color="purple"
            onClick={e => this.show()}
          >
            Nollställ årets statistik
          </Button>
          <Confirm
            open={open}
            className="confirmDeleteMovie"
            header="Nollställa statistik"
            content="Är du säker på att du vill nollställa statistiken?"
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
