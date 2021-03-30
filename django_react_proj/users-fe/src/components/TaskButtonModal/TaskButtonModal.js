import React, { useState, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import styles from './TaskButtonModal.module.css';

const TaskButton = (props) => {
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
  
  const handlerDeleteUser = async id => {
    try {
      await props.deleteUser(id)
      toggle() 
    } catch (error) {
      console.log(error)
    } 
   };

   let btnClass = styles.ButtonFalse;

  const toggleTaskFlag = () => {
    setTaskFlag(previous => (
        !previous
      ));
  };

  if(taskFlag){
    btnClass=styles.ButtonTrue
  }

   
  return (
    <>
      <button
        className = {btnClass}  
        onClick = {() => toggleTaskFlag()}>
        TASKBUTTON
      </button>

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

export default TaskButton;

