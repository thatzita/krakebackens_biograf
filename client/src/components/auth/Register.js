import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Header, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      success: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/mainpage");
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  //Kanske kommer användas senare
  // handleSubmit() {
  //   this.setState({
  //     email: "",
  //     username: "",
  //     password: "",
  //     password2: "",
  //     success: {
  //       title: "Användare skapad!",
  //       msg: "Användaren kan nu logga in."
  //     }
  //   });
  // }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      success: {}
    });
  }
  onSubmit(event) {
    event.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      vip: {
        status: false,
        seat: ""
      },
      stats: {
        total: 0,
        season: 0
      },
      moviesViewed: []
    };

    // this.handleSubmit();
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    //samma som = errors = this.state.errors, deconstructing
    const { errors } = this.state;

    //Om indikation ska synas
    // const { success } = this.state;

    const { username, email, password, password2 } = this.state;

    return (
      <div>
        <Header as="h1">Skapa ny användare</Header>
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
          {/* <Message success header={success.title} content={success.msg} /> */}
          <Button type="submit" onClick={this.onSubmit}>
            Skapa användare
          </Button>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
  // success: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));