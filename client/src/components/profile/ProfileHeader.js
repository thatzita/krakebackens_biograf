import React from "react";
import { Link } from "react-router-dom";

import { Button, Segment, Icon, Item } from "semantic-ui-react";

export default function ProfileHeader(props) {

  return (
    <Segment.Group>
      <Segment
        style={{
          backgroundColor: "rgb(0,0,0)",
          borrder: "none",
          boxShadow: "none",
          paddingBottom: "0"
        }}
      >
        <Segment.Group>
          <Segment
            inverted
            padded="very"
            style={{
              margin: "0 1rem",
              borrder: "none",
              boxShadow: "none",
              paddingBottom: "1rem"
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
                    {props.profile.stats.season
                      ? props.profile.stats.season
                      : "0"}{" "}
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
          </Segment>
        </Segment.Group>
      </Segment>
    </Segment.Group>
  );
}
