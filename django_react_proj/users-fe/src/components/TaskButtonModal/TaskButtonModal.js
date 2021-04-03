import React, { useState, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import styles from './TaskButtonModal.module.css';

const TaskButton = (props) => {
  const [modalFlag, setModalFlag] = useState(
        false
  )

<<<<<<< HEAD
  const [taskFlag, setTaskFlag] = useState(
    false
  )

=======
>>>>>>> Develop
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

<<<<<<< HEAD
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
=======
  return (
    <Fragment>
      <Button 
        className = {styles.done}  
        onClick = {() => toggle()}>
>>>>>>> Develop
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
            onClick={() => handlerDeleteUser(props.id)}
          >
            Tak
          </Button>
        </ModalFooter>
      </Modal>
<<<<<<< HEAD
    </>
=======
    </Fragment>
>>>>>>> Develop
  );
};

export default TaskButton;

