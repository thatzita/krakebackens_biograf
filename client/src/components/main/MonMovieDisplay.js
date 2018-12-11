import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Dimmer,
  Reveal,
  Header,
  Image,
  Segment,
  Icon
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

    return (
      <Segment padded="very" inverted style={monMovieDisplaySize}>
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
                <div
                  style={{
                    bottom: "0rem",
                    zIndex: "2",
                    color: "white",
                    fontSize: "1.3rem",
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.7)"
                  }}
                >
                  <span style={{ marginRight: "0.3rem", marginLeft: "0.3rem" }}>
                    {item.screeningDate}
                  </span>
                  <span style={{ marginRight: "0.3rem" }}>
                    {item.screeningTime}
                  </span>
                </div>
                <Image size="small" src={item.poster} />
              </Reveal.Content>
              <Reveal.Content hidden style={{ border: "1px solid black" }}>
                <Dimmer.Dimmable dimmed={true}>
                  <Image size="small" src={item.poster} />
                  <Dimmer active={true} onClickOutside={this.handleHide}>
                    <h4>{item.screeningDate}</h4>
                    <h4 style={{ marginBottom: "2rem" }}>
                      {item.screeningTime}
                    </h4>
                    <Button inverted basic>
                      Boka
                    </Button>
                  </Dimmer>
                </Dimmer.Dimmable>
              </Reveal.Content>
            </Reveal>
            <p style={{ paddingTop: "0.5rem" }}>{item.title}</p>
          </div>
        ))}
      </Segment>
    );
  }
}
