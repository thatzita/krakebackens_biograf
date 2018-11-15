import React from "react";
import { Segment, Icon, Item, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Admin from "../../admin/Admin";

export default function PreviewSubmitMonMovie(props) {
  return (
    <Segment>
      <Admin />
      <Button basic onClick={() => props.goToOrLeavePreviewPage(false)}>
        {" "}
        <Icon name="left angle" /> Gå tillbaka
      </Button>
      <Item.Group>
        <Item>
          <Item.Image
            src={
              props.eventObject.poster
                ? props.eventObject.poster
                : "https://react.semantic-ui.com/images/wireframe/image.png"
            }
          />

          <Item.Content>
            <Item.Header as="a">
              {props.eventObject.title
                ? props.eventObject.title
                : "Oops, något gick fel"}
            </Item.Header>
            <Item.Meta>
              <span className="cinema">
                <Icon name="calendar alternate outline" />{" "}
                {props.date ? props.date : "åååå-mm-dd"}
              </span>
            </Item.Meta>
            <Item.Meta>
              <span className="cinema">
                <Icon name="time" /> {props.time ? props.time : "00:00"}
              </span>
            </Item.Meta>
            <Item.Description style={{ maxWidth: "70%", minWidth: "280px" }}>
              {props.eventObject.description
                ? props.eventObject.description
                : "Något gick fel. Dina val kunde antingen inte hittas eller registreras. Vänligen gå tillbaka och testa igen senare"}
            </Item.Description>
            <Item.Extra>
              {props.eventObject.genres
                ? props.eventObject.genres.map(gen => gen + " ")
                : null}
            </Item.Extra>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Button
              as={Link}
              to="/monMovieList"
              onClick={() => props.onSubmitEvent()}
              primary
              icon
              labelPosition="right"
              floated="right"
            >
              Skapa filmvisning
              <Icon name="add" />
            </Button>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
}
