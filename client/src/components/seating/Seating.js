import React, { Component } from "react";
import { connect } from "react-redux";
import "./seating.css";
import DrawGrid from "./SeatingGrid";

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

  componentDidMount() {
    window.scrollTo(0, 0);
    let { bookingObj } = this.props.location.state;
    console.log("the bookin obj:", bookingObj);
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

// class AvailableList extends React.Component {
//   render() {
//     const seatCount = this.props.available.length;
//     return (
//       <div className="text">
//         <h4>
//           Available Seats: ({seatCount == 0 ? "No seats available" : seatCount})
//         </h4>
//         <ul>
//           {this.props.available.map(res => (
//             <li key={res}>{res}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

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
