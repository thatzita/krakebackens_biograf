import React from "react";
import { Segment, Header, Icon, Form } from "semantic-ui-react";

export default function ChooseSaloon(props) {
  return (
    <Segment
      style={{
        boxShadow: " 5px 5px 5px 0px rgba(0,0,0,0.75)",
        marginTop: "5rem"
      }}
    >
      <Header>
        <Icon name="users" />
        Välj salong
      </Header>
      <Form>
        <Form.Group>
          <select
            style={{
              height: "auto",
              width: "100%",
              fontSize: "1.1rem",
              fontFamily: "Helvetica,sans-serif",
              paddingTop: "0.678571em",
              paddingBottom: "0.678571em"
            }}
            name="saloon"
            onChange={e => props.handleChange(e.target.value)}
          >
            <option
              style={{
                fontSize: "1.2rem",
                paddingTop: "0.678571em",
                paddingBottom: "0.678571em"
              }}
              name="saloon"
              value="1"
            >
              Salong 1
            </option>
            <option
              style={{
                fontSize: "1.2rem",
                paddingTop: "0.678571em",
                paddingBottom: "0.678571em"
              }}
              name="saloon"
              value="2"
            >
              Salong 2
            </option>
          </select>
        </Form.Group>
      </Form>
    </Segment>
  );
}
