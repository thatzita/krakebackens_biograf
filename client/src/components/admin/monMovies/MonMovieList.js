import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getAllMonMovies,
  deleteMonMovie
} from "../../../actions/monMovieActions";

import Admin from "../../admin/Admin";
import "./monMovies.css";

import { Button, Item, Segment, Header, Icon } from "semantic-ui-react";

class MonMovieList extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getAllMonMovies();
    console.log(this.props);
  }

  render() {
    console.log(this.props);
    let monList = this.props.monMovies.monMovies || [];

    return (
      <Segment>
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
                <Icon name="film" /> Månadens filmer
              </div>
              <Button
                color="green"
                position="right"
                as={Link}
                to="/createMonMovie"
              >
                <Icon name="add" />
                Skapa Film
              </Button>
            </Header.Content>
          </Header>

          <Item.Group divided>
            {monList.map(item => (
              <Item key={item._id}>
                <Item.Image size="tiny" src={item.poster} />
                <Item.Content verticalAlign="middle">
                  <Item.Header>
                    {item.title} ( {item.release.substring(0, 4)} ){" "}
                    <em style={{ fontSize: "1rem", color: "gray" }}>
                      {" "}
                      - {Math.floor(item.runtime / 60)}h {item.runtime % 60}min
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
                  <Item.Description
                    style={{ maxWidth: "70%", minWidth: "280px" }}
                  >
                    {item.description}
                  </Item.Description>
                  <Item.Extra>{item.genres.map(gen => gen + " ")}</Item.Extra>
                  <Item.Extra>
                    <Button color="violet" floated="right">
                      <Icon name="edit" /> Ändra
                    </Button>
                    <Button
                      onClick={() => this.props.deleteMonMovie(item)}
                      color="red"
                      basic
                      floated="right"
                    >
                      <Icon name="delete" />
                      Ta bort
                    </Button>
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  monMovies: state.monMovies
});

export default connect(
  mapStateToProps,
  { getAllMonMovies, deleteMonMovie }
)(MonMovieList);
