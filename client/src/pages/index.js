import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import List from "../components/List";
import Modal from "../components/Modal";
import Form from "../components/Form";
import {
  useTodoDispatchContext,
  useTodoStateContext,
  ADD_TODO,
  getTodos,
  createTodo,
  deleteTodo,
} from "../context/todo";

const Home = () => {
  const [openModalForm, setOpenModalForm] = React.useState(false);

  const dispatchTodo = useTodoDispatchContext();
  const todos = useTodoStateContext();
  const handleClickOpenForm = () => {
    setOpenModalForm(true);
  };
  const handleCloseModal = () => {
    setOpenModalForm(false);
  };
  const handleSubmitCreate = async (value) => {
    handleCloseModal();
    await createTodo(value, dispatchTodo);
  };
  React.useEffect(() => {
    getTodos(dispatchTodo);
  }, [dispatchTodo]);
  const handleDelete = async (data) => {
    await deleteTodo(Object.values(data), dispatchTodo);
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

      <Box mt={3}>
        <Typography variant="h4">Your list:</Typography>
      </Box>

      <Box>
        <List handleDelete={handleDelete} todos={todos} />
      </Box>
      <Modal open={openModalForm} handleClose={handleCloseModal}>
        <Form handleSubmit={handleSubmitCreate} />
      </Modal>
    </Box>
  );
};

export default Home;
