import React from "react";
import { Button } from "reactstrap";
import styles from "./TaskButtonModal.module.css";

const TaskButton = (props) => {
  return (
    <>
      <Button
        color = {'primary'}
        onClick={() => props.ontoggleTaskFlag()}
      >
        TASKBUTTON
      </Button>
    </>
  );
};

export default TaskButton;