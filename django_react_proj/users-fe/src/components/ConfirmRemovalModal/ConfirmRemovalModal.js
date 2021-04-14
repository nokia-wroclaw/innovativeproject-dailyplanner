import React, { useState, Fragment } from 'react';
import { Modal, ModalHeader, Button, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from './ConfirmRemovalModal.module.css';

const ConfirmRemovalModal = ({ id, deleteUser }) => {
  const [modalFlag, setModalFlag] = useState(false);
  const toggle = () => {
    setModalFlag((previous) => !previous);
  };

  const handlerDeleteUser = async (id_) => {
    try {
      await deleteUser(id_);
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button className={styles.delete} onClick={() => toggle()}>
        Usuń
      </Button>

      <Modal isOpen={modalFlag} toggle={toggle}>
        <ModalHeader toggle={toggle}>Czy chcesz usunąć zadanie?</ModalHeader>

        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Anuluj
          </Button>
          <Button type="button" color="primary" onClick={() => handlerDeleteUser(id)}>
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
