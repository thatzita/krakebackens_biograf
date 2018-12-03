import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllMoviesArchive } from "../../actions/monMovieActions";
import {
  Statistic,
  List,
  Divider,
  Icon,
  Image,
  Button
} from "semantic-ui-react";

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

  render() {
    let year = new Date().getFullYear().toString();

    let movieContent = (
      <div className="statsFromUsers">
        <Statistic.Group className="userGroup" style={{ marginLeft: "8rem" }}>
          <Statistic>
            <Statistic.Value>{this.fullybookedMovies()}</Statistic.Value>
            <Statistic.Label>fullbokade filmer</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.moviesShownSeason()}</Statistic.Value>
            <Statistic.Label>visningar under {year}</Statistic.Label>
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
