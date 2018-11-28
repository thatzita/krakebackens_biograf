import React, { Component } from "react";

export default class DrawGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeat: "seat",
      name: "Parkett, rad 1"
    };
  }
  componentDidMount() {}

  hoverOn = (value, name) => {
    this.setState({ currentSeat: value, name });
  };
  hoverOff = value => {
    this.setState({ currentSeat: value });
  };

  render() {
    // console.log(this.state.currentSeat);

    return (
      <div className="bookingContainer">
        <div className="seatingContainer">
          <img src="bioduk.png" alt="bioduk" id="bioduk" />
          {this.props.rowList.map((row, index) => (
            <ul key={index} className="row">
              {row.map(seat => {
                return (
                  <li
                    key={seat.seat}
                    className={seat.booked ? "booked" : "seat"}
                    value={seat}
                    onMouseEnter={() => {
                      seat.booked
                        ? this.hoverOn("booked", seat.seat)
                        : this.hoverOn("seat", seat.seat);
                    }}
                    onMouseLeave={() => this.hoverOff("default")}
                    onClick={() => this.props.reserveSeat(seat)}
                  />
                );
              })}
            </ul>
          ))}

          <div className="seatingInfo">
            {this.state.currentSeat === "default" ? (
              <React.Fragment>
                <div className="miniSeat" /> <p>Välj plats</p>
              </React.Fragment>
            ) : null}
            {this.state.currentSeat === "seat" ? (
              <React.Fragment>
                <div className="miniReserved" /> <p>{this.state.name}</p>
              </React.Fragment>
            ) : null}
            {this.state.currentSeat === "booked" ? (
              <React.Fragment>
                <div className="miniBooked" /> <p>Bokad plats</p>
              </React.Fragment>
            ) : null}
          </div>
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
