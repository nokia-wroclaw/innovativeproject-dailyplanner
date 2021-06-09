import { useContext, useState } from 'react';
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
  const [oldTab, setOldTab] = useState('');
  const [colorTab, setColorTab] = useState('');
  const dataTypeToRender = () => {
    for (let i = 1; i <= dlugosc + 1; i++) {
      types.forEach((type) => {
        if (i === type.id - 1) {
          const newTab = [
            {
              type: type.name,
              value: tablica[i],
            },
          ];
          setOldTab(oldTab.concat(newTab));
        }
      });
    }
  };
  const colours = () => {
    for (let i = 1; i <= dlugosc + 1; i++) {
      types.forEach((type) => {
        if (i === type.id - 1) {
          const newTab = [
            {
              color: type.color,
            },
          ];
          setColorTab(colorTab.concat(newTab));
        }
      });
    }
  };
  if (users) {
    users.forEach((user) => {
      if (email === user.email) {
        types.forEach((type) => {
          if (user.taskType === type.name) {
            tablica[type.id - 1] += 1;
          }
        });
      }
    });
  }
  dataTypeToRender();
  colours();
  console.log(oldTab, 'after');
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
