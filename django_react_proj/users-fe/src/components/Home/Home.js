import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import styles from './Home.module.css';
import UserList from '../UserList/UserList';
import NewUserModal from '../NewUserModal/NewUserModal';
import { API_URL } from '../../constants';
import Time from '../RealTime/RealTime';

const getUserForView = (users = [], date = new Date()) => {
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  const d = date.getDate().toString().padStart(2, '0');
  return users
    .filter((user) => user.registrationDate === `${y}-${m}-${d}`)
    .sort((userA, userB) => userA.deadline.localeCompare(userB.deadline));
};

const getUsers = (setUsers) => {
  axios.get(API_URL).then((res) => setUsers(res.data));
};

const getPreviousDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

const getNextDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

const Home = () => {
  const [users, setUsers] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <Container className={styles.Container}>
      <Row>
        <Col>
          <button type="button" onClick={() => setCurrentDate(getPreviousDay)}>
            Poprzedni dzień
          </button>
        </Col>
        <Col>
          <button type="button" onClick={() => setCurrentDate(getNextDay)}>
            Następny dzień
          </button>
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
        <Time />
      </Row>
    </Container>
  );
};

export default Home;
