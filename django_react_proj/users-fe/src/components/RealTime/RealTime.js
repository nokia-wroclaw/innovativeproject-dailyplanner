import React from 'react';
import { format } from 'date-fns';

const Time = () => {
  const [time, setTime] = React.useState(0);
  const currentCallback = () => {
    const date = new Date();
    const dateformat = format(date, 'dd.MM.yyyy HH:mm:ss');
    setTime(dateformat);
  };
  React.useEffect(() => {
    const handle = setInterval(currentCallback, 1000);
    return () => clearInterval(handle);
  }, []);
  return time;
};

export default Time;
