import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";

import NewUserModal from "../NewUserModal/NewUserModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal/ConfirmRemovalModal";

class UserList extends Component {
  
  async deleteUser(id){
    try {
      await axios.delete(`${API_URL}${id}/`)
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    const users = this.props.users;
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
          {!users || users.length <= 0 ? (
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
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    id= {user.id}
                    deleteUser={this.deleteUser}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default UserList;