import React, { useState } from "react";
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
  
  var title = "Edycja zadania";
  var button = <Button 
    color = "success"
    onClick={toggle}>
      Edytuj</Button>;

  if (create) {
    title = "Tworzenie nowego zadania";

    button = (
      <button
        className = {styles.button}
        onClick={toggle}
      >
        Zaplanuj nowe zadanie
      </button>
    );
  }

  return (
    <>
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
    </>
  );
};
export default NewUserModal;