import React from "react";
import { Segment, Statistic } from "semantic-ui-react";
export default function ProfileStatistik(props) {
  return (
    <Segment.Group>
      <Segment
        inverted
        style={{
          backgroundColor: "rgb(0,0,0)",
          borrder: "none",
          boxShadow: "none",
          paddingBottom: "0"
        }}
      >
        <Segment.Group>
          <Segment
            textAlign="center"
            inverted
            style={{
              padding: "2rem",
              margin: "0 1rem"
            }}
          >
            {/* <Header
              textAlign="center"
              inverted
              icon
              dividing
              as="h2"
              style={{
                marginLeft: "2rem",
                fontWeight: "lighter",
                marginBottom: "2rem"
              }}
            >
              <Icon name="chart bar" />
              <Header.Content>Statestik</Header.Content>
            </Header> */}
            <div
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              <Statistic inverted>
                <Statistic.Value>
                  {props.profile.stats.season
                    ? props.profile.stats.season
                    : "0"}
                </Statistic.Value>
                <Statistic.Label
                  style={{ color: "gold", fontWeight: "lighter" }}
                >
                  Antal &nbsp; besök &nbsp; i år
                </Statistic.Label>
              </Statistic>
              <Statistic inverted>
                <Statistic.Value>
                  {props.profile.stats.total ? props.profile.stats.total : "0"}
                </Statistic.Value>
                <Statistic.Label
                  style={{ color: "powderblue", fontWeight: "lighter" }}
                >
                  Antal &nbsp; besök &nbsp; totalt
                </Statistic.Label>
              </Statistic>
            </div>
          </Segment>
        </Segment.Group>
      </Segment>
    </Segment.Group>
  );
}
