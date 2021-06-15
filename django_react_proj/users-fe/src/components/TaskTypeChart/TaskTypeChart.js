import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pie } from '@ant-design/charts';
import { Card } from 'antd';
import { WorkHoursContext } from '../WorkHoursContext/WorkHoursContext';
import { EmailContext } from '../EmailContext/EmailContext';

const TaskTypeChart = ({ users }) => {
  const { types } = useContext(WorkHoursContext);
  const { email } = useContext(EmailContext);
  const dlugosc = types.length;
  const tablica = new Array(dlugosc).fill(0);
  const oldTab = new Array(dlugosc).fill(0);
  const colorTab = new Array(dlugosc).fill(0);

  for (let i = 0; i <= dlugosc; i++) {
    types.forEach((type, index) => {
      if (i === index) {
        colorTab[i] = type.color.hex;
      }
    });
  }

  if (users) {
    users.forEach((user) => {
      if (email === user.email) {
        types.forEach((type, index) => {
          if (user.taskType === type.name) {
            tablica[index] += 1;
          }
        });
      }
    });
  }

  for (let i = 0; i < dlugosc; i++) {
    types.forEach((type, index) => {
      if (i === index) {
        oldTab[i] = {
          type: type.name,
          value: tablica[i],
        };
        console.log(oldTab);
      }
    });
  }
  const configTypeTask = {
    appendPadding: 10,
    data: oldTab,
    angleField: 'value',
    colorField: 'type',
    color: colorTab,
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
