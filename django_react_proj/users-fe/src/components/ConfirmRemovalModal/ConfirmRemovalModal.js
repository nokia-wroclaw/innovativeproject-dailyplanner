import React, { useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import styles from './ConfirmRemovalModal.module.css';


const ConfirmRemovalModal = (props) => {
  const [modalFlag, setModalFlag] = useState(
        false
  )
  const toggle = () => {
    setModalFlag(previous => (
       !previous
     ));
  };
  
  const handlerDeleteUser = async id => {
    try {
      await props.deleteUser(id)
      toggle() 
    } catch (error) {
      console.log(error)
    } 
  };

  return (
    <>
      <Button 
      className = {styles.delete} 
      onClick={() => toggle()}>
        Usuń
      </Button>

      <Modal isOpen={modalFlag} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Czy chcesz usunąć zadanie?
        </ModalHeader>

        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Anuluj
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => handlerDeleteUser(props.id)}
          >
            Tak
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConfirmRemovalModal;

