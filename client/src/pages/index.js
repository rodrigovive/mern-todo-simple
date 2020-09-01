import React from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import List from "../components/List";
import Modal from "../components/Modal";
import Form from "../components/Form";
import {
  useTodoDispatchContext,
  useTodoStateContext,
  ADD_TODO,
} from "../context/todo";

const Home = () => {
  const [openModalForm, setOpenModalForm] = React.useState(false);

  const dispatchTodo = useTodoDispatchContext();
  const todos = useTodoStateContext();
  console.log("todos", todos);
  const handleClickOpenForm = () => {
    setOpenModalForm(true);
  };

  const handleSubmitCreate = (value) => {
    dispatchTodo({
      type: ADD_TODO,
      payload: value,
    });
  };

  const handleCloseModal = () => {
    setOpenModalForm(false);
  };

  return (
    <Box mt={2}>
      <Typography variant="h1">TODO APP</Typography>
      <Button
        color="primary"
        type="button"
        onClick={handleClickOpenForm}
        variant="contained"
      >
        Create todo
      </Button>
      <Button color="secondary" variant="contained">
        Delete todo
      </Button>
      <Box mt={3}>
        <Typography variant="h4">Your list:</Typography>
      </Box>

      <Box>
        <List todos={todos} />
      </Box>
      <Modal open={openModalForm} handleClose={handleCloseModal}>
        <Form handleSubmit={handleSubmitCreate} />
      </Modal>
    </Box>
  );
};

export default Home;
