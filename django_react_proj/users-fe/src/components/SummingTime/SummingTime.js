import React from 'react';
import PropTypes from 'prop-types';

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
