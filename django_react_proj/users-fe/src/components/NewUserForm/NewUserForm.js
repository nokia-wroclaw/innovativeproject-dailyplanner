import { React, useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Radio, Select, TimePicker } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '../../constants';

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
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Task name">
          <Input onChange={onNameChange} value={name} />
        </Form.Item>
        <Form.Item label="Task type" onChange={onTaskTypeChange} value={taskType}>
          <Select>
            {types.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="start" label="Task start">
          <TimePicker
            disableClock="true"
            format="y-M-d HH:mm"
            validateOnBlur="false"
            onChange={setStartTime}
            value={user ? dateValue(startTime) : startTime}
          />
        </Form.Item>
        <Form.Item name="end" label="Task end">
          <TimePicker
            disableClock="true"
            format="y-M-d HH:mm"
            onChange={setEndTime}
            value={user ? dateValue(endTime) : endTime}
          />
        </Form.Item>
        <Form.Item name="end" label="Description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </>
  );
};

NewUserForm.propTypes = {
  toggle: PropTypes.func,
  user: PropTypes.object,
  resetState: PropTypes.func,
};
export default NewUserForm;
