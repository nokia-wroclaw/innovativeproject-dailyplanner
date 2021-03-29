import React from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";

import NewUserModal from "../NewUserModal/NewUserModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal/ConfirmRemovalModal";

const UserList = ({
  users = [],
  resetState
}) => {
  const deleteUser = async(id) => {
    try{
      await axios.delete(`${API_URL}${id}/`)
      resetState()
    } catch (error){
      console.log(error)
    }
  };

return (
  <Table dark>
    <thead>
      <tr>
        <th>Nazwa użytkownika</th>
        <th>Hasło</th>
        <th>Data rejestracji</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {users.length === 0 ? (
        <tr>
          <td colSpan="6" align="center">
            <b>Nikogo jeszcze tu nie ma!</b>
          </td>
        </tr>
      ) : (
        users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.password}</td>
            <td>{user.registrationDate}</td>
            <td align="center">
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
};
export default UserList;