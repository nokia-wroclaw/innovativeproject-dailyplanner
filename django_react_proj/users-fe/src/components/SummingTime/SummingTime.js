import { Card } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SummingTime.module.css';

const Subtract = ({ users, setWH, setWM }) => {
  let timevalue = 0;
  if (users) {
    users.forEach((user) => {
      const uptimes = new Date(user.endTime).getTime();
      const lowtimes = new Date(user.startTime).getTime();
      const sub = uptimes - lowtimes;
      const minutes = Math.floor(sub / 60000);
      timevalue += minutes;
    });
  }
  const taskhours = Math.floor(timevalue / 60);
  const taskminutes = timevalue % 60;
  setWH(taskhours);
  setWM(taskminutes);

  return (
    <>
      <Card className={styles.SumTim} span={6} offset={10}>
        Time of tasks on this day: {taskhours} hours {taskminutes} minutes
      </Card>
    </>
  );
};
Subtract.propTypes = {
  users: PropTypes.array,
  setWH: PropTypes.func,
  setWM: PropTypes.func,
};
export default Subtract;
