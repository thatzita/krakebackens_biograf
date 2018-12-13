import React from "react";
import { Link } from "react-router-dom";

import {
  Segment,
  Header,
  Icon,
  Image,
  Button,
  Menu,
  Label,
  Divider
} from "semantic-ui-react";
import SelectMemberModel from "./SelectMemberModel";
import { seatNameConverter } from "../common/seatingFunctions.js";

export default function TicketDisplay(props) {
  let selectedMembersList =
    props.memberList.filter(x => x.id !== props.profile.id) || [];
  return (
    <React.Fragment>
      <div style={{ width: "40%", minWidth: "450px", height: "100%" }}>
        <SelectMemberModel
          addMemberToBooking={props.addMemberToBooking}
          selectableMemberList={props.selectableMemberList}
        />
        <Segment
          className="ticketContainer"
          style={{
            backgroundColor: "rgb(73, 73, 73)",
            width: "100%",
            height: "auto",
            minHeight: "500px"
          }}
        >
          {selectedMembersList.map((x, index) => (
            <Label
              key={index}
              image
              size="medium"
              style={{ margin: "0.5rem 0.5rem 0.5rem 0" }}
            >
              <img alt="user image" src="userDefault.png" />
              {x.username}
              <Icon
                name="delete"
                onClick={() => props.removeMemberFromBooking(x.id)}
              />
            </Label>
          ))}
          <Divider />
          {props.existingBookings.map((item, index) =>
            item.customer.id ? (
              <React.Fragment key={item.seat}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    opacity: "0.6"
                  }}
                  className="ticketWrapper existingBooking"
                >
                  <div
                    style={{
                      width: "70%",
                      padding: "11px",
                      background: "beige",
                      marginBottom: " 2rem"
                    }}
                  >
                    <Header style={{ padding: "0", margin: "0" }} as="h5">
                      <Image
                        style={{ margin: "0 1rem 0 0" }}
                        src="userDefault.png"
                        circular
                        // size="small"
                      />
                      <Header.Content>
                        {item.customer.username} - <em>Medlem</em>
                        <Header.Subheader>Datum: {props.date}</Header.Subheader>
                        <Header.Subheader>Tid: {props.time}</Header.Subheader>
                        <Header.Subheader>
                          {seatNameConverter(item.seat)}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment key={item.seat}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    opacity: "0.6"
                  }}
                  className="ticketWrapper existingBooking"
                >
                  <div
                    style={{
                      width: "70%",
                      padding: "11px",
                      background: "powderblue",
                      marginBottom: " 2rem"
                    }}
                  >
                    <Header style={{ padding: "0", margin: "0" }} as="h5">
                      <Image
                        style={{ margin: "0 1rem 0 0" }}
                        src="userDefault.png"
                        circular
                        // size="small"
                      />
                      <Header.Content>
                        Gäst
                        <Header.Subheader>Datum: {props.date}</Header.Subheader>
                        <Header.Subheader>Tid: {props.time}</Header.Subheader>
                        <Header.Subheader>
                          {seatNameConverter(item.seat)}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </div>
                </div>
              </React.Fragment>
            )
          )}

          {props.reservedList.map((item, index) =>
            item.customer.id ? (
              <React.Fragment key={item.seat}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between"
                  }}
                  className="ticketWrapper"
                >
                  <div
                    style={{
                      width: "70%",
                      padding: "11px",
                      background: "beige",
                      marginBottom: " 2rem"
                    }}
                  >
                    <Header style={{ padding: "0", margin: "0" }} as="h5">
                      <Image
                        style={{ margin: "0 1rem 0 0" }}
                        src="userDefault.png"
                        circular
                        // size="small"
                      />
                      <Header.Content>
                        {item.customer.username} - <em>Medlem</em>
                        <Header.Subheader>Datum: {props.date}</Header.Subheader>
                        <Header.Subheader>Tid: {props.time}</Header.Subheader>
                        <Header.Subheader>
                          {seatNameConverter(item.seat)}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment key={item.seat}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between"
                  }}
                  className="ticketWrapper"
                >
                  <div
                    style={{
                      width: "70%",
                      padding: "11px",
                      background: "powderblue",
                      marginBottom: " 2rem"
                    }}
                  >
                    <Header style={{ padding: "0", margin: "0" }} as="h5">
                      <Image
                        style={{ margin: "0 1rem 0 0" }}
                        src="userDefault.png"
                        circular
                        // size="small"
                      />
                      <Header.Content>
                        Gäst
                        <Header.Subheader>Datum: {props.date}</Header.Subheader>
                        <Header.Subheader>Tid: {props.time}</Header.Subheader>
                        <Header.Subheader>
                          {seatNameConverter(item.seat)}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </div>
                </div>
              </React.Fragment>
            )
          )}
        </Segment>
        <Button
          as={Link}
          to={{
            pathname: "/movieselection",
            state: { movieId: props.movieId }
          }}
          inverted
          basic
        >
          Gå tillbaka{" "}
        </Button>
        {props.reservedList.length > 0 ? (
          <Button color="violet" onClick={() => props.completeBooking()}>
            Slutför bokning
          </Button>
        ) : (
          <Button
            disabled
            color="violet"
            onClick={() => props.completeBooking()}
          >
            Slutför bokning
          </Button>
        )}
      </div>
    </React.Fragment>
  );
}
