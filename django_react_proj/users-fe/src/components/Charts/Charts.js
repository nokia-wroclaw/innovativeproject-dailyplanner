import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import TaskTypeChart from '../TaskTypeChart/TaskTypeChart';
import TaskTimeStaticChart from '../TaskTimeStaticChart/TaskTimeStaticChart';
import TaskProgressChart from '../TaskProgressChart/TaskProgressChart';
import Subtract from '../SummingTime/SummingTime';

const Charts = ({ users }) => (
  <>
    <Col span={5} offset={10}>
      <Subtract users={users} />
    </Col>
    <Row>
      <Col span={4} offset={4}>
        <TaskTypeChart users={users} />
      </Col>
      <Col span={4} offset={5}>
        <TaskTimeStaticChart />
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
};
export default Charts;
