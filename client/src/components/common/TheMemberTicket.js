import React from "react";
import { Header, Image } from "semantic-ui-react";
import { seatNameConverter } from "./seatingFunctions";

const ticketContainer = {
  width: "60%",
  minWidth: "300px",
  display: "flex",
  justifyContent: "flex-start"
  // marginBottom: "2rem"
};

const menberTicketContent = {
  padding: "1rem",
  backgroundColor: "#ffffbb",
  height: "100px",
  // minWidth: "220px",
  width: "100%"
};

export default function TheMemberTicket(props) {
  return (
    <div style={ticketContainer}>
      <div
        style={{
          // backgroundColor: "pink",
          width: "40px",
          height: "100px",
          backgroundImage: "url(memberTicket_left.png)",
          backgroundSize: "contain",
          WebkitBackgroundSize: "contain",
          MozBackgroundSize: "contain",
          OBackgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 0",
          marginRight: "-8px"
        }}
      />
      <div style={menberTicketContent}>
        <Header style={{ padding: "0", margin: "0" }} as="h5">
          <Image
            style={{ margin: "0 1rem 0 0" }}
            src="krakebackens_logo_violet.png"
            circular
            size="huge"
          />
          <Header.Content>
            {props.item.customer.username}
            <Header.Subheader>
              Datum:{" "}
              {props.item.screeningDate
                ? props.item.screeningDate
                : "yyyy-mm-dd"}
            </Header.Subheader>
            <Header.Subheader>
              Tid:{" "}
              {props.item.screeningTime ? props.item.screeningTime : "00:00"}
            </Header.Subheader>
            <Header.Subheader>
              {seatNameConverter(props.item.seat)}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </div>
      <div
        style={{
          // backgroundColor: "pink",
          width: "40px",
          height: "100px",
          backgroundImage: "url(memberTicket_right.png)",
          backgroundSize: "contain",
          WebkitBackgroundSize: "contain",
          MozBackgroundSize: "contain",
          OBackgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 0",
          marginLeft: "-2px"
        }}
      />
    </div>
  );
}
