import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <a className="navbar-brand" href="landing.html">
              Kråkebackens biograf
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
