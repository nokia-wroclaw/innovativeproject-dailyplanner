import React from 'react';
import PropTypes from 'prop-types';
import { getHours, getMinutes } from 'date-fns';

const Subtract = ({ users, setWH, setWM }) => {
  let timevalue = 0;
  if (users) {
    users.forEach((user) => {
      const uptimes = getHours(new Date(user.endTime));
      const lowtimes = getHours(new Date(user.startTime));
      const uptimesm = getMinutes(new Date(user.endTime));
      const lowtimesm = getMinutes(new Date(user.startTime));
      const sub = uptimes * 60 - lowtimes * 60 + uptimesm - lowtimesm;
      timevalue += sub;
    });
  }
  console.log(timevalue, 'co');
  const taskhours = Math.floor(timevalue / 60);
  const taskminutes = timevalue % 60;
  setWH(taskhours);
  setWM(taskminutes, 'taskmin');

  return (
    <>
      Time of tasks on this day: {taskhours} hours {taskminutes} minutes
    </>
  );
};
Subtract.propTypes = {
  users: PropTypes.array,
  setWH: PropTypes.func,
  setWM: PropTypes.func,
};
export default Subtract;
