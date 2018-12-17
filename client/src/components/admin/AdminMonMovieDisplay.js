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

    let sortedMovieProps = movieProps.sort(function(a, b) {
      return new Date(a.utc_time) - new Date(b.utc_time);
    });
    sortedMovieProps = sortedMovieProps.filter((item, i) => i <= 3);
    if (sortedMovieProps.length === 0) {
      adminContent = (
        <List.Item className="smallOne" key={Math.random()}>
          <Link to="/monMovieList">
            <div
              style={{
                position: "relative",
                height: "25rem",
                width: "58rem",
                marginLeft: "2rem"
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
                  style={{ marginTop: "5rem", marginLeft: "42%" }}
                  size="massive"
                />
              </div>
              <h1
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "100",
                  position: "relative",
                  top: "-1rem"
                }}
              >
                Kommande filmer
              </h1>
            </div>
          </Link>
        </List.Item>
      );
    } else {
      adminContent = sortedMovieProps.map((item, i) => {
        if (i === 0) {
          return (
            <List.Item key={item._id}>
              <div
                style={{
                  position: "relative",
                  marginTop: "-2rem",
                  marginLeft: "2rem"
                }}
                className="bigPicture"
              >
                <div>
                  <Image
                    size="big"
                    onError={e => {
                      e.target.src = "curtain.jpg";
                    }}
                    src={item.background}
                  />
                  <h3
                    style={{
                      position: "absolute",
                      color: "white",
                      bottom: "0",
                      width: "600px",
                      backgroundColor: "rgba(0,0,0,0.4)",
                      textAlign: "center"
                    }}
                  >
                    {item.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    {item.screeningDate} &nbsp;
                    {item.screeningTime}
                  </h3>
                </div>
              </div>
            </List.Item>
          );
        } else {
          return (
            <List.Item
              className="smallOne"
              style={{ marginLeft: "4rem" }}
              key={item._id}
            >
              <div
                style={{
                  position: "relative",
                  width: "150px"
                }}
                className="smallPicture"
              >
                <div>
                  <Image src={item.poster} />
                  <h3
                    style={{
                      position: "absolute",
                      color: "white",
                      bottom: "0",
                      width: "150px",
                      backgroundColor: "rgba(0,0,0,0.4)",
                      textAlign: "center"
                    }}
                  >
                    {item.screeningDate}
                  </h3>
                </div>
              </div>
            </List.Item>
          );
        }
      });
    }
    return (
      <div className="makeItFloat">
        <List horizontal>
          {adminContent}
          {sortedMovieProps.length > 0 ? (
            <List.Item className="smallOne" key={Math.random()}>
              <Link to="/monMovieList">
                <div
                  style={{
                    position: "relative",
                    height: "225px",
                    width: "150px",
                    marginLeft: "2rem"
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
                      style={{ marginTop: "4rem", marginLeft: "2.9rem" }}
                      size="huge"
                    />
                  </div>
                  <h4
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "100",
                      position: "relative",
                      top: "-1rem"
                    }}
                  >
                    Kommande filmer
                  </h4>
                </div>
              </Link>
            </List.Item>
          ) : (
            ""
          )}
        </List>
      </div>
    );
  }
}
