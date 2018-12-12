import React from "react";
import { Header, Form, Segment, Icon } from "semantic-ui-react";

export default function MonMovieMessage(props) {
  return (
    <Segment>
      <Header>
        <Icon name="comment outline" />
        Lägg till meddelande
      </Header>
      <Form>
        <Form.Group>
          <textarea
            placeholder="Skriv in ett meddelande om filmen..."
            name="monMovieMessage"
            onChange={e => props.handleTextarea(e.target.name, e.target.value)}
            value={props.monMovieMessage}
            id="monMovieMessage"
            cols="30"
            rows="5"
          />
        </Form.Group>
      </Form>
    </Segment>
  );
}
