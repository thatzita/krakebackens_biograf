import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Checkbox, Message, Icon } from "semantic-ui-react";
import Footer from "../layout/Footer";
import { userRequest } from "../../actions/applyActions";

class Apply extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      errors: {},
      success: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { username, email } = this.state;
    const { errors } = this.state;
    const { success } = this.state;

    return (
      <div>
        <div className="applyContainer">
          <h1 className="loginTitle">Ansök om medlemskap</h1>
          <hr />
          <Form error success>
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
              <label className="applyFieldLabel">Epost</label>
              <input
                type="email"
                placeholder="Epost"
                name="email"
                value={email}
                onChange={this.onChange}
              />
              <Message error content={errors.email} />
            </Form.Field>
            <Form.Field
              control={Checkbox}
              label={{ children: "I agree to the Terms and Conditions" }}
              className="applyFieldLabel"
            />
            <Button color="violet" type="submit" onClick={this.onSubmit}>
              <Icon name="send" />
              Skicka förfrågan
            </Button>
            <Link to="/">
              <Button>
                <Icon name="left chevron" />
                Tillbaka
              </Button>
            </Link>
            <Message success header={success.title} content={success.msg} />
          </Form>
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
