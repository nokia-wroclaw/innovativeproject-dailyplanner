import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input, Button, Col, Row } from 'antd';
import { CirclePicker } from 'react-color';
import { ToastContainer, toast } from 'react-toastify';
import { WorkHoursContext } from '../WorkHoursContext/WorkHoursContext';

const WorkSettings = ({
  firstNotification,
  setFirstNotification,
  secondNotification,
  setSecondNotification,
}) => {
  const taskName = '';
  const taskColor = '';
  const { types, workHours, setworkHours, setTaskName, setTaskColor, setTypes } =
    useContext(WorkHoursContext);
  const onChangeHours = (number) => {
    setworkHours(number);
  };
  const onChangeFirstNotification = (number) => {
    setFirstNotification(number);
  };
  const onChangeSecondNotification = (number) => {
    setSecondNotification(number);
  };
  const saveData = (values) => {
    onChangeHours(values.workHours);
    onChangeFirstNotification(values.firstNotification);
    onChangeSecondNotification(values.secondNotification);
  };
  const newTaskType = (values) => {
    const createdArray = [
      {
        id: types.length + 1,
        name: values.taskName,
        color: values.taskColor,
      },
    ];
    setTypes(types.concat(createdArray));
    toast.info('Created new task type!');
  };
  const saveTaskType = (values) => {
    setTaskName(values.taskName);
    setTaskColor(values.taskColor);
    newTaskType(values);
  };
  return (
    <>
      <Row>
        <Col span={12} offset={2}>
          <Form
            onFinish={saveData}
            labelCol={{
              span: 12,
            }}
            wrapperCol={{
              span: 14,
            }}
            initialValues={{
              workHours,
              firstNotification,
              secondNotification,
              taskName,
              taskColor: taskColor.hex,
            }}
          >
            <Form.Item tooltip="Daily working time" label="Work hours:" name="workHours">
              <InputNumber min={1} max={24} />
            </Form.Item>
            <Form.Item
              label="First notification:"
              tooltip="Time when you need to be informed first time before incoming task"
              name="firstNotification"
            >
              <InputNumber min={1} max={120} />
            </Form.Item>
            <Form.Item
              label="Second notification:"
              tooltip="Time when you need to be informed second time before incoming task"
              name="secondNotification"
            >
              <InputNumber min={1} max={30} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            onFinish={saveTaskType}
            labelCol={{
              span: 9,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              taskName,
              taskColor,
            }}
          >
            <Form.Item label="Task type name:" tooltip="Insert new task type name" name="taskName">
              <Input maxLength={30} style={{ width: 90 }} />
            </Form.Item>
            <Form.Item
              label="Task type color:"
              tooltip="Select color for new task type"
              name="taskColor"
            >
              <CirclePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                Submit new task type
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </>
  );
};
WorkSettings.propTypes = {
  setFirstNotification: PropTypes.func,
  firstNotification: PropTypes.number,
  setSecondNotification: PropTypes.func,
  secondNotification: PropTypes.number,
};
export default WorkSettings;
