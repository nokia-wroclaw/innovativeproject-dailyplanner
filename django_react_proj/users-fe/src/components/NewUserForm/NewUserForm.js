import { React, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Select, TimePicker } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { API_URL } from '../../constants';
import styles from './NewUserForm.module.css';
import 'react-toastify/dist/ReactToastify.css';

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
  const [taskName, setTaskName] = useState(user?.taskName || '');
  const [taskDescription, setTaskDescription] = useState(user?.taskDescription || '');
  const [taskType, setTaskType] = useState(user?.taskType || '');
  const [taskPriority, setTaskPriority] = useState(user?.taskPriority || '');
  const [startTime, setStartTime] = useState(user?.startTime || '');
  const [endTime, setEndTime] = useState(user?.endTime || '');
  const types = ['Meeting', 'Email', 'Housework'];
  const priority = [
    {
      p: 1,
      pName: 'Low',
    },
    {
      p: 2,
      pName: 'Medium',
    },
    {
      p: 3,
      pName: 'High',
    },
  ];

  const formatStartTime = () => {
    const timeFormat = '12:00';
    setStartTime(timeFormat);
  };

  const toastifyEdit = () => toast.success('YOU EDITED TASK!');
  const onTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };
  const onTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };
  const onTaskTypeChange = (event) => {
    setTaskType(event.target.value);
  };

  const onTaskPriorityChange = (event) => {
    setTaskPriority(event.target.value);
  };

  const dateValue = (value) => (typeof value === 'string' ? new Date(value) : value);
  const createUser = async () => {
    await axios.post(API_URL, {
      id: user?.id,
      taskName,
      taskDescription,
      taskType,
      taskPriority,
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
      taskName,
      taskDescription,
      taskType,
      taskPriority,
      startTime,
      endTime,
    });
    resetState();
    toggle();
    toastifyEdit();
  };

  const onFinish = (values) => {
    console.log('recived values', values);
  };

  return (
    <Form
      onFinish={user ? editUser : createUser}
      // onFinish={onFinish}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <Form.Item label="Task name" name="taskName">
        <Input />
      </Form.Item>
      <Form.Item label="Task type" name="taskType">
        <Select>
          {types.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Task priority " name="taskPriority">
        <Select>
          {priority.map((p) => (
            <Select.Option key={p.p} value={p.p}>
              {p.pName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Task start" {...config} name="startTime">
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item label="Task end" {...config} name="endTime">
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item label="Description" name="taskDescription">
        <TextArea rows={4} />
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
        Save
      </Button>
    </Form>
  );
};

NewUserForm.propTypes = {
  toggle: PropTypes.func,
  user: PropTypes.object,
  resetState: PropTypes.func,
};
export default NewUserForm;
