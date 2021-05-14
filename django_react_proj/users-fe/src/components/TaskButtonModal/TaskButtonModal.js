import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { CheckSquareOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';

const TaskButton = ({ onToggleTaskFlag, setDoneState }) => (
  <>
    <Button
      type="primary"
      size="middle"
      icon={<CheckSquareOutlined />}
      onClick={() => {
        onToggleTaskFlag();
        setDoneState();
        toast.info('YOU SWITCHED STATE OF TASK!');
      }}
    >
      <ToastContainer />
    </Button>
  </>
);
TaskButton.propTypes = {
  onToggleTaskFlag: PropTypes.func,
  setDoneState: PropTypes.func,
};
export default TaskButton;
