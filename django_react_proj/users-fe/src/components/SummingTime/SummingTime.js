import { Pie } from '@ant-design/charts';
import { Card, Col, Row } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SummingTime.module.css';

const Subtract = ({ users, workHours }) => {
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
  const substrpiechart = workHours * 60 - timevalue;
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
  let done = 0;
  let notDone = 0;

  if (users) {
    users.forEach((user) => {
      if (user.done === true) {
        done += 1;
      } else {
        notDone += 1;
      }
    });
  }
  const datatask = [
    {
      type: 'Task Done',
      value: done,
    },
    {
      type: 'Task Not Done',
      value: notDone,
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
  return (
    <>
      <Row>
        <Col className={styles.SumTim} span={6} offset={10}>
          Total time of tasks on this day: {taskhours} hours {taskminutes} minutes
        </Col>
      </Row>
      <Row>
        <Col span={4} offset={4}>
          <Card title="Pie chart of scheduled time to free time" style={{ width: 500 }}>
            <Pie {...configtasktime} />
          </Card>
        </Col>
        <Col span={4} offset={5}>
          <Card title="Pie chart of task done to task not done" style={{ width: 500 }}>
            <Pie {...config} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
Subtract.propTypes = {
  users: PropTypes.array,
  workHours: PropTypes.number,
};
export default Subtract;
