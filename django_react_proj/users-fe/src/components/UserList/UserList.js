import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { format } from 'date-fns';
import TaskButton from '../TaskButtonModal/TaskButtonModal';
import NewUserModal from '../NewUserModal/NewUserModal';
import ConfirmRemovalModal from '../ConfirmRemovalModal/ConfirmRemovalModal';
import { API_URL } from '../../constants';

const { Column } = Table;

const Actions = ({ user, resetState }) => {
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
    <>
      <TaskButton
        id={user.id}
        deleteUser={deleteUser}
        taskFlag={taskFlag}
        onToggleTaskFlag={onToggleTaskFlag}
        setDoneState={setDoneState}
      />
      <NewUserModal create={false} user={user} resetState={resetState} />
      <ConfirmRemovalModal id={user.id} deleteUser={deleteUser} />
    </>
  );
};
Actions.propTypes = {
  user: PropTypes.object,
  resetState: PropTypes.func,
};

const UserList = ({ users = [], resetState }) => (
  <Table dataSource={users}>
    <Column title="Task name" dataIndex="taskName" />
    <Column title="Description" dataIndex="taskDescription" />
    <Column
      title="Task Time"
      dataIndex="taskName"
      render={(value, user) =>
        `${format(new Date(user.startTime), 'HH:mm')} - ${format(new Date(user.endTime), 'HH:mm')}`
      }
    />
    <Column title="Task type" />
    <Column
      title="Actions"
      render={(value, user) => <Actions user={user} resetState={resetState} />}
    />
  </Table>
  // <Table dark>
  //   <thead>
  //     <tr>
  //       <th>Task name</th>
  //       <th>Description</th>
  //       <th>Task Time</th>
  //       <th>Task Type</th>
  //       <th />
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {users.length === 0 ? (
  //       <tr>
  //         <td colSpan="6" align="center">
  //           <b>You haven't scheduled any task!</b>
  //         </td>
  //       </tr>
  //     ) : (
  //       users.map((user) => <UsersListRow key={user.id} user={user} resetState={resetState} />)
  //     )}
  //   </tbody>
  // </Table>
);
UserList.propTypes = {
  users: PropTypes.array,
  resetState: PropTypes.func,
};
export default UserList;
