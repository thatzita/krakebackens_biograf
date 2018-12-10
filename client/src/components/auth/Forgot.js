import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
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

    this.props.forgotPassword(user);
  }

  render() {
    const { errors } = this.state;
    const { success } = this.state;

    return (
      <div>
        <div className="forgotContainer">
          <h1 className="forgotTitle">Glömt lösenord?</h1>
          <hr />
          <Form error success>
            <Form.Field>
              <label className="forgotLabel">Epost</label>
              <input
                type="email"
                placeholder="Skriv din epost du skapade kontot med"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <Message error content={errors.email} />
            </Form.Field>
            <Button color="violet" type="submit" onClick={this.onSubmit}>
              <Icon name="send" />
              Skicka
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
