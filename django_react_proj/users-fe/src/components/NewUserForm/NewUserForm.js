import { React, useState, useContext } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { getHours, getMinutes, isSameDay } from 'date-fns';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import moment from 'moment';
import { API_URL } from '../../constants';
import 'react-toastify/dist/ReactToastify.css';
import { EmailContext } from '../EmailContext/EmailContext';
import { WorkHoursContext } from '../WorkHoursContext/WorkHoursContext';

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
  const { WH, WM, workHours } = useContext(WorkHoursContext);
  const [taskName] = useState(user?.taskName || '');
  const [taskDescription] = useState(user?.taskDescription || '');
  const [taskType] = useState(user?.taskType || '');
  const [taskPriority] = useState(user?.taskPriority || '');
  const [startTime] = useState(user?.startTime || '');
  const [endTime] = useState(user?.endTime || '');
  const { email } = useContext(EmailContext);
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
      email,
      startTime: new Date(values.startTime),
      endTime: new Date(values.endTime),
    });
    resetState();
    toggle();
  };
  const editUser = async (values) => {
    await axios.put(`${API_URL + user.id}/`, {
      ...values,
      email,
      startTime: new Date(values.startTime),
      endTime: new Date(values.endTime),
    });
    resetState();
    toggle();
    toast.success('You edited task!');
  };
  const workHoursCheckCreate = (values) => {
    const uptimes = getHours(new Date(values.endTime));
    const lowtimes = getHours(new Date(values.startTime));
    const uptimesm = getMinutes(new Date(values.endTime));
    const lowtimesm = getMinutes(new Date(values.startTime));
    const sub = uptimes * 60 - lowtimes * 60 + uptimesm - lowtimesm;
    const workHoursTotal = WH * 60 + WM;
    if (sub + workHoursTotal <= workHours * 60) {
      createUser(values);
    } else {
      toast.error('Task time exceeded scheduled time!');
    }
  };
  const workHoursCheckEdit = (values) => {
    const uptimes = getHours(new Date(values.endTime));
    const lowtimes = getHours(new Date(values.startTime));
    const uptimesm = getMinutes(new Date(values.endTime));
    const lowtimesm = getMinutes(new Date(values.startTime));
    const sub = uptimes * 60 - lowtimes * 60 + uptimesm - lowtimesm;
    const workHoursTotal = WH * 60 + WM - sub;
    if (workHoursTotal <= workHours * 60) {
      editUser(values);
    } else {
      toast.error('Task time exceeded scheduled time!');
    }
  };
  const dateCheckCreate = (values) => {
    const result = isSameDay(new Date(values.startTime), new Date(values.endTime));
    if (result === true) {
      if (
        getHours(new Date(values.startTime)) === getHours(new Date(values.endTime)) &&
        getMinutes(new Date(values.startTime)) <= getMinutes(new Date(values.endTime))
      ) {
        workHoursCheckCreate(values);
      } else if (getHours(new Date(values.startTime)) < getHours(new Date(values.endTime))) {
        workHoursCheckCreate(values);
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
        workHoursCheckEdit(values);
      } else if (getHours(new Date(values.startTime)) < getHours(new Date(values.endTime))) {
        workHoursCheckEdit(values);
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
        span: 5,
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
      <Form.Item
        label="Task name"
        name="taskName"
        rules={[
          {
            required: true,
            message: 'Please input your task name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Task type"
        name="taskType"
        rules={[
          {
            required: true,
            message: 'Please select your task type!',
          },
        ]}
      >
        <Select>
          {types.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Task priority "
        name="taskPriority"
        rules={[
          {
            required: true,
            message: 'Please select your task priority!',
          },
        ]}
      >
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
      <Form.Item
        label="Description"
        name="taskDescription"
        rules={[
          {
            required: true,
            message: 'Please input your task description!',
          },
        ]}
      >
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
