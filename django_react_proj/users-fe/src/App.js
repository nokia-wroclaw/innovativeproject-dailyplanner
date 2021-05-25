import React, { useState, useEffect } from 'react';
import { Card, Menu, Col, Row } from 'antd';
import { format } from 'date-fns';
import axios from 'axios';
import { API_URL } from './constants';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import Subtract from './components/SummingTime/SummingTime';
import WorkSettings from './components/Settings/Settings';
import TaskTypeChart from './components/TaskTypeChart/TaskTypeChart';
import TaskTimeStaticChart from './components/TaskTimeStaticChart/TaskTimeStaticChart';
import TaskProgressChart from './components/TaskProgressChart/TaskProgressChart';

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
      <>
        <Col span={6} offset={9}>
          <Subtract
            setWH={setWH}
            setWM={setWM}
            users={getUserForView(users, currentDate)}
            workHours={workHours}
          />
        </Col>
        <Row>
          <Col span={4} offset={4}>
            <TaskTypeChart users={getUserForView(users, currentDate)} />
          </Col>
          <Col span={4} offset={5}>
            <TaskTimeStaticChart WH={WH} WM={WM} workHours={workHours} />
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={4}>
            <TaskProgressChart users={getUserForView(users, currentDate)} />
          </Col>
        </Row>
      </>
    ),
    3: <WorkSettings setworkHours={setworkHours} workHours={workHours} />,
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
      <Header />
      <Card>{contentList[noTitleKey]}</Card>
    </>
  );
};

export default App;
