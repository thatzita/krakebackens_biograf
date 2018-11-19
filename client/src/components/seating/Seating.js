import React, { Component } from "react";
import { connect } from "react-redux";
import "./seating.css";

class Seating extends Component {
  constructor() {
    super();
    this.state = {
      seat: [
        "r1s0",
        "r1s1",
        "r1s2",
        "r1s3",
        "r1s4",
        "r1s5",
        "r1s6",
        "r2s1",
        "r2s2",
        "r2s3",
        "r2s4",
        "r2s5",
        "r2s6",
        "r3s1",
        "r3s2",
        "r3s3",
        "r3s4",
        "r3s5",
        "r3s6"
      ],
      seatAvailable: [
        "r1s0",
        "r1s1",
        "r1s2",
        // "r1s3",
        "r1s4",
        "r1s5",
        "r1s6",
        // "r1s7",
        "r2s1",
        "r2s2",
        "r2s3",
        "r2s4",
        "r2s5",
        "r2s6",
        // "r3s0",
        // "r3s1",
        "r3s2",
        "r3s4"
        // "r3s5",
        // "r3s6"
      ],
      seatReserved: ["r3s1", "r3s3"],
      seatTaken: ["r1s3", "r3s5", "r3s6"]
    };
  }

  onClickData(seat) {
    //TODO: fixa så du inte kan booka flera
    if (this.state.seatReserved.length >= 4) {
      console.log("no more bookings for you");
    }
    if (this.state.seatReserved.indexOf(seat) > -1) {
      this.setState({
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter(res => res != seat),
        seatTaken: this.state.seatTaken
      });
    } else {
      this.setState({
        seatReserved: this.state.seatReserved.concat(seat),
        seatAvailable: this.state.seatAvailable.filter(res => res != seat),
        seatTaken: this.state.seatTaken
      });
    }
  }

  render() {
    return (
      <div className="cinemaBackground">
        <h1>Salong 1</h1>
        <DrawGrid
          seat={this.state.seat}
          available={this.state.seatAvailable}
          reserved={this.state.seatReserved}
          taken={this.state.seatTaken}
          onClickData={this.onClickData.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  null,
  {
    //func goes here
  }
)(Seating);

class DrawGrid extends React.Component {
  componentDidMount() {}
  render() {
    let availableSeating = this.props.available.map(row => {
      if (
        row === "r1s0" ||
        row === "r1s5" ||
        row === "r1s6" ||
        row === "r2s6"
      ) {
        return (
          <td
            disabled
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="hidden"
          >
            {row}
          </td>
        );
      } else if (row === "r2s1") {
        return (
          <td
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="available row2seat1"
          >
            <div>{row}</div>
          </td>
        );
      } else if (row === "r3s1") {
        return (
          <td
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="available row3seat1"
          >
            <div>{row}</div>
          </td>
        );
      } else {
        return (
          <td
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="available"
          >
            <div>{row}</div>
          </td>
        );
      }
    });
    let reservedSeating = this.props.reserved.map(row => {
      if (row === "r2s1") {
        return (
          <td
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="reserved row2seat1"
          >
            <div>{row}</div>
          </td>
        );
      } else if (row === "r3s0") {
        return (
          <td
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="hidden row3seat0"
          >
            <div>{row}</div>
          </td>
        );
      } else {
        return (
          <td
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="reserved"
          >
            <div>{row}</div>
          </td>
        );
      }
    });
    let takenSeating = this.props.taken.map(row => {
      if (row === "r2s1") {
        return (
          <td
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="taken row2seat1"
          >
            <div>{row}</div>
          </td>
        );
      } else if (row === "r3s0") {
        return (
          <td
            key={row}
            onClick={e => this.onClickSeat(row)}
            className="hidden row3seat0"
          >
            <div>{row}</div>
          </td>
        );
      } else {
        return (
          <td key={row} onClick={e => this.onClickSeat(row)} className="taken">
            <div>{row}</div>
          </td>
        );
      }
    });

    let newArray = availableSeating
      .concat(reservedSeating)
      .concat(takenSeating);

    function compare(a, b) {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    }

    let sortedNewArr = newArray.sort(compare);

    return (
      <div className="container">
        <div className="cinemaScreenBox">
          <div className="cinemaScreen" />
        </div>
        <span className="cinemaScreenSpan">Bioduk</span>
        <table className="grid">
          <tbody className="cinemaSeating">
            <tr>{sortedNewArr}</tr>
          </tbody>
        </table>
        {/* <AvailableList available={this.props.available} />
        <ReservedList reserved={this.props.reserved} />
        <TakenList taken={this.props.taken} /> */}
      </div>
    );
  }

  onClickSeat(seat) {
    console.log(seat);
    this.props.onClickData(seat);
  }
}

class AvailableList extends React.Component {
  render() {
    const seatCount = this.props.available.length;
    return (
      <div className="text">
        <h4>
          Available Seats: ({seatCount == 0 ? "No seats available" : seatCount})
        </h4>
        <ul>
          {this.props.available.map(res => (
            <li key={res}>{res}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// class ReservedList extends React.Component {
//   render() {
//     return (
//       <div className="text">
//         <h4>Reserved Seats: ({this.props.reserved.length})</h4>
//         <ul>
//           {this.props.reserved.map(res => (
//             <li key={res}>{res}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// class TakenList extends React.Component {
//   render() {
//     return (
//       <div className="text">
//         <h4>Taken Seats: ({this.props.taken.length})</h4>
//         <ul>
//           {this.props.taken.map(res => (
//             <li key={res}>{res}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }
