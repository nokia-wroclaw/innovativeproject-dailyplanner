import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { API_URL } from '../../constants';
import NewUserModal from '../NewUserModal/NewUserModal';
import ConfirmRemovalModal from '../ConfirmRemovalModal/ConfirmRemovalModal';
import TaskButton from '../TaskButtonModal/TaskButtonModal';
import styles from './UsersListRow.module.css';

const UsersListRow = ({ user, resetState }) => {
  const [taskFlag, setTaskFlag] = useState(user.done);

  const setDoneState = async () => {
    await axios.patch(`${API_URL + user.id}/`, {
      done: !taskFlag,
    });
  };

  const onToggleTaskFlag = () => {
    setTaskFlag((previous) => !previous);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      resetState();
    } catch (error) {
      console.log(error);
    }
  };

  let rowColor = '';
  if (taskFlag) {
    rowColor = styles.ButtonTrue;
  } else {
    if (user.taskType === 'Meeting') {
      rowColor = styles.Meeting;
    }
    if (user.taskType === 'Email') {
      rowColor = styles.Email;
    }
    if (user.taskType === 'Housework') {
      rowColor = styles.Housework;
    }
  }

  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td className={styles.Svg}>{user.password}</td>
      <td>
        {format(new Date(user.startTime), 'HH:mm')} - {format(new Date(user.endTime), 'HH:mm')}
      </td>
      <td className={rowColor} />
      <td align="center">
        <TaskButton
          id={user.id}
          deleteUser={deleteUser}
          taskFlag={taskFlag}
          onToggleTaskFlag={onToggleTaskFlag}
          setDoneState={setDoneState}
        />
        <NewUserModal create={false} user={user} resetState={resetState} />
        <ConfirmRemovalModal id={user.id} deleteUser={deleteUser} />
      </td>
    </tr>
  );
};
UsersListRow.propTypes = {
  user: PropTypes.object,
  resetState: PropTypes.func,
};
export default UsersListRow;
