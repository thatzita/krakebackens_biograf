import React, { Component } from "react";
import { Button } from "semantic-ui-react";

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
                  <a href="login.html">
                    <Button primary>Logga in</Button>
                  </a>
                  <a href="register.html">
                    <Button primary>Bli medlem</Button>
                  </a>
                  <a href="forgot.html">
                    <Button secondary>Glömt lösenord?</Button>
                  </a>
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
