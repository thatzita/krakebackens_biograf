import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Admin from "../Admin";

import { updateMonmovie } from "../../../actions/monMovieActions";

import {
  Segment,
  Header,
  Icon,
  Form,
  Item,
  Image,
  Divider,
  Button
} from "semantic-ui-react";

class UpdateMonMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monMovie: {},
      title: "",
      description: "",
      crowRating: "",
      monMovieMessage: ""
    };
  }

  onChange;

  componentDidMount() {
    let { monMovie } = this.props.location.state;

    if (monMovie) {
      this.setState({
        monMovie: monMovie,
        title: monMovie.title,
        description: monMovie.description,
        crowRating: monMovie.crowRating,
        monMovieMessage: monMovie.monMovieMessage
      });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  onSaveAndUpdate = () => {
    let updatedMonMovie = this.shallowObjectCopy(this.state.monMovie);
    updatedMonMovie.title = this.state.title;
    updatedMonMovie.description = this.state.description;
    updatedMonMovie.crowRating = this.state.crowRating;
    updatedMonMovie.monMovieMessage = this.state.monMovieMessage;

    this.props.updateMonmovie(updatedMonMovie);
  };

  shallowObjectCopy = src => {
    return Object.assign({}, src);
  };
  render() {
    return (
      <React.Fragment>
        <Admin />
        <div
          style={{
            width: "100%",
            height: "auto",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "#f4f4f4"
          }}
        >
          <Segment
            style={{
              marginRight: "5rem",
              marginTop: "2rem",
              width: "60%",
              position: "relative",
              height: "100%"
            }}
          >
            <Header as="h2" dividing>
              <Icon name="edit" />
              <Header.Content>Ändra och Uppdatera film</Header.Content>
            </Header>

            <Item.Group>
              <Item>
                <Item.Image
                  size="tiny"
                  // style={{width}}
                  src={
                    this.state.monMovie.poster
                      ? this.state.monMovie.poster
                      : "https://react.semantic-ui.com/images/wireframe/image.png"
                  }
                />

                <Item.Content>
                  <Item.Header>
                    {this.state.monMovie.title
                      ? this.state.monMovie.title
                      : "Oops, något gick fel"}
                  </Item.Header>
                  <Item.Meta>
                    <span className="cinema">
                      <Icon name="calendar alternate outline" />{" "}
                      {this.state.monMovie.screeningDate
                        ? this.state.monMovie.screeningDate
                        : "åååå-mm-dd"}
                    </span>
                  </Item.Meta>
                  <Item.Meta>
                    <span className="cinema">
                      <Icon name="time" />{" "}
                      {this.state.monMovie.screeningTime
                        ? this.state.monMovie.screeningTime
                        : "00:00"}
                    </span>
                  </Item.Meta>
                  <Item.Meta>
                    <span className="cinema">
                      <Icon name="users" /> Salong{" "}
                      {this.state.monMovie.saloon
                        ? this.state.monMovie.saloon
                        : "1"}
                    </span>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
            <Divider />
            <Form>
              <Form.Input
                size="big"
                name="title"
                label="Title"
                onChange={this.handleChange}
                value={this.state.title || ""}
              />
              <Form.TextArea
                size="big"
                name="description"
                style={{ height: "10rem" }}
                label="Filmbeskrivning"
                onChange={this.handleChange}
                value={this.state.description || ""}
                placeholder="Beskrivning"
              />
              <Form.TextArea
                size="big"
                name="crowRating"
                label="Kråkan tycker till"
                onChange={this.handleChange}
                value={this.state.crowRating || ""}
                placeholder="Vad tycker kråkan..."
              />
              <Form.TextArea
                size="big"
                name="monMovieMessage"
                label="Meddelande"
                onChange={this.handleChange}
                value={this.state.monMovieMessage || ""}
                placeholder="Skriv in ett meddelande om filmen..."
              />
            </Form>
            <div
              style={{
                marginTop: "4rem",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <Button basic as={Link} to="/monMovieList">
                <Icon name="delete" />
                Avbryt
              </Button>
              <Button
                as={Link}
                to="/monMovieList"
                style={{ marginLeft: "1rem" }}
                color="violet"
                onClick={() => this.onSaveAndUpdate()}
              >
                <Icon name="save" /> Spara ändringar
              </Button>
            </div>
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { updateMonmovie }
)(UpdateMonMovie);
