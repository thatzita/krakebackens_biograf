import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Footer from "../layout/Footer";
import {
  Button,
  Segment,
  Form,
  Message,
  Icon,
  Card,
  Divider,
  Confirm,
  Header
} from "semantic-ui-react";
import "./profile.css";
import {
  getCurrentProfile,
  deleteAccount,
  changeUsername
} from "../../actions/profileActions";
import { changePassword } from "../../actions/authActions";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      userId: "",
      errors: {},
      password: "",
      password2: "",
      nameSuccess: { value: false },
      passwordSuccess: { value: false },
      success: {},
      openChangePassword: true,
      confirmOpen: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        success: {}
      });
    }
    if (nextProps.auth.success) {
      this.setState({
        success: nextProps.auth.success,
        password: "",
        password2: "",
        errors: {}
      });
    }
    if (nextProps.profile.profile) {
      let nameSuccess;

      if (nextProps.nameSuccess) {
        nameSuccess = nextProps.nameSuccess;
      } else {
        nameSuccess = { value: false };
      }

      this.setState({
        username: nextProps.profile.profile.username,
        userId: nextProps.profile.profile.id,
        nameSuccess: nameSuccess
      });
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  changeName = () => {
    if (this.state.username.length > 0 && this.state.userId.length > 0) {
      let updateObj = {
        username: this.state.username,
        id: this.state.userId
      };
      this.props.changeUsername(updateObj);
    }
  };

  onSubmit(event) {
    event.preventDefault();

    const user = {
      password: this.state.password,
      password2: this.state.password2,
      id: this.props.auth.user.id
    };

    this.props.changePassword(user);
  }

  onDeleteClick(event) {
    this.props.deleteAccount();
  }

  show = () => {
    this.setState({ confirmOpen: true });
  };
  handleConfirm = () => {
    this.onDeleteClick();
    this.setState({ confirmOpen: false });
  };

  handleCancel = () => this.setState({ confirmOpen: false });

  render() {
    const { errors } = this.state;
    const { password, password2 } = this.state;
    const { success } = this.state;

    return (
      <React.Fragment>
        <Segment.Group padded="very">
          <Segment
            inverted
            style={{ width: "60%", minWidth: "500px", margin: "auto" }}
            padded="very"
          >
            <Header
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "space-between"
              }}
              as="h2"
            >
              <span>
                <Icon name="cog" />
                <Header.Content>Inställningar</Header.Content>
              </span>
              <Button inverted basic floated="right" as={Link} to="/profile">
                <Icon name="left chevron" />
                Gå tillbaka
              </Button>
            </Header>
            <Divider style={{ backgroundColor: "rgba(244,244,244,0.2)" }} />
            <Segment.Group>
              <Header
                dividing
                inverted
                as="h5"
                attached="top"
                style={{ backgroundColor: "#313131" }}
              >
                Ändra användarnamn
              </Header>
              <Segment inverted style={{ backgroundColor: "#313131" }}>
                <Form inverted>
                  <Form.Input
                    name="username"
                    value={this.state.username || "namn"}
                    onChange={this.onChange}
                    label="Användarnamn"
                    placeholder="namn"
                  />
                  {this.state.nameSuccess.value ? (
                    <span style={{ color: "#21ba45" }}>
                      <Icon name="check" color="green" /> Ditt namn har sparats
                    </span>
                  ) : null}
                  <Button
                    onClick={() => this.changeName()}
                    floated="right"
                    color="green"
                  >
                    <Icon name="save" /> spara användarnamn
                  </Button>
                </Form>
              </Segment>
            </Segment.Group>

            {this.state.openChangePassword ? (
              <Segment.Group>
                <Header
                  dividing
                  inverted
                  as="h5"
                  attached="top"
                  style={{ backgroundColor: "#313131" }}
                >
                  Byt lösenord
                </Header>
                <Segment inverted style={{ backgroundColor: "#313131" }}>
                  <Form inverted error success>
                    <Form.Input
                      inverted
                      type="password"
                      label="Lösenord"
                      name="password"
                      placeholder="Skriv ett lösenord"
                      value={password}
                      onChange={this.onChange}
                    />
                    <Message error content={errors.password} />
                    <Form.Input
                      inverted
                      type="password"
                      label="Bekräfta lösenord"
                      name="password2"
                      placeholder="Bekräfta lösenord "
                      value={password2}
                      onChange={this.onChange}
                    />
                    <Message error content={errors.password2} />
                    <div>
                      {success.value ? (
                        <span style={{ color: "#21ba45" }}>
                          <Icon name="check" color="green" /> Ditt nya lösenord
                          har nu sparats
                        </span>
                      ) : null}
                      <Button
                        floated="right"
                        color="green"
                        type="submit"
                        onClick={this.onSubmit}
                      >
                        <Icon name="save" /> Uppdatera lösenord
                      </Button>
                    </div>
                    {/* <Message
                      success
                      header={success.title}
                      content={success.msg}
                    /> */}
                  </Form>
                </Segment>
              </Segment.Group>
            ) : null}

            <Segment.Group>
              <Header
                dividing
                inverted
                as="h5"
                attached="top"
                style={{ backgroundColor: "#313131" }}
              >
                Avsluta medlemskap
              </Header>
              <Segment inverted style={{ backgroundColor: "#313131" }}>
                <p>
                  Om du av någon anledning vill avsluta ditt medlemskap och ta
                  bort ditt konto, kan du göra det här.
                </p>
                <Form inverted>
                  <Button onClick={() => this.show()} color="red">
                    <Icon name="warning sign" /> Ta bort mitt konto på
                    Kråkebackens Biograf
                  </Button>
                </Form>
              </Segment>
            </Segment.Group>
            {/* <Button inverted basic floated="right" as={Link} to="/profile">
              <Icon name="left chevron" />
              Gå tillbaka
            </Button> */}
          </Segment>
        </Segment.Group>
        <Confirm
          open={this.state.confirmOpen}
          className="confirmDeleteUser"
          header="Du är på väg att ta bort ditt konto"
          content="Är du säker att du vill ta bort ditt konto? Observera att det inte går att ta tillbaka kontot när det väl är borttaget!"
          cancelButton="Gå tillbaka"
          confirmButton="Ta bort mitt konto"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

ChangePassword.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  success: state.success,
  auth: state.auth,
  nameSuccess: state.profile.nameSuccess
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    getCurrentProfile,
    changePassword,
    deleteAccount,
    changeUsername
  }
)(ChangePassword);
