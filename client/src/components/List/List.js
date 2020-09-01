import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
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

function CheckboxesGroup({ todos = [], error = false }) {
  const classes = useStyles();
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FormControl
        required
        error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormGroup>
          {todos.map(({ id = "id" } = {}) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={state[id]}
                  onChange={handleChange}
                  name="tes"
                />
              }
              label="Gilad Gray"
            />
          ))}
        </FormGroup>
        {error && <FormHelperText>You can display an error</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default CheckboxesGroup;
