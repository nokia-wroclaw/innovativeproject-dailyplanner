import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';
import commonStyles from '../CommonCSS/CommonCSS.module.css';

const ConfirmRemovalModal = ({ id, deleteUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDelete = () => {
    setIsModalVisible((previous) => !previous);
    toast.error('You deleted task!');
  };
  const toggleDeleteCancel = () => {
    setIsModalVisible((previous) => !previous);
  };

  const handlerDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      toggleDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCancel = async () => {
    try {
      await setIsModalVisible(false);
      toggleDeleteCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Button className={commonStyles.inbtn} type="danger" shape="round" onClick={showModal}>
        <DeleteFilled />
        <Modal
          title="Do you want to delete task?"
          visible={isModalVisible}
          onOk={() => handlerDeleteUser(id)}
          onCancel={handleDeleteCancel}
          cancelText="No"
          okText="Yes"
          okType="danger"
        />
      </Button>
    </>
  );
};
ConfirmRemovalModal.propTypes = {
  id: PropTypes.number,
  deleteUser: PropTypes.func,
};
export default ConfirmRemovalModal;
