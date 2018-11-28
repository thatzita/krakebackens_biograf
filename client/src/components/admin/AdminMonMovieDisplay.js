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
    // let movieProps = [];
    let adminContent;

    let sortedMovieProps = movieProps.sort(function(a, b) {
      return new Date(a.utc_time) - new Date(b.utc_time);
    });
    console.log(movieProps);
    sortedMovieProps = sortedMovieProps.filter((item, i) => i <= 4);
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
                Månadens filmer
              </h1>
            </div>
          </Link>
        </List.Item>
      );
    } else {
      adminContent = sortedMovieProps
        // .filter((item, i) => i <= 4)
        .map((item, i) => {
          if (i === 0) {
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
          } else if (i === sortedMovieProps.length - 1) {
            return (
              <List.Item className="smallOne" key={i}>
                <Link to="/monMovieList">
                  <div
                    style={{
                      position: "relative",
                      height: "225px",
                      // width: "80px"
                      width: "150px",
                      marginLeft: "2rem"
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
                      Månadens filmer
                    </h4>
                  </div>
                </Link>
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
                    // boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)"
                  }}
                  className="smallPicture"
                >
                  <Image src={item.poster} />
                </div>
              </List.Item>
            );
          }
        });
    }
    return (
      <div className="makeItFloat">
        <List horizontal>{adminContent}</List>
      </div>
    );
  }
}
