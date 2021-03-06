import React, { Component } from "react";
import "./admin.css";

export default class AdminBackdropDisplay extends Component {
  constructor(props) {
    super(props);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    let movieItem = this.props.monMovie || {};
    let displayImage = movieItem.background || "default.jpg";

    return (
      <div className="adminMovieBackdropContainer">
        <div
          className="adminMovieBackdrop"
          style={{
            backgroundImage: "url(" + displayImage + ")",
            backgroundSize: "contain",
            WebkitBackgroundSize: "contain",
            MozBackgroundSize: "contain",
            OBackgroundSize: "contain",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 0"
          }}
        />
        <div className="backdropContent">
          <div>
            <h1 style={{ backgroundColor: "rgba(0,0,0,0.6" }}>
              {movieItem.title ? movieItem.title : "Title"}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
