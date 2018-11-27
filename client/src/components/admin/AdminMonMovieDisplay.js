import React, { Component } from "react";
import { Link } from "react-router-dom";

import Carousel from "nuka-carousel";

import {
  Button,
  Dimmer,
  Reveal,
  Header,
  Image,
  Segment,
  Icon
} from "semantic-ui-react";

export default class AdminMonMovieDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let movieProps = this.props.monMovies || [];

    let moviePropsLength = movieProps.length;
    let adminContent;

    for (let i = 0; i < moviePropsLength; i++) {
      if (i === moviePropsLength - 1 && movieProps[i].imdb_id !== "tt1337") {
        let obj = {
          description: "Månadens Filmval",
          fullyBooked: false,
          genres: ["Månadens Filmval"],
          imdb_id: "tt1337",
          poster: "krakebackens_logo.png",
          release: "0000-00-00",
          runtime: 0,
          screeningDate: "0000-00-00",
          screeningTime: "00:00",
          seating: "",
          title: "Månadens filmval",
          utc_time: "",
          _id: Math.random()
        };
        movieProps.push(obj);
      }
    }

    adminContent = movieProps.map((item, i) => {
      if (i === moviePropsLength - 1 && item.imdb_id === "tt1337") {
        return (
          <div
            style={{
              zIndex: "0",
              maxWidth: "250px"
            }}
            key={item._id}
          >
            <Reveal
              as={Link}
              to={{
                pathname: "/monMovieList",
                state: { movieId: item._id }
              }}
              animated="small fade"
            >
              <Reveal.Content
                visible
                style={{
                  height: "374px",
                  backgroundColor: "black",
                  border: "1px solid gray"
                }}
              >
                <Image src={item.poster} style={{ marginTop: "1rem" }} />

                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "1rem",
                    color: "white"
                  }}
                >
                  {item.title}
                </h3>
              </Reveal.Content>
              <Reveal.Content
                hidden
                style={{
                  height: "374px",
                  backgroundColor: "black",
                  border: "1px solid black"
                }}
              >
                <Dimmer.Dimmable dimmed={true}>
                  <Image src={item.poster} style={{ marginTop: "1rem" }} />
                  <Dimmer active={true} onClickOutside={this.handleHide}>
                    <h3>{item.title}</h3>
                  </Dimmer>
                </Dimmer.Dimmable>
              </Reveal.Content>
            </Reveal>
          </div>
        );
      } else {
        return (
          <div
            style={{
              zIndex: "0",
              maxWidth: "250px"
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
                <Image src={item.poster} />
              </Reveal.Content>
              <Reveal.Content hidden style={{ border: "1px solid black" }}>
                <Dimmer.Dimmable dimmed={true}>
                  <Image src={item.poster} />
                  <Dimmer active={true} onClickOutside={this.handleHide}>
                    <h3>{item.title}</h3>
                  </Dimmer>
                </Dimmer.Dimmable>
              </Reveal.Content>
            </Reveal>
          </div>
        );
      }
    });

    return (
      <Carousel
        className="carousel"
        autoplay={true}
        cellAlign="center"
        slidesToShow={3}
        slidesToScroll={1}
        autoplayInterval={2500}
        initialSlideWidth={600}
        initialSlideHeight={300}
        renderCenterLeftControls={({ previousSlide }) => (
          <button className="slideButtons" onClick={previousSlide}>
            <Icon name="chevron left" />
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button className="slideButtons" onClick={nextSlide}>
            <Icon name="right chevron" />
          </button>
        )}
      >
        {adminContent}
      </Carousel>
    );
  }
}
