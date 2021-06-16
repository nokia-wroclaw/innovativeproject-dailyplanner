import { React, useContext } from 'react';
import { Button, Row, Col } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { githubProvider, googleProvider } from '../config/authMethods';
import socialMediaAuth from '../service/socialMediaAuth';
import Auth from '../AuthCheck/Auth';
import { EmailContext } from '../EmailContext/EmailContext';
import commonStyles from '../CommonCSS/CommonCSS.module.css';

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
        <Col style={{ marginLeft: 50, marginTop: 50, textAlign: 'center' }}>
          <h1 style={{ textAlign: 'center' }}>Daily Planner</h1>
          <b6>Helps user to plan the day </b6>
          <h3 style={{ textAlign: 'left', marginTop: 20 }}>Log in</h3>
          <Row style={{ marginBottom: 1, marginTop: 10 }}>
            <Button
              className={commonStyles.inbtn}
              onClick={() => handleOnClickGithub(githubProvider)}
              icon={<GithubOutlined />}
              color="#8c8c8c"
              size="large"
              style={{ background: '#bfbfbf' }}
            >
              GitHub
            </Button>
            <Button
              className={commonStyles.inbtn}
              onClick={() => handleOnClickGithub(googleProvider)}
              icon={<GoogleOutlined />}
              color="#f5222d"
              size="large"
              style={{ background: '#fafafa' }}
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
