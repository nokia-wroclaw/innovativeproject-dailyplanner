import { Pie } from '@ant-design/charts';
import { Card } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const TaskTypeChart = ({ users }) => {
  let mTask = 0;
  let hTask = 0;
  let eTask = 0;
  if (users) {
    users.forEach((user) => {
      if (String(user.taskType) === 'Housework') {
        hTask += 1;
      } else if (String(user.taskType) === 'Email') {
        eTask += 1;
      } else if (String(user.taskType) === 'Meeting') {
        mTask += 1;
      }
    });
  }
  const dataTypeTask = [
    {
      type: 'Housework',
      value: hTask,
    },
    {
      type: 'Meeting',
      value: mTask,
    },
    {
      type: 'Email',
      value: eTask,
    },
  ];
  const configTypeTask = {
    appendPadding: 10,
    data: dataTypeTask,
    angleField: 'value',
    colorField: 'type',
    color: ['#87d068', '#f50', '#2db7f5'],
    radius: 0.6,
    label: {
      type: 'spider',
      content: '{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };
  return (
    <>
      <Card title="Pie chart of task types" style={{ width: 500 }}>
        <Pie {...configTypeTask} />
      </Card>
    </>
  );
};
TaskTypeChart.propTypes = {
  users: PropTypes.array,
};
export default TaskTypeChart;
