import React, { Component } from "react";
import "./statistic.css";
import Admin from "../admin/Admin";
import UserStatistic from "./UserStatistic";

class Statistic extends Component {
  render() {
    return (
      <div className="statistics">
        <div className="containerStatistic">
          <h1>Statistik</h1>
          <hr />
          <Admin />
          <UserStatistic />
        </div>
      </div>
    );
  }
}

export default Statistic;
