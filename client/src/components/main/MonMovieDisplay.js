import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Dimmer,
  Reveal,
  Image,
  Segment,
  Icon,
  Label
} from "semantic-ui-react";

const monMovieDisplaySize = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  borderRadius: "0",
  backgroundColor: "rgb(0,0,0)"
};
export default class MonMovieDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let movieProps = this.props.monMovies || [];

    let sortedMovieProps = movieProps.sort(function(a, b) {
      return new Date(a.utc_time) - new Date(b.utc_time);
    });

    return (
      <Segment raised padded="very" inverted style={monMovieDisplaySize}>
        {sortedMovieProps.map(item => (
          <div
            style={{
              margin: "1rem",
              zIndex: "0",
              maxWidth: "150px",
              textAlign: "center"
            }}
            key={item._id}
          >
            <Reveal
              as={Link}
              to={{
                pathname: "/movieselection",
                state: { movieId: item._id, eventType: item.eventType }
              }}
              animated="small fade"
            >
              <Reveal.Content
                visible
                style={
                  item.poster === "krakebackens_logo.png"
                    ? {
                        border: "1px solid gray",
                        height: "222px",
                        paddingTop: "35px"
                      }
                    : { border: "1px solid gray", height: "222px" }
                }
              >
                <Image
                  size="small"
                  style={{ backgroundColor: "black" }}
                  src={item.poster}
                />
              </Reveal.Content>
              <Reveal.Content
                hidden
                style={
                  item.poster === "krakebackens_logo.png"
                    ? {
                        border: "1px solid gray",
                        height: "222px",
                        paddingTop: "35px"
                      }
                    : { border: "1px solid gray", height: "222px" }
                }
              >
                <Dimmer.Dimmable dimmed={true}>
                  <Image size="small" src={item.poster} />
                  <Dimmer active={true} onClickOutside={this.handleHide}>
                    <h4 style={{ marginBottom: "2rem", lineHeight: "28px" }}>
                      <Icon name="time" />
                      {item.screeningTime}{" "}
                    </h4>
                    <Button inverted basic>
                      Boka
                    </Button>
                  </Dimmer>
                </Dimmer.Dimmable>
              </Reveal.Content>
            </Reveal>
            <Label
              color="violet"
              size="small"
              style={{
                width: "100%",
                margin: "0",
                borderRadius: "0 0 5px 5px"
              }}
            >
              <Icon name="calendar alternate outline" /> {item.screeningDate}
            </Label>
            <p style={{ paddingTop: "0.5rem", fontSize: "1.1rem" }}>
              {item.title}
            </p>
          </div>
        ))}
      </Segment>
    );
  }
}
