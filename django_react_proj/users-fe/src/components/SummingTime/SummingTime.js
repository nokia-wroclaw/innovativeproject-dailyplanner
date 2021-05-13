import { Pie } from '@ant-design/charts';
import { Card, Col } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SummingTime.module.css';

const Subtract = ({ users }) => {
  let timevalue = 0;
  if (users) {
    users.forEach((user) => {
      const uptimes = new Date(user.endTime).getTime();
      const lowtimes = new Date(user.startTime).getTime();
      const sub = uptimes - lowtimes;
      const minutes = sub / 60000;
      timevalue += minutes;
    });
  }
  const taskhours = Math.floor(timevalue / 60);
  const taskminutes = timevalue % 60;
  const substrpiechart = 480 - timevalue;
  const datatasktime = [
    {
      type: 'Planned Time',
      value: timevalue,
    },
    {
      type: 'Free Time',
      value: substrpiechart,
    },
  ];
  const configtasktime = {
    appendPadding: 10,
    data: datatasktime,
    angleField: 'value',
    colorField: 'type',
    radius: 0.6,
    label: {
      type: 'spider',
      content: '{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };
  return (
    <>
      <Card span={12} offset={6} className={styles.SumTim}>
        Total time of tasks on this day: {taskhours} hours {taskminutes} minutes
      </Card>
      <Card title="Pie chart of scheduled time to free time" style={{ width: 500 }}>
        <Pie {...configtasktime} />
      </Card>
    </>
  );
};
Subtract.propTypes = {
  users: PropTypes.array,
};
export default Subtract;
