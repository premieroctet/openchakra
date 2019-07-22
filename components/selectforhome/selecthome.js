import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '104.7%', 
    borderRadius:'3px',
    padding:10,
   
  },
});
function Selecthome(props) {
    const { classes } = props;
  const [values, setValues] = React.useState({
    services: '',
  });

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form className={classes.root} autoComplete="on">
      <FormControl className={classes.formControl}>
        <TextField
        id="outlined-select"
        select
        label="Quel service ?"
        style={{textAlign: "center", width: "104.7%",
                borderRadius:'3px',
                padding:10,
              fontSize: '30!important',}}
        className={classes.textField}
        value={values.services}
        SelectProps={{ 
          MenuProps: {
            className: classes.menu,
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
      />
      </FormControl>
    </form>
  );
}

export default withStyles(styles)(Selecthome);
