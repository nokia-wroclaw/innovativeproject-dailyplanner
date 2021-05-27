import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import { format, addDays, isSameDay } from 'date-fns';
import { toast } from 'react-toastify';
import TaskButton from '../TaskButtonModal/TaskButtonModal';
import NewUserModal from '../NewUserModal/NewUserModal';
import ConfirmRemovalModal from '../ConfirmRemovalModal/ConfirmRemovalModal';
import { API_URL } from '../../constants';
import styles from './UserList.module.css';
import NextDayButton from '../NextDayButton/NextDayButton';
import PreviousDayButton from '../PreviousDayButton/PreviousDayButton';

const { Column } = Table;

const Actions = ({ user, resetState }) => {
  const setDoneState = async () => {
    await axios.patch(`${API_URL + user.id}/`, {
      done: !user.done,
    });
    resetState();
  };
  const moveToPreviousDay = async () => {
    const result = isSameDay(new Date(), new Date(user.startTime));
    if (result === false) {
      await axios.put(`${API_URL + user.id}/`, {
        startTime: addDays(new Date(user.startTime), -1),
        endTime: addDays(new Date(user.endTime), -1),
      });
      resetState();
      toast.info('You moved task to the previous day!');
    } else if (result === true) {
      toast.info('You cant move task to previous day!');
      resetState();
    }
  };
  const moveToNextDay = async () => {
    await axios.put(`${API_URL + user.id}/`, {
      startTime: addDays(new Date(user.startTime), 1),
      endTime: addDays(new Date(user.endTime), 1),
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
      <PreviousDayButton moveToPreviousDay={moveToPreviousDay} />
      <NextDayButton moveToNextDay={moveToNextDay} />
      <TaskButton setDoneState={setDoneState} />
      <NewUserModal create={false} user={user} resetState={resetState} />
      <ConfirmRemovalModal id={user.id} deleteUser={deleteUser} />
    </>
  );
};

const UserList = ({ users = [], resetState }) => (
  <div className={styles.Mytable}>
    <Table pagination={{ position: ['none', 'none'] }} dataSource={users}>
      <Column
        title="Task Name"
        dataIndex="taskName"
        sortDirections={['descend', 'ascend']}
        sorter={(a, b) => a.taskName.localeCompare(b.taskName)}
      />
      <Column
        title="Description"
        dataIndex="taskDescription"
        sortDirections={['descend', 'ascend']}
        sorter={(a, b) => a.taskDescription.localeCompare(b.taskDescription)}
      />
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
        title="Task Priority"
        dataIndex="taskPriority"
        sortDirections={['descend', 'ascend']}
        sorter={(a, b) => a.taskPriority - b.taskPriority}
        render={(taskPriority) => {
          let priority = '';
          if (taskPriority === 1) {
            priority = (
              <div>
                <ExclamationOutlined style={{ color: '#ffa940', fontSize: '200%' }} />
              </div>
            );
          }
          if (taskPriority === 2) {
            priority = (
              <div>
                <ExclamationOutlined style={{ color: '#cf1322', fontSize: '200%' }} />
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
        title="Task Type"
        dataIndex="taskType"
        sortDirections={['descend', 'ascend']}
        sorter={(a, b) => a.taskType.localeCompare(b.taskType)}
        filters={[
          {
            text: 'Email',
            value: 'Email',
          },
          {
            text: 'Meeting',
            value: 'Meeting',
          },
          {
            text: 'Housework',
            value: 'Housework',
          },
        ]}
        onFilter={(value, record) => record.taskType.indexOf(value) === 0}
        render={(taskType, user) => {
          if (user.done) {
            if (taskType === 'Meeting') {
              return (
                <>
                  <Tag color="#6a1b9a">DONE</Tag>
                  <Tag color="#f50">Meeting</Tag>
                </>
              );
            }
            if (taskType === 'Email') {
              return (
                <>
                  <Tag color="#6a1b9a">DONE</Tag>
                  <Tag color="#2db7f5">Email</Tag>
                </>
              );
            }
            if (taskType === 'Housework') {
              return (
                <>
                  <Tag color="#6a1b9a">DONE</Tag>
                  <Tag color="#87d068">Housework</Tag>
                </>
              );
            }
          } else {
            if (taskType === 'Meeting') {
              return <Tag color="#f50">Meeting</Tag>;
            }
            if (taskType === 'Email') {
              return <Tag color="#2db7f5">Email</Tag>;
            }
            if (taskType === 'Housework') {
              return <Tag color="#87d068">Housework</Tag>;
            }
          }
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
