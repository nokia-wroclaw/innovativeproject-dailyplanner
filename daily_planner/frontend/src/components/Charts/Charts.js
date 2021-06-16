import { Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import TaskTypeChart from '../TaskTypeChart/TaskTypeChart';
import TaskTimeStaticChart from '../TaskTimeStaticChart/TaskTimeStaticChart';
import TaskProgressChart from '../TaskProgressChart/TaskProgressChart';
import Subtract from '../SummingTime/SummingTime';
import commonStyles from '../CommonCSS/CommonCSS.module.css';

const Charts = ({ users, currentDate }) => (
  <>
    <Row style={{ marginTop: '20px' }}>
      <Col span={2} offset={8}>
        <Button className={commonStyles.inbtn} type="button" shape="round" size="large">
          Displayed day: {new Date(currentDate).toDateString().substring(3, 10)}
        </Button>
      </Col>
      <Col span={2} offset={3}>
        <Button className={commonStyles.inbtn} type="button" shape="round" size="large">
          <Subtract users={users} />
        </Button>
      </Col>
    </Row>
    <Row style={{ marginTop: '20px' }}>
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
  currentDate: PropTypes.any,
};
export default Charts;
