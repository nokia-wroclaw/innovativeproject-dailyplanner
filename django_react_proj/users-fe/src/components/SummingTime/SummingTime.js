import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import styles from './SummingTime.module.css';

const Subtract = () => {
  const [users, setUsers] = useState();
  let timevalue = 0;
  const getUsers = () => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  };

  useEffect(() => {
    const handle = setInterval(getUsers, 1000);
    return () => clearInterval(handle);
  }, []);

  if (users) {
    users.forEach((user) => {
      const uptime = user.deadlinev2;
      const uptimesplit = uptime.split(':');
      const hour = uptimesplit[0] * 60;
      const minute = uptimesplit[1] * 1 + hour;
      const lowtime = user.deadline;
      const uptimesplit2 = lowtime.split(':');
      const hour2 = uptimesplit2[0] * 60;
      const minute2 = uptimesplit2[1] * 1 + hour2;
      const subm = minute - minute2;
      timevalue += subm;
    });
  }
  const taskhours = Math.floor(timevalue / 60);
  const taskminutes = timevalue % 60;
  return (
    <div className={styles.SumTim}>
      Total time of tasks on this day: {taskhours} hours {taskminutes} minutes
    </div>
  );
};

export default Subtract;
