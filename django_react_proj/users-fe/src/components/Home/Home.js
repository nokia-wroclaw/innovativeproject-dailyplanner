import React, { useEffect, useState } from 'react';
import { Button, Modal, Col, Row, Card } from 'antd';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import axios from 'axios';
import Calendar from 'react-calendar';
import UserList from '../UserList/UserList';
import NewUserModal from '../NewUserModal/NewUserModal';
import { API_URL } from '../../constants';
import TaskLegend from '../TaskLegend/TypesLegend';
import 'react-calendar/dist/Calendar.css';
import Subtract from '../SummingTime/SummingTime';

const getUserForView = (users = [], date = new Date()) => {
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  const d = date.getDate().toString().padStart(2, '0');
  return users
    .filter((user) => user.registrationDate === `${y}-${m}-${d}`)
    .sort((userA, userB) => userA.startTime.localeCompare(userB.startTime));
};
const getPreviousDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
const getNextDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

const Home = () => {
  const [users, setUsers] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalFlag, setModalFlag] = useState(false);
  const toggle = () => {
    setModalFlag((previous) => !previous);
  };

  const handleCancel = () => {
    setModalFlag(false);
  };
  const button = <Button onClick={toggle}>Calendar</Button>;
  const getUsers = () => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Card>
      <Col span={8} offset={15}>
        <Subtract />
      </Col>
      <Row>
        <Col span={5}>
          <Button type="button" onClick={() => setCurrentDate(getPreviousDay)}>
            Previous day
          </Button>
        </Col>
        <Col span={5}>
          <Button type="button" onClick={() => setCurrentDate(new Date())}>
            Current day
          </Button>
        </Col>
        <Col span={5}>
          <Button type="button" onClick={() => setCurrentDate(getNextDay)}>
            Next day
          </Button>
        </Col>
        <Col span={5}>
          {button}
          <Modal visible={modalFlag} onCancel={handleCancel} footer={null} toggle={toggle}>
            <Calendar onChange={setCurrentDate} currentDate={currentDate} />
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <UserList users={getUserForView(users, currentDate)} resetState={getUsers} />
        </Col>
      </Row>
      <Row>
        <Col offset={18}>
          <NewUserModal create resetState={getUsers} />
        </Col>
      </Row>
      <TaskLegend />
    </Card>
  );
};

export default Home;
