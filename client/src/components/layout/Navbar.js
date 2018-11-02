import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Kråkebackens biograf
            </Link>
            <ul>
              <li>
                <Link to="/login">Logga in</Link>
              </li>
              <li>
                <Link to="/register">Bli medlem</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
