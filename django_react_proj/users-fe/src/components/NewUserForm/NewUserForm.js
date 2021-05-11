import { React, useState } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../../constants';
import styles from './NewUserForm.module.css';
import 'react-toastify/dist/ReactToastify.css';

const NewUserForm = ({ user, resetState, toggle }) => {
  const [taskName, setTaskName] = useState(user?.taskName || '');
  const [taskDescription, setTaskDescription] = useState(user?.taskDescription || '');
  const [taskType, setTaskType] = useState(user?.taskType || '');
  const [startTime, setStartTime] = useState(user?.startTime || '');
  const [endTime, setEndTime] = useState(user?.endTime || '');
  const types = ['', 'Meeting', 'Email', 'Housework'];
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

  const dateValue = (value) => (typeof value === 'string' ? new Date(value) : value);
  const createUser = async (event) => {
    event.preventDefault();
    await axios.post(API_URL, {
      id: user?.id,
      taskName,
      taskDescription,
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
      taskName,
      taskDescription,
      taskType,
      startTime,
      endTime,
    });
    resetState();
    toggle();
    toastifyEdit();
  };
  return (
    <Form onSubmit={user ? editUser : createUser}>
      <FormGroup>
        <Label for="taskName">Task name:</Label>
        <Input type="text" name="taskName" onChange={onTaskNameChange} value={taskName} />
      </FormGroup>
      <FormGroup>
        <Label for="startTime">Time interval:</Label>
        <FormGroup>
          <Row>
            <Col>
              <Label>From:</Label>
              <FormGroup>
                <DateTimePicker
                  name="startTime"
                  disableClock="true"
                  format="y-M-d HH:mm"
                  validateOnBlur="false"
                  onChange={setStartTime}
                  value={user ? dateValue(startTime) : startTime}
                />
              </FormGroup>
              <Label>To:</Label>
              <FormGroup>
                <DateTimePicker
                  name="endTime"
                  disableClock="true"
                  format="y-M-d HH:mm"
                  onChange={setEndTime}
                  value={user ? dateValue(endTime) : endTime}
                />
              </FormGroup>
            </Col>
            <Col sm={7}>
              <Input type="select" onChange={onTaskTypeChange} value={taskType}>
                {types.map((type) => (
                  <option key={type} name="taskType">
                    {type}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="password">Description:</Label>
        <textarea
          className={styles.Svg}
          type="text"
          name="taskDescription"
          onChange={onTaskDescriptionChange}
          value={taskDescription}
        />
      </FormGroup>
      <Button>
        Zapisz
        <ToastContainer />
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
