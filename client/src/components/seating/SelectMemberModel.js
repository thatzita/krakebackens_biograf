import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Header,
  Icon,
  Segment,
  Table
} from "semantic-ui-react";

class ModalExampleSize extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      open: false,
      selectedMemberObj: {}
    };
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false, search: "" });

  filterSelectedMembersFromExistingBookings = (existing, membersList) => {
    let exirtingChoosenMembers = existing.filter(x => x.customer.status === 2);
    let newMemberList;

    for (let i = 0; i < membersList.length; i++) {
      if (
        membersList[i].email === this.props.profile.email // "charliegh.christyana@moneyln.com"
      ) {
        membersList.splice(i, 1);
        break;
      }
    }
    if (exirtingChoosenMembers.length > 0) {
      newMemberList = membersList.filter(x => {
        for (let i = 0; i < exirtingChoosenMembers.length; i++) {
          if (exirtingChoosenMembers[i].customer.id !== x._id) {
            return x;
          }
        }
        return null;
      });
    } else {
      newMemberList = membersList;
    }

    return newMemberList;
  };

  selectMember = (username, id, email) => {
    if (this.state.selectedMemberObj.email === email) {
      this.setState({ selectedMemberObj: {} });
    } else {
      this.setState({
        selectedMemberObj: { username: username, id: id, email: email }
      });
    }
  };

  saveAndClose = (username, id, email) => {
    this.props.addMemberToBooking(username, id, email);
    this.close();
  };

  render() {
    let membersList = this.filterSelectedMembersFromExistingBookings(
      this.props.existingBookings,
      this.props.selectableMemberList
    );

    const { open } = this.state;
    //FIXME: Ändra Gäst e-post till något annat som du har bättre kontroll över (en av dina egna mailadresser)
    //FIXME: Har ändrat till användarens email, man ska inte kunna välja sig själv

    let membersListAfterSearch =
      this.state.search.length <= 0
        ? membersList
        : membersList.filter(member => {
            return (
              member.username
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          });

    return (
      <div>
        <Button
          color="yellow"
          style={{ color: "black" }}
          onClick={() => this.open()}
        >
          <Icon name="star" />
          Lägg till extra medlem
        </Button>

        <Modal size="large" open={open} onClose={() => this.close()}>
          {/* <Modal.Header>Sök efter medlem</Modal.Header> */}
          <Modal.Content
            style={{
              backgroundColor: "gold",
              height: "30rem",
              padding: "2rem 3rem 4rem 3rem"
            }}
          >
            <Header as="h3">
              <Icon name="star" />
              Sök och lägg till medlem
            </Header>
            <Input
              // style={{ margin: "0 1rem" }}
              fluid
              icon="search"
              placeholder="namn på medlem"
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
            />
            <Segment
              style={{
                overflow: "auto",
                height: "80%",
                width: "100%",
                // maxHeight: "40vh",
                border: "0",
                boxShadow: "none",
                padding: "0"
              }}
            >
              {membersListAfterSearch.length > 0 ? (
                <Table selectable basic>
                  <Table.Body>
                    {membersListAfterSearch.map((item, index) => (
                      <Table.Row
                        verticalAlign="middle"
                        style={{ cursor: "pointer" }}
                        key={index}
                        onClick={() =>
                          this.selectMember(item.username, item._id, item.email)
                        }
                        active={
                          item._id === this.state.selectedMemberObj.id
                            ? true
                            : false
                        }
                      >
                        <Table.Cell textAlign="left">
                          <Icon
                            size="huge"
                            name="user circle outline"
                            color="violet"
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Header>
                            <Header.Content>{item.username}</Header.Content>
                          </Header>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <Table basic>
                  <Table.Body>
                    <Table.Row verticalAlign="middle">
                      <Table.Cell textAlign="left">
                        <Icon size="huge" name="info circle" color="violet" />
                      </Table.Cell>
                      <Table.Cell>
                        <Header>
                          <Header.Content>
                            Din sökning kunde tyvärr inte hitta några medlemmar
                            med det här användarnamnet.
                            <Header.Subheader>
                              Eller så har du redan lagt till den här medlemmen.
                            </Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              )}
            </Segment>
          </Modal.Content>

          <Modal.Actions>
            <Button basic onClick={() => this.close()}>
              <Icon name="delete" /> Avbryt
            </Button>
            <Button
              color="violet"
              disabled={Object.keys(this.state.selectedMemberObj).length === 0}
              onClick={() =>
                this.saveAndClose(
                  this.state.selectedMemberObj.username,
                  this.state.selectedMemberObj.id,
                  this.state.selectedMemberObj.email
                )
              }
            >
              <Icon name="save" /> Lägg till medlem
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleSize;
