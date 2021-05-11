import React from 'react';
import 'antd/dist/antd.css';
import './Header.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content } = Layout;
const PageHeader = () => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">DailyPlanner</Menu.Item>
        <Menu.Item key="2">Chart</Menu.Item>
        <Menu.Item key="3">Settings</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="Center">
        <img
          className="Image"
          alt="Team chaos"
          src="https://media.discordapp.net/attachments/821426521859162192/821456504875646976/teams-chaos.png?width=800&height=450"
        />
      </div>
    </Content>
  </Layout>
);

export default PageHeader;
