import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import TaskButton from '../TaskButtonModal/TaskButtonModal';
import NewUserModal from '../NewUserModal/NewUserModal';
import ConfirmRemovalModal from '../ConfirmRemovalModal/ConfirmRemovalModal';
import { API_URL } from '../../constants';
import styles from './UserList.module.css';

const { Column } = Table;

const Actions = ({ user, resetState }) => {
  const setDoneState = async () => {
    await axios.patch(`${API_URL + user.id}/`, {
      done: !user.done,
    });
    resetState();
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
      <TaskButton setDoneState={setDoneState} />
      <> </>
      <NewUserModal create={false} user={user} resetState={resetState} />
      <> </>
      <ConfirmRemovalModal id={user.id} deleteUser={deleteUser} />
    </>
  );
};

const UserList = ({ users = [], resetState }) => (
  <div className={styles.Mytable}>
    <Table pagination={{ position: ['none', 'none'] }} dataSource={users}>
      <Column title="Task name" dataIndex="taskName" />
      <Column title="Description" dataIndex="taskDescription" />
      <Column
        title="Task Time"
        dataIndex="taskName"
        render={(value, user) =>
          `${format(new Date(user.startTime), 'HH:mm')} - ${format(
            new Date(user.endTime),
            'HH:mm'
          )}`
        }
      />
      <Column
        title="Task priority"
        dataIndex="taskPriority"
        render={(taskPriority) => {
          let priority = '';
          if (taskPriority === 2) {
            // priority = '#ffc069';
            priority = (
              <div>
                <ExclamationOutlined style={{ color: '#ffa940', fontSize: '200%' }} />
              </div>
            );
          }
          if (taskPriority === 3) {
            priority = (
              <div>
                <ExclamationOutlined style={{ color: '#cf1322', fontSize: '200%' }} />
                <ExclamationOutlined style={{ color: '#cf1322', fontSize: '200%' }} />
              </div>
            );
          }
          return priority;
        }}
      />
      <Column
        title="Task type"
        dataIndex="taskType"
        render={(taskType, user) => {
          let rowColor = '';

          if (user.done) {
            rowColor = styles.ButtonTrue;
          } else {
            if (taskType === 'Meeting') {
              rowColor = styles.Meeting;
            }
            if (taskType === 'Email') {
              rowColor = styles.Email;
            }
            if (taskType === 'Housework') {
              rowColor = styles.Housework;
            }
          }

          return <div style={{ height: '30px', width: '30px' }} className={rowColor} />;
        }}
      />
      <Column title="" render={(value, user) => <Actions user={user} resetState={resetState} />} />
    </Table>
  </div>
);

Actions.propTypes = {
  user: PropTypes.object,
  resetState: PropTypes.func,
};
UserList.propTypes = {
  users: PropTypes.array,
  resetState: PropTypes.func,
};
export default UserList;
