import React, { useState, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import styles from './ConfirmRemovalModal.module.css';
import axios from "axios";
import { API_URL } from "../../constants";

const ConfirmRemovalModal = (props) => {
  const [modalFlag, setModalFlag] = useState(
        false
  )
<<<<<<< HEAD

=======
>>>>>>> Develop
  const toggle = () => {
    setModalFlag(previous => (
       !previous
     ));
  };
  
  const handlerDeleteUser = async id => {
    try {
      await props.deleteUser(id)
<<<<<<< HEAD
      toggle() 
    } catch (error) {
      console.log(error)
    } 
  };
=======
      toggle()  
    } catch (error) {
      console.log(error)
    } 
   };
>>>>>>> Develop

  return (
    <Fragment>
      <Button 
      className = {styles.delete} 
      onClick={() => toggle()}>
        Usuń
      </Button>

      <Modal isOpen={modalFlag} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Czy chcesz usunąć zadanie?
        </ModalHeader>

        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Anuluj
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => handlerDeleteUser(props.id)}
          >
            Tak
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default ConfirmRemovalModal;

