import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '../../constants';
import NewUserModal from '../NewUserModal/NewUserModal';
import ConfirmRemovalModal from '../ConfirmRemovalModal/ConfirmRemovalModal';
import TaskButton from '../TaskButtonModal/TaskButtonModal';
import styles from '../UserList/UserList.module.css';

const UsersListRow = ({ user, resetState }) => {
  const [taskFlag, setTaskFlag] = useState(false);

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
    <tr className={taskFlag ? styles.ButtonTrue : styles.ButtonFalse} key={user.id}>
      <td>{user.name}</td>
      <td className={styles.Svg}>{user.password}</td>
      <td>{user.deadline}</td>
      <td>{user.registrationDate}</td>
      <td align="center">
        <TaskButton
          id={user.id}
          deleteUser={deleteUser}
          taskFlag={taskFlag}
          onToggleTaskFlag={onToggleTaskFlag}
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
