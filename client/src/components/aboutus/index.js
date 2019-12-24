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

const AboutUs = ({ auth, profile }) => {
  console.log({ auth, profile });

  const { user } = auth;
  const [inputValue, setInputValue] = useState("");
  const [updateText, setUpdatedText] = useState(false);
  const [previewMotd, setPreviewMotdText] = useState(false);

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

  const imageOfMats =
    "https://firebasestorage.googleapis.com/v0/b/krakebackensbiograf-e8f4e.appspot.com/o/mats2.jpg?alt=media";

  return (
    <>
      <Segment
        style={{
          backgroundColor: "rgb(0,0,0)",
          borderRadius: "0",
          padding: "1em"
        }}
      >
        <div
          style={{
            padding: "2em 0",
            display: "flex",
            flexDirection: "row",
            flexWrap: "flex",
            justifyContent: "space-around"
          }}
        >
          <Segment
            inverted
            style={{
              border: "none",
              boxShadow: "none",
              padding: "0.5em 1em",
              width: "45%",
              height: "30em"
            }}
          >
            <Header as="h2" dividing inverted>
              Om oss
            </Header>
            <Header as="h2" inverted>
              <Header.Subheader>
                Sveriges bästa biograf! (Även den minsta - sorry Tollereds
                biograf!)
                <br />
                <br />
                <span style={{ fontStyle: "oblique" }}>
                  "Det skall inte kosta skjortan att gå på bio - inte ens Mats
                  skjorta!" /M.Udéhn
                </span>
              </Header.Subheader>
            </Header>

            <Header inverted>Kråkan meddelar</Header>

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
                <div style={{ float: "right" }}>
                  <Button primary onClick={() => motd()}>
                    Spara
                  </Button>
                </div>
                {updateText && (
                  <Message positive>
                    <Message.Header>Texten är uppdaterad!</Message.Header>
                    <p>Medlemmar ser nu ditt nya meddelande</p>
                  </Message>
                )}
              </Form>
            ) : (
              <div style={{ padding: "0 1em" }}>
                <span>{inputValue}</span>
              </div>
            )}
          </Segment>
          <div
            style={{
              boxShadow: "inset 200px 200px 40px -177px rgba(0,0,0,0.84)",
              width: "45%",
              height: "auto"
            }}
          >
            <Image fluid src={imageOfMats} />
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
