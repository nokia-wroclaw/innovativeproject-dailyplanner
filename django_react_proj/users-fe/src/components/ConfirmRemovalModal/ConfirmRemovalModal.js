import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';

const ConfirmRemovalModal = ({ id, deleteUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleT = () => {
    setIsModalVisible((previous) => !previous);
    toast.error('You deleted task!');
  };
  const handlerDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      toggleT();
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button type="danger" icon={<DeleteFilled />} onClick={showModal} />
      <Modal
        title="Do you want to delete task?"
        visible={isModalVisible}
        onOk={() => handlerDeleteUser(id)}
        onCancel={handleCancel}
        cancelText="No"
        okText="Yes"
        okType="danger"
      />
    </>
  );
};
ConfirmRemovalModal.propTypes = {
  id: PropTypes.number,
  deleteUser: PropTypes.func,
};
export default ConfirmRemovalModal;
