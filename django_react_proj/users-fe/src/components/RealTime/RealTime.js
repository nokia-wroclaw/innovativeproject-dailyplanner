import React from 'react';
import styles from "./RealTime.module.css"
import { format } from 'date-fns'
  
const Time = () => {
    const [time, setTime] = React.useState(0);
    const currentCallback = () => {
    const date = new Date();
    const dateformat = format(date, "HH:mm:ss");
    setTime(dateformat);
    };
    React.useEffect(() => {
    const handle = setInterval(currentCallback, 1000);
    return () => clearInterval(handle);
    }, []);
    return (
    <div className={styles.Time}>{time}</div>
    );
};
  
export default Time;