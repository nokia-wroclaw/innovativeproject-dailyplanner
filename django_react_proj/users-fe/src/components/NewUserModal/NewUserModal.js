import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import NewUserForm from '../NewUserForm/NewUserForm';
import styles from './NewUserModal.module.css';

const NewUserModal = ({ resetState, user, create }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggle = () => {
    setIsModalVisible((previous) => !previous);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  let title = 'Edit task';
  let button = (
    <Button type="success" onClick={showModal}>
      Edit
    </Button>
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
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Save"
        okType="primary"
        toggle={toggle}
      >
        <NewUserForm resetState={resetState} toggle={toggle} user={user} />
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
