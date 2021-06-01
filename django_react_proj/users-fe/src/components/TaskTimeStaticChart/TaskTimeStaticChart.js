import { Pie } from '@ant-design/charts';
import { Card } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const TaskTimeStaticChart = ({ WH, WM, workHours }) => {
  const timevalue = WH * 60 + WM;
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
    color: ['#34a017', '#b0bec5'],
    radius: 0.6,
    label: {
      type: 'spider',
      content: '{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };
  return (
    <>
      <Card title="Pie chart of scheduled time to free time" style={{ width: 500 }}>
        <Pie {...configtasktime} />
      </Card>
    </>
  );
};

TaskTimeStaticChart.propTypes = {
  WH: PropTypes.number,
  WM: PropTypes.number,
  workHours: PropTypes.number,
};
export default TaskTimeStaticChart;
