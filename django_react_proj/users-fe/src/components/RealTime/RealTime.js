import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Time = ({ users, firstNotifiaction, secondNotifiaction }) => {
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
      const firstTime = firstNotifiaction;
      const secondTime = secondNotifiaction;
      const first = Number(firstNotifiaction * 60);
      const second = Number(secondNotifiaction * 60);
      const Subtract = Number(
        Math.floor(new Date(user.startTime).getTime() / 1000 - new Date(time).getTime() / 1000)
      );
      if (Subtract === second) {
        toast.error(
          <div>
            you have incoming {Msg} in {secondTime} minute!
          </div>
        );
      } else if (Subtract === first) {
        toast.warn(
          <div>
            you have incoming {Msg} in {firstTime} minute!
          </div>
        );
      }
    });
  }
  return format(time, 'HH:mm');
};
Time.propTypes = {
  users: PropTypes.array,
  firstNotifiaction: PropTypes.number,
  secondNotifiaction: PropTypes.number,
};
export default Time;
