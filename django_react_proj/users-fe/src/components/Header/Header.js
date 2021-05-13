import React from 'react';
import 'antd/dist/antd.css';
import './Header.css';
import { Col, Row, Image, Layout, Breadcrumb } from 'antd';
import Time from '../RealTime/RealTime';
import styles from '../RealTime/RealTime.module.css';

const { Content } = Layout;
const PageHeader = () => (
  <Layout className="layout">
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Row align="middle">
        <Col span={10} offset={7} className="Center">
          <Image
            width={400}
            src="https://media.discordapp.net/attachments/821426521859162192/821456504875646976/teams-chaos.png?width=800&height=450"
          />
        </Col>
        <Col className={styles.Time} span={2} offset={1}>
          <Time />
        </Col>
      </Row>
    </Content>
  </Layout>
);

export default PageHeader;
