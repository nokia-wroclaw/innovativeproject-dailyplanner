import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { ArrowRightOutlined } from '@ant-design/icons';
import 'antd-button-color/dist/css/style.css';
import { ToastContainer, toast } from 'react-toastify';

const NextDayButton = ({ moveToNextDay }) => (
  <>
    <Button
      type="warning"
      size="middle"
      shape="round"
      icon={<ArrowRightOutlined />}
      onClick={() => {
        moveToNextDay();
        toast.info('You moved task to the next day!');
      }}
    >
      <ToastContainer />
    </Button>
  </>
);
NextDayButton.propTypes = {
  moveToNextDay: PropTypes.func,
};
export default NextDayButton;
