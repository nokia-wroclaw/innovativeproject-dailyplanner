import React, { useState } from 'react';
import {
  Modal, ModalHeader, Button, ModalFooter,
} from 'reactstrap';
import styles from './TaskButtonModal.module.css';

const TaskButton = (props) => {
  const [modalFlag, setModalFlag] = useState(false);

  const toggle = () => {
    setModalFlag((previous) => !previous);
  };

  const handlerDeleteUser = async (id) => {
    try {
      await props.deleteUser(id);
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        color="primary"
        onClick={() => props.ontoggleTaskFlag()}
      >
        TASKBUTTON
      </Button>

      <Modal isOpen={modalFlag} toggle={toggle}>
        <ModalHeader toggle={toggle}>Czy chcesz usunąć zadanie?</ModalHeader>

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

export default TaskButton;
