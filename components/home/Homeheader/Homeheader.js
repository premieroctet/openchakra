import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Pickerhome from '../../Pickerhome/pickerhome';
import Selecthome from '../../selectforhome/selecthome';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
/*import LocationCity from '@material-ui/icons/LocationCity';*/
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import '../../../static/stylebg.css'

   
const styles = theme => ({
  headerimg: {
    [theme.breakpoints.up('lg')]: { // medium: 960px or larger
     display: 'none',
    },

  /* Center and scale the image nicely */
  backgroundImage: 'url(../../../static/bg.jpg)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  top: '0%',
  left: '0%',
  zIndex: '2',
  width: '100%',
  minHeight: '122vh',
  },
  headerhomevid: {

    [theme.breakpoints.down('md')]: { // medium: 960px or larger
      backgroundAttachment: "fixed",
     display: 'none',
    },
  /* Full height */
  height: '100vh!important',
  width: '100%!important',

  /* Center and scale the image nicely */
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
    
    
  },
  headeroverlay: {
    [theme.breakpoints.up('lg')]: { // medium: 960px or larger
      backgroundAttachment: "fixed",
     display: 'none',
    },
    position: 'absolute',
    top: '0%',
    left: '0%',
    zIndex: '2',
    width: '100%',
    minHeight: '90vh',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.4), rgba(0,0,0,.3), rgba(0,0,0,.2), rgba(255,255,255,0))',
  },
  headerhome: {
    color: 'lightgrey',
    fontWeight: 'bold',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: '3',
    textAlign: 'center',
    backgroundColor: 'whitesmoke',
    marginLeft: '5%',
    borderRadius: '10px',
    boxShadow: '6px 6px 5px -6px black',
    padding:'2%',
    minHeight:'580px', 
    bottom:50, 
    marginTop:-10,


    [theme.breakpoints.down('xs')]: { // extra-large: 1920px or larger
      width: '88%',
      left: '45%',
      top: '60%',
    },
    [theme.breakpoints.up('sm')]: { // extra-large: 1920px or larger
      width: '75%',
      left: '45%',
      top: '55%',
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: '40%',
      left: '23%',
      top: '55%',
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: '28%',
      top: '55%',
      left: '20%',
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: '28%',
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
      width: '40%',
      top: '50%',
      left: '75%',
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: '40%',
      top: '50%',
      left: '75%',
    },
  },
  input: {
    display: 'none',
   
  },
  locationcity: {
    color: 'black',
    width:'100%',
  },
  formlabel: {
    //display: 'inline-block',
    textAlign: 'center',
    width:'100%',
    marginBottom: '-60px',
    
  },
  paper: {
    zIndex:'99999',
    position: 'fixed',
    width: 400,
    backgroundColor: 'white',
    boxShadow: '0 0 7px black',
    padding: 'auto',
    top: '25%',
    left: '25%',
    transform: 'translate(50%, 50%)',
  },
  homepunchline: {
    color: 'lightgrey!important',
  },
  homeform: {
    color: '#505050!important',
    textAlign: 'left',
    width:'100%',
    fontSize: '30px!important',
    fontFamily: 'Helvetica',
    letterSpacing: '-1px',
    lineHeight: '39px!important',
    paddingLeft: '20px',
  },
  selecthomecategory:{
    marginBottom: '-15px',
    marginTop: '-30px',
    marginLeft: '-9px',
  },
  pickerhomelocation: {
    width:'100%',
  },
  button: {
    width:'100%',
    color: 'white',
    padding:15,
    borderRadius:10,
    border:'0px solid transparent',

  },
});


class Homeheader extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         popopen: false,
      };
    }

handleClick1 =() => {
  this.setState({ popopen: true });
};

handleClose =() =>{
  this.setState({ popopen: false });
}


render() {
  const {classes} = this.props;
  const {popopen} = this.state;

  return (
    <Fragment>
      <div className={classes.headerimg}></div>
      <div className={classes.headerhomevid}>
        <video id="background-video" loop autoPlay muted playsinline style={{width: '100%'}}>
          <source src="../../../static/bgmyalfredlight.mp4" type="video/mp4" />
          <source src="../../../static/bgmyalfredlight.mp4" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={classes.headeroverlay}></div>
      <div className={classes.headerhome} onClick={this.handleClick1}>
        <Grid container>
          <Grid item xs={12}>
          <Typography><h3 className={classes.homeform}>Et si vous pouviez réserver n'importe quel service immediatement ?</h3></Typography>
          </Grid>
        <Grid item xs={12}  style={{ width:'100%',}}>
        <form className={classes.formlabel} style={{ width:'100%',}} >
        <div className={classes.selecthomecategory} style={{ width:'100%', }}>
          <Selecthome  />
        </div>
        <div className={classes.pickerhomelocation}>
          <Grid container alignItems="center">
            <Grid item className={classes.pickerhomelocation}>
              <TextField
                disabled
                id="standard-disabled"
                defaultValue="Rouen, FR"
                style={{textAlign: "center", width: "100%",
                borderRadius:'3px',
                padding:10,}}
                margin="normal"
                variant="outlined"
                label="Lieu"
              />
            </Grid>
            </Grid>
          </div>
        
          
          

        <Pickerhome />
        <Button variant="contained" color={'primary'} className={classes.button}>
        Rechercher
      </Button>
        </form>
        </Grid>
        </Grid>
        
        
        
      
      </div>
      


        {popopen ? <React.Fragment>
          <div className={classes.paper}>
            <Grid container>
              <Grid item xs={11} style={{height: '1px'}}></Grid>
              <Grid item xs={1} style={{height: '4px', zIndex: '10'}}>
                <p onClick={this.handleClose} style={{color: '#F8727F', cursor: 'pointer'}}>x</p>
              </Grid>
              <Grid item xs={12}>
                <h2 style={{textAlign: 'center'}}>Les réservations ne seront disponible qu'à partir d'octobre</h2>
              </Grid>
            </Grid>
          </div>
          
          <div onClick={this.handleClose} style={{position: 'absolute' , top: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '9999px', height: '9999px', zIndex: '99998'}}></div>
        </React.Fragment>
        : null}


      <div style={{textAlign: 'left'}} className={classes.headerhome2}>
        
        <br/>
        <h2 style={{fontWeight: 'bold',textAlign: 'left', fontSize: '2rem', textShadow: '0px 0.5px 2px #696969'}}>Vous connaissez Airbnb pour les logements ?
          Découvrez My-Alfred pour les services ! </h2>
        <hr style={{float: 'left', width: '60px', border:'none', height:'1px', backgroundColor: 'white', boxShadow: '1px 1px 1px #696969' }}/>
        <br/><br/>
        <h4 style={{fontWeight: 'bold',textAlign: 'left', fontSize: '1.5rem', textShadow: '0px 0.5px 2px #696969'}}>
          We are coming soon !
        </h4>
        <br/>
        <p style={{fontSize: '1.2em', textAlign: 'left', fontSize: '1.2rem', textShadow: '0px 0.5px 2px #696969'}}>
          Créez votre boutique maintenant en quelques minutes, répertoriez vos services,
          indiquez vos disponibilités, vos tarifs et profitez d’un complément de revenu !
        </p>
      </div>
      
    </Fragment>
  );
};
};



export default withStyles(styles)(Homeheader);
