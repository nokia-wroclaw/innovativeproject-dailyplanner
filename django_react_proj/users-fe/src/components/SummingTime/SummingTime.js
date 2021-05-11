import { Pie } from '@ant-design/charts';
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
      const uptimes = new Date(user.endTime).getTime();
      const lowtimes = new Date(user.startTime).getTime();
      const sub = uptimes - lowtimes;
      const minutes = sub / 60000;
      timevalue += minutes;
    });
  }
  const taskhours = Math.floor(timevalue / 60);
  const taskminutes = timevalue % 60;
  const substrpiechart = 480 - timevalue;
  const datatask = [
    {
      type: 'Task Done',
      value: 3,
    },
    {
      type: 'Task Not Done',
      value: 4,
    },
  ];
  const config = {
    appendPadding: 10,
    data: datatask,
    angleField: 'value',
    fontSize: 10,
    colorField: 'type',
    radius: 1,
    label: {
      type: 'inner',
      offset: '-40%',
      content: '{percentage}',
      style: {
        fontSize: 15,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
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
    radius: 1,
    label: {
      type: 'inner',
      offset: '-40%',
      content: '{percentage}',
      style: {
        fontSize: 15,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  return (
    <div>
      <div className={styles.SumTim}>
        Total time of tasks on this day.: {taskhours} hours {taskminutes} minutes
      </div>
      <Pie {...configtasktime} />
      <Pie {...config} />
    </div>
  );
};
export default Subtract;
