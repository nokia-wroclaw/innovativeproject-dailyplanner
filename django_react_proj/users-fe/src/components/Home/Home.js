import React, { useState } from 'react';
import { Button, Modal, Col, Row, Card, Calendar } from 'antd';
import 'antd/dist/antd.css';
import { LeftOutlined, RightOutlined, CalendarOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import UserList from '../UserList/UserList';
import NewUserModal from '../NewUserModal/NewUserModal';
import TaskLegend from '../TaskLegend/TypesLegend';
import styles from './Home.module.css';

const getPreviousDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
const getNextDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

const Home = ({ getUserForView, setCurrentDate, currentDate, users, getUsers }) => {
  const [modalFlag, setModalFlag] = useState(false);
  const toggle = () => {
    setModalFlag((previous) => !previous);
  };
  const button = (
    <Button className={styles.inbtn} onClick={toggle} shape="round" size="large">
      <CalendarOutlined />
    </Button>
  );
  return (
    <Card>
      <Row>
        <Col span={4} offset={5} align="top">
          <Button
            className={styles.inbtn}
            type="button"
            shape="round"
            size="large"
            onClick={() => setCurrentDate(getPreviousDay)}
          >
            <LeftOutlined />
          </Button>
        </Col>
        <Col span={4}>
          <Button
            className={styles.inbtn}
            type="button"
            shape="round"
            size="large"
            onClick={() => setCurrentDate(new Date())}
          >
            {new Date().toDateString().substring(3, 10)}
          </Button>
        </Col>
        <Col span={4}>
          <Button
            className={styles.inbtn}
            type="button"
            shape="round"
            size="large"
            onClick={() => setCurrentDate(getNextDay)}
          >
            <RightOutlined />
          </Button>
        </Col>
        <Col span={4}>
          {button}
          <Modal visible={modalFlag} footer={null} onCancel={toggle}>
            <Calendar fullscreen={false} onChange={(date) => setCurrentDate(date.toDate())} />
          </Modal>
        </Col>
        <Col>{currentDate.toDateString().substring(3)}</Col>
      </Row>
      <br />
      <Row>
        <Col span={16} offset={4}>
          <UserList users={getUserForView(users, currentDate)} resetState={getUsers} />
        </Col>
      </Row>
      <Row>
        <Col offset={17}>
          <NewUserModal create resetState={getUsers} />
        </Col>
      </Row>
      <Col offset={4}>
        <TaskLegend />
      </Col>
    </Card>
  );
};
Home.propTypes = {
  getUserForView: PropTypes.func,
  setCurrentDate: PropTypes.func,
  currentDate: PropTypes.any,
  users: PropTypes.array,
  getUsers: PropTypes.func,
};
export default Home;
