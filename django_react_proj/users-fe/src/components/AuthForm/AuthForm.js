import { React } from 'react';
import { Button } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { githubProvider, googleProvider } from '../config/authMethods';
import socialMediaAuth from '../service/socialMediaAuth';

const AuthForm = () => {
  const handleOnClickGithub = async (provider) => {
    const res = socialMediaAuth(provider);
    console.log(res);
  };
  return (
    <>
      <Button
        onClick={() => handleOnClickGithub(githubProvider)}
        icon={<GithubOutlined />}
        color="#8c8c8c"
      >
        GitHub
      </Button>
      <Button
        onClick={() => handleOnClickGithub(googleProvider)}
        icon={<GoogleOutlined />}
        color="#f5222d"
      >
        Google
      </Button>
    </>
  );
};

export default AuthForm;
