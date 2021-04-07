import React, {useState} from 'react';
import axios from "axios";
import { API_URL } from "../../constants";
import NewUserModal from "../NewUserModal/NewUserModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal/ConfirmRemovalModal";
import TaskButton from "../TaskButtonModal/TaskButtonModal";
import styles from "../UserList/UserList.module.css";
import PropTypes from 'prop-types';

const UsersListRow = ({user,resetState}) => {
    const [taskFlag, setTaskFlag] = useState(
      false
  )
  
  const ontoggleTaskFlag = () => {
    setTaskFlag(previous => (
        !previous
      ));
  };
  
  const deleteUser = async(id) => {
    try{
      await axios.delete(`${API_URL}${id}/`)
      resetState()
    } catch (error){
      console.log(error)
    }
  };
  
  return(
    <tr className = {taskFlag ? styles.ButtonTrue : styles.ButtonFalse} key={user.id}>
      <td>{user.name}</td>
      <td className={styles.Svg}>{user.password}</td>
      <td>{user.registrationDate}</td>
      <td align="center">
        <TaskButton
          id = {user.id}
          deleteUser = {deleteUser}
          taskFlag = {taskFlag}
  
          ontoggleTaskFlag = {ontoggleTaskFlag}
        />
        &nbsp;&nbsp;
        <NewUserModal
          create={false}
          user={user.id}
          resetState={resetState}
        />
        &nbsp;&nbsp;
        <ConfirmRemovalModal
          id= {user}
          deleteUser={deleteUser}
        />
      </td>
    </tr>
  )
  }

  UsersListRow.propTypes = {
    user: PropTypes.object,
    resetState: PropTypes.func
  }

  export default UsersListRow;

