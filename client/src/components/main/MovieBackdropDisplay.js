import React, { Component } from "react";

import { Label, Icon, Menu } from "semantic-ui-react";

import "./movieBackdropDisplay.css";

export default class MovieBackdropDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "", trailerUrl: "" };
  }

  handleItemClick = (e, { name }) => {
    if (name === "trailer") {
      window.open(this.props.monMovie.trailer, "_blank");
    }
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    let movieItem = this.props.monMovie || {};
    let displayImage = movieItem.background || "default.jpg";

    if (displayImage === "http://image.tmdb.org/t/p/originalnull") {
      displayImage = "curtain.jpg";
    }

    return (
      <div className="movieBackdropContainer">
        <div
          className="movieBackdrop"
          style={{
            backgroundImage: "url(" + displayImage + ")",
            backgroundSize: "cover",
            WebkitBackgroundSize: "cover",
            MozBackgroundSize: "cover",
            OBackgroundSize: "cover",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 0"
          }}
        />
        <div className="backdropContent">
          <div style={{ marginTop: "3rem" }}>
            <Label color="violet">På bio nu</Label>

            <h1>{movieItem.title ? movieItem.title : "Title"}</h1>
            <span>
              {movieItem.screeningDate ? movieItem.screeningDate : "1989-03-08"}
            </span>
            <span style={{ marginLeft: "1rem" }}>
              {movieItem.screeningTime ? movieItem.screeningTime : "13:37"}
            </span>
            <Menu
              inverted
              secondary
              style={{
                width: "220px",
                margin: "auto",
                boxShadow: "none",
                backgroundColor: "rgba(0,0,0,0)",
                border: "0"
              }}
            >
              <Menu.Item
                name="trailer"
                active={activeItem === "trailer"}
                onClick={this.handleItemClick}
              >
                <Icon name="play" />
                Se trailer
              </Menu.Item>
              <Menu.Item
                name="biljetter"
                active={activeItem === "biljetter"}
                onClick={this.handleItemClick}
              >
                <Icon name="ticket" /> Biljetter
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
