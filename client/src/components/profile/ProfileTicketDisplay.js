import React from "react";

import "../seating/seatingTwo.css";
import { Button, Segment, Header, Image, Icon } from "semantic-ui-react";

const sortExistingTickets = array => {
  if (array.lenght > 1) {
    let sortedTickest = array.sort((x, y) => {
      if (x.customer.status > y.customer.status) {
        return -1;
      }
      if (x.customer.status < y.customer.status) {
        return 1;
      }
      return 0;
    });
    return sortedTickest;
  } else {
    return array;
  }
};

const findAllResponsibleTickets = (currentUser, monMovies = []) => {
  let arrayOfTickets = [];
  console.log("monMovies ", monMovies);
  let movieArray = monMovies || [];
  console.log("monMovieslist ", movieArray);

  if (movieArray.length > 0) {
    movieArray.map(monMovie => {
      monMovie.seating.map(array => {
        array.map(seat => {
          if (currentUser.id === seat.responsible.id) {
            arrayOfTickets.push(seat);
          }
        });
      });
    });
  }

  console.log("tickets: ", arrayOfTickets);
  return sortExistingTickets(arrayOfTickets);
};

export default function ProfileTicketDisplay(props) {
  console.log(props);
  let userTickets = findAllResponsibleTickets(props.profile, props.monMovies);

  return (
    <Segment.Group>
      <Segment inverted>
        {userTickets.map((item, index) =>
          item.customer.status === 1 || item.customer.status === 2 ? (
            <div key={index} style={{ display: "flex" }}>
              <div
                style={{
                  width: "30%",
                  minWidth: "280px",
                  maxWidth: "400px",
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
                    {item.customer.username}
                    <Header.Subheader>
                      Datum:{" "}
                      {item.screeningDate ? item.screeningDate : "yyyy-mm-dd"}
                    </Header.Subheader>
                    <Header.Subheader>
                      Tid: {item.screeningTime ? item.screeningTime : "00:00"}
                    </Header.Subheader>
                    <Header.Subheader>
                      plats 2 rad 1{/* {seatNameConverter(item.seat)} */}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </div>
              <Button
                onClick={() =>
                  props.removeBooking(
                    item,
                    item.customer.id,
                    item.responsible.id,
                    item._id
                  )
                }
                style={{ margin: "auto auto auto 1rem" }}
                icon
              >
                <Icon name="delete" />
              </Button>
            </div>
          ) : (
            <div key={index} style={{ display: "flex" }}>
              <div
                style={{
                  width: "30%",

                  minWidth: "280px",
                  maxWidth: "400px",
                  padding: "11px",
                  background: "powderblue",
                  marginBottom: " 2rem"
                }}
              >
                <Header
                  style={{ padding: "0", margin: "0", height: "100%" }}
                  as="h5"
                >
                  <Image
                    style={{ margin: "0 1rem 0 0" }}
                    src="userDefault.png"
                    circular
                    // size="small"
                  />
                  <Header.Content>
                    Gäst
                    <Header.Subheader>
                      Datum:{" "}
                      {item.screeningDate ? item.screeningDate : "yyyy-mm-dd"}
                    </Header.Subheader>
                    <Header.Subheader>
                      Tid: {item.screeningTime ? item.screeningTime : "00:00"}
                    </Header.Subheader>
                    <Header.Subheader>
                      plats 2 rad 1{/* {seatNameConverter(item.seat)} */}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </div>
              <Button
                onClick={() =>
                  props.removeBooking(
                    item,
                    item.customer.id,
                    item.responsible.id,
                    item._id
                  )
                }
                style={{ margin: "auto auto auto 1rem" }}
                icon
              >
                <Icon name="delete" />
              </Button>
            </div>
          )
        )}
      </Segment>
    </Segment.Group>
  );
}
