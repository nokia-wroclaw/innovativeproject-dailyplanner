import React, {  useState,Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewUserForm from "../NewUserForm/NewUserForm";
import styles from './NewUserModal.module.css';


const NewUserModal =({ 
  resetState,
  user,
  create
}) => {
  const [modal, setModal]=useState();

  const toggle = () => {
    setModal(previous => !previous);
  };
  
  var title = "Editing User";
  var button = <Button 
    className = {styles.Edit} 
    onClick={toggle}>
      Edit</Button>;

  if (create) {
    title = "Creating New User";

    button = (
      <button
        className = {styles.Button}
        onClick={toggle}
      >
        Utwórz nowe konto
      </button>
    );
  }

  return (
    <Fragment>
      {button}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title} </ModalHeader>

        <ModalBody>
          <NewUserForm
            resetState={resetState}
            toggle={toggle}
            user={user}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};
export default NewUserModal;