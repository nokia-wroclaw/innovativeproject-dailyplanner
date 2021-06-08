import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const WorkHoursContext = createContext();

export const WorkHoursProvider = ({ children }) => {
  const [workHours, setworkHours] = useState(8);
  const [WH, setWH] = useState(0);
  const [WM, setWM] = useState(0);

  return (
    <WorkHoursContext.Provider value={{ WH, setWH, WM, setWM, workHours, setworkHours }}>
      {children}
    </WorkHoursContext.Provider>
  );
};

WorkHoursProvider.propTypes = {
  children: PropTypes.any,
};
