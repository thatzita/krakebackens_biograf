import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Icon, Item, Segment } from "semantic-ui-react";

import { getEventArchive } from "../../actions/monMovieActions";
import "../movies/movies.css";

class EventArchive extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      eventArchive: null,
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
    this.props.getEventArchive();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile.profile,
      eventArchive: nextProps.monEvents.monEvents
    });
  }
  amountsOfSeatsTaken(seatings) {
    let count = 0;

    seatings.forEach(seat => {
      if (seat.booked) {
        count++;
      }
    });
    return count;
  }

  render() {
    const { showMore, eventArchive } = this.state;
    let showMoreContentButton;
    let userContent;
    if (eventArchive !== null || undefined) {
      if (this.props.monEvents.monEvents.length > showMore) {
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

      let filteredArchive = this.props.monEvents.monEvents.filter(
        archiveDate => {
          return (
            archiveDate.screeningDate
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1
          );
        }
      );
      let archiveItem = filteredArchive.map((archive, index) => {
        return (
          <Item key={archive._id}>
            <Item.Content>
              <Item.Header>
                <Icon name="calendar" />
                {archive.title}
              </Item.Header>

              <Item.Extra>
                <p>
                  <Icon name="calendar" />
                  {`${archive.screeningDate}`}
                </p>
              </Item.Extra>
              <Item.Extra>
                <p>
                  <Icon name="clock" />
                  {`     ${archive.screeningTime}`}
                </p>
              </Item.Extra>

              <Item.Extra>
                <p>
                  <strong>Antal bokade platser:&nbsp;</strong>{" "}
                  {this.amountsOfSeatsTaken(archive.seating)}
                </p>
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

EventArchive.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  monEvents: state.monMovies,
  users: state.users
});

export default connect(
  mapStateToProps,
  { getEventArchive }
)(EventArchive);
