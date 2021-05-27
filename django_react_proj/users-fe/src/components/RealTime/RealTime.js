import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Time = ({ users, firstNotification, secondNotification }) => {
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
      const msg = user.taskName;
      const firstTime = firstNotification;
      const secondTime = secondNotification;
      const first = Number(firstNotification * 60);
      const second = Number(secondNotification * 60);
      const Subtract = Number(
        Math.floor(new Date(user.startTime).getTime() / 1000 - new Date(time).getTime() / 1000)
      );
      if (Subtract === second) {
        toast.error(
          <div>
            you have incoming {msg} in {secondTime} minute!
          </div>
        );
      } else if (Subtract === first) {
        toast.warn(
          <div>
            you have incoming {msg} in {firstTime} minute!
          </div>
        );
      }
    });
  }
  return format(time, 'HH:mm');
};
Time.propTypes = {
  users: PropTypes.array,
  firstNotification: PropTypes.number,
  secondNotification: PropTypes.number,
};
export default Time;
