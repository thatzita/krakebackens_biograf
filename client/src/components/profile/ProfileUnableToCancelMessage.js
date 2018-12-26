import { Button, Modal, Icon } from "semantic-ui-react";
import React from "react";

export default function ProfileUnableToCancelMessage(props) {
  return (
    <div>
      <Modal size="small" open={props.showFailMessage}>
        <Modal.Header>
          {" "}
          <Icon name="warning circle" size="large" color="red" /> Det gick
          tyvärr inte avboka!{" "}
        </Modal.Header>
        <Modal.Content>
          <p>Det går tyvärr inte avboka den här visningen längre</p>
          <p>
            <em>
              Vänligen ta kontakt med Kråkebackens Biograf, om det är så att du
              absolut inte kan komma till visningen
            </em>
          </p>
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
