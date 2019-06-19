import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Pickerhome from '../../Pickerhome/pickerhome';
import Selecthome from '../../selectforhome/selecthome';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
/*import LocationCity from '@material-ui/icons/LocationCity';*/
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

   
const styles = theme => ({
  headerhomeimg: {
  backgroundImage: 'url(../../static/banner-home.jpeg)',
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
    color: 'lightgrey',
    fontWeight: 'bold',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: '3',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'whitesmoke',
    marginLeft: '5%',
    borderRadius: '5px',
    boxShadow: '6px 6px 5px -6px black',

    [theme.breakpoints.down('xs')]: { // extra-large: 1920px or larger
      width: '94%',
      left: '45%',
      top: '75%',
    },
    [theme.breakpoints.up('sm')]: { // extra-large: 1920px or larger
      width: '75%',
      left: '45%',
      top: '60%',
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: '45%',
      left: '23%',
      top: '50%',
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: '30%',
      top: '50%',
      left: '20%',
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: '30%',
      top: '50%',
      left: '20%',
    },
  },
  headerhome2: {
    color: 'whitesmoke!important',
    fontWeight: 'bold',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: '3',
    padding: '20px',
    textAlign: 'center!important',

    [theme.breakpoints.up('xs')]: { // extra-large: 1920px or larger
      width: '50%',
      left: '50%',
      top: '25%',
    },
    [theme.breakpoints.down('sm')]: { // extra-large: 1920px or larger
      width: '50%',
      left: '50%',
      top: '25%',
      display: 'none'
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: '45%',
      left: '75%',
      top: '50%',
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: '30%',
      top: '50%',
      left: '75%',
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: '30%',
      top: '50%',
      left: '75%',
    },
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
  },
  homepunchline: {
    color: 'lightgrey!important',
  },
  homeform: {
    color: '#505050!important',
    textAlign: 'left',
    paddingLeft: '25px',
  },
  selecthomecategory:{
    paddingBottom: "15px",
  },
  pickerhomelocation: {
    paddingBottom: "15px",
  },
  button: {
    marginTop: "15px",
  },
});

const Homeheader = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <div className={classes.headerhomeimg}></div>
      <div className={classes.headeroverlay}></div>
      <div className={classes.headerhome2}>
        <Grid container>
          <Grid item xs={12}>
          <Typography><h1 className={classes.homepunchline}>Find amazing services provided by great people</h1></Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.headerhome}>
        <Grid container>
          <Grid item xs={12}>
          <Typography><h2 className={classes.homeform}>Et si vous pouviez reserver n'importe quel service immediatement ?</h2></Typography>
          </Grid>
        <Grid item xs={12}>
        <form className={classes.formlabel}>
        <div className={classes.selecthomecategory}>
          <Selecthome  />
        </div>
        <div className={classes.pickerhomelocation}>
          <Grid container alignItems="center">
            <Grid item className={classes.pickerhomelocation}>
              <TextField
                disabled
                id="standard-disabled"
                defaultValue="Rouen, FR"
                style={{textAlign: "center", width: "200px"}}
                margin="normal"
              />
            </Grid>
            </Grid>
          </div>
        
        <Pickerhome />
        <Button variant="outlined" className={classes.button}>
        Rechercher
      </Button>
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
