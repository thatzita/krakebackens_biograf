import React from "react";
import { Link } from "react-router-dom";
import TheGuestTicket from "../common/TheGuestTicket";
import TheMemberTicket from "../common/TheMemberTicket";

import {
  Segment,
  Header,
  Icon,
  Image,
  Button,
  Label,
  Divider
} from "semantic-ui-react";
import SelectMemberModel from "./SelectMemberModel";
import { seatNameConverter } from "../common/seatingFunctions.js";

export default function TicketDisplay(props) {
  let selectedMembersList =
    props.memberList.filter(x => x.id !== props.profile.id) || [];
  console.log(props.reservedList.length > 0);

  return (
    <React.Fragment>
      <div style={{ width: "40%", minWidth: "450px", height: "100%" }}>
        <SelectMemberModel
          addMemberToBooking={props.addMemberToBooking}
          selectableMemberList={props.selectableMemberList}
        />
        <Segment
          inverted
          // className="ticketContainer"
          style={{
            backgroundColor: "rgb(73, 73, 73)",
            width: "100%",
            height: "auto",
            paddingBottom: "0.5rem",
            minHeight: "500px"
          }}
        >
          {selectedMembersList.map((x, index) => (
            <Label
              key={index}
              image
              size="tiny"
              style={{ margin: "0 0.5rem 0 0" }}
            >
              <img alt="user" src="userDefault.png" />
              {x.username}
              <Icon
                name="delete"
                onClick={() => props.removeMemberFromBooking(x.id)}
              />
            </Label>
          ))}
          <Divider style={{ marginTop: "0.5rem" }} />

          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            {props.existingBookings.map((item, index) =>
              item.customer.id ? (
                <div
                  style={{ marginBottom: "1rem", opacity: "0.5" }}
                  key={item.seat}
                >
                  <TheMemberTicket item={item} />
                </div>
              ) : (
                <div
                  style={{ marginBottom: "1rem", opacity: "0.5" }}
                  key={item.seat}
                >
                  <TheGuestTicket item={item} />
                </div>
              )
            )}

            {props.reservedList.map((item, index) =>
              item.customer.id ? (
                <div style={{ marginBottom: "1rem" }} key={item.seat}>
                  <TheMemberTicket item={item} />
                </div>
              ) : (
                <div style={{ marginBottom: "1rem" }} key={item.seat}>
                  <TheGuestTicket item={item} />
                </div>
              )
            )}
          </div>
        </Segment>

        <Button
          disabled={props.reservedList.length === 0}
          floated="right"
          color="violet"
          onClick={() => props.completeBooking()}
        >
          Slutför bokning
        </Button>
        <Button
          style={{ marginRight: "1rem" }}
          floated="right"
          as={Link}
          to={{
            pathname: "/movieselection",
            state: { movieId: props.movieId }
          }}
          inverted
          basic
        >
          <Icon name="left chevron" /> Gå tillbaka{" "}
        </Button>
      </div>
    </React.Fragment>
  );
}
