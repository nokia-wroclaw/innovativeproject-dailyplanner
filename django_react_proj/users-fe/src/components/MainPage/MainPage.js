import React, { useState, useEffect, useContext } from 'react';
import { Card, Menu, Button } from 'antd';
import { format } from 'date-fns';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '../../constants';
import Header from '../Header/Header';
import Home from '../Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import WorkSettings from '../Settings/Settings';
import auth from '../AuthCheck/Auth';
import { EmailContext } from '../EmailContext/EmailContext';
import Charts from '../Charts/Charts';
import 'antd/dist/antd.css';

const MainPage = ({ history }) => {
  const [noTitleKey, setnoTitleKey] = useState('1');
  const { email } = useContext(EmailContext);
  const handleClick = (event) => {
    setnoTitleKey(event.key);
  };
  const getUserForView = (users = [], date = new Date()) => {
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    const d = date.getDate().toString().padStart(2, '0');
    return users
      .filter((user) => user.email === email)
      .filter((user) => format(new Date(user.startTime), 'yyyy-MM-dd') === `${y}-${m}-${d}`)
      .sort((userA, userB) => userA.startTime.localeCompare(userB.startTime));
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workHours, setworkHours] = useState(8);
  const [firstNotification, setFirstNotification] = useState(15);
  const [secondNotification, setSecondNotification] = useState(5);
  const [users, setUsers] = useState();
  const [WH, setWH] = useState(0);
  const [WM, setWM] = useState(0);
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
    2: (
      <Charts
        setWH={setWH}
        setWM={setWM}
        users={getUserForView(users, currentDate)}
        WH={WH}
        WM={WM}
        workHours={workHours}
      />
    ),
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
      <Button
        onClick={() => {
          auth.logout(() => {
            history.push('/');
          });
        }}
      >
        Logout
      </Button>
    </>
  );
};

MainPage.propTypes = {
  history: PropTypes.object,
};

export default MainPage;
