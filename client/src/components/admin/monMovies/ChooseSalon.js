import React from "react";
import { Segment, Header, Icon, Form } from "semantic-ui-react";

export default function ChooseSalon(props) {
  return (
    <Segment>
      <Form>
        <Form.Group>
          <select
            name="salon"
            onChange={e => props.handleChange(e.target.value)}
          >
            <option name="salon" value="1">
              Salong 1
            </option>
            <option name="salon" value="2">
              Salong 2
            </option>
          </select>
        </Form.Group>
      </Form>
    </Segment>
  );
}
