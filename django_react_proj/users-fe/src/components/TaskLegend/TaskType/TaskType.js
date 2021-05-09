import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

const TaskType = ({ type, className }) => (
  <Row>
    <div className="col-sm-2">
      <div className={className} />
      <tr>{type}</tr>
    </div>
  </Row>
);

TaskType.propTypes = {
  type: PropTypes.string,
  className: PropTypes.any,
};

export default TaskType;
