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
  backgroundColor: "rgb(0,0,0)",
  marginBottom: "0.5rem"
};
export default class MonMovieDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let movieProps = this.props.monMovies || [];

    return (
      <Segment raised padded="very" inverted style={monMovieDisplaySize}>
        {movieProps.map(item => (
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
                state: { movieId: item._id }
              }}
              animated="small fade"
            >
              <Reveal.Content visible style={{ border: "1px solid gray" }}>
                <Image size="small" src={item.poster} />
              </Reveal.Content>
              <Reveal.Content hidden style={{ border: "1px solid black" }}>
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
