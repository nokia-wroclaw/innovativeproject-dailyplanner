import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, Button, ModalFooter } from 'reactstrap';

const ConfirmRemovalModal = (props) => {
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
      <Button color="danger" onClick={() => toggle()}>
        Usuń
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
ConfirmRemovalModal.propTypes = {
  id: PropTypes.number,
  deleteUser: PropTypes.func,
};
export default ConfirmRemovalModal;
