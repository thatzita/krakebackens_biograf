import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";

class Reset extends Component {
  constructor() {
    super();
    this.state = {
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
      password2: this.state.password2
    };

    // console.log(`Skicka ett mail till ${user.email}`);
    // this.props.loginUser(user);
  }

  render() {
    const { errors } = this.state;
    const { password, password2 } = this.state;
    return (
      <div>
        <h1>Återställ lösenord</h1>
        <Form error>
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
          <Button type="submit" onClick={this.onSubmit}>
            Återställ mitt lösenord!
          </Button>
        </Form>
      </div>
    );
  }
}

Reset.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    //prop func goes here
  }
)(Reset);

{
  /* <div class="row">
        <div class="col-md-12">
          <form action="/reset/<%= token %>" method="POST">
            <legend>Reset Password</legend>
            <div class="form-group">
              <label for="password">New Password</label>
              <input
                type="password"
                name="password"
                value=""
                placeholder="New password"
                autofocus="autofocus"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="confirm">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                value=""
                placeholder="Confirm password"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div> */
}
