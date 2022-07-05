import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { seatNameConverter } from "../common/seatingFunctions";
import {
  userPopupClose,
  updateUser,
  deleteUser,
  getAllUsers
} from "../../actions/usersActions";
import {
  Button,
  Dropdown,
  Image,
  Icon,
  Card,
  Segment
} from "semantic-ui-react";
import "./users.css";
import { vipOptions } from "./vipSeating.js";

class UserPopup extends Component {
  constructor() {
    super();
    this.state = {
      showOrHide: false,
      userInfo: {},

      total: null,
      season: null,
      status: null,
      seat: null
      //   description: ""
    };
    this.editValues = this.editValues.bind(this);
    this.seatValue = this.seatValue.bind(this);
  }

  handleClick = () => this.setState({ status: !this.state.status });

  closePopup() {
    this.setState({
      status: null
    });
    this.props.userPopupClose();
  }

  deleteUser(user) {
    this.props.deleteUser(user);
    this.props.userPopupClose();
  }

  updateUserDb() {
    let { userInfo, total, season, status, seat } = this.state;
    let userDb;

    let seating;

    if (status === false) {
      seating = "";
    } else {
      seating = seat;
    }

    userDb = {
      total: total,
      season: season,
      email: userInfo.email,
      status: status,
      seat: seating
    };
    this.props.updateUser(userDb);

    this.props.userPopupClose();
  }

  changeInput(event) {
    let nameOfClass = event.target.className;
    this.editValues(nameOfClass, event.target.textContent);
  }

  editValues(nameOfClass, data) {
    switch (nameOfClass) {
      case "ui grey inverted header title":
        this.setState({
          title: data
        });
        break;
      case "description":
        this.setState({
          description: data
        });
        break;
      default:
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps)
    if (nextProps.users.userInfo && nextProps.users.userInfo.stats) {
      console.log("showOrHide: nextProps.users.showOrHide",  nextProps.users.showOrHide)
      this.setState({
        userInfo: nextProps.users.userInfo,
        showOrHide: nextProps.users.showOrHide,
        total: nextProps.users.userInfo.stats.total,
        season: nextProps.users.userInfo.stats.season,
        status: nextProps.users.userInfo.vip.status,
        seat: nextProps.users.userInfo.vip.seat
      });
    } else {
      this.setState({
        userInfo: nextProps.users.userInfo,
        showOrHide: nextProps.users.showOrHide,
        total: null,
        season: null,
        status: null,
        seat: null
      });
    }
  }
  changeStats(e) {
    let value = e.target.value;
    switch (value) {
      case "sMinus":
        this.setState({
          season: Number(this.state.season) - 1
        });
        break;
      case "sPlus":
        this.setState({
          season: Number(this.state.season) + 1
        });
        break;
      case "tMinus":
        this.setState({
          total: Number(this.state.total) - 1
        });
        break;
      case "tPlus":
        this.setState({
          total: Number(this.state.total) + 1
        });
        break;
      default:
        break;
    }
  }

  seatValue(e, { value }) {
    e.persist();

    this.setState({
      seat: value
    });
  }

  seatingNrToName() {
    let { seat } = this.state;
    return seatNameConverter(seat);
  }

  render() {
    let { showOrHide, userInfo, total, season, status, seat } = this.state;
    let userPopup;
    let vipSeating;
    console.log('showOrHide ', showOrHide)

    if (seat !== null || undefined) {
      vipSeating = this.seatingNrToName();
    }

    if (showOrHide) {
      if (userInfo.email === "charliegh.christyana@moneyln.com") {
        //Dummy mail, existerar inte
        userPopup = (
          <div className="popupUser">
            <Segment inverted>
              <Card className="containerInPopup">
                <Image
                  className="crowPicture"
                  src="krakebackens_logo.png"
                  size="small"
                  circular
                  centered
                />
                <h1 style={{ textAlign: "center" }}>Gästkonto</h1>
                <h3
                  className="whiteText"
                  style={{ textAlign: "center", marginTop: "-1rem" }}
                >
                  Kontot används för att att spara statistik från gäster.
                </h3>

                <Card.Content className="userStats">
                  <h2 className="whiteText">
                    <Icon name="chart bar" />
                    Statistik:
                  </h2>
                  <h4 className="whiteText">Antal besök i år:</h4>
                  <Button
                    inverted
                    size="mini"
                    value="sMinus"
                    onClick={e => this.changeStats(e)}
                    icon="minus"
                  />
                  <span
                    style={{ fontSize: "1.8rem", margin: "1rem" }}
                    className="whiteText"
                  >
                    {season}
                  </span>
                  <Button
                    inverted
                    size="mini"
                    value="sPlus"
                    onClick={e => this.changeStats(e)}
                    icon="plus"
                  />
                  <h4 className="whiteText">Antal besök totalt:</h4>
                  <Button
                    inverted
                    size="mini"
                    value="tMinus"
                    onClick={e => this.changeStats(e)}
                    icon="minus"
                  />
                  <span
                    style={{ fontSize: "1.8rem", margin: "1rem" }}
                    className="whiteText"
                  >
                    {total}
                  </span>
                  <Button
                    inverted
                    size="mini"
                    value="tPlus"
                    onClick={e => this.changeStats(e)}
                    icon="plus"
                  />
                </Card.Content>

                <Button.Group>
                  <Button
                    className="updateButton"
                    color="green"
                    attached="bottom"
                    onClick={e => this.updateUserDb()}
                  >
                    Uppdatera databasen
                  </Button>
                  <Button
                    attached="bottom"
                    className="closeButton"
                    onClick={e => this.closePopup()}
                  >
                    <Icon name="left chevron" />
                    Stäng
                  </Button>
                </Button.Group>
              </Card>
            </Segment>
          </div>
        );
      } else {
        userPopup = (
          <div className="popupUser">
            <Segment inverted>
              <Card className="containerInPopup">
                <Image
                  className="crowPicture"
                  src="krakebackens_logo.png"
                  size="small"
                  circular
                  centered
                />
                <h1 style={{ textAlign: "center" }}>{userInfo.username}</h1>
                <h3
                  className="whiteText"
                  style={{ textAlign: "center", marginTop: "-1rem" }}
                >
                  <Icon name="mail" />
                  {userInfo.email}
                </h3>

                <Card.Content className="userStats">
                  <h2 className="whiteText">
                    <Icon name="chart bar" />
                    Statistik:
                  </h2>
                  <h4 className="whiteText">Antal besök i år:</h4>
                  <Button
                    inverted
                    size="mini"
                    value="sMinus"
                    onClick={e => this.changeStats(e)}
                    icon="minus"
                  />
                  <span
                    style={{ fontSize: "1.8rem", margin: "1rem" }}
                    className="whiteText"
                  >
                    {season}
                  </span>
                  <Button
                    inverted
                    size="mini"
                    value="sPlus"
                    onClick={e => this.changeStats(e)}
                    icon="plus"
                  />
                  <h4 className="whiteText">Antal besök totalt:</h4>
                  <Button
                    inverted
                    size="mini"
                    value="tMinus"
                    onClick={e => this.changeStats(e)}
                    icon="minus"
                  />
                  <span
                    style={{ fontSize: "1.8rem", margin: "1rem" }}
                    className="whiteText"
                  >
                    {total}
                  </span>
                  <Button
                    inverted
                    size="mini"
                    value="tPlus"
                    onClick={e => this.changeStats(e)}
                    icon="plus"
                  />
                </Card.Content>

                <Card.Content className="userVip">
                  <h2 className="whiteText">
                    <Icon name="star" />
                    VIP status:
                  </h2>
                  <div
                    style={{
                      float: "right",
                      position: "relative",
                      top: "-3rem"
                    }}
                  >
                    <Button
                      floated="right"
                      toggle
                      active={status}
                      onClick={this.handleClick}
                    >
                      VIP
                    </Button>
                    {status ? (
                      <Dropdown
                        placeholder="Väljs VIP-plats"
                        search
                        selection
                        options={vipOptions}
                        onChange={this.seatValue}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <h4>{status ? "VIP-medlem" : "Medlem"}</h4>
                  <h4>{status ? `${vipSeating}` : "-"}</h4>
                </Card.Content>

                <Button.Group>
                  <Button
                    attached="bottom"
                    className="deleteButton"
                    onClick={e => this.deleteUser(userInfo)}
                  >
                    Ta bort från databasen
                  </Button>
                  <Button
                    className="updateButton"
                    color="green"
                    attached="bottom"
                    onClick={e => this.updateUserDb()}
                  >
                    Uppdatera databasen
                  </Button>
                  <Button
                    attached="bottom"
                    className="closeButton"
                    onClick={e => this.closePopup()}
                  >
                    <Icon name="left chevron" />
                    Stäng
                  </Button>
                </Button.Group>
              </Card>
            </Segment>
          </div>
        );
      }
    } else {
      userPopup = "";
    }
    return <div>{userPopup}</div>;
  }
}

UserPopup.propTypes = {
  userPopupClose: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  users: state.users
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    userPopupClose,
    deleteUser,
    updateUser,
    getAllUsers
    // updateDb
  }
)(UserPopup);
