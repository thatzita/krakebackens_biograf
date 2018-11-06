import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Checkbox, Message } from "semantic-ui-react";

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
    console.log(nextProps);
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

    // if (requestFromUser.username && requestFromUser.email) {
    //   this.setState({
    //     username: "",
    //     email: "",
    //     success: {
    //       title: "Förfrågan skickad!",
    //       msg: `Ett mail kommer skickas till ${
    //         requestFromUser.email
    //       } om du blivit godkänd.`
    //     }
    //   });
    // }
    this.props.userRequest(requestFromUser);
  }

  render() {
    const { username, email } = this.state;
    const { errors } = this.state;
    const { success } = this.state;

    return (
      <div>
        <h1>Ansök om medlemskap</h1>
        <Form error success>
          <Form.Field>
            <label>Användarnamn</label>
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
            <label>Epost</label>
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
          />
          <Button type="submit" onClick={this.onSubmit}>
            Skicka förfrågan
          </Button>
          <Message success header={success.title} content={success.msg} />
        </Form>
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
