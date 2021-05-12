import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { CheckSquareOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskButton = ({ onToggleTaskFlag, setDoneState }) => {
  const toastifyButton = () => toast.info('YOU SWITCHED STATE OF TASK!');

  return (
    <>
      <Button
        type="primary"
        size="middle"
        icon={<CheckSquareOutlined />}
        onClick={() => {
          onToggleTaskFlag();
          setDoneState();
          toastifyButton();
        }}
      >
        <ToastContainer />
      </Button>
    </>
  );
};
TaskButton.propTypes = {
  onToggleTaskFlag: PropTypes.func,
  setDoneState: PropTypes.func,
};
export default TaskButton;
