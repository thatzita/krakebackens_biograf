import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Label, Icon, Menu, Modal, Image } from "semantic-ui-react";

import "./movieBackdropDisplay.css";

export default class MovieBackdropDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "", movieTrailer: null, modalOpen: false };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleItemClick = (e, { name }) => {
    if (name === "trailer") {
      let str = this.props.monMovie.trailer;
      let find = "watch\\?v\\=";
      let reg = new RegExp(find, "g");
      str = str.replace(reg, "embed/");
      this.setState({ movieTrailer: str, modalOpen: true });
    }
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem, movieTrailer } = this.state;
    let movieItem = this.props.monMovie || {};
    let displayImage = movieItem.background || "skogdel3.jpg";

    if (displayImage === "http://image.tmdb.org/t/p/originalnull") {
      displayImage = "skogdel3.jpg";
    }

    return (
      <div className="movieBackdropContainer">
        <div
          className="movieBackdrop"
          style={{
            backgroundImage: "url(" + displayImage + ")",
            WebkitBackgroundSize: "cover",
            MozBackgroundSize: "cover",
            OBackgroundSize: "cover",

            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 0"
          }}
        />
        <div className="backdropContent">
          <div style={{ marginTop: "3rem" }}>
            {Object.keys(movieItem).length !== 0 ? (
              <Label color="violet">På bio nu</Label>
            ) : null}

            <h1>
              {movieItem.title
                ? movieItem.title
                : "Välkommen till Kråkebackens Biograf"}
            </h1>
            <span>
              {movieItem.screeningDate ? movieItem.screeningDate : ""}
            </span>
            <span style={{ marginLeft: "1rem" }}>
              {movieItem.screeningTime ? movieItem.screeningTime : ""}
            </span>
            {Object.keys(movieItem).length !== 0 ? (
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
                <Modal
                  style={{ textAlign: "center", backgroundColor: "black" }}
                  trigger={
                    <Menu inverted secondary style={{ background: "none" }}>
                      <Menu.Item
                        name="trailer"
                        active={activeItem === "trailer"}
                        onClick={this.handleItemClick}
                      >
                        <Icon name="play" /> Spela trailer
                      </Menu.Item>
                    </Menu>
                  }
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                >
                  {
                    <React.Fragment>
                      <Icon
                        style={{
                          position: "absolute",
                          right: "-2.5rem",
                          fontSize: "2rem",
                          fontWeight: "100"
                        }}
                        color="red"
                        onClick={this.handleClose}
                        inverted
                        name="close"
                      />

                      {movieTrailer === "//youtube.com" ? (
                        <div
                          style={{
                            background: "black",
                            height: "400px",
                            border: "2px solid white"
                          }}
                        >
                          <Image
                            style={{
                              width: "300px",
                              top: "18%",
                              margin: "0 auto"
                            }}
                            src="krakebackens_logo.png"
                          />
                          <p
                            style={{
                              color: "white",
                              fontSize: "3rem",
                              textAlign: "center",
                              position: "relative",
                              top: "-21rem"
                            }}
                          >
                            Filmen saknar trailer
                          </p>
                        </div>
                      ) : (
                        <iframe
                          title="movie trailer"
                          width="900"
                          height="600"
                          src={movieTrailer}
                        />
                      )}
                    </React.Fragment>
                  }
                </Modal>

                <Menu.Item
                  as={Link}
                  to={{
                    pathname: "/movieselection",
                    state: { movieId: movieItem._id }
                  }}
                  name="biljetter"
                  active={activeItem === "biljetter"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="ticket" /> Biljetter
                </Menu.Item>
              </Menu>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
