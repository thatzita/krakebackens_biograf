import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllMoviesArchive } from "../../actions/monMovieActions";
import { Statistic } from "semantic-ui-react";

class MovieStatistic extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      monMovies: []
    };
  }
  componentDidMount() {
    this.props.getAllMoviesArchive();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      monMovies: nextProps.monMovies.movies
    });
  }

  moviesShownSeason() {
    const { monMovies } = this.state;
    let year = new Date().getFullYear().toString();

    let count = 0;

    monMovies.map(movie => {
      if (movie.screeningDate.substring(0, 4) === year) {
        count++;
      }
    });
    return count;
  }

  fullybookedMovies() {
    const { monMovies } = this.state;
    let count = 0;
    monMovies.map(movie => {
      if (movie.fullyBooked) {
        count++;
      }
    });
    return count;
  }

  percentageOfSeatsTaken() {
    const { monMovies } = this.state;

    let count = 0;
    let saloonOneCount = 0;
    let saloonTwoCount = 0;

    monMovies.map(movie => {
      if (movie.saloon === "2") {
        saloonTwoCount++;
        movie.seating[0].map(seat => {
          if (seat.booked) {
            count++;
          }
        });
        movie.seating[1].map(seat => {
          if (seat.booked) {
            count++;
          }
        });
        return count;
      }

      if (movie.saloon === "1") {
        saloonOneCount++;
        movie.seating[0].map(seat => {
          if (seat.booked) {
            count++;
          }
        });
        movie.seating[1].map(seat => {
          if (seat.booked) {
            count++;
          }
        });
        movie.seating[2].map(seat => {
          if (seat.booked) {
            count++;
          }
        });
        return count;
      }
    });

    let totalSaloonOneCount = saloonOneCount * 18;
    let totalSaloonTwoCount = saloonTwoCount * 8;
    let totalBothSaloons = totalSaloonOneCount + totalSaloonTwoCount;

    let percentage = count / totalBothSaloons || "";

    percentage = percentage.toString();
    percentage = percentage.substring(2, 4);

    return percentage + "%";
  }

  render() {
    let movieContent = (
      <div className="statsFromUsers">
        <Statistic.Group className="userGroup" style={{ marginLeft: "-1rem" }}>
          <Statistic>
            <Statistic.Value>{this.fullybookedMovies()}</Statistic.Value>
            <Statistic.Label>fullbokade filmer</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.percentageOfSeatsTaken()}</Statistic.Value>
            <Statistic.Label>av platserna bokade i snitt</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.moviesShownSeason()}</Statistic.Value>
            <Statistic.Label>visningar under året</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{this.state.monMovies.length}</Statistic.Value>
            <Statistic.Label>visningar totalt</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    );

    return (
      <React.Fragment>
        <br />
        {movieContent}
        <br />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  monMovies: state.monMovies
});

export default connect(
  mapStateToProps,
  {
    //func goes here
    getAllMoviesArchive
  }
)(MovieStatistic);
