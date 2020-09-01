import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function CheckboxesGroup({ todos = [], error = false, handleDelete }) {
  const classes = useStyles();
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClickDelete = () => {
    const todosSelected = Object.keys(state).filter((key) => state[key]);
    handleDelete(todosSelected);
    setState({});
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <FormControl
          required
          error={error}
          component="fieldset"
          className={classes.formControl}
        >
          <FormGroup>
            {todos.map(({ id = "id", text = "text" }) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    checked={!!state[id]}
                    onChange={handleChange}
                    name={id}
                  />
                }
                label={text}
              />
            ))}
          </FormGroup>
          {error && <FormHelperText>You can display an error</FormHelperText>}
        </FormControl>
      </Grid>
      {!!Object.keys(state).length && (
        <Box>
          <Button
            onClick={handleClickDelete}
            color="secondary"
            variant="contained"
          >
            Delete todo
          </Button>
        </Box>
      )}
    </div>
  );
}

export default CheckboxesGroup;
