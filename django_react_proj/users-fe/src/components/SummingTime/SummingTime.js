import { Pie } from '@ant-design/charts';
import { Card, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './SummingTime.module.css';

const Subtract = ({ users }) => {
  let timevalue = 0;
  let done = 0;
  let notdone = 0;

  if (users) {
    Array.prototype.forEach.call(users, (user) => {
      const uptimes = new Date(user.endTime).getTime();
      const lowtimes = new Date(user.startTime).getTime();
      const sub = uptimes - lowtimes;
      const minutes = sub / 60000;
      timevalue += minutes;
    });
  }
  if (users) {
    Array.prototype.forEach.call(users, (user) => {
      const itisdone = String(user.done);
      if (itisdone === 'true') {
        done += 1;
      } else {
        notdone += 1;
      }
    });
  }
  const taskhours = Math.floor(timevalue / 60);
  const taskminutes = timevalue % 60;
  const substrpiechart = 480 - timevalue;
  const datatask = [
    {
      type: 'Task Done',
      value: done,
    },
    {
      type: 'Task Not Done',
      value: notdone,
    },
  ];
  const config = {
    appendPadding: 10,
    data: datatask,
    angleField: 'value',
    colorField: 'type',
    radius: 0.6,
    label: {
      type: 'spider',
      content: '{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };
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
      <Col span={12} offset={6} className={styles.SumTim}>
        Total time of tasks on this day: {taskhours} hours {taskminutes} minutes
      </Col>
      <Row>
        <Card title="Pie chart of scheduled time to free time" style={{ width: 500 }}>
          <Pie {...configtasktime} />
        </Card>
        <Card title="Pie chart of task done to task not done" style={{ width: 500 }}>
          <Pie {...config} />
        </Card>
      </Row>
    </>
  );
};
Subtract.propTypes = {
  users: PropTypes.array,
};
export default Subtract;
