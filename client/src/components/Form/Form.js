import React from "react";
import { Grid, Box, Typography, Button, TextField } from "@material-ui/core";

const Form = ({ handleSubmit, textInit }) => {
  const [text, setText] = React.useState(textInit);
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  return (
    <form handleSubmit={handleSubmit}>
      <Typography variant="h3">Create todo item:</Typography>
      <Box my={4}>
        <TextField
          fullWidth
          id="text-todo"
          label="Text todo"
          variant="outlined"
          value={text}
          onChange={handleChangeText}
        />
      </Box>

      <Button variant="contained" color="primary" type="submit">
        Create
      </Button>
    </form>
  );
};

export default Form;
