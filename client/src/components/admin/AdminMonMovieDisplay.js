import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Dimmer,
  Reveal,
  Header,
  Image,
  Segment,
  Icon,
  Item,
  List
} from "semantic-ui-react";

export default class AdminMonMovieDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let movieProps = this.props.monMovies || [];

    let adminContent;

    adminContent = movieProps
      .filter((item, i) => i <= 4)
      .map((item, i) => {
        if (i === 4) {
          return (
            <List.Item key={Math.random()}>
              <Link to="/monMovieList">
                <div
                  style={{
                    position: "relative",
                    height: "120px",
                    width: "80px"
                    // boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)"
                  }}
                  className="smallPicture"
                >
                  <div
                    style={{
                      color: "white"
                    }}
                  >
                    <Icon
                      name="star"
                      style={{ marginTop: "2rem", marginLeft: "1.6rem" }}
                      size="big"
                    />
                  </div>
                  <h6
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "400",
                      position: "relative",
                      top: "-1rem"
                    }}
                  >
                    Månadens filmer
                  </h6>
                </div>
              </Link>
            </List.Item>
          );
        } else if (i === 0) {
          return (
            <List.Item key={item._id}>
              <div
                style={{
                  position: "relative",
                  // borderRadius: "1rem",
                  marginTop: "-2rem",
                  marginLeft: "2rem"
                  // boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)"
                }}
                className="bigPicture"
              >
                <Image size="big" src={item.background} />
              </div>
            </List.Item>
          );
        } else {
          return (
            <List.Item key={item._id}>
              <div
                style={{
                  position: "relative"
                  // boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)"
                }}
                className="smallPicture"
              >
                <Image size="tiny" src={item.poster} />
              </div>
            </List.Item>
          );
        }
      });
    return (
      <div className="makeItFloat">
        <List horizontal>{adminContent}</List>
      </div>
    );
  }
}
