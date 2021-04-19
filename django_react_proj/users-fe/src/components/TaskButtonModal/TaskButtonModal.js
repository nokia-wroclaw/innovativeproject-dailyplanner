import React, { useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

const TaskButton = (props) => {
  const [modalFlag, setModalFlag] = useState(
        false
  )

  const [taskFlag, setTaskFlag] = useState(
    false
  )

  const toggle = () => {
    setModalFlag((previous) => !previous);
  };
  
  const handlerDeleteUser = async id => {
    try {
      await props.deleteUser(id)
      toggle() 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button color="primary" onClick={props.onToggleTaskFlag}>
        TASKBUTTON
      </Button>

      <Modal isOpen={modalFlag} toggle={toggle}>
        <ModalHeader toggle={toggle}>Czy chcesz usunąć zadanie?</ModalHeader>

        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Anuluj
          </Button>
          <Button type="button" color="primary" onClick={() => handlerDeleteUser(props.id)}>
            Tak
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
};
export default TaskButton;
