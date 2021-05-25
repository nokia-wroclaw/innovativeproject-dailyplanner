import React, { useState } from 'react';
import { Button, Modal, Col, Row, Card, Calendar } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import UserList from '../UserList/UserList';
import NewUserModal from '../NewUserModal/NewUserModal';

const getPreviousDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
const getNextDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

const Home = ({ getUserForView, setCurrentDate, currentDate, users, getUsers }) => {
  const [modalFlag, setModalFlag] = useState(false);
  const toggle = () => {
    setModalFlag((previous) => !previous);
  };
  const button = <Button onClick={toggle}>Calendar</Button>;
  return (
    <Card>
      <Row>
        <Col span={4} offset={5}>
          <Button type="button" onClick={() => setCurrentDate(getPreviousDay)}>
            Previous day
          </Button>
        </Col>
        <Col span={4}>
          <Button type="button" onClick={() => setCurrentDate(new Date())}>
            Current day
          </Button>
        </Col>
        <Col span={4}>
          <Button type="button" onClick={() => setCurrentDate(getNextDay)}>
            Next day
          </Button>
        </Col>
        <Col span={4}>
          {button}
          <Modal visible={modalFlag} footer={null} onCancel={toggle}>
            <Calendar fullscreen={false} onChange={(date) => setCurrentDate(date.toDate())} />
          </Modal>
        </Col>
      </Row>
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
