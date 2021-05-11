import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { CheckSquareOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const TaskButton = ({ onToggleTaskFlag, setDoneState }) => (
  <>
    <Button
      type="primary"
      size="middle"
      shape="round"
      icon={<CheckSquareOutlined />}
      onClick={() => {
        onToggleTaskFlag();
        setDoneState();
      }}
    />
  </>
);
TaskButton.propTypes = {
  onToggleTaskFlag: PropTypes.func,
  setDoneState: PropTypes.func,
};
export default TaskButton;
