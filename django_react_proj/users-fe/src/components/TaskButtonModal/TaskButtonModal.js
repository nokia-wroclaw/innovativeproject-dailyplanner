import React, { useState } from 'react';
import { Modal, ModalHeader, Button, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskButton = ({ onToggleTaskFlag, id, deleteUser, setDoneState }) => {
  const [modalFlag, setModalFlag] = useState(false);

  const toastifyButton = () => toast.info('YOU SWITCHED STATE OF TASK!');

  const toggle = () => {
    setModalFlag((previous) => !previous);
  };

  const handlerDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        color="primary"
        onClick={() => {
          onToggleTaskFlag();
          setDoneState();
          toastifyButton();
        }}
      >
        <ToastContainer />
        TASKBUTTON
      </Button>

      <Modal isOpen={modalFlag} toggle={toggle}>
        <ModalHeader toggle={toggle}>Do you want to delete task?</ModalHeader>

        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            No
          </Button>
          <Button type="button" color="primary" onClick={() => handlerDeleteUser(id)}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
TaskButton.propTypes = {
  id: PropTypes.number,
  deleteUser: PropTypes.func,
  onToggleTaskFlag: PropTypes.func,
  setDoneState: PropTypes.func,
};
export default TaskButton;
