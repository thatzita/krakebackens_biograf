import React from "react";
import { Header, Form, Segment, Icon } from "semantic-ui-react";

export default function MonMovieCrowRaiting(props) {
  return (
    <Segment>
      <Header>
        <Icon name="hand victory" />
        Kråkan tycker till
      </Header>
      <Form>
        <Form.Group>
          <textarea
            placeholder="Vad tycker kråkan..."
            name="crowRating"
            id="crowRating"
            onChange={e => props.handleTextarea(e.target.name, e.target.value)}
            value={props.crowRating}
            cols="30"
            rows="5"
          />
        </Form.Group>
      </Form>
    </Segment>
  );
}
