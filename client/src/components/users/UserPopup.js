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
  Icon
} from "semantic-ui-react";

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

    if (showOrHide) {
      userPopup = (
        <div className="popup">
          <Header
            as="h1"
            inverted
            color="grey"
            className="title"
            // contentEditable={true}
            // suppressContentEditableWarning="true"
            // onInput={event => this.changeInput(event)}
          >
            {userInfo.username}
          </Header>
          <Container className="containerInPopup">
            <span className="date boldSpan">{userInfo.email}</span>
            <br />
            <br />
            {/* <div className="descriptionContainer">
              <p
                className="description"
                contentEditable={true}
                suppressContentEditableWarning="true"
                onInput={event => this.changeInput(event)}
              >
                {userInfo.description}
              </p>
            </div>
            <br /> */}

            <p>
              <strong>VIP status:</strong> <br />
              <span className="date boldSpan">
                {userInfo.vip.status ? "VIP-medlem" : "Vanlig medlem"}
              </span>
              <br />
              {userInfo.vip.status ? (
                <span className="date boldSpan">
                  {" "}
                  Plats: {userInfo.vip.seat}
                </span>
              ) : (
                ""
              )}
            </p>
            <p>
              <strong>Statistik:</strong> <br />
              <span className="date boldSpan">
                Besök i år: {userInfo.stats.season}
              </span>
              <br />
              <span className="date boldSpan">
                Totalt: {userInfo.stats.total}
              </span>
              <br />
            </p>
          </Container>
          <br />
          <br />
          <Divider />
          <Button.Group>
            <Button
              inverted
              color="green"
              onClick={e => this.updateUserDb(userInfo)}
            >
              Uppdatera databasen
            </Button>
            <Button
              inverted
              color="red"
              onClick={e => this.deleteUser(userInfo)}
            >
              Ta bort från databasen
            </Button>
            <Button inverted color="purple" onClick={e => this.closePopup()}>
              Stäng
            </Button>
          </Button.Group>
        </div>
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
