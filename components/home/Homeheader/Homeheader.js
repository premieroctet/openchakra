import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Pickerhome from '../../Pickerhome/pickerhome';
import Selecthome from '../../selectforhome/selecthome';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
/*import LocationCity from '@material-ui/icons/LocationCity';*/
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import { Block } from '@material-ui/icons';


const styles = theme => ({
  headerhomeimg: {
    marginTop: 64,
    backgroundImage: 'url(../../static/bailey-zindel-396399-unsplash.jpg)',
    backgroundRepeat: "no-repeat",
	backgroundPosition: "center center",
	backgroundSize: "cover",
	backgroundAttachment: "fixed",
    width: '100%',
    height: 650,
  },
  headeroverlay: {
    marginTop: 64,
    position: 'absolute',
    top: '0%',
    left: '0%',
    zIndex: '2',
    width: '100%',
    height: 650,
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.4), rgba(0,0,0,.3), rgba(0,0,0,.2), rgba(255,255,255,0))',
  },
  headerhome: {
  color: 'white',
  fontWeight: 'bold',
  position: 'absolute',
  top: '40%', 
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '3',
  width: '80%',
  padding: '20px',
  textAlign: 'center',
  },
  input: {
    display: 'none',
  },
  locationcity: {
    color: 'black',
  },
  formlabel: {
    display: 'inline-block',
    textAlign: 'center',
  }
});

const Homeheader = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <div className={classes.headerhomeimg}></div>
      <div className={classes.headeroverlay}></div>
      <div className={classes.headerhome}>
        <Grid container>
          <Grid item xs={12}>
          <Typography><h1>MyAlfred</h1></Typography>
          </Grid>
        <Grid item xs={12}>
        <form className={classes.formlabel}>
        
          <Selecthome />
        
          <Grid container alignItems="flex-end">
            <Grid item>
              <TextField
                disabled
                id="standard-disabled"
                defaultValue="Rouen, FR"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            </Grid>
          
        
        <Pickerhome />
        
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
        <IconButton className={classes.button} aria-label="Search" color="white">
        <Search />
      </IconButton>
      </label>
        </form>
        </Grid>
        </Grid>
        
      </div>
    </Fragment>
  );
};

Homeheader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Homeheader);
