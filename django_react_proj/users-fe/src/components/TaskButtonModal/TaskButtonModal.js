import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { CheckSquareOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';
import styles from './TaskButtonModal.module.css';

const TaskButton = ({ setDoneState }) => (
  <>
    <Button
      className={styles.inbtn}
      type="primary"
      size="middle"
      shape="round"
      onClick={() => {
        setDoneState();
        toast.info('You switched state of task!');
      }}
    >
      <CheckSquareOutlined />
      <ToastContainer />
    </Button>
  </>
);
TaskButton.propTypes = {
  setDoneState: PropTypes.func,
};
export default TaskButton;
