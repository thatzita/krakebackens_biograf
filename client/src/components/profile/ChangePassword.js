import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Divider, Form, Message } from "semantic-ui-react";

import { getCurrentProfile } from "../../actions/profileActions";
import { changePassword } from "../../actions/authActions";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      password: "",
      password2: "",
      success: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
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
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const user = {
      password: this.state.password,
      password2: this.state.password2,
      id: this.props.auth.user.id
    };

    this.props.changePassword(user);
  }

  render() {
    const { errors } = this.state;
    const { password, password2 } = this.state;
    const { success } = this.state;

    return (
      <div>
        <h1>Byt lösenord</h1>
        <Divider />

        <Form error success>
          <Form.Field>
            <label>Lösenord</label>
            <input
              type="password"
              placeholder="Skriv ett lösenord"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            <Message error content={errors.password} />
          </Form.Field>
          <Form.Field>
            <input
              type="password"
              placeholder="Bekräfta lösenord "
              name="password2"
              value={password2}
              onChange={this.onChange}
            />
            <Message error content={errors.password2} />
          </Form.Field>
          <Button basic color="green" type="submit" onClick={this.onSubmit}>
            Återställ mitt lösenord!
          </Button>
          <Link to="/profile">
            <Button basic color="violet">
              Tillbaka
            </Button>
          </Link>
          {/* <Message success header={success.title} content={success.msg} /> */}
        </Form>
      </div>
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    getCurrentProfile,
    changePassword
  }
)(ChangePassword);
