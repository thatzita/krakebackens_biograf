import React, { Component } from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
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
      }
    };

    console.log(newUser);
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err =>
        this.setState({
          errors: err.response.data
        })
      );
  }

  render() {
    //samma som = errors = this.state.errors
    const { errors } = this.state;
    console.log("Errors in Register.js", errors);
    return (
      <div>
        <Header as="h1">Skapa ny användare</Header>
        <Form error>
          <Form.Field>
            <label>Användarnamn</label>
            <input
              type="text"
              placeholder="Användarnamn"
              name="username"
              value={this.state.username}
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
          <Form.Field>
            <input
              type="password"
              placeholder="Bekräfta lösenord "
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
            />
            <Message error content={errors.password2} />
          </Form.Field>
          <Button type="submit" onClick={this.onSubmit}>
            Skapa användare
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
