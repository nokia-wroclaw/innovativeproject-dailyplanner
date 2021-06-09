import { React, useContext } from 'react';
import 'antd/dist/antd.css';
import './Header.css';
import { Col, Row, Layout, Tag, Button } from 'antd';
import PropTypes from 'prop-types';
import Time from '../RealTime/RealTime';
import styles from '../RealTime/RealTime.module.css';
import { EmailContext } from '../EmailContext/EmailContext';
import auth from '../AuthCheck/Auth';

const { Content } = Layout;
const PageHeader = ({ users, firstNotification, secondNotification, history }) => {
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
            <Row>
              <Tag>{email}</Tag>
            </Row>
            <Row>
              <Button
                onClick={() => {
                  auth.logout(() => {
                    history.push('/');
                  });
                }}
              >
                Logout
              </Button>
            </Row>
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
  history: PropTypes.object,
};
export default PageHeader;
