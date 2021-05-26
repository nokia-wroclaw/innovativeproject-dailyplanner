import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import 'antd-button-color/dist/css/style.css';

const PreviousDayButton = ({ moveToPreviousDay }) => (
  <Button
    type="warning"
    size="middle"
    shape="round"
    icon={<ArrowLeftOutlined />}
    onClick={() => {
      moveToPreviousDay();
    }}
  />
);
PreviousDayButton.propTypes = {
  moveToPreviousDay: PropTypes.func,
};
export default PreviousDayButton;
