import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined } from '@ant-design/icons';
import NewUserForm from '../NewUserForm/NewUserForm';
import styles from './NewUserModal.module.css';

const NewUserModal = ({ resetState, user, create }) => {
  const [modal, setModal] = useState();
  const toggle = () => {
    setModal((previous) => !previous);
  };
  let title = 'Edit task';
  let button = (
    <Button
      type="primary"
      shape="round"
      icon={<EditOutlined />}
      style={{ background: 'green', borderColor: 'green' }}
      onClick={toggle}
    />
  );

  if (create) {
    title = 'Create new task';

    button = (
      <button className={styles.button} type="button" onClick={toggle}>
        Create new task
      </button>
    );
  }

  return (
    <>
      {button}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title} </ModalHeader>

        <ModalBody>
          <NewUserForm resetState={resetState} toggle={toggle} user={user} />
        </ModalBody>
      </Modal>
    </>
  );
};
NewUserModal.propTypes = {
  user: PropTypes.object,
  resetState: PropTypes.func,
  create: PropTypes.bool,
};
export default NewUserModal;
