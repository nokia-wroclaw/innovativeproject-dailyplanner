import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Button, Modal, Col, Row, Card, Calendar } from 'antd';
import 'antd/dist/antd.css';
=======
import Calendar from 'react-calendar';
import { Button, Modal, Col, Container, Row } from 'reactstrap';
>>>>>>> origin/Develop
import axios from 'axios';
import { format } from 'date-fns';
import UserList from '../UserList/UserList';
import NewUserModal from '../NewUserModal/NewUserModal';
import { API_URL } from '../../constants';
import TaskLegend from '../TaskLegend/TypesLegend';
import Subtract from '../SummingTime/SummingTime';
import Statistic from '../TaskStatistic/TaskStatistic';

const getUserForView = (users = [], date = new Date()) => {
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  const d = date.getDate().toString().padStart(2, '0');
  return users
    .filter((user) => format(new Date(user.startTime), 'yyyy-MM-dd') === `${y}-${m}-${d}`)
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
  const button = <Button onClick={toggle}>Calendar</Button>;
  const getUsers = () => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Card>
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
          <Modal visible={modalFlag} footer={null} onCancel={toggle}>
            <Calendar fullscreen={false} onChange={(date) => setCurrentDate(date.toDate())} />
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <UserList users={getUserForView(users, currentDate)} resetState={getUsers} />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewUserModal create resetState={getUsers} />
        </Col>
      </Row>
      <TaskLegend />
      <Row>
        <Col>
          <Subtract users={getUserForView(users, currentDate)} resetState={getUsers} />
        </Col>
        <Row>
          <Col>
            <Statistic users={getUserForView(users, currentDate)} resetState={getUsers} />
          </Col>
        </Row>
      </Row>
    </Card>
  );
};
export default Home;
