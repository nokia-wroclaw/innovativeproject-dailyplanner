import { React, useState } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import TimePicker from 'react-time-picker';
import PropTypes from 'prop-types';
import { API_URL } from '../../constants';
import styles from './NewUserForm.module.css';

const NewUserForm = ({ user, resetState, toggle }) => {
  const [name, setName] = useState(user.name ?? '');
  const [password, setPassword] = useState(user.password ?? '');
  const [deadline, setDeadline] = useState(user.deadline ?? '');
  const [taskType, setTaskType] = useState(user.taskType ?? '');

  const types = ['', 'Meeting', 'Email', 'Housework'];

  function onNameChange(event) {
    setName(event.target.value);
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onTaskTypeChange = (event) => {
    setTaskType(event.target.value);
  };
  const defaultIfEmpty = (value) => value;
  const createUser = async (event) => {
    event.preventDefault();
    await axios.post(API_URL, {
      id: user?.id,
      name,
      password,
      deadline,
      taskType,
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
      taskType,
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
        <Row form>
          <Col>
            <Label for="deadline">Data wykonania:</Label>
          </Col>
          <Col>
            <Label for="deadline">Task type</Label>
          </Col>
        </Row>
        <FormGroup>
          <Row>
            <Col>
              <TimePicker
                format="H:m"
                disableClock="true"
                name="deadline"
                onChange={setDeadline}
                value={defaultIfEmpty(deadline)}
              />
            </Col>
            <Col sm={7}>
              <Input type="select" onChange={onTaskTypeChange} value={defaultIfEmpty(taskType)}>
                {types.map((type) => (
                  <option id={type} name="taskType">
                    {type}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
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
