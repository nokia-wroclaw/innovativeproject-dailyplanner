import React, { useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Table, Tag, Space } from 'antd';
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
import { WorkHoursContext } from '../WorkHoursContext/WorkHoursContext';

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
      await axios.patch(`${API_URL + user.id}/`, {
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
    await axios.patch(`${API_URL + user.id}/`, {
      startTime: addDays(new Date(user.startTime), 1),
      endTime: addDays(new Date(user.endTime), 1),
    });
    toast.info('You moved task to the next day!');
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
    <Space>
      <PreviousDayButton moveToPreviousDay={moveToPreviousDay} />
      <NextDayButton moveToNextDay={moveToNextDay} />
      <TaskButton setDoneState={setDoneState} />
      <NewUserModal create={false} user={user} resetState={resetState} />
      <ConfirmRemovalModal id={user.id} deleteUser={deleteUser} />
    </Space>
  );
};

const UserList = ({ users = [], resetState }) => {
  const { types } = useContext(WorkHoursContext);
  return (
    <div className={styles.Mytable}>
      <Table pagination={{ position: ['none', 'none'] }} dataSource={users}>
        <Column
          className={styles.ColumnTN}
          title="Task Name"
          dataIndex="taskName"
          sortDirections={['descend', 'ascend']}
          sorter={(a, b) => a.taskName.localeCompare(b.taskName)}
        />
        <Column
          className={styles.Description}
          title="Description"
          dataIndex="taskDescription"
          sortDirections={['descend', 'ascend']}
          sorter={(a, b) => a.taskDescription.localeCompare(b.taskDescription)}
        />
        <Column
          className={styles.ColumnTT}
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
          className={styles.ColumnTP}
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
          className={styles.ColumnTTT}
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
            const whereIsMyTask = types.find((type) => type.name === taskType);
            console.log(whereIsMyTask);
            if (user.done) {
              if (whereIsMyTask !== undefined) {
                return (
                  <>
                    <Tag color="#6a1b9a">DONE</Tag>
                    <Tag color={whereIsMyTask.color.hex}>{whereIsMyTask.name}</Tag>
                  </>
                );
              }
              return (
                <>
                  <Tag color="#6a1b9a">DONE</Tag>
                </>
              );
            }
            if (whereIsMyTask !== undefined) {
              return <Tag color={whereIsMyTask.color.hex}>{whereIsMyTask.name}</Tag>;
            }
          }}
        />
        <Column
          title=""
          render={(value, user) => <Actions user={user} resetState={resetState} />}
        />
      </Table>
    </div>
  );
};

Actions.propTypes = {
  user: PropTypes.object,
  resetState: PropTypes.func,
};
UserList.propTypes = {
  users: PropTypes.array,
  resetState: PropTypes.func,
};
export default UserList;
