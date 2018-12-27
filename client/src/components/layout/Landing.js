import React, { Component } from "react";
import { Button, Segment, Header, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Footer from "../layout/Footer";

class Landing extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/mainpage");
    } else {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Segment.Group style={{ border: "0", boxShadow: "none", margin: "0" }}>
          <Segment
            className="landing"
            style={{
              width: "100%",
              height: "100vh",
              border: "0",
              borderRadius: "0",
              backgroundColor: "black",
              boxShadow: "none",

              backgroundImage: "url(skogdel3.jpg)",
              backgroundSize: "cover",
              WebkitBackgroundSize: "cover",
              MozBackgroundSize: "cover",
              OBackgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 0"
            }}
          >
            <Segment.Group style={{ border: "0", boxShadow: "none" }}>
              <Segment
                style={{
                  width: "30%",
                  minWidth: "280px",
                  margin: "auto",
                  backgroundColor: "rgba(0, 0, 0, 0.6)"
                }}
                padded="very"
                inverted
              >
                <div className="containerLanding">
                  <Header inverted as="h2" icon textAlign="center">
                    {/* <Image src="krakelogo.gif" style={{ width: "130px" }} /> */}
                    <Header.Content>Kråkebackens biograf</Header.Content>
                  </Header>

                  <Divider />

                  <Button fluid as={Link} to="/login" color="violet">
                    Logga in
                  </Button>

                  <Button
                    style={{ marginTop: "1rem" }}
                    fluid
                    as={Link}
                    to="/apply"
                    color="orange"
                  >
                    Ansök om medlemskap
                  </Button>
                </div>
              </Segment>
            </Segment.Group>
          </Segment>
        </Segment.Group>
        <Footer />
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
