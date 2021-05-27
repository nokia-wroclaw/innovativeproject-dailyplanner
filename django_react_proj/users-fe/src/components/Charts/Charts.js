import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import TaskTypeChart from '../TaskTypeChart/TaskTypeChart';
import TaskTimeStaticChart from '../TaskTimeStaticChart/TaskTimeStaticChart';
import TaskProgressChart from '../TaskProgressChart/TaskProgressChart';
import Subtract from '../SummingTime/SummingTime';

const Charts = ({ setWH, setWM, WH, WM, users, workHours }) => (
  <>
    <Col span={5} offset={10}>
      <Subtract setWH={setWH} setWM={setWM} users={users} workHours={workHours} />
    </Col>
    <Row>
      <Col span={4} offset={4}>
        <TaskTypeChart users={users} />
      </Col>
      <Col span={4} offset={5}>
        <TaskTimeStaticChart WH={WH} WM={WM} workHours={workHours} />
      </Col>
    </Row>
    <Row>
      <Col span={4} offset={4}>
        <TaskProgressChart users={users} />
      </Col>
    </Row>
  </>
);
Charts.propTypes = {
  users: PropTypes.array,
  setWH: PropTypes.func,
  setWM: PropTypes.func,
  WH: PropTypes.number,
  WM: PropTypes.number,
  workHours: PropTypes.number,
};
export default Charts;
