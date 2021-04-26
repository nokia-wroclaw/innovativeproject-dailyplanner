import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

const TaskType = ({ type, circle }) => (
  <Row>
    <div className="col-sm-2">
      <div className={circle} />
      <tr>{type}</tr>
    </div>
  </Row>
);

TaskType.propTypes = {
  type: PropTypes.string,
  circle: PropTypes.any,
};

export default TaskType;
