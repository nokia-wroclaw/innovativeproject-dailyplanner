import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

const TaskType = ({ type, className }) => (
  <Row>
    <div className={className} />
    <tr>{type}</tr>
  </Row>
);

TaskType.propTypes = {
  type: PropTypes.string,
  className: PropTypes.any,
};

export default TaskType;
