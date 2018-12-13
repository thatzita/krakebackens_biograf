import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Popup from "./Popup";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
  Icon,
  Item,
  Segment,
  Confirm,
  Label
} from "semantic-ui-react";

import { getUserArchive } from "../../actions/usersActions";
import "../movies/movies.css";

class UserArchive extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      userArchive: null,
      search: "",
      showMore: 10,
      show: false
    };
    this.onChange = this.onChange.bind(this);
  }

  showMoreContent() {
    this.setState({
      showMore: this.state.showMore + 10
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    this.props.getUserArchive();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile.profile,
      userArchive: nextProps.users.userArchive
    });
  }

  render() {
    const { userArchive } = this.state;
    const { showMore, open } = this.state;
    let showMoreContentButton;
    let userContent;

    if (userArchive !== null || undefined) {
      if (this.props.users.userArchive.length > showMore) {
        showMoreContentButton = (
          <Button
            className="loadMoreBtn"
            color="violet"
            onClick={e => this.showMoreContent()}
          >
            Ladda mer från arkivet
          </Button>
        );
      } else {
        showMoreContentButton = "";
      }

      let filteredArchive = this.props.users.userArchive.filter(archiveDate => {
        return (
          archiveDate.archivedDate
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      });

      let archiveItem = filteredArchive.map((archive, index) => {
        let count = 0;
        return (
          <Item key={archive._id}>
            <Item.Content>
              <Item.Header>
                <Icon name="calendar" /> Arkiveringsdatum: &nbsp;
                {archive.archivedDate}
              </Item.Header>

              <Item.Extra>
                <p>Antal besökare: {archive.seasonUserViewings}</p>
              </Item.Extra>
              <Item.Extra>
                Topp 3: &nbsp;&nbsp;
                {archive.seasonTopUsers.map((top, index) => {
                  return <Label key={index}>{top}</Label>;
                })}
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      });
      archiveItem.reverse();
      userContent = (
        <div>
          <br />
          <br />
          <Segment style={{ boxShadow: "5px 5px 5px -6px rgba(0,0,0,0.75)" }}>
            <Item.Group divided>{archiveItem.slice(0, showMore)}</Item.Group>
          </Segment>
        </div>
      );
    } else {
      userContent = "";
    }

    return (
      <React.Fragment>
        {/* <div className="searchContainer">
          <Input
            className="movieSearch"
            placeholder="Sök i arkivet..."
            onChange={this.onChange}
            value={this.state.search}
            name="search"
          />
        </div> */}
        <br />
        {userContent}
        <div style={{ marginLeft: "-2rem" }} className="loadMoreBtnContainer">
          {showMoreContentButton}
        </div>
        <br />
      </React.Fragment>
    );
  }
}

UserArchive.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  monMovies: state.monMovies,
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUserArchive }
)(UserArchive);
