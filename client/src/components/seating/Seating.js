import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Image } from "semantic-ui-react";

import "./seatingTwo.css";
import DrawGrid from "./SeatingGrid";

const rowList = [[1, 2, 3, 4], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6]];

class Seating extends Component {
  constructor() {
    super();
    this.state = {
      bookingObj: {},
      rowList: [],
      reservedList: [],
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
    if (bookingObj) {
      this.setState({ bookingObj, rowList: bookingObj.seating });
    }

    // this.filterSeating(bookingObj);

    console.log("the bookin obj:", bookingObj);
  }

  reserveSeat = obj => {
    if (this.state.reservedList.includes(obj)) {
      let newList = this.state.reservedList.filter(x => x !== obj);
      this.setState({ reservedList: newList });
    } else {
      this.setState({ reservedList: [...this.state.reservedList, obj] });
    }
  };

  unReserveSeat = obj => {};

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
    console.log("reserve: ", this.state.reservedList);

    let movie = this.state.bookingObj;
    let movieImage = movie.poster || "default.jpg";
    return (
      <div className="cinemaBackground">
        <Header
          inverted
          as="h2"
          style={{
            // width: "50%",
            minWidth: "500px",
            padding: "1rem 0",
            margin: "0 4rem 2rem 4rem",
            borderBottom: "1px solid gray"
          }}
        >
          <Image src={movieImage} size="big" />
          <Header.Content>
            {movie.title}
            <Header.Subheader>
              Datum: {movie.screeningDate || "ååååmmdd"}
            </Header.Subheader>
            <Header.Subheader>
              Tid: {movie.screeningTime || "00:00"}
            </Header.Subheader>
          </Header.Content>
        </Header>
        <DrawGrid
          unReserveSeat={this.unReserveSeat}
          reserveSeat={this.reserveSeat}
          rowList={this.state.rowList}
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
