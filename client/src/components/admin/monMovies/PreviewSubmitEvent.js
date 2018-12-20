import React from "react";
import { Segment, Icon, Item, Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Admin from "../../admin/Admin";

export default function PreviewSubmitMonEvent(props) {
  return (
    <div className="prevSubMonMovie">
      <Segment style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}>
        <Admin />
        <Button basic onClick={() => props.goToOrLeavePreviewPage(false)}>
          {" "}
          <Icon name="left angle" /> Gå tillbaka
        </Button>
        <Item.Group>
          <Item>
            <Item.Image
              style={{ paddingTop: "15px", background: "#470877" }}
              src={
                props.eventObject.poster
                  ? props.eventObject.poster
                  : "krakebackens_logo.png"
              }
            />

            <Item.Content>
              <Item.Header>
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

              <Item.Header style={{ fontSize: "1rem", marginTop: "1rem" }}>
                Kråkan tycker
              </Item.Header>
              <Item.Description style={{ maxWidth: "50%", minWidth: "280px" }}>
                {props.crowRating}
              </Item.Description>
              {/* <Divider /> */}
              <Item.Header style={{ fontSize: "1rem", marginTop: "1rem" }}>
                Meddelande
              </Item.Header>
              <Item.Description>{props.monEventMessage}</Item.Description>
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
                Skapa event
                <Icon name="add" />
              </Button>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </div>
  );
}
