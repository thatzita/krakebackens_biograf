import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";

import { forgotPassword } from "../../actions/authActions";
import Footer from "../layout/Footer";

class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      success: {},
      errors: {},
      email: ""
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
    if (nextProps.auth.success) {
      this.setState({
        success: nextProps.auth.success,
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

    const user = {
      email: this.state.email
    };

    // console.log(`Skicka ett mail till ${user.email}`);
    this.props.forgotPassword(user);
  }

  render() {
    const { errors } = this.state;
    const { success } = this.state;

    return (
      <div>
        <h1>Glömt lösenord?</h1>
        <Form error success>
          <Form.Field>
            <label>Epost</label>
            <input
              type="email"
              placeholder="Epost"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <Message error content={errors.email} />
          </Form.Field>
          <Button type="submit" onClick={this.onSubmit}>
            Skicka
          </Button>
          <Message success header={success.title} content={success.msg} />
        </Form>
        <Footer />
      </div>
    );
  }
}

Forgot.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.success,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    //prop func goes here
    forgotPassword
  }
)(Forgot);
