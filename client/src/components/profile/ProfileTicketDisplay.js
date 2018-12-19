import React from "react";

import "../seating/seatingTwo.css";
import { Button, Segment, Header, Image, Icon } from "semantic-ui-react";

const sortExistingTickets = array => {
  if (array.length > 1) {
    let sortedTickest = array.sort((x, y) => {
      if (x.customer.status > y.customer.status) {
        return 1;
      }
      if (x.customer.status < y.customer.status) {
        return -1;
      }
      return 0;
    });
    return sortedTickest;
  } else {
    return array;
  }
};

const findAllResponsibleTickets = (currentUser, monMovies = []) => {
  let arryMovieGroup = [];
  console.log("monMovies ", monMovies);
  let movieArray = monMovies || [];
  console.log("monMovieslist ", movieArray);

  if (movieArray.length > 0) {
    movieArray.map(monMovie => {
      let arrayOfTickets = [];
      monMovie.seating.map(array => {
        array.map(seat => {
          if (currentUser.id === seat.responsible.id) {
            arrayOfTickets.push(seat);
          }
        });
      });
      if (arrayOfTickets.length > 0) {
        let sortdArrayOfTickets = sortExistingTickets(arrayOfTickets);
        arryMovieGroup.push(sortdArrayOfTickets);
      }
    });
  }

  // let arryMovieGroup = [];
  // if(arrayOfTickets.length > 0){

  // }

  console.log("tickets: ", arryMovieGroup);
  // return sortExistingTickets(arryMovieGroup);
  return arryMovieGroup;
};

export default function ProfileTicketDisplay(props) {
  console.log(props);
  let userTickets = findAllResponsibleTickets(props.profile, props.monMovies);
  console.log(userTickets);

  return (
    <Segment.Group>
      <Segment style={{ backgroundColor: "black" }} inverted>
        {userTickets.map((mon, i) => (
          <Segment inverted key={i}>
            <Header inverted dividing as="h2">
              <Image
                rounded
                src={mon[0].poster ? mon[0].poster : "poster_not_available.jpg"}
              />{" "}
              <Header.Content>
                {mon[0].title ? mon[0].title : "Filmtitel"}
                <Header.Subheader>
                  Datum:{" "}
                  {mon[0].screeningDate ? mon[0].screeningDate : "Filmtitel"}
                </Header.Subheader>
                <Header.Subheader>
                  Tid:{" "}
                  {mon[0].screeningTime ? mon[0].screeningTime : "Filmtitel"}
                </Header.Subheader>
              </Header.Content>
            </Header>
            {mon.map((item, index) =>
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
                          {item.screeningDate
                            ? item.screeningDate
                            : "yyyy-mm-dd"}
                        </Header.Subheader>
                        <Header.Subheader>
                          Tid:{" "}
                          {item.screeningTime ? item.screeningTime : "00:00"}
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
                          {item.screeningDate
                            ? item.screeningDate
                            : "yyyy-mm-dd"}
                        </Header.Subheader>
                        <Header.Subheader>
                          Tid:{" "}
                          {item.screeningTime ? item.screeningTime : "00:00"}
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
        ))}
      </Segment>
    </Segment.Group>
  );
}
