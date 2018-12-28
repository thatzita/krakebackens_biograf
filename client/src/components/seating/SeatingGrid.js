import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

export default class DrawGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHoverItem: "seat",
      currentSeat: 1,
      currentRow: 1
    };
  }

  hoverOn = (value, seat) => {
    this.setState({
      currentHoverItem: value,
      currentRow: seat.row,
      currentSeat: seat.seatNr
    });
  };
  hoverOff = value => {
    this.setState({ currentHoverItem: value });
  };

  render() {
    //FIXME: lägg till den här funktionen senare som en funktion i seating.js och begräns antalet gånger informationen filtreras
    let seatsThatAreLeft = [];
    this.props.rowList.map(array => {
      let newArray = array.filter(
        x =>
          x.booked === false &&
          (x.seat !== "extra_1" &&
            x.seat !== "extra_2" &&
            x.seat !== "extra_3" &&
            x.seat !== "extra_4")
      );
      newArray.map(y => {
        seatsThatAreLeft.push(y);
        return null;
      });
      return null;
    });

    let reservedList = this.props.reservedList || [];

    return (
      <div className="seatingContainer">
        <img src="bioduk.png" alt="bioduk" id="bioduk" />
        {this.props.rowList.map((row, index) => (
          <ul key={index} className="row">
            {row.map(seat => {
              return (seat.seat !== "extra_1" &&
                seat.seat !== "extra_2" &&
                seat.seat !== "extra_3" &&
                seat.seat !== "extra_4") ||
                seatsThatAreLeft.length <= 0 ? (
                <li
                  key={seat.seat}
                  className={
                    seat.booked
                      ? "booked"
                      : reservedList.some(x => x.seat === seat.seat)
                      ? "reserved"
                      : "seat"
                  }
                  value={seat}
                  onMouseEnter={() => {
                    seat.booked
                      ? this.hoverOn("booked", seat)
                      : this.hoverOn("seat", seat);
                  }}
                  onMouseLeave={() => this.hoverOff("default")}
                  onClick={() =>
                    seat.booked ? null : this.props.reserveSeat(seat)
                  }
                >
                  {" "}
                  {seat.vip ? (
                    <Icon
                      color="black"
                      name="star"
                      size="small"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        margin: "auto"
                      }}
                    />
                  ) : null}{" "}
                </li>
              ) : null;
            })}
          </ul>
        ))}

        <div className="seatingInfo">
          {this.state.currentHoverItem === "default" ? (
            <React.Fragment>
              <div className="miniSeat" /> <p>Välj plats</p>
            </React.Fragment>
          ) : null}
          {this.state.currentHoverItem === "seat" ? (
            <React.Fragment>
              <div className="miniSeat" />{" "}
              <p>
                {" "}
                Stol {this.state.currentSeat}, Rad {this.state.currentRow}
              </p>
            </React.Fragment>
          ) : null}
          {this.state.currentHoverItem === "booked" ? (
            <React.Fragment>
              <div className="miniBooked" /> <p>Bokad plats</p>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
