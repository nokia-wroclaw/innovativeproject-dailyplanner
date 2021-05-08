import React from 'react';
import classNames from 'classnames';
import TaskType from './TaskType/TaskType';
import styles from './TypesLegend.module.css';

const TaskLegend = () => {
  const types = [
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
    <div className={styles.TypesLegend}>
      <div>Legenda: </div>
      {types.map((type) => (
        <TaskType
          key={type.type}
          type={type.type}
          className={classNames(styles.TaskTypeCircle, type.style)}
        />
      ))}
    </div>
  );
};

export default TaskLegend;
