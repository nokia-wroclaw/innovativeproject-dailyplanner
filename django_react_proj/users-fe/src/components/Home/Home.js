import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import styles from './Home.module.css';
import UserList from '../UserList/UserList';
import NewUserModal from '../NewUserModal/NewUserModal';
import { API_URL } from '../../constants';
import Time from '../RealTime/RealTime';
import Subtract from '../SummingTime/SummingTime';

const Home = () => {
  const [users, setUsers] = useState();

  const getUsers = () => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container className={styles.Container}>
      <Col md={{ span: 8, offset: 8 }}>
        <Subtract />
      </Col>
      <Row>
        <Col>
          <UserList users={users} resetState={getUsers} />
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
