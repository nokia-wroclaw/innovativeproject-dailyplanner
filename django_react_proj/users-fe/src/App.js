import React, { useState } from 'react';
import { Card, Menu } from 'antd';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Subtract from './components/SummingTime/SummingTime';

const App = () => {
  const [noTitleKey, setState] = useState('1');
  const handleClick = (event) => {
    setState(event.key);
  };
  const contentList = {
    1: <Home />,
    2: <Subtract />,
    3: <Home />,
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
