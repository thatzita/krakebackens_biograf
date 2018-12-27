import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getAllMonMovies,
  deleteMonMovie,
  getAllMonEvents
} from "../../../actions/monMovieActions";

import Admin from "../../admin/Admin";
import "./monMovies.css";

import {
  Button,
  Item,
  Segment,
  Header,
  Icon,
  Confirm
} from "semantic-ui-react";

class MonMovieList extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      show: false
    };
  }
  componentDidMount() {
    this.props.getAllMonMovies();
    this.props.getAllMonEvents();
  }

  show = movie => {
    this.setState({ open: true, movie: movie });
  };
  handleConfirm = () => {
    this.props.deleteMonMovie(this.state.movie);
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });
  render() {
    const { open } = this.state;
    let monList = this.props.monMovies.monMovies || [];
    let monEventList = this.props.monMovies.monEvents || [];

    return (
      <div className="monMovies">
        <div className="containerMonMovies">
          <Admin />
          <Header as="h2" dividing>
            <Header.Content
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                margin: "1rem"
              }}
            >
              <div>
                {" "}
                <Icon name="star" /> Kommande filmer
              </div>
              <Button.Group>
                <Button
                  color="green"
                  position="right"
                  as={Link}
                  to="/createMonEvent"
                >
                  <Icon name="add" />
                  Skapa Event
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  color="green"
                  position="right"
                  as={Link}
                  to="/createMonMovie"
                >
                  <Icon name="add" />
                  Skapa Film
                </Button>
              </Button.Group>
            </Header.Content>
          </Header>

          <Segment style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}>
            <Item.Group divided>
              {monList.map(item => (
                <Item key={item._id}>
                  <Item.Image size="tiny" src={item.poster} />
                  <Item.Content verticalAlign="middle">
                    <Item.Header>
                      {item.title} ( {item.release.substring(0, 4)} ){" "}
                      <em style={{ fontSize: "1rem", color: "gray" }}>
                        {" "}
                        - {Math.floor(item.runtime / 60)}h {item.runtime % 60}
                        min
                      </em>{" "}
                    </Item.Header>
                    <Item.Meta>
                      <Icon name="clock outline" color="grey" />{" "}
                      {item.screeningTime}
                    </Item.Meta>
                    <Item.Meta>
                      <Icon name="calendar alternate outline" color="grey" />{" "}
                      {item.screeningDate}
                    </Item.Meta>
                    <Item.Meta>
                      <Icon name="users" color="grey" />{" "}
                      {"Salong " + item.saloon}
                    </Item.Meta>

                    {/* <Item.Meta style={{ maxWidth: "50%", minWidth: "280px" }}>
                      <strong>Kråkan tycker:</strong> <br />
                      {item.crowRating}
                    </Item.Meta> */}
                    <Item.Description
                      style={{ maxWidth: "70%", minWidth: "280px" }}
                    >
                      {item.description}
                    </Item.Description>
                    <Item.Extra>{item.genres.map(gen => gen + " ")}</Item.Extra>
                    <Item.Header
                      style={{ fontSize: "1rem", marginTop: "1rem" }}
                    >
                      Kråkan tycker:
                    </Item.Header>
                    <Item.Description
                      style={{
                        maxWidth: "50%",
                        minWidth: "280px",
                        marginTop: "0"
                      }}
                    >
                      {item.crowRating}
                    </Item.Description>
                    {item.monMovieMessage ? (
                      <Segment style={{ backgroundColor: "#f4f4f4" }}>
                        <h5>Meddelande:</h5>
                        {item.monMovieMessage}
                      </Segment>
                    ) : null}

                    <Item.Extra>
                      <Button
                        color="violet"
                        floated="right"
                        as={Link}
                        to={{
                          pathname: "/updatemovie",
                          state: { monMovie: item }
                        }}
                      >
                        <Icon name="edit" /> Ändra
                      </Button>
                      <Button
                        onClick={e => this.show(item)}
                        basic
                        floated="right"
                      >
                        <Icon name="delete" />
                        Ta bort
                      </Button>
                      <Confirm
                        open={open}
                        className="confirmDeleteMovie"
                        header="Du är på väg att ta bort en visning"
                        content="Är du säker att du vill ta bort visningen?"
                        cancelButton="Gå tillbaka"
                        confirmButton="Ta bort"
                        onCancel={this.handleCancel}
                        onConfirm={this.handleConfirm}
                      />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
            <hr />
            <Item.Group divided>
              {monEventList.map(item => (
                <Item key={item._id}>
                  <Item.Image
                    style={{
                      paddingTop: "15px",
                      height: "120px",
                      background: "#470877"
                    }}
                    size="tiny"
                    src={item.poster}
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header>{item.title}</Item.Header>
                    <Item.Meta>
                      <Icon name="clock outline" color="grey" />{" "}
                      {item.screeningTime}
                    </Item.Meta>
                    <Item.Meta>
                      <Icon name="calendar alternate outline" color="grey" />{" "}
                      {item.screeningDate}
                    </Item.Meta>
                    <Item.Meta>
                      <Icon name="users" color="grey" />{" "}
                      {item.seating.length + " platser"}
                    </Item.Meta>

                    <Item.Description
                      style={{ maxWidth: "70%", minWidth: "280px" }}
                    >
                      {item.description}
                    </Item.Description>

                    <Item.Header
                      style={{ fontSize: "1rem", marginTop: "1rem" }}
                    >
                      Kråkan tycker:
                    </Item.Header>
                    <Item.Description
                      style={{
                        maxWidth: "50%",
                        minWidth: "280px",
                        marginTop: "0"
                      }}
                    >
                      {item.crowRating}
                    </Item.Description>
                    {item.monEventMessage ? (
                      <Segment style={{ backgroundColor: "#f4f4f4" }}>
                        <h5>Meddelande:</h5>
                        {item.monEventMessage}
                      </Segment>
                    ) : null}

                    <Item.Extra>
                      <Button
                        color="violet"
                        floated="right"
                        as={Link}
                        to={{
                          pathname: "/updatemovie",
                          state: { monMovie: item }
                        }}
                      >
                        <Icon name="edit" /> Ändra
                      </Button>
                      <Button
                        onClick={e => this.show(item)}
                        basic
                        floated="right"
                      >
                        <Icon name="delete" />
                        Ta bort
                      </Button>
                      <Confirm
                        open={open}
                        className="confirmDeleteMovie"
                        header="Du är på väg att ta bort en visning"
                        content="Är du säker att du vill ta bort visningen?"
                        cancelButton="Gå tillbaka"
                        confirmButton="Ta bort"
                        onCancel={this.handleCancel}
                        onConfirm={this.handleConfirm}
                      />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Segment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  monMovies: state.monMovies,
  monEvents: state.monEvents
});

export default connect(
  mapStateToProps,
  { getAllMonMovies, deleteMonMovie, getAllMonEvents }
)(MonMovieList);
