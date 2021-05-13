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

  return (
    <tr key={user.id}>
      <td>{user.taskName}</td>
      <td className={styles.Svg}>{user.taskDescription}</td>
      <td>
        {format(new Date(user.startTime), 'HH:mm')} - {format(new Date(user.endTime), 'HH:mm')}
      </td>
      <td className={rowColor} />
      <td align="center"></td>
    </tr>
  );
};
UsersListRow.propTypes = {
  user: PropTypes.object,
  resetState: PropTypes.func,
};
export default UsersListRow;
