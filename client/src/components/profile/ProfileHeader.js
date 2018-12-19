import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Segment,
  Form,
  Message,
  Icon,
  Card,
  Item,
  Divider
} from "semantic-ui-react";

const tempProfile = {
  name: "användarens namn"
};

export default function ProfileHeader(props) {
  console.log(props);

  return (
    <Segment
      padded="very"
      style={{
        backgroundColor: "rgb(0,0,0)",
        borrder: "none",
        boxShadow: "none"
      }}
    >
      <Item.Group>
        <Item>
          <Item.Image
            style={{ width: "80px", maxHeight: "80px" }}
            circular
            size="tiny"
            src="userDefault.png"
          />
          <Item.Content verticalAlign="middle">
            <Item.Header style={{ color: "white" }}>
              {props.profile.username}
            </Item.Header>
            <Item.Description style={{ color: "gold" }}>
              <Icon name="film" />{" "}
              {props.profile.stats.total ? props.profile.stats.total : "0"}{" "}
              poäng
            </Item.Description>
            <Item.Description style={{ color: "#f4f4f4" }}>
              {/* props.profile.vip.status */}
              {props.profile.vip.status ? (
                <React.Fragment>
                  <p style={{ color: "#f4f4f4" }}>
                    Status:{" "}
                    <span style={{ color: "gold" }}>
                      <Icon name="star" /> Vip
                    </span>
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p style={{ color: "#f4f4f4" }}>
                    Status: <Icon name="user circle" /> Medlem
                  </p>
                </React.Fragment>
              )}
            </Item.Description>
            <Item.Extra>
              <Button
                as={Link}
                to="/changepassword"
                color="violet"
                size="tiny"
                floated="right"
              >
                <Icon name="cog" />
                Profil inställningar
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      <Divider style={{ backgroundColor: "rgba(244,244,244,0.2)" }} />
    </Segment>
  );
}
