import { React, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import PropTypes from 'prop-types';
import { API_URL } from '../../constants';
import styles from './NewUserForm.module.css';

const NewUserForm = ({ user, resetState, toggle }) => {
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState(user?.password || '');
  const [startTime, setStartTime] = useState(user?.startTime || '');
  const [endTime, setEndTime] = useState(user?.endTime || '');

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const defaultIfEmpty = (value) => (value === '' ? '' : value);
  const dateValue = (value) => (typeof value === 'string' ? new Date(value) : value);
  const createUser = async (event) => {
    event.preventDefault();
    await axios.post(API_URL, {
      id: user?.id,
      name,
      password,
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
      startTime,
      endTime,
    });
    resetState();
    toggle();
  };
  return (
    <Form onSubmit={user ? editUser : createUser}>
      <FormGroup>
        <Label for="name">Task name:</Label>
        <Input type="text" name="name" onChange={onNameChange} value={defaultIfEmpty(name)} />
      </FormGroup>
      <FormGroup>
        <Label for="startTime">Time interval:</Label>
        <FormGroup>
          <Label>From:</Label>
          <FormGroup>
            <DateTimePicker
              name="startTime"
              disableClock="true"
              format="y-M-d HH:mm"
              validateOnBlur="false"
              onChange={setStartTime}
              value={user ? dateValue(startTime) : defaultIfEmpty(startTime)}
            />
          </FormGroup>
          <Label>To:</Label>
          <FormGroup>
            <DateTimePicker
              name="endTime"
              disableClock="true"
              format="y-M-d HH:mm"
              onChange={setEndTime}
              value={user ? dateValue(endTime) : defaultIfEmpty(endTime)}
            />
          </FormGroup>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="password">Description:</Label>
        <textarea
          className={styles.Svg}
          type="text"
          name="password"
          onChange={onPasswordChange}
          value={defaultIfEmpty(password)}
        />
      </FormGroup>
      <Button>Zapisz</Button>
    </Form>
  );
};

NewUserForm.propTypes = {
  toggle: PropTypes.func,
  user: PropTypes.object,
  resetState: PropTypes.func,
};
export default NewUserForm;
