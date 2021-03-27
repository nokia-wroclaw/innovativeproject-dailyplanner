import React, { useEffect, useState }  from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";
const NewUserForm = ({
  user,
  resetState,
  toggle
}) => {
  const [name,setName]=useState(user?.name || "");
  const [password,setPassword]=useState(user?.password || "");

  const onNameChange = event => {
    setName(event.target.value)
  };
  const onPasswordChange = event => {
    setPassword(event.target.value)
  };

  const defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };
const createUser = async (event) => {
  event.preventDefault();
  await axios.post(API_URL, {
    id: user?.id, name, password
  })
  resetState();
  toggle();
};
const editUser = async (event) =>{
  event.preventDefault();
  await axios.put(API_URL + user.id + '/', {
    id: user.id, name, password
  })
  resetState();
  toggle();
} ;
return (
  <Form onSubmit={user ? editUser : createUser}>
    <FormGroup>
      <Label for="name">Nazwa użytkownika:</Label>
      <Input
        type="text"
        name="name"
        onChange={onNameChange}
        value={defaultIfEmpty(name)}
      />
    </FormGroup>
    <FormGroup>
      <Label for="password">Hasło:</Label>
      <Input
        type="password"
        name="password"
        onChange={onPasswordChange}
        value={defaultIfEmpty(password)}
      />
    </FormGroup>
    <Button>Zapisz</Button>
  </Form>
);
};

export default NewUserForm;