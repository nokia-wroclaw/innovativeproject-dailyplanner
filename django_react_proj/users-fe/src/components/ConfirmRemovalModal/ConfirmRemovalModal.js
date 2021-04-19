import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalFooter } from 'reactstrap';

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
      Usuń
      <ModalFooter>
        <Button type="button" onClick={() => toggle()}>
          Anuluj
        </Button>
        <Button type="button" color="primary" onClick={() => handlerDeleteUser(props.id)}>
          Tak
        </Button>
      </ModalFooter>
    </>
  );
};
ConfirmRemovalModal.propTypes = {
  id: PropTypes.number,
  deleteUser: PropTypes.func,
};
export default ConfirmRemovalModal;
