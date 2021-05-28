import React from 'react';
import 'antd/dist/antd.css';
import './Header.css';
import { Col, Row, Layout } from 'antd';
import PropTypes from 'prop-types';
import Time from '../RealTime/RealTime';
import styles from '../RealTime/RealTime.module.css';

const { Content } = Layout;
const PageHeader = ({ users, firstNotification, secondNotification }) => (
  <Layout className="layout">
    <Content style={{ padding: '0 50px' }}>
      <Row align="middle">
        <Col className={styles.Time} span={4} offset={10}>
          <Time
            firstNotification={firstNotification}
            secondNotification={secondNotification}
            users={users}
          />
        </Col>
      </Row>
    </Content>
  </Layout>
);
PageHeader.propTypes = {
  users: PropTypes.array,
  firstNotification: PropTypes.number,
  secondNotification: PropTypes.number,
};
export default PageHeader;
