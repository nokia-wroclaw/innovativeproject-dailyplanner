import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { CheckSquareOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';

const TaskButton = ({ setDoneState }) => (
  <>
    <Button
      type="primary"
      size="middle"
      shape="round"
      icon={<CheckSquareOutlined />}
      onClick={() => {
        setDoneState();
        toast.info('You switched state of task!');
      }}
    >
      <ToastContainer />
    </Button>
  </>
);
TaskButton.propTypes = {
  setDoneState: PropTypes.func,
};
export default TaskButton;
