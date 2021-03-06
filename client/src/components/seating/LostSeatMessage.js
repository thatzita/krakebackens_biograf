import { Button, Modal, Icon } from "semantic-ui-react";
import React from "react";

export default function LostSeatMessage(props) {
  return (
    <div>
      <Modal size="small" open={props.showFailMessage}>
        <Modal.Header>
          {" "}
          <Icon name="warning circle" size="large" color="red" /> Oj, någon hann
          före{" "}
        </Modal.Header>
        <Modal.Content>
          <p>Någon var lite före dig med sin bokning, vänligen försök igen</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => props.closeFailMessage()} color="violet">
            Okej
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
//props.showFailMessage
