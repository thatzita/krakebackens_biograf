import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Button, Form, Message, Icon, Divider, Menu } from "semantic-ui-react";
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
    const { errors } = this.state;
    return (
      <div>
        <div className="loginContainer">
          <h1 className="loginTitle">Logga in</h1>
          <Divider
            style={{
              marginTop: "0.5rem",
              marginBottom: "1rem",
              padding: "0",
              borderBottom: "1px solid #f4f4f4",
              opacity: "0.3"
            }}
          />
          <Form error>
            <Form.Field>
              <label className="loginFieldLabel">E-post</label>
              <input
                type="email"
                placeholder="E-post"
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
            <div>
              <Menu
                fluid
                inverted
                secondary
                vertical
                style={{ textAlign: "right", margin: "0" }}
              >
                <Menu.Item
                  position="right"
                  style={{ margin: "0" }}
                  name="forgot"
                  as={Link}
                  to="/forgot"
                  content="Har du glömt ditt lösenord?"
                />
              </Menu>
            </div>
            <br />
            <Button
              floated="right"
              color="violet"
              type="submit"
              onClick={this.onSubmit}
            >
              <Icon name="sign in" />
              Logga in
            </Button>

            <Button floated="right" inverted basic as={Link} to="/">
              <Icon name="left chevron" />
              Tillbaka
            </Button>
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

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
