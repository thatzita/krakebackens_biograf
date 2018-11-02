import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4 whiteHeader">
                    Kråkebackens biograf
                  </h1>
                  <p className="lead"> Wall of text</p>
                  <hr />
                  <Link to="/login">
                    <Button primary>Logga in</Button>
                  </Link>
                  <Link to="/apply">
                    <Button primary>Bli medlem</Button>
                  </Link>
                  <Link to="/forgot">
                    <Button secondary>Glömt lösenord?</Button>
                  </Link>
                  <Link to="/register">
                    <Button secondary>Registerar medlem (ADMIN)</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
