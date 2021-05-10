import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';
import TaskType from './TaskType/TaskType';
import styles from './TypesLegend.module.css';
import 'antd/dist/antd.css';

const TaskLegend = () => {
  const types = [
    {
      type: 'Done',
      style: styles.Done,
    },
    {
      type: 'Meeting',
      style: styles.Meeting,
    },
    {
      type: 'Email',
      style: styles.Email,
    },
    {
      type: 'Housework',
      style: styles.Housework,
    },
  ];
  return (
    <>
      <Card title="Legend" style={{ width: 300, backgroundColor: '#bfbfbf' }}>
        {types.map((type) => (
          <TaskType
            key={type.type}
            type={type.type}
            className={classNames(styles.TaskTypeCircle, type.style)}
          />
        ))}
      </Card>
    </>
  );
};

export default TaskLegend;
