import { React, useContext } from 'react';
import { Button, Card, Row } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { githubProvider, googleProvider } from '../config/authMethods';
import socialMediaAuth from '../service/socialMediaAuth';
import Auth from '../AuthCheck/Auth';
import { EmailContext } from '../EmailContext/EmailContext';

const LogInPage = ({ history }) => {
  const { setEmail } = useContext(EmailContext);
  const handleOnClickGithub = async (provider) => {
    const res = await socialMediaAuth(provider);
    Auth.login(() => {
      history.push('/app');
    });
    setEmail(res.email);
  };
  return (
    <Card title="Log In" bordered={false} style={{ textAlign: 'center' }}>
      <Row justify="center">
        <Button
          onClick={() => handleOnClickGithub(githubProvider)}
          icon={<GithubOutlined />}
          color="#8c8c8c"
          size="large"
          style={{ background: '#bfbfbf' }}
        >
          GitHub
        </Button>
      </Row>
      <Row justify="center">
        <Button
          onClick={() => handleOnClickGithub(googleProvider)}
          icon={<GoogleOutlined />}
          color="#f5222d"
          size="large"
          style={{ background: '#096dd9' }}
        >
          Google
        </Button>
      </Row>
    </Card>
  );
};

LogInPage.propTypes = {
  history: PropTypes.object,
};

export default LogInPage;
