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
// this.props.setCurrentCloseUpMovieId(item._id)
export default class MonMovieDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let movieProps = this.props.monMovies || [];
    // console.log(this.props);

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
            // onClick={() => this.props.setCurrentCloseUpMovieId(true, item._id)}
          >
            <Reveal
              as={Link}
              to={"/mainpage/" + item._id}
              animated="small fade"
            >
              <Reveal.Content visible style={{ border: "1px solid gray" }}>
                <Image size="small" src={item.poster} />
              </Reveal.Content>
              <Reveal.Content hidden style={{ border: "1px solid black" }}>
                <Dimmer.Dimmable dimmed={true}>
                  <Image size="small" src={item.poster} />
                  <Dimmer active={true} onClickOutside={this.handleHide}>
                    <h3>{item.title}</h3>
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
