import React, { useState, useEffect } from 'react';
import { Card, Menu } from 'antd';
import { format } from 'date-fns';
import axios from 'axios';
import { API_URL } from './constants';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import WorkSettings from './components/Settings/Settings';
import Subtract from './components/SummingTime/SummingTime';
import 'antd/dist/antd.css';

const App = () => {
  const [noTitleKey, setnoTitleKey] = useState('1');
  const handleClick = (event) => {
    setnoTitleKey(event.key);
  };
  const getUserForView = (users = [], date = new Date()) => {
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    const d = date.getDate().toString().padStart(2, '0');
    return users
      .filter((user) => format(new Date(user.startTime), 'yyyy-MM-dd') === `${y}-${m}-${d}`)
      .sort((userA, userB) => userA.startTime.localeCompare(userB.startTime));
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workHours, setworkHours] = useState(8);
  const [firstNotification, setFirstNotification] = useState(15);
  const [secondNotification, setSecondNotification] = useState(5);
  const [users, setUsers] = useState();
  const getUsers = () => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  };
  useEffect(() => {
    getUsers();
  }, []);
  const contentList = {
    1: (
      <Home
        getUserForView={getUserForView}
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
        getUsers={getUsers}
        users={users}
      />
    ),
    2: <Subtract users={getUserForView(users, currentDate)} workHours={workHours} />,
    3: (
      <WorkSettings
        firstNotification={firstNotification}
        setFirstNotification={setFirstNotification}
        secondNotification={secondNotification}
        setSecondNotification={setSecondNotification}
        setworkHours={setworkHours}
        workHours={workHours}
      />
    ),
  };
  return (
    <>
      <div />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        onClick={handleClick}
        selectedKeys={noTitleKey}
      >
        <Menu.Item key="1">DailyPlanner</Menu.Item>
        <Menu.Item key="2">Chart</Menu.Item>
        <Menu.Item key="3">Settings</Menu.Item>
      </Menu>
      <Header
        firstNotification={firstNotification}
        secondNotification={secondNotification}
        users={getUserForView(users, currentDate)}
      />
      <Card>{contentList[noTitleKey]}</Card>
    </>
  );
};

export default App;
