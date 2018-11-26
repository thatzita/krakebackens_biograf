import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  userPopupClose,
  //   updateDb,
  deleteUser
} from "../../actions/usersActions";
import {
  Button,
  Header,
  Container,
  Divider,
  Image,
  Icon,
  Card,
  Segment
} from "semantic-ui-react";
import "./users.css";

class UserPopup extends Component {
  constructor() {
    super();
    this.state = {
      showOrHide: false,
      userInfo: {}
      //   title: "",
      //   description: ""
    };
    this.editValues = this.editValues.bind(this);
  }

  closePopup() {
    this.props.userPopupClose();
  }

  deleteUser(user) {
    this.props.deleteUser(user);
    this.props.userPopupClose();
  }

  updateUserDb() {
    let { userInfo } = this.state;
    // let { title, description } = this.state;
    let userDb;

    //     if (title === "" && description !== "") {
    //       movieDb = {
    //         title: userInfo.title,
    //         description: description,
    //         id: userInfo._id
    //       };
    //     } else if (title !== "" && description === "") {
    //       movieDb = {
    //         title: title,
    //         description: userInfo.description,
    //         id: userInfo._id
    //       };
    //     } else if (title !== "" && description !== "") {
    //       movieDb = {
    //         title: title,
    //         description: description,
    //         id: userInfo._id
    //       };
    //     } else {
    //       movieDb = {
    //         title: userInfo.title,
    //         description: userInfo.description,
    //         id: userInfo._id
    //       };
    //     }
    //     this.props.updateDb(movieDb);
    //     this.setState({
    //       title: "",
    //       description: ""
    //     });
    //     this.closePopup();
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
    this.setState({
      userInfo: nextProps.users.userInfo,
      showOrHide: nextProps.users.showOrHide
    });
  }

  render() {
    let { showOrHide } = this.state;
    let { userInfo } = this.state;
    let userPopup;
    let vipInfo;
    console.log(userInfo);

    if (showOrHide) {
      userPopup = (
        <Segment inverted>
          <Card fluid className="cardContainer">
            <Image
              className="crowPicture"
              src="krakebackens_logo.png"
              size="medium"
              circular
              centered
            />
            {/* <Card.Header>{profile.username}</Card.Header> */}
            <h1>{userInfo.username}</h1>
            <h3
              className="whiteText"
              style={{ textAlign: "center", marginTop: "-1rem" }}
            >
              <Icon name="mail" />
              {userInfo.email}
            </h3>

            <Card.Content className="userStats">
              <h2
                className="whiteText"
                // style={{ textDecoration: "underline" }}
              >
                <Icon name="chart bar" />
                Statistik:
              </h2>
              <h4 className="whiteText">Antal besök i år:</h4>
              <span className="whiteText">{userInfo.stats.season}</span>
              <h4 className="whiteText">Antal besök totalt:</h4>
              <span className="whiteText">{userInfo.stats.total}</span>
            </Card.Content>

            <Card.Content className="userVip">
              <h2
                // style={{ textDecoration: "underline" }}
                className="whiteText"
              >
                <Icon name="star" />
                VIP status:
              </h2>
              <p>{userInfo.vip.status ? "VIP-medlem" : "Medlem"}</p>
              <p>
                {userInfo.vip.status ? `VIP-plats: ${userInfo.vip.seat}` : ""}
              </p>
            </Card.Content>

            {/* <h3>Filmer du sett:</h3>
              <ul>{watchedMovies}</ul> */}
          </Card>

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
              onClick={e => this.updateUserDb(userInfo)}
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
        </Segment>
      );
    } else {
      userPopup = "";
    }
    return <div>{userPopup}</div>;
  }
}

UserPopup.propTypes = {
  userPopupClose: PropTypes.func.isRequired,
  //   updateDb: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  //   userInfo: PropTypes.object.isRequired
  //   movies: PropTypes.object.isRequired
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
    deleteUser
    // updateDb
  }
)(UserPopup);
