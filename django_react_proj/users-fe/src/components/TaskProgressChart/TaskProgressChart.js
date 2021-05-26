import { Pie } from '@ant-design/charts';
import { Card } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const TaskProgressChart = ({ users }) => {
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
    color: ['#34a017', '#ff0000'],
    radius: 0.6,
    label: {
      type: 'spider',
      content: '{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };
  return (
    <Card title="Pie chart of task done to task not done" style={{ width: 500 }}>
      <Pie {...config} />
    </Card>
  );
};
TaskProgressChart.propTypes = {
  users: PropTypes.array,
};
export default TaskProgressChart;
