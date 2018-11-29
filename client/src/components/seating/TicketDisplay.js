import React from "react";
import { Segment, Header, Icon, Image, Button, Menu } from "semantic-ui-react";

const reservedList = [1, 2, 3];

export default function TicketDisplay(props) {
  return (
    <Segment style={{ backgroundColor: "rgb(73, 73, 73)", width: "40%" }}>
      <div className="ticketContainer">
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
                    </Header.Content>
                  </Header>
                </div>
                <Menu
                  inverted
                  vertical
                  style={{
                    width: "30%",
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                    margin: "0"
                  }}
                >
                  <Menu.Item style={{ color: "gold" }}>
                    <Icon name="edit" />
                    Ändra
                  </Menu.Item>
                  <Menu.Item style={{ color: "gold" }}>
                    <Icon name="delete" />
                    Ta bort
                  </Menu.Item>
                </Menu>
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
                    </Header.Content>
                  </Header>
                </div>
                <Menu
                  inverted
                  vertical
                  style={{
                    width: "30%",
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                    margin: "0"
                  }}
                >
                  <Menu.Item>
                    <Icon name="edit" />
                    Ändra
                  </Menu.Item>
                  <Menu.Item>
                    <Icon name="delete" />
                    Ta bort
                  </Menu.Item>
                </Menu>
              </div>
            </React.Fragment>
          )
        )}
      </div>
    </Segment>
  );
}
