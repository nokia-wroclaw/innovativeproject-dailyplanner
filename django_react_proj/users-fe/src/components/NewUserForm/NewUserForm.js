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
  const [deadline, setDeadline] = useState(user?.deadline || '');
  const [deadlinev2, setDeadlinev2] = useState(user?.deadlinev2 || '');

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
      deadline,
      deadlinev2,
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
      deadline,
      deadlinev2,
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
        <Label for="deadline">Time interval:</Label>
        <FormGroup>
          <Label>From:</Label>
          <FormGroup>
            <DateTimePicker
              name="deadline"
              disableClock="true"
              format="y-M-d HH:mm"
              validateOnBlur="false"
              onChange={setDeadline}
              value={user ? dateValue(deadline) : defaultIfEmpty(deadline)}
            />
          </FormGroup>
          <Label>To:</Label>
          <FormGroup>
            <DateTimePicker
              name="deadlinev2"
              disableClock="true"
              format="y-M-d HH:mm"
              onChange={setDeadlinev2}
              value={user ? dateValue(deadlinev2) : defaultIfEmpty(deadlinev2)}
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
