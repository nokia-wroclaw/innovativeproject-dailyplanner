import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const WorkHoursContext = createContext();

export const WorkHoursProvider = ({ children }) => {
  const type = [
    {
      id: 1,
      name: 'Meeting',
      color: {
        hex: '#87d068',
      },
    },
    {
      id: 2,
      name: 'Email',
      color: {
        hex: '#f50',
      },
    },
    {
      id: 3,
      name: 'Housework',
      color: {
        hex: '#2db7f5',
      },
    },
  ];

  const typeStorage = JSON.parse(localStorage.getItem('types'));
  const [types, setTypes] = useState(typeStorage === 0 ? type : typeStorage);
  const [taskName, setTaskName] = useState('');
  const [taskColor, setTaskColor] = useState('');
  const [workHours, setworkHours] = useState(8);
  const [WH, setWH] = useState(0);
  const [WM, setWM] = useState(0);

  return (
    <WorkHoursContext.Provider
      value={{
        types,
        setTypes,
        taskName,
        setTaskName,
        taskColor,
        setTaskColor,
        WH,
        setWH,
        WM,
        setWM,
        workHours,
        setworkHours,
      }}
    >
      {children}
    </WorkHoursContext.Provider>
  );
};

WorkHoursProvider.propTypes = {
  children: PropTypes.any,
};
