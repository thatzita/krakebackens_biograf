import React, { Component } from "react";

import "../seating/seatingTwo.css";
import {
  Button,
  Segment,
  Header,
  Image,
  Icon,
  Confirm
} from "semantic-ui-react";
import TheGuestTicket from "../common/TheGuestTicket";
import TheMemberTicket from "../common/TheMemberTicket";

export default class ProfileTicketDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmOpen: false,
      item: null,
      customerId: "",
      responsibleId: "",
      itemId: null
    };
  }

  findAllResponsibleTickets = (currentUser, monMovies = []) => {
    let arrayMovieGroup = [];

    let movieArray = monMovies || [];

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
          let sortdArrayOfTickets = this.sortExistingTickets(arrayOfTickets);
          arrayMovieGroup.push(sortdArrayOfTickets);
        }
      });
    }

    return arrayMovieGroup;
  };

  findAllResponsibleTicketsEvents = (currentUser, monEvents = []) => {
    let arrayEventGroup = [];
    let eventArray = monEvents || [];

    if (eventArray.length > 0) {
      eventArray.map(monEvent => {
        let arrayOfTickets = [];
        monEvent.seating.map(seat => {
          if (currentUser.id === seat.responsible.id) {
            arrayOfTickets.push(seat);
          }
        });

        if (arrayOfTickets.length > 0) {
          let sortdArrayOfTickets = this.sortExistingTickets(arrayOfTickets);
          arrayEventGroup.push(sortdArrayOfTickets);
        }
      });
    }
    return arrayEventGroup;
  };

  handleCancel = () =>
    this.setState({
      confirmOpen: false,
      item: null,
      customerId: "",
      responsibleId: "",
      itemId: null
    });

  handleConfirm = () => {
    console.log(this.state.item);
    console.log(this.state.customerId);
    console.log(this.state.responsibleId);
    console.log(this.state.itemId);
    console.log(this.props);
    console.log(this.state);

    if (this.state.itemId) {
      if (
        this.state.item &&
        this.state.itemId &&
        this.state.responsibleId.length > 0
      ) {
        this.props.removeBooking(
          this.state.item,
          this.state.customerId,
          this.state.responsibleId,
          this.state.itemId,
          this.state.item.eventType
        );
      }
    }
    // else if (this.state.itemId === undefined) {
    //   this.props.removeBooking(
    //     this.state.item,
    //     this.state.customerId,
    //     this.state.responsibleId,
    //     this.state.itemId
    //   );
    // }
    else {
      alert(
        "avbokningen gick av någon anledning inte igenom, vänligen försök igen"
      );
    }
    this.setState({ confirmOpen: false });
  };

  show = (item, customerId, responsibleId, itemId) => {
    this.setState({
      confirmOpen: true,
      item: item,
      customerId: customerId,
      responsibleId: responsibleId,
      itemId: itemId
    });
  };

  sortExistingTickets = array => {
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

  render() {
    let userTickets = this.findAllResponsibleTickets(
      this.props.profile,
      this.props.monMovies
    );

    let userTicketsEvent = this.findAllResponsibleTicketsEvents(
      this.props.profile,
      this.props.monEvents
    );

    return (
      <Segment.Group>
        <Segment
          style={{
            backgroundColor: "black",
            paddingBottom: "1rem"
          }}
          inverted
        >
          <Header
            as="h2"
            style={{
              paddingLeft: "3rem",
              margin: "0 1rem",
              fontWeight: "lighter",
              marginBottom: "1rem",
              borderBottom: "1px solid #333333"
            }}
          >
            <Icon name="ticket" />
            Biobiljetter
          </Header>
          {userTickets.length > 0 ? (
            <Segment.Group
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexDirection: "row"
              }}
            >
              {userTickets.map((mon, i) => (
                <Segment
                  style={{
                    width: "45%",
                    minWidth: "500px",
                    margin: "0 1rem 2rem 1rem"
                  }}
                  inverted
                  key={i}
                >
                  <Header inverted dividing as="h2">
                    <Image
                      rounded
                      src={
                        mon[0].poster
                          ? mon[0].poster
                          : "poster_not_available.jpg"
                      }
                    />{" "}
                    <Header.Content>
                      {mon[0].title ? mon[0].title : "Filmtitel"}
                      <Header.Subheader>
                        Datum:{" "}
                        {mon[0].screeningDate
                          ? mon[0].screeningDate
                          : "Filmtitel"}
                      </Header.Subheader>
                      <Header.Subheader>
                        Tid:{" "}
                        {mon[0].screeningTime
                          ? mon[0].screeningTime
                          : "Filmtitel"}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                  {mon.map((item, index) =>
                    item.customer.status === 1 || item.customer.status === 2 ? (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          marginBottom: "2rem",
                          marginLeft: "1rem"
                        }}
                      >
                        <TheMemberTicket item={item} />
                        <Button
                          onClick={() =>
                            this.show(
                              item,
                              item.customer.id,
                              item.responsible.id,
                              item._id
                            )
                          }
                          style={{ color: "gold", marginLeft: "1rem" }}
                          icon
                          color="black"
                        >
                          <Icon name="delete" /> Avboka
                        </Button>
                      </div>
                    ) : (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          marginBottom: "2rem",
                          marginLeft: "1rem"
                        }}
                      >
                        <TheGuestTicket item={item} />
                        <Button
                          onClick={() =>
                            this.show(
                              item,
                              item.customer.id,
                              item.responsible.id,
                              item._id
                            )
                          }
                          style={{ marginLeft: "1rem" }}
                          icon
                          color="black"
                        >
                          <Icon name="delete" /> Avboka
                        </Button>
                      </div>
                    )
                  )}
                </Segment>
              ))}
            </Segment.Group>
          ) : (
            <Segment.Group>
              <Segment inverted style={{ margin: "0 1rem" }}>
                <Header
                  textAlign="center"
                  inverted
                  icon
                  as="h3"
                  style={{
                    // margin: "0 2rem",
                    fontWeight: "lighter",
                    marginBottom: "2rem",
                    opacity: "0.5"
                  }}
                >
                  <Icon name="ticket" circular />
                  <Header.Content>
                    Du har för tillfället inga bokningar
                  </Header.Content>
                </Header>
              </Segment>
            </Segment.Group>
          )}
        </Segment>
        {/*  */}
        <Segment
          style={{
            backgroundColor: "black",
            paddingBottom: "1rem"
          }}
          inverted
        >
          <Header
            as="h2"
            style={{
              paddingLeft: "3rem",
              margin: "0 1rem",
              fontWeight: "lighter",
              marginBottom: "1rem",
              borderBottom: "1px solid #333333"
            }}
          >
            <Icon name="ticket" />
            Bokade events
          </Header>
          {userTicketsEvent.length > 0 ? (
            <Segment.Group
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexDirection: "row"
              }}
            >
              {userTicketsEvent.map((mon, i) => (
                <Segment
                  style={{
                    width: "45%",
                    minWidth: "500px",
                    margin: "0 1rem 2rem 1rem"
                  }}
                  inverted
                  key={i}
                >
                  <Header inverted dividing as="h2">
                    <Image
                      rounded
                      src={
                        mon[0].poster
                          ? mon[0].poster
                          : "poster_not_available.jpg"
                      }
                    />{" "}
                    <Header.Content>
                      {mon[0].title ? mon[0].title : "Filmtitel"}
                      <Header.Subheader>
                        Datum:{" "}
                        {mon[0].screeningDate
                          ? mon[0].screeningDate
                          : "Filmtitel"}
                      </Header.Subheader>
                      <Header.Subheader>
                        Tid:{" "}
                        {mon[0].screeningTime
                          ? mon[0].screeningTime
                          : "Filmtitel"}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                  {mon.map((item, index) =>
                    item.customer.status === 1 || item.customer.status === 2 ? (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          marginBottom: "2rem",
                          marginLeft: "1rem"
                        }}
                      >
                        <TheMemberTicket item={item} />
                        <Button
                          onClick={() =>
                            this.show(
                              item,
                              item.customer.id,
                              item.responsible.id,
                              item._id
                            )
                          }
                          style={{ color: "gold", marginLeft: "1rem" }}
                          icon
                          color="black"
                        >
                          <Icon name="delete" /> Avboka
                        </Button>
                      </div>
                    ) : (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          marginBottom: "2rem",
                          marginLeft: "1rem"
                        }}
                      >
                        <TheGuestTicket item={item} />
                        <Button
                          onClick={() =>
                            this.show(
                              item,
                              item.customer.id,
                              item.responsible.id,
                              item._id
                            )
                          }
                          style={{ marginLeft: "1rem" }}
                          icon
                          color="black"
                        >
                          <Icon name="delete" /> Avboka
                        </Button>
                      </div>
                    )
                  )}
                </Segment>
              ))}
            </Segment.Group>
          ) : (
            <Segment.Group>
              <Segment inverted style={{ margin: "0 1rem" }}>
                <Header
                  textAlign="center"
                  inverted
                  icon
                  as="h3"
                  style={{
                    // margin: "0 2rem",
                    fontWeight: "lighter",
                    marginBottom: "2rem",
                    opacity: "0.5"
                  }}
                >
                  <Icon name="ticket" circular />
                  <Header.Content>
                    Du har för tillfället inga bokningar
                  </Header.Content>
                </Header>
              </Segment>
            </Segment.Group>
          )}
        </Segment>
        {/*  */}

        <Confirm
          open={this.state.confirmOpen}
          className="confirmDeleteUser"
          header="Avboka biljett"
          content="Är du säker att du vill avboka din biljett? Observera att om du är huvudansvarig för bokningen, kommer alla biljetter för denna visning att avbokas"
          cancelButton="Gå tillbaka"
          confirmButton="Ja, jag vill avboka"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </Segment.Group>
    );
  }
}
