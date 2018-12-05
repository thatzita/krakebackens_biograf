import React, { Component } from "react";
import "./statistic.css";
import Admin from "../admin/Admin";
import UserStatistic from "./UserStatistic";
import MovieStatistic from "./MovieStatistic";
import { Icon, Segment } from "semantic-ui-react";

class Statistic extends Component {
  render() {
    return (
      <div className="statistics">
        <div className="containerStatistic">
          <h1 className="title">
            <Icon name="chart bar" />
            Statistik
          </h1>
          <hr />
          <Admin />
          <Segment style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}>
            <UserStatistic />
            <br />
            <br />
            <br />
            <hr />
            <br />

            <MovieStatistic />
          </Segment>
        </div>
      </div>
    );
  }
}

export default Statistic;
