import React from 'react';
import 'antd/dist/antd.css';
import './Header.css';
import { Col, Row, Layout } from 'antd';
import Time from '../RealTime/RealTime';
import styles from '../RealTime/RealTime.module.css';

const { Content } = Layout;
const PageHeader = () => (
  <Layout className="layout">
    <Content style={{ padding: '0 50px' }}>
      <Row align="middle">
        <Col className={styles.Time} span={4} offset={10}>
          <Time />
        </Col>
      </Row>
    </Content>
  </Layout>
);

export default PageHeader;
