import React from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Input,
  Table,
  Header,
  Image,
  Icon,
  Label,
  Button
} from "semantic-ui-react";

export default function MoviePicker(props) {
  return (
    <div className="containerMonMoviesList">
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
            <Icon name="film" />
            Skapa film
          </div>
          <Button basic position="right" as={Link} to="/MonMovieList">
            <Icon name="left chevron" />
            Tillbaka
          </Button>
        </Header.Content>
      </Header>
      <Segment
        style={{
          boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)",
          marginTop: "1rem"
        }}
      >
        <Header as="h3" dividing>
          <Icon name="film" />
          <Header.Content>Välj en film</Header.Content>
        </Header>

        {props.eventObject.poster ? (
          <Label
            image
            size="medium"
            style={{ margin: "0.5rem 0.5rem 0.5rem 0" }}
          >
            <img alt="Bild av filmval" src={props.eventObject.poster} />
            {props.eventObject.title ? props.eventObject.title : null}
            <Icon
              name="delete"
              onClick={() => props.selectMovie(props.movieId, props.movies)}
            />
          </Label>
        ) : null}

        <Input
          fluid
          size="big"
          icon="search"
          placeholder="Sök och välj film..."
          onChange={e => props.onSearch(e.target.value)}
        />
        <Segment
          style={{
            overflow: "auto",
            height: "40vh",
            maxHeight: "40vh",
            border: "0",
            boxShadow: "none",
            padding: "0"
          }}
        >
          <Table selectable basic>
            <Table.Body>
              {props.movieList.map(item => (
                <Table.Row
                  verticalAlign="top"
                  style={{ cursor: "pointer" }}
                  key={item._id}
                  onClick={() => props.selectMovie(item._id, props.movies)}
                  active={props.movieId === item._id}
                >
                  <Table.Cell>
                    <Image size="tiny" src={item.poster} />
                  </Table.Cell>
                  <Table.Cell>
                    <Header>
                      <Header.Content>
                        {item.title} ( {item.release.substring(0, 4)} )
                        <p style={{ fontSize: "0.9rem" }}>
                          <Icon name="clock outline" color="grey" />
                          <em>
                            {Math.floor(item.runtime / 60)}h {item.runtime % 60}
                            min
                          </em>
                        </p>
                        <Header.Subheader
                          style={{ maxWidth: "50%", minWidth: "280px" }}
                        >
                          <strong>Kråkan tycker:</strong> {item.crowRating}
                        </Header.Subheader>
                        <br />
                        <Header.Subheader
                          style={{ maxWidth: "50%", minWidth: "280px" }}
                        >
                          {item.description}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment>
    </div>
  );
}
