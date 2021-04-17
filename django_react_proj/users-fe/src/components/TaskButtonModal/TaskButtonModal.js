import React, { useState, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import styles from './TaskButtonModal.module.css';
import PropTypes from 'prop-types';

const TaskButton = ({id, deleteUser}) => {
  const [modalFlag, setModalFlag] = useState(
        false
  )

  const [taskFlag, setTaskFlag] = useState(
    false
  )

  const toggle = () => {
    setModalFlag(previous => (
       !previous
     ));
  };
  
  const handlerDeleteUser = async id_ => {
    try {
      await deleteUser(id_)
      toggle() 
    } catch (error) {
      console.log(error)
    } 
   };

  const toggleTaskFlag = () => {
    setTaskFlag(previous => (
        !previous
      ));
  };
   
  return (
    <>
      <Button
        color = {taskFlag ? 'success': 'danger'}
        onClick = {() => toggleTaskFlag()}>
        TASKBUTTON
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
            onClick={() => handlerDeleteUser(id)}
          >
            Tak
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

TaskButton.propTypes = {
  id: PropTypes.number,
  deleteUser: PropTypes.func
}


export default TaskButton;

