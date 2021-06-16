import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { ArrowRightOutlined } from '@ant-design/icons';
import 'antd-button-color/dist/css/style.css';
import { ToastContainer } from 'react-toastify';
import commonStyles from '../CommonCSS/CommonCSS.module.css';

const NextDayButton = ({ moveToNextDay }) => (
  <Button
    className={commonStyles.inbtn}
    type="warning"
    size="middle"
    shape="round"
    icon={<ArrowRightOutlined />}
    onClick={() => {
      moveToNextDay();
    }}
  >
    <ToastContainer />
  </Button>
);
NextDayButton.propTypes = {
  moveToNextDay: PropTypes.func,
};
export default NextDayButton;
