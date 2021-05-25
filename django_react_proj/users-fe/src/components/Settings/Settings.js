import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Button } from 'antd';

const WorkSettings = ({
  workHours,
  setworkHours,
  firstNotifiaction,
  setFirstNotification,
  secondNotifiaction,
  setSecondNotification,
}) => {
  const onChangeHours = (number) => {
    setworkHours(number);
  };
  const onChangeFirstNotification = (number) => {
    setFirstNotification(number);
  };
  const onChangeSecondNotification = (number) => {
    setSecondNotification(number);
  };
  const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 14, span: 16 },
  };
  const onFinish = (value) => {
    console.log('Success:', value);
  };

  const onFinishFailed = (error) => {
    console.log('Failed:', error);
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Set work hours:">
        <InputNumber min={1} max={24} defaultValue={workHours} onChange={onChangeHours} />
      </Form.Item>
      <Form.Item label="Set first notification:">
        <InputNumber
          min={1}
          max={120}
          defaultValue={firstNotifiaction}
          onChange={onChangeFirstNotification}
        />
      </Form.Item>
      <Form.Item label="Set second notification:">
        <InputNumber
          min={1}
          max={30}
          defaultValue={secondNotifiaction}
          onChange={onChangeSecondNotification}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
WorkSettings.propTypes = {
  setworkHours: PropTypes.func,
  workHours: PropTypes.number,
  setFirstNotification: PropTypes.func,
  firstNotifiaction: PropTypes.number,
  setSecondNotification: PropTypes.func,
  secondNotifiaction: PropTypes.number,
};
export default WorkSettings;
