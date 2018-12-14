import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";
import Footer from "../layout/Footer";
import { resetPassword } from "../../actions/authActions";
import "./auth.css";

class Reset extends Component {
  constructor() {
    super();
    this.state = {
      success: {},
      errors: {},
      password: "",
      password2: ""
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

  componentDidMount() {
    console.log(this.props.auth);
  }

  onSubmit(event) {
    event.preventDefault();
    let str = window.location.href;
    let lastSlash = str.lastIndexOf("/");
    let token = str.substring(lastSlash + 1);

    const user = {
      password: this.state.password,
      password2: this.state.password2,
      token: token
    };
    this.props.resetPassword(user);
  }

  render() {
    const { errors } = this.state;
    const { password, password2 } = this.state;
    const { success } = this.state;
    return (
      <div>
        <div className="loginContainer">
          <h1 className="loginTitle">Återställ lösenord</h1>
          <Form error success>
            <Form.Field>
              <label className="loginFieldLabel">Lösenord</label>
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
              <label className="loginFieldLabel">Bekräfta lösenord</label>
              <input
                type="password"
                placeholder="Bekräfta lösenord "
                name="password2"
                value={password2}
                onChange={this.onChange}
              />
              <Message error content={errors.password2} />
            </Form.Field>
            <Button type="submit" onClick={this.onSubmit}>
              Återställ mitt lösenord!
            </Button>
            <Message success header={success.title} content={success.msg} />
          </Form>
        </div>
        <Footer />
      </div>
    );
  }
}

Reset.propTypes = {
  errors: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
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
    resetPassword
  }
)(Reset);
