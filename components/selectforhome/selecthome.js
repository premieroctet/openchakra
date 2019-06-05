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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 200,
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
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          value={values.services}
          onChange={handleChange}
          input={<Input name="services" id="service-auto-width" />}
          autoWidth
        >
          <MenuItem value="">
            <em>Aucune</em>
          </MenuItem>
          <MenuItem value={'coiffure'}>Coiffure</MenuItem>
          <MenuItem value={'plomberie'}>Plomberie</MenuItem>
          <MenuItem value={'cuisine'}>Cuisine</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}

export default withStyles(styles)(Selecthome);