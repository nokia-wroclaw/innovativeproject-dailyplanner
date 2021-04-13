import React from 'react';
import { Table } from 'reactstrap';
import UsersListRow from '../UsersListRow/UsersListRow';

const UserList = ({ users = [], resetState }) => (
  <Table dark>
    <thead>
      <tr>
        <th>Nazwa zadania</th>
        <th>Opis</th>
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
        users.map((user) => (
          <UsersListRow user={user} resetState={resetState} />
        ))
      )}
    </tbody>
  </Table>
);
export default UserList;
