import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing,
    marginRight: theme.spacing,
    width: 150,
  },
});

function Datenaissance(props) {
  const {classes} = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date de naissance"
        type="date"
        defaultValue="1995-01-01"
        name="birthday"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormHelperText>Quel est votre date de naissance ?</FormHelperText>
    </form>
  );
}

Datenaissance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Datenaissance);
