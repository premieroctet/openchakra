import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
    color: 'white!important',
    
  },
});


const Pickerhome = (props) => {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate  >
      <Grid container><Grid item xs={6}>
      <TextField 
        className="colorpicker"
        id="outlined-name"
        label="Date"
          margin="normal"
          variant="outlined"
        color= 'gray'
        type="date"
        defaultValue="aaaa-jj-mm"
        className={classes.textField}
        style={{
        borderRadius:'3px',
    padding:10,}}
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>
      <Grid item xs={6}>
      <TextField 
        className="colorpicker"
        id="outlined-name"
        label="Heure"
          margin="normal"
          variant="outlined"
        type="time"
        defaultValue="hh:mm"
        color= 'gray'
        className={classes.textField}
        style={{
        borderRadius:'3px',
    padding:10,}}
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline
          },
          
        }}
        
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid></Grid>
    </form>
  );
}

export default withStyles(styles)(Pickerhome);

