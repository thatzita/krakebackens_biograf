import React from "react";
import { Header, Image } from "semantic-ui-react";
import { seatNameConverter } from "./seatingFunctions";

const ticketContainer = {
  backgroundImage: "url(Biljett_bas_vers2.png)",
  backgroundSize: "100% 100%",
  WebkitBackgroundSize: "100% 100%",
  MozBackgroundSize: "100% 100%",
  OBackgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center 0",
  width: "60%",
  minWidth: "300px",
  maxWidth: "350px",
  display: "flex",
  justifyContent: "flex-start"
};

const guestTicketContent = {
  padding: "1rem",
  // backgroundColor: "#dcfeff",
  height: "100px",
  width: "100%"
};

export default function TheGuestTicket(props) {
  return (
    <div style={ticketContainer}>
      {/* <div
        style={{
          width: "40px",
          height: "100px",
          backgroundImage: "url(guestTicket_left.png)",
          backgroundSize: "contain",
          WebkitBackgroundSize: "contain",
          MozBackgroundSize: "contain",
          OBackgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 0",
          marginRight: "-8px"
        }}
      /> */}
      <div style={guestTicketContent}>
        <Header style={{ padding: "0", margin: "0" }} as="h5">
          <Image
            style={{ margin: "0 1rem 0 0", width: "70px" }}
            src="logo_vers2.png"
            circular
            // size="massive"
            // size="small"
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
      {/* <div
        style={{
          // backgroundColor: "pink",
          width: "40px",
          height: "100px",
          backgroundImage: "url(guestTicket_right.png)",
          backgroundSize: "contain",
          WebkitBackgroundSize: "contain",
          MozBackgroundSize: "contain",
          OBackgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 0",
          marginLeft: "-2px"
        }}
      /> */}
    </div>
  );
}
