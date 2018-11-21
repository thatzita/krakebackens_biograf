import React, { Component } from "react";
import "./movieCloseUp.css";

import {
  Button,
  Dimmer,
  Reveal,
  Header,
  Image,
  Segment,
  Menu,
  Icon
} from "semantic-ui-react";

export default class MovieCloseUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let movieList = this.props.monMovies || [];
    // console.log("list ", movieList);

    let currentMovieId = this.props.currentCloseUpMovieId || "";
    let movieItem = movieList.filter(item => item._id === currentMovieId);
    // console.log("current ", movieItem);

    let movieObject = movieItem[0] || {};
    let displayImage = movieObject.background || "default.jpg";

    return (
      <div className="movieCloseUpContainer">
        <div className="movieDisplayandInformation">
          <div
            className="coverImage"
            style={{
              backgroundImage: "url(" + displayImage + ")",
              backgroundSize: "cover",
              WebkitBackgroundSize: "cover",
              MozBackgroundSize: "cover",
              OBackgroundSize: "cover",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          />
          <div className="movieDescription">
            <Segment inverted>
              <h1>
                {movieObject.title ? movieObject.title : "Titel"} (
                {movieObject.release
                  ? movieObject.release.substring(0, 4)
                  : "2018"}
                )
              </h1>
              <p>
                Premiär:{" "}
                {movieObject.screeningDate
                  ? movieObject.screeningDate
                  : "åååå-mm-dd"}
              </p>
              <p>
                {movieObject.runtime
                  ? Math.floor(movieObject.runtime / 60)
                  : "1"}
                h {movieObject.runtime ? movieObject.runtime % 60 : "30"}min |{" "}
                {movieObject.genres
                  ? movieObject.genres.map(item => item + " ")
                  : "kärlek"}{" "}
              </p>
              <p>
                {movieObject.description
                  ? movieObject.description
                  : "beskrivning"}
              </p>

              <Menu>
                <Menu.Item>
                  <Icon name="play" /> Spela trailer
                </Menu.Item>
              </Menu>
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}
