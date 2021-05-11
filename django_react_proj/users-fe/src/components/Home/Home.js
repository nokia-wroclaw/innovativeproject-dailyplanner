import React, { useEffect, useState } from 'react';
import { Button, Modal, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import Calendar from 'react-calendar';
import styles from './Home.module.css';
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
    .filter((user) => user.startTime === `${y}-${m}-${d}`)
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
  const button = <Button onClick={toggle}>Kalendarz</Button>;
  const getUsers = () => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container className={styles.Container}>
      <Row>
        <Col>
          <Button type="button" onClick={() => setCurrentDate(getPreviousDay)}>
            Poprzedni dzień
          </Button>
        </Col>
        <Col>
          <Button type="button" onClick={() => setCurrentDate(new Date())}>
            Aktualny dzień
          </Button>
        </Col>
        <Col>
          <Button type="button" onClick={() => setCurrentDate(getNextDay)}>
            Następny dzień
          </Button>
        </Col>
        <Col>
          {button}
          <Modal isOpen={modalFlag} toggle={toggle}>
            <Calendar onChange={setCurrentDate} currentDate={currentDate} />
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserList users={getUserForView(users, currentDate)} resetState={getUsers} />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewUserModal create resetState={getUsers} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Subtract />
          <TaskLegend />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
