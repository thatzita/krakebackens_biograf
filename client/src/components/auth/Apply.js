import React, { Component } from "react";
import { Button, Form, Checkbox } from "semantic-ui-react";

class Apply extends Component {
  render() {
    return (
      <div>
        <h1>Ansök om medlemskap</h1>
        <Form>
          <Form.Field>
            <label>Användarnamn</label>
            <input
              type="text"
              placeholder="Användarnamn du vill använda"
              name="username"
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Epost</label>
            <input type="email" placeholder="Epost" name="email" required />
          </Form.Field>
          <Form.Field
            control={Checkbox}
            label={{ children: "I agree to the Terms and Conditions" }}
          />
          <Button type="submit">Skapa användare</Button>
        </Form>
      </div>
    );
  }
}

export default Apply;
