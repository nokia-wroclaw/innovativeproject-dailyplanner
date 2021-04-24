import React from 'react';
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
        <TaskType type={type.type} circle={type.style} />
      ))}
    </div>
  );
};

export default TaskLegend;
