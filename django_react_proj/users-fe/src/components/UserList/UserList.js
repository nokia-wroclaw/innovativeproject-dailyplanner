import React from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import UsersListRow from '../UsersListRow/UsersListRow';

const UserList = ({ users = [], resetState }) => (
  <Table dark>
    <thead>
      <tr>
        <th>Nazwa zadania</th>
        <th>Opis</th>
        <th>Data wykonania</th>
        <th>Data utworzenia zadania</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {users.length === 0 ? (
        <tr>
          <td colSpan="6" align="center">
            <b>Nie ma zaplanowanego żadnego zadania!</b>
          </td>
        </tr>
      ) : (
        users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td className={styles.Svg}>{user.password}</td>
            <td>{user.deadline}</td>
            <td>{user.registrationDate}</td>           
            <td align="center">
              <TaskButton
                id= {user.id}
                deleteUser={deleteUser}
              />
              &nbsp;&nbsp;
              <NewUserModal
                create={false}
                user={user}
                resetState={resetState}
              />
              &nbsp;&nbsp;
              <ConfirmRemovalModal
                id= {user.id}
                deleteUser={deleteUser}
              />
            </td>
          </tr>
        ))
      )}
    </tbody>
  </Table>
);
UserList.propTypes = {
  users: PropTypes.array,
  resetState: PropTypes.func,
};
export default UserList;
