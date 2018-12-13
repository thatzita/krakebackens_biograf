import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Button, Form, Header, Message, Icon } from "semantic-ui-react";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import "./auth.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/mainpage");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/mainpage");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
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
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  }
  render() {
    //samma som = errors = this.state.errors
    const { errors } = this.state;
    return (
      <div>
        <div className="loginContainer">
          <h1 className="loginTitle">Logga in</h1>
          <hr />
          <Form error>
            <Form.Field>
              <label className="loginFieldLabel">Epost</label>
              <input
                type="email"
                placeholder="Epost"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <Message error content={errors.email} />
            </Form.Field>

            <Form.Field>
              <label className="loginFieldLabel">Lösenord</label>
              <input
                type="password"
                placeholder="Skriv ett lösenord"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <Message error content={errors.password} />
            </Form.Field>
            <br />
            <Button color="violet" type="submit" onClick={this.onSubmit}>
              <Icon name="sign in" />
              Logga in
            </Button>
            <Link to="/">
              <Button>
                <Icon name="left chevron" />
                Tillbaka
              </Button>
            </Link>
          </Form>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//connect("map state to props", "funktioner vi vill anropa från actions")
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
