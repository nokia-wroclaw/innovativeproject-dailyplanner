import { React, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import TimePicker from 'react-time-picker';
import PropTypes from 'prop-types';
import { API_URL } from '../../constants';
import styles from './NewUserForm.module.css';

const NewUserForm = ({ user, resetState, toggle }) => {
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState(user?.password || '');
  const [deadline, setDeadline] = useState(user?.deadline || '');
  const [importanceoftask, setImportanceoftask] = useState(user?.importanceoftask || '');

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const defaultIfEmpty = (value) => (value === '' ? '' : value);
  const createUser = async (event) => {
    event.preventDefault();
    await axios.post(API_URL, {
      id: user?.id,
      name,
      password,
      deadline,
      importanceoftask,
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
      importanceoftask,
    });
    resetState();
    toggle();
  };
  return (
    <Form onSubmit={user ? editUser : createUser}>
      <FormGroup>
        <Label for="name">Nazwa zadania:</Label>
        <Input type="text" name="name" onChange={onNameChange} value={defaultIfEmpty(name)} />
      </FormGroup>
      <FormGroup>
        <Label for="deadline">Data wykonania:</Label>
        <FormGroup>
          <TimePicker
            format=" H:m"
            disableClock="true"
            name="deadline"
            onChange={setDeadline}
            value={defaultIfEmpty(deadline)}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="password">Opis:</Label>
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
