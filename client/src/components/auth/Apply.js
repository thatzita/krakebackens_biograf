import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  // Form,
  // Checkbox,
  // Message,
  Icon,
  // Modal,
  // Segment,
  Divider
} from "semantic-ui-react";
import Footer from "../layout/Footer";
import { userRequest } from "../../actions/applyActions";
// import termsOfService from "./policy/termsOfService";
// import privacyPolicy from "./policy/privacyPolicy";

class Apply extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      errors: {},
      success: {},
      checked: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle = () => this.setState({ checked: !this.state.checked });

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        success: {}
      });
    }
    if (nextProps.success.success) {
      this.setState({
        success: nextProps.success.success,
        username: "",
        email: ""
      });
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const requestFromUser = {
      username: this.state.username,
      email: this.state.email
    };

    this.props.userRequest(requestFromUser);
  }

  render() {
    // const { username, email, checked, errors, success } = this.state;

    // const tos = (
    //   <button
    //     style={{
    //       backgroundColor: "transparent",
    //       color: "white",
    //       border: "transparent",
    //       cursor: "pointer"
    //     }}
    //   >
    //     Terms of Service
    //   </button>
    // );
    // const pp = (
    //   <button
    //     style={{
    //       marginLeft: "1rem",
    //       backgroundColor: "transparent",
    //       color: "white",
    //       border: "transparent",
    //       cursor: "pointer"
    //     }}
    //   >
    //     Privacy Policy
    //   </button>
    // );
    return (
      <div>
        <div className="applyContainer">
          <h1 className="loginTitle">Ansök om medlemskap</h1>
          <Divider
            style={{
              marginTop: "0.5rem",
              marginBottom: "1rem",
              padding: "0",
              borderBottom: "1px solid #f4f4f4",
              opacity: "0.3"
            }}
          />
          <div class="ui segment">
  <p>För att ansöka om medlemskap får du kontakta Kråkan, skicka iväg ett mejl till <strong>krakebackensbiograf@gmail.com</strong></p>
</div>

          {/* <Form error success>
            <Form.Field>
              <label className="applyFieldLabel">Användarnamn</label>
              <input
                type="text"
                placeholder="Användarnamn"
                name="username"
                value={username}
                onChange={this.onChange}
              />
              <Message error content={errors.username} />
            </Form.Field>
            <Form.Field>
              <label className="applyFieldLabel">E-post</label>
              <input
                type="email"
                placeholder="E-post"
                name="email"
                value={email}
                onChange={this.onChange}
              />
              <Message error content={errors.email} />
            </Form.Field>
            <Segment inverted>
              <Form.Field
                onChange={this.toggle}
                checked={checked}
                control={Checkbox}
                label={{
                  children: `Jag godkänner villkoren`
                }}
                className="applyFieldLabel"
              />
              <Modal trigger={tos} closeIcon>
                <Modal.Content style={{ backgroundColor: "#1B1C1D" }}>
                  {termsOfService()}
                </Modal.Content>
              </Modal>
              <Modal trigger={pp} closeIcon>
                <Modal.Content style={{ backgroundColor: "#1B1C1D" }}>
                  {privacyPolicy()}
                </Modal.Content>
              </Modal>
            </Segment>
            {checked ? (
              <Button color="violet" type="submit" onClick={this.onSubmit}>
                <Icon name="send" />
                Skicka förfrågan
              </Button>
            ) : (
              <Button floated="right" disabled color="violet" type="submit">
                <Icon name="send" />
                Skicka förfrågan
              </Button>
            )} */}

            <Button floated="right" inverted basic as={Link} to="/">
              <Icon name="left chevron" />
              Tillbaka
            </Button>

            {/* <Message success header={success.title} content={success.msg} />
          </Form> */}
        </div>
        <Footer />
      </div>
    );
  }
}

Apply.propTypes = {
  userRequest: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  { userRequest }
)(Apply);
