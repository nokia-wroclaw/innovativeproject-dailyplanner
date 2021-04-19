import React from 'react';
import moment from 'moment'
import styles from "./RealTime.module.css"

const useCurrentCallback = (callback) => {
    const reference = React.useRef();
    reference.current = callback;
    return (...args) => {
      return reference.current?.(...args);
    };
  };
  
const Time = () => {
    const [time, setTime] = React.useState(0);
    const currentCallback = useCurrentCallback(() => {
    const date = new Date();
    setTime(date.toISOString());
    });
    React.useEffect(() => {
    const handle = setInterval(currentCallback, 100);
    return () => clearInterval(handle);
    }, []);
    return (
    <div className={styles.Time}>{moment(time).format('HH:mm:ss')}</div>
    );
};
  
export default Time;