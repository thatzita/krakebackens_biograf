import React, { Component } from "react";

import { Label, Icon, Menu } from "semantic-ui-react";

import "./movieBackdropDisplay.css";

export default class MovieBackdropDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "" };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    let movieItem = this.props.monMovie || {};
    let displayImage = movieItem.background || "default.jpg";

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
            backgroundPosition: "center"
          }}
        />
        <div className="backdropContent">
          <div>
            <Label color="violet">På bio nu</Label>

            <h1>{movieItem.title ? movieItem.title : "Title"}</h1>
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
                <Icon name="play" /> Se trailer
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
