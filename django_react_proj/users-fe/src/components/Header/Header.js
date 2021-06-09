import { React, useContext } from 'react';
import 'antd/dist/antd.css';
import './Header.css';
import { Col, Row, Layout, Tag } from 'antd';
import PropTypes from 'prop-types';
import Time from '../RealTime/RealTime';
import styles from '../RealTime/RealTime.module.css';
import { EmailContext } from '../EmailContext/EmailContext';

const { Content } = Layout;
const PageHeader = ({ users, firstNotification, secondNotification }) => {
  const { email } = useContext(EmailContext);
  return (
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
          <Col span={4} offset={5}>
            <Tag>{email}</Tag>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
PageHeader.propTypes = {
  users: PropTypes.array,
  firstNotification: PropTypes.number,
  secondNotification: PropTypes.number,
};
export default PageHeader;
