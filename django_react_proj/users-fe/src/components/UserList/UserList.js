import React from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";
import NewUserModal from "../NewUserModal/NewUserModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal/ConfirmRemovalModal";
import TaskButton from "../TaskButtonModal/TaskButtonModal";
import styles from "./UserList.module.css"

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
        <th>Nazwa zadania</th>
        <th>Opis</th>
        <th>Data rejestracji</th>
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
};
export default UserList;