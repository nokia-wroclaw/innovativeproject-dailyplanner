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
        <th>Deadline</th>
        <th>Data rejestracji</th>
        <th />
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
        users.map((user) => <UsersListRow key={user.id} user={user} resetState={resetState} />)
      )}
    </tbody>
  </Table>
);
UserList.propTypes = {
  users: PropTypes.array,
  resetState: PropTypes.func,
};
export default UserList;
