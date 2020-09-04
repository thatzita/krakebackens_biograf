import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Segment,
  Button,
  Image,
  Form,
  Header,
  Message
} from "semantic-ui-react";

import Footer from "../layout/Footer";
import "./styles.css";
import axios from "axios";
import { IMAGE_OF_MATS } from "./constants";
import {
  OM_OSS,
  BASTA_MINSTA_BIOGRAF,
  KOSTA_SKJORTA,
  KRAKAN_MEDDELAR,
  SPARA_TEXT,
  UPPDATERAD_TEXT,
  NYTT_MEDDELANDE_INFO
} from "./aboutUsText";

const AboutUs = ({ auth }) => {
  const { user } = auth;
  const [inputValue, setInputValue] = useState("");
  const [updateText, setUpdatedText] = useState(false);

  useEffect(() => {
    axios
      .get("/api/motd/getmotdmessage")
      .then(res => {
        setInputValue(res.data[0].motdText);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  const motd = () => {
    const message = {
      motdId: "crow",
      motdText: inputValue
    };
    axios
      .post("/api/motd/updatemessage", message)
      .then(res => {
        if (res.statusText === "OK") setUpdatedText(true);
      })
      .catch(err => {
        throw err;
      });
  };

  return (
    <>
      <Segment id="om-oss-main-segment">
        <div className="om-oss-flex-container">
          <Segment inverted className="om-oss-background-segment">
            <Header as="h2" dividing inverted>
              {OM_OSS}
            </Header>
            <Header as="h2" inverted>
              <Header.Subheader>
                {BASTA_MINSTA_BIOGRAF}
                <br />
                <br />
                <span className="kursivt">{KOSTA_SKJORTA}</span>
              </Header.Subheader>
            </Header>

            <Header inverted>{KRAKAN_MEDDELAR}</Header>

            {user.admin ? (
              <Form>
                <Form.Group>
                  <textarea
                    name="motd"
                    id="motd"
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                    cols="30"
                    rows="5"
                  />
                </Form.Group>
                <div className="float-right">
                  <Button primary onClick={() => motd()}>
                    {SPARA_TEXT}
                  </Button>
                </div>
                {updateText && (
                  <Message positive>
                    <Message.Header>{UPPDATERAD_TEXT}</Message.Header>
                    <p>{NYTT_MEDDELANDE_INFO}</p>
                  </Message>
                )}
              </Form>
            ) : (
              <div className="padding-0-1em">
                <span className="white-space">{inputValue}</span>
              </div>
            )}
          </Segment>
          <div className="image-container">
            <Image fluid src={IMAGE_OF_MATS} />
          </div>
        </div>
      </Segment>
      <Footer />
    </>
  );
};

AboutUs.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(AboutUs);
