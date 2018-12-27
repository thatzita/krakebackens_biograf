import React, { Component } from "react";
import { Image, Icon, Segment, Header, Divider, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Hem"
    };
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === "Filmer") {
      window.scrollTo({ top: 550, behavior: "smooth" });
    }
  };

  render() {
    let { isAuthenticated } = this.props.auth;

    return (
      <Segment.Group
        style={{
          border: "0",
          boxShadow: "none",
          margin: "0"
        }}
        className="crowFooter"
      >
        <Segment
          inverted
          style={{
            marginTop: "0.5rem",
            paddingTop: "0",
            border: "0",
            boxShadow: "none",
            borderRadius: "0",
            backgroundColor: "rgb(0,0,0)",

            backgroundImage: "url(footerForest.png)",
            backgroundSize: "cover",
            WebkitBackgroundSize: "cover",
            MozBackgroundSize: "cover",
            OBackgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 0"
          }}
          className="linkContainer"
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              margin: "auto"
            }}
          >
            <div
              style={{ width: "250px", minWidth: "250px", marginRight: "3rem" }}
            >
              <Menu inverted text vertical fluid style={{ marginTop: "2rem" }}>
                <Menu.Item
                  header
                  style={{ marginBottom: "0", marginTop: "0", paddingTop: "0" }}
                >
                  <Header
                    style={{ padding: "0", marginBottom: "0" }}
                    inverted
                    as="h3"
                  >
                    <Image
                      circular
                      src="/krakelogo.gif"
                      onError={e => {
                        e.target.src =
                          "https://firebasestorage.googleapis.com/v0/b/krakebackensbiograf-c3aa9.appspot.com/o/krakebackens_logo.png?alt=media&token=4c75370b-fa7d-4838-af81-040c458dd767";
                      }}
                    />{" "}
                    Kråkebackens Biograf
                  </Header>
                  <Divider
                    style={{
                      marginTop: "0.5rem",
                      marginBottom: "0",
                      padding: "0",
                      borderBottom: "1px solid #f4f4f4",
                      opacity: "0.3"
                    }}
                  />
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/mainpage"
                  name="Hem"
                  active={this.state.activeItem === "Hem"}
                  onClick={this.handleItemClick}
                />
                {isAuthenticated ? (
                  <React.Fragment>
                    <Menu.Item
                      as={Link}
                      to="/mainpage"
                      name="Biljetter"
                      active={this.state.activeItem === "Biljetter"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={Link}
                      to="/profile"
                      name="Profil"
                      active={this.state.activeItem === "Profil"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={Link}
                      to="/mainpage"
                      name="Filmer"
                      active={this.state.activeItem === "Filmer"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={Link}
                      to="/mainpage"
                      name="Om oss"
                      active={this.state.activeItem === "Om oss"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={Link}
                      to="/mainpage"
                      name="Kontakta oss"
                      active={this.state.activeItem === "Kontakta oss"}
                      onClick={this.handleItemClick}
                    />{" "}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Menu.Item
                      as={Link}
                      to="/login"
                      name="Logga in"
                      content="Logga in"
                    />
                    <Menu.Item
                      as={Link}
                      to="/apply"
                      name="Ansök om medlemskap"
                      content="Ansök om medlemskap"
                    />
                  </React.Fragment>
                )}
              </Menu>
            </div>

            <div className="contactUs" style={{ marginTop: "2rem" }}>
              <Header
                inverted
                as="h3"
                style={{ padding: "0", marginTop: "0.1rem" }}
              >
                Kontakta oss
              </Header>
              <Divider
                style={{
                  marginTop: "0.5rem",
                  marginBottom: "0",
                  padding: "0",
                  borderBottom: "1px solid #f4f4f4",
                  opacity: "0.3"
                }}
              />
              <ul
                style={{ listStyle: "none", paddingLeft: "0" }}
                className="contactUsUl"
              >
                <li style={{ marginBottom: "1rem" }}>
                  <Icon name="home" /> Skogen
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  <Icon name="phone" /> 0706-84 19 52
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  <Icon name="mail" /> krakebackensbiograf@gmail.com
                </li>
              </ul>
            </div>
          </div>
          <div style={{ width: "50%", margin: "auto", marginTop: "3rem" }}>
            <Image
              style={{ width: "150px", margin: "auto" }}
              // floated="middle"
              size="small"
              src="tmdb_logo.png"
              onError={e => {
                e.target.src =
                  "https://firebasestorage.googleapis.com/v0/b/krakebackensbiograf-c3aa9.appspot.com/o/tmdb_logo.png?alt=media&token=50fc5646-b590-485e-9aa6-6df8ac99ce55";
              }}
            />
            <div
              className="copyright"
              style={{ margin: "auto", textAlign: "center", marginTop: "3rem" }}
            >
              Kråkebackens Biograf Copyright &copy; {new Date().getFullYear()}
            </div>
          </div>
        </Segment>
      </Segment.Group>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  adminPage: state.adminPage.adminPage
});

export default connect(
  mapStateToProps,
  {
    // logoutUser,
    // clearCurrentProfile,
    // goToAdminPage
  }
)(Footer);
