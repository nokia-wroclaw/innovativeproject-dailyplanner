import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import NewUserForm from "../NewUserForm/NewUserForm";
import styles from './NewUserModal.module.css';

class NewUserModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing User";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating New User";

      button = (
        <button
          className={styles.Button}
          onClick={this.toggle}
        >
          Utwórz nowe konto
        </button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewUserForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              user={this.props.user}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewUserModal;