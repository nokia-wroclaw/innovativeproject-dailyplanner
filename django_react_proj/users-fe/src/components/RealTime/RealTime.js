import React, { useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import WorkSettings from '../Settings/Settings';

const Time = ({ users }) => {
  const [firstNotifiaction, setFisrtNotification] = useState(15);
  const [secondNotifiaction, setSecondNotification] = useState(5);
  const [time, setTime] = React.useState(0);
  const currentCallback = () => {
    const date = new Date();
    setTime(date);
  };
  React.useEffect(() => {
    const handle = setInterval(currentCallback, 1000);
    return () => {
      clearInterval(handle);
    };
  }, []);
  if (users) {
    users.forEach((user) => {
      const Msg = user.taskName;
      const Subtract = Math.floor(
        new Date(user.startTime).getTime() / 1000 - new Date(time).getTime() / 1000
      );
      if (Subtract === 900) {
        toast.warn(<div>YOU HAVE INCOMING {Msg} IN 15m!</div>);
      } else if (Subtract === 300) {
        toast.error(<div>YOU HAVE INCOMING {Msg} IN 5m!</div>);
      }
    });
    <WorkSettings
      firstNotifiaction={firstNotifiaction}
      setFisrtNotification={setFisrtNotification}
      secondNotifiaction={secondNotifiaction}
      setSecondNotification={setSecondNotification}
    />;
  }
  return format(time, 'HH:mm');
};

Time.propTypes = {
  users: PropTypes.array,
};
export default Time;
