import React, { Component } from "react";

export default class DrawGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHoverItem: "seat",
      currentRow: 1
    };
  }
  componentDidMount() {}

  hoverOn = (value, currentRow) => {
    this.setState({ currentHoverItem: value, currentRow });
  };
  hoverOff = value => {
    this.setState({ currentHoverItem: value });
  };

  render() {
    // let rowList = bestObjectCopyEver(this.props.rowList);
    //FIXME: lägg till den här funktionen senare som en funktion i seating.js och begräns antalet gånger informationen filtreras
    let seatsThatAreLeft = [];
    this.props.rowList.map(array => {
      let newArray = array.filter(
        x =>
          x.booked === false &&
          (x.seat !== "r1s1" && x.seat !== "r2s1" && x.seat !== "r3s1")
      );
      newArray.map(y => {
        seatsThatAreLeft.push(y);
      });
    });
    //-------------------
    let reservedList = this.props.reservedList || [];

    return (
      <div className="seatingContainer">
        <img src="bioduk.png" alt="bioduk" id="bioduk" />
        {this.props.rowList.map((row, index) => (
          <ul key={index} className="row">
            {row.map(seat => {
              return (seat.seat !== "r1s1" &&
                seat.seat !== "r2s1" &&
                seat.seat !== "r3s1") ||
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
                      ? this.hoverOn("booked", seat.row)
                      : this.hoverOn("seat", seat.row);
                  }}
                  onMouseLeave={() => this.hoverOff("default")}
                  onClick={() =>
                    seat.booked ? null : this.props.reserveSeat(seat)
                  }
                />
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
              <p> Parkett, Rad {this.state.currentRow}</p>
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

  onClickSeat(seat) {
    console.log(seat);
    this.props.onClickData(seat);
  }
}

// return (
//   <div className="container">
//     <div className="cinemaScreenBox">
//       <div className="cinemaScreen" />
//     </div>
//     <span className="cinemaScreenSpan">Bioduk</span>
//     <table className="grid">
//       <tbody className="cinemaSeating">
//         <tr>{sortedNewArr}</tr>
//       </tbody>
//     </table>
//     {/* <AvailableList available={this.props.available} />
//     <ReservedList reserved={this.props.reserved} />
//     <TakenList taken={this.props.taken} /> */}
//   </div>
// );
{
  /*  */
}

// let availableSeating = this.props.available.map(row => {
//   if (
//     row === "r1s0" ||
//     row === "r1s5" ||
//     row === "r1s6" ||
//     row === "r2s6"
//   ) {
//     return (
//       <td
//         disabled
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="hidden"
//       >
//         {row}
//       </td>
//     );
//   } else if (row === "r2s1") {
//     return (
//       <td
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="available row2seat1"
//       >
//         <div>{row}</div>
//       </td>
//     );
//   } else if (row === "r3s1") {
//     return (
//       <td
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="available row3seat1"
//       >
//         <div>{row}</div>
//       </td>
//     );
//   } else {
//     return (
//       <td
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="available"
//       >
//         <div>{row}</div>
//       </td>
//     );
//   }
// });
// let reservedSeating = this.props.reserved.map(row => {
//   if (row === "r2s1") {
//     return (
//       <td
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="reserved row2seat1"
//       >
//         <div>{row}</div>
//       </td>
//     );
//   } else if (row === "r3s0") {
//     return (
//       <td
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="hidden row3seat0"
//       >
//         <div>{row}</div>
//       </td>
//     );
//   } else {
//     return (
//       <td
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="reserved"
//       >
//         <div>{row}</div>
//       </td>
//     );
//   }
// });
// let takenSeating = this.props.taken.map(row => {
//   if (row === "r2s1") {
//     return (
//       <td
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="taken row2seat1"
//       >
//         <div>{row}</div>
//       </td>
//     );
//   } else if (row === "r3s0") {
//     return (
//       <td
//         key={row}
//         onClick={e => this.onClickSeat(row)}
//         className="hidden row3seat0"
//       >
//         <div>{row}</div>
//       </td>
//     );
//   } else {
//     return (
//       <td key={row} onClick={e => this.onClickSeat(row)} className="taken">
//         <div>{row}</div>
//       </td>
//     );
//   }
// });

// let newArray = availableSeating
//   .concat(reservedSeating)
//   .concat(takenSeating);

// function compare(a, b) {
//   if (a.key < b.key) return -1;
//   if (a.key > b.key) return 1;
//   return 0;
// }

// let sortedNewArr = newArray.sort(compare);
