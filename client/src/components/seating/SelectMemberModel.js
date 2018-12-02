import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Header,
  Icon,
  Segment,
  Table,
  Image
} from "semantic-ui-react";

class ModalExampleSize extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selectedMemberObj: {}
    };
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  selectMember = (username, id, email) => {
    this.setState({
      selectedMemberObj: { username: username, id: id, email: email }
    });
  };

  saveAndClose = (username, id, email) => {
    this.props.addMemberToBooking(username, id, email);
    this.close();
  };

  render() {
    const { open } = this.state;
    // console.log(this.state);

    return (
      <div>
        <Button
          color="yellow"
          style={{ color: "black" }}
          onClick={() => this.open()}
        >
          Lägg till extra medlem
        </Button>

        <Modal size="large" open={open} onClose={() => this.close()}>
          {/* <Modal.Header>Sök efter medlem</Modal.Header> */}
          <Modal.Content style={{ backgroundColor: "gold", height: "30rem" }}>
            <Header as="h3">
              <Icon name="star" />
              Sök och lägg till medlem
            </Header>
            <Input fluid icon="search" placeholder="namn på medlem" />
            <Segment
              style={{
                overflow: "auto",
                height: "40vh",
                maxHeight: "40vh",
                border: "0",
                boxShadow: "none",
                padding: "0"
              }}
            >
              <Table selectable basic>
                <Table.Body>
                  {this.props.selectableMemberList.map((item, index) => (
                    <Table.Row
                      verticalAlign="top"
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
                      <Table.Cell>
                        <Image size="tiny" src="userDefault.png" />
                      </Table.Cell>
                      <Table.Cell>
                        <Header>
                          <Header.Content>
                            {item.username}
                            {/* <Header.Subheader style={{maxWidth:'50%', minWidth: '280px'}}>{item.description}</Header.Subheader> */}
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          </Modal.Content>

          <Modal.Actions>
            <Button basic onClick={() => this.close()}>
              <Icon name="delete" /> avbryt
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
              <Icon name="save" /> spara
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleSize;
