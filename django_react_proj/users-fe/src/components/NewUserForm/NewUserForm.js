import { React, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { getHours, getMinutes, isSameDay } from 'date-fns';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import moment from 'moment';
import { API_URL } from '../../constants';
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
  const [taskName] = useState(user?.taskName || '');
  const [taskDescription] = useState(user?.taskDescription || '');
  const [taskType] = useState(user?.taskType || '');
  const [taskPriority] = useState(user?.taskPriority || '');
  const [startTime] = useState(user?.startTime || '');
  const [endTime] = useState(user?.endTime || '');
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
  const createUser = async (values) => {
    await axios.post(API_URL, {
      ...values,
      startTime: new Date(values.startTime),
      endTime: new Date(values.endTime),
    });
    resetState();
    toggle();
  };
  const editUser = async (values) => {
    await axios.put(`${API_URL + user.id}/`, {
      ...values,
      startTime: new Date(values.startTime),
      endTime: new Date(values.endTime),
    });
    resetState();
    toggle();
    toast.success('You edited task!');
  };
  const dateCheckCreate = (values) => {
    const result = isSameDay(new Date(values.startTime), new Date(values.endTime));
    if (result === true) {
      if (
        getHours(new Date(values.startTime)) === getHours(new Date(values.endTime)) &&
        getMinutes(new Date(values.startTime)) <= getMinutes(new Date(values.endTime))
      ) {
        createUser(values);
      } else if (getHours(new Date(values.startTime)) < getHours(new Date(values.endTime))) {
        createUser(values);
      } else {
        toast.error('Task start must be earlier than Task end!');
      }
    } else {
      toast.error('Start date must be the same as end date!');
    }
  };
  const dateCheckEdit = (values) => {
    const result = isSameDay(new Date(values.startTime), new Date(values.endTime));
    if (result === true) {
      if (
        getHours(new Date(values.startTime)) === getHours(new Date(values.endTime)) &&
        getMinutes(new Date(values.startTime)) <= getMinutes(new Date(values.endTime))
      ) {
        editUser(values);
      } else if (getHours(new Date(values.startTime)) < getHours(new Date(values.endTime))) {
        editUser(values);
      } else {
        toast.error('Task start must be earlier than Task end!');
      }
    } else {
      toast.error('Start date must be the same as end date!');
    }
  };

  return (
    <Form
      onFinish={user ? dateCheckEdit : dateCheckCreate}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        taskName: user ? taskName : '',
        taskType: user ? taskType : '',
        taskPriority: user ? taskPriority : '',
        startTime: user ? moment(startTime) : '',
        endTime: user ? moment(endTime) : '',
        taskDescription: user ? taskDescription : '',
      }}
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
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item label="Task end" {...config} name="endTime">
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
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
