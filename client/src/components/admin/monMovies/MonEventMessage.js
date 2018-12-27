import React from "react";
import { Header, Form, Segment, Icon } from "semantic-ui-react";

export default function MonEventMessage(props) {
  return (
    <Segment>
      <Header>
        <Icon name="comment outline" />
        Lägg till meddelande
      </Header>
      <Form>
        <Form.Group>
          <textarea
            placeholder="Skriv in ett meddelande..."
            name="monEventMessage"
            onChange={e => props.handleTextarea(e.target.name, e.target.value)}
            value={props.monEventMessage}
            id="monEventMessage"
            cols="30"
            rows="5"
          />
        </Form.Group>
      </Form>
    </Segment>
  );
}
