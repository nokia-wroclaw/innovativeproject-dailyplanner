import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";

import styles from './Home.module.css';
import UserList from "../UserList/UserList";
import NewUserModal from "../NewUserModal/NewUserModal";
import { API_URL } from "../../constants";

class Home extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.resetState();
  }

  getUsers = () => {
    axios.get(API_URL).then(res => this.setState({ users: res.data }));
  };

  resetState = () => {
    this.getUsers();
  };

  render() {
    return (
      <Container className={styles.Container}>
        <Row>
          <Col>
            <UserList
              users={this.state.users}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewUserModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;