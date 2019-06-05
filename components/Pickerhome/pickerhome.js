import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
    color: 'white!important',
  },
});

const Pickerhome = (props) => {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField 
        className="colorpicker"
        id="datetime-local"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

export default withStyles(styles)(Pickerhome);