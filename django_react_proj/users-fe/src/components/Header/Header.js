import React from 'react';
import { Col, FormGroup, Row } from 'reactstrap';
import styles from './Header.module.css';
import Time from '../RealTime/RealTime';

const Header = () => (
  <FormGroup>
    <FormGroup>
      <Row>
        <Col className={styles.TimeClock} xs={(8, { order: 'first' })} md={5}>
          .
        </Col>
        <Col xs={(8, { order: 'first' })} md={4}>
          <img
            className={styles.Image}
            alt="Team chaos"
            src="https://media.discordapp.net/attachments/821426521859162192/821456504875646976/teams-chaos.png?width=800&height=450"
          />
        </Col>
        <Col className={styles.TimeClock} xs={(8, { order: 'secound' })} md={3}>
          <Time />
        </Col>
      </Row>
    </FormGroup>
    <FormGroup>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h5 className={styles.Header}>
            <i>DailyPlanner</i>
          </h5>
        </Col>
      </Row>
    </FormGroup>
  </FormGroup>
);

export default Header;
