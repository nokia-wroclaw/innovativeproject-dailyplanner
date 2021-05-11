import { React, useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Radio, Select, TimePicker } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '../../constants';
import styles from './NewUserForm.module.css';

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const { TextArea } = Input;

const NewUserForm = ({ user, resetState, toggle }) => {
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState(user?.password || '');
  const [taskType, setTaskType] = useState(user?.taskType || '');
  const [startTime, setStartTime] = useState(user?.startTime || '');
  const [endTime, setEndTime] = useState(user?.endTime || '');

  const types = ['', 'Meeting', 'Email', 'Housework'];

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  function onNameChange(event) {
    setName(event.target.value);
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onTaskTypeChange = (event) => {
    setTaskType(event.target.value);
  };

  const dateValue = (value) => (typeof value === 'string' ? new Date(value) : value);
  const createUser = async (event) => {
    event.preventDefault();
    await axios.post(API_URL, {
      id: user?.id,
      name,
      password,
      taskType,
      startTime,
      endTime,
    });
    resetState();
    toggle();
  };
  const editUser = async (event) => {
    event.preventDefault();
    await axios.put(`${API_URL + user.id}/`, {
      id: user.id,
      name,
      password,
      taskType,
      startTime,
      endTime,
    });
    resetState();
    toggle();
  };
  return (
    <>
      <Form
        onFinish={user ? editUser : createUser}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Task name" onValuesChange={onNameChange} name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Task type" onValuesChange={onTaskTypeChange} name="taskType">
          <Select>
            {types.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Task start" {...config} onValuesChange={setStartTime} name="startTime">
          <TimePicker />
        </Form.Item>
        <Form.Item label="Task end" {...config} onValuesChange={setEndTime} name="endTime">
          <TimePicker />
        </Form.Item>
      </Form>
      <Form.Item label="Description" onValuesChange={onPasswordChange} name="password">
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
};

NewUserForm.propTypes = {
  toggle: PropTypes.func,
  user: PropTypes.object,
  resetState: PropTypes.func,
};
export default NewUserForm;
