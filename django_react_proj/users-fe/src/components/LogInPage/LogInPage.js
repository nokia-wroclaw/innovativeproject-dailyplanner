import { React, useContext } from 'react';
import { Button, Row, Col } from 'antd';
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
    <div
      style={{
        position: 'absolute',
        left: '47%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Row>
        <Col>
          <Row>
            <img
              style={{ width: 430, height: 320, borderRadius: 10 }}
              alt="Team chaos"
              src="https://image.freepik.com/darmowe-wektory/miejsce-pracy-studenta-lub-biznesmena-w-pokoju_1284-13477.jpg"
            />
          </Row>
          <Row>
            <a href="https://pl.freepik.com/wektory/tlo">
              Tło plik wektorowy utworzone przez upklyak - pl.freepik.com
            </a>
          </Row>
        </Col>
        <Col style={{ marginLeft: 100, marginTop: 50 }}>
          <h2>Log in</h2>
          <Row style={{ marginBottom: 40, marginTop: 20 }}>
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
          <Row>
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
        </Col>
      </Row>
    </div>
  );
};

LogInPage.propTypes = {
  history: PropTypes.object,
};

export default LogInPage;
