import React, { Component } from "react";
import { Image, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="crowFooter">
        <Divider />
        <div className="linkContainer">
          <div className="listContainer">
            <Image
              floated="left"
              style={{ top: "30px" }}
              size="mini"
              src="krakebackens_logo.png"
            />
            <div className="contactUs">
              <h3 className="h3ContactFooter">Kontakta oss</h3>
              <ul style={{ listStyle: "none" }} className="contactUsUl">
                <li>
                  <Icon name="home" /> Skogen
                </li>
                <li>
                  <Icon name="phone" /> 0706-84 19 52
                </li>
                <li>
                  <Icon name="mail" /> krakebackensbiograf@gmail.com
                </li>
              </ul>
            </div>
            <h3 className="h3headerFooter">Kråkebackens Biograf</h3>
            <ul style={{ listStyle: "none" }} className="footerLinks">
              <Link to="/mainpage">
                <li>Biljetter</li>
              </Link>
              <Link to="/profile">
                <li>Profil</li>
              </Link>

              <Link to="/mainpage">
                <li>Filmer</li>
              </Link>
              <Link to="/mainpage">
                <li>Om oss</li>
              </Link>
              <Link to="/mainpage">
                <li>Kontakta oss</li>
              </Link>
              <Image
                style={{ marginRight: "28%" }}
                floated="right"
                size="small"
                src="tmdb_logo.png"
              />
              <div className="copyright">
                <li style={{ listStyle: "none" }}>
                  Kråkebackens Biograf Copyright &copy;{" "}
                  {new Date().getFullYear()}
                </li>
              </div>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
