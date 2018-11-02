import React, { Component } from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";

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

    console.log(user);
  }
  render() {
    //samma som = errors = this.state.errors
    const { errors } = this.state;
    console.log("Errors in Login.js", errors);
    return (
      <div>
        <Header as="h1">Logga in</Header>
        <Form error>
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
          <Form.Field>
            <label>Lösenord</label>
            <input
              type="password"
              placeholder="Skriv ett lösenord"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <Message error content={errors.password} />
          </Form.Field>
          <Button type="submit" onClick={this.onSubmit}>
            Logga in
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
