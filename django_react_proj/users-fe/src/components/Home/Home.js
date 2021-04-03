import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";

import styles from './Home.module.css';
import UserList from "../UserList/UserList";
import NewUserModal from "../NewUserModal/NewUserModal";
import { API_URL } from "../../constants";

const Home = () => {
  const [users, setUsers] = useState();

  const getUsers = () => {
    axios.get(API_URL)
      .then(res => setUsers(res.data));
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <Container className={styles.Container}>
<<<<<<< HEAD
      <Row >
        <Col >
=======
      <Row>
        <Col>
>>>>>>> Develop
          <UserList
            users={users}
            resetState={getUsers}
          />
        </Col>
      </Row>
<<<<<<< HEAD
      <Row >
        <Col >
=======
      <Row>
        <Col>
>>>>>>> Develop
          <NewUserModal 
            create={true} 
            resetState={getUsers} 
          />
        </Col>
      </Row>
<<<<<<< HEAD
    </Container >
=======
    </Container>
>>>>>>> Develop
  );
};

export default Home;