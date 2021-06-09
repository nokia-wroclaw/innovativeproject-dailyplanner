import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input, Button, Col, Row, Select, Tag } from 'antd';
import { CirclePicker } from 'react-color';
import { ToastContainer, toast } from 'react-toastify';
import { WorkHoursContext } from '../WorkHoursContext/WorkHoursContext';

const configTaskName = {
  rules: [
    {
      required: true,
      message: 'Please select task name!',
    },
  ],
};

const configColor = {
  rules: [
    {
      required: true,
      message: 'Please select color!',
    },
  ],
};

const WorkSettings = ({
  firstNotification,
  setFirstNotification,
  secondNotification,
  setSecondNotification,
}) => {
  const [form] = Form.useForm();
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
    localStorage.setItem('types', JSON.stringify(types.concat(createdArray)));
    setTypes(types.concat(createdArray));
    toast.info(<div>Created {values.taskName} task type!</div>);
  };
  const saveTaskType = (values) => {
    const checkName = types.find((type) => type.name === values.taskName);
    console.log(checkName);
    const checkColor = types.find((type) => type.color.hex === values.taskColor.hex);
    if (checkName) {
      toast.error(<div>{values.taskName} type name was created before!</div>);
    } else if (checkColor) {
      toast.error(
        <div>
          {' This '}
          <Tag color={values.taskColor.hex}> type color</Tag>was used before!
        </div>
      );
    } else {
      setTaskName(values.taskName);
      setTaskColor(values.taskColor);
      newTaskType(values);
      form.resetFields();
    }
  };
  const deleteTaskType = (value) => {
    const newTable = [...types];
    newTable.splice(value, 1);
    localStorage.setItem('types', JSON.stringify(newTable));
    setTypes(newTable);
  };
  const checkIndex = (value) => {
    types.forEach((type, index) => {
      if (value.taskName === type.name) {
        deleteTaskType(index);
        toast.info(<div>Deleted {value.taskName} task type!</div>);
      }
    });
  };
  return (
    <>
      <Row>
        <Col span={4} offset={4}>
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
        <Col span={5} offset={1}>
          <Form
            form={form}
            onFinish={saveTaskType}
            labelCol={{
              span: 9,
            }}
            wrapperCol={{
              span: 17,
            }}
            initialValues={{
              taskName,
            }}
          >
            <Form.Item
              {...configTaskName}
              label="Task type name:"
              tooltip="Insert new task type name"
              name="taskName"
            >
              <Input maxLength={30} style={{ width: 180 }} />
            </Form.Item>
            <Form.Item
              label="Task type color:"
              tooltip="Select color for new task type"
              name="taskColor"
              {...configColor}
            >
              <CirclePicker circleSize={25} circleSpacing={15} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                Submit new task type
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={5} offset={1}>
          <Form
            onFinish={checkIndex}
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 15,
            }}
            initialValues={{
              taskName,
            }}
          >
            <Form.Item label="Task type name:" tooltip="Choose task type to delete" name="taskName">
              <Select style={{ width: 150 }}>
                {types.map((type) => (
                  <Select.Option key={type.name} value={type.name}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                Delete task type
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
