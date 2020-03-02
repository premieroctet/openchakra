import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DatePicker, {registerLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr);

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
      width: '31%',
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
  homeform: {
    color: '#505050!important',
    textAlign: 'left',
    width:'100%',
    fontSize: '28px!important',
    fontFamily: 'Helvetica',
    letterSpacing: '-1px',
    lineHeight: '39px!important',
    paddingLeft: '20px',
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
    '&:hover': {
      backgroundColor: 'darkgray'
    }
  },
  paper: {
    zIndex:'99999',
    position: 'fixed',
    maxWidth: 390,
    backgroundColor: 'white',
    boxShadow: '0 0 7px black',
    padding: 'auto',
    top: '45%',
    left: '0%',
    right: '0%',
    margin:'auto',
  },
});

const Input2 = ({value,  onClick }) => (
    <Button value={value} color={"inherit"} variant={"outlined"} style={{color:"gray"}} className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
);

class Homeheader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      service: '',
      place: '',
      date: Date.now(),
      hour: Date.now(),
      popopen: false,
    };
  }

  handleClick1 =() => {
    this.setState({ popopen: true });
  };

  handleClose =() =>{
    this.setState({ popopen: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {classes} = this.props;
    const {popopen} = this.state;

    return (
      <Fragment>
        <div className={classes.headerimg}/>
        <div className={classes.headerhomevid}>
          <video id="background-video" loop autoPlay muted playsInline style={{width: '100%'}}>
            <source src="../../../static/newVideoLight.mp4" type="video/mp4"/>
            <source src="../../../static/newVideoLight.mp4" type="video/ogg"/>
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={classes.headeroverlay}/>
        <div className={classes.headerhome} onClick={()=>this.handleClick1()}>
          <Grid container>
            <Grid item xs={12}>
              <h3 className={classes.homeform} style={{marginTop:0}}>Et si vous pouviez réserver n'importe quel service immédiatement ?</h3>
            </Grid>
            <Grid item xs={12} style={{width: '100%',}}>
              <Grid container alignItems="center">
                <Grid item className={classes.pickerhomelocation}>
                <TextField
                    id="outlined-select-currency"
                    label="Ex:Réparation de bijoux"
                    value={this.state.service}
                    onChange={this.onChange}
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                    disabled={true}
                >
                </TextField>
                </Grid>
              </Grid>
                <Grid container alignItems="center">
                  <Grid item className={classes.pickerhomelocation}>
                    <TextField
                        label="Lieu"
                        value={this.state.place}
                        onChange={this.onChange}
                        margin="normal"
                        variant="outlined"
                        style={{width:'100%'}}
                        disabled={true}
                    />
                  </Grid>
                </Grid>
              <Grid container style={{marginTop:20}}>
                <Grid item xs={6}>
                  <Grid container style={{alignItems:"center"}}>
                    <Grid item xs={2}>
                  <p style={{color:"gray"}}>Le</p>
                    </Grid>
                    <Grid item xs={10}>
                  <DatePicker
                      selected={this.state.date}
                      onChange={(date)=>this.setState({date:date})}
                      customInput={<Input2 />}
                      locale='fr'
                      showMonthDropdown
                      dateFormat="dd/MM/yyyy"
                      disabled
                  />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} >
                  <Grid container style={{alignItems:"center"}}>
                    <Grid item xs={2}>
                      <p style={{color:"gray"}}>À</p>
                    </Grid>
                    <Grid item xs={10}>
                      <DatePicker
                          selected={this.state.hour}
                          onChange={(date)=>this.setState({hour:date})}
                          customInput={<Input2 />}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Heure"
                          dateFormat="HH:mm"
                          locale='fr'
                          disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button  variant="contained" color={'primary'} style={{marginTop:30}} className={classes.button}>
                Rechercher
              </Button>
            </Grid>
          </Grid>
        </div>
        <div style={{textAlign: 'left'}} className={classes.headerhome2}>
          <br/>
          <h2 style={{
            fontWeight: 'bold',
            textAlign: 'left',
            fontSize: '2rem',
            textShadow: '0px 0.5px 2px #696969'
          }}>Vous avez du talent, de l’or entre les mains. Qu’attendez-vous pour le mettre à profit ? </h2>
          <hr style={{
            float: 'left',
            width: '60px',
            border: 'none',
            height: '1px',
            backgroundColor: 'white',
            boxShadow: '1px 1px 1px #696969'
          }}/>
          <br/><br/>
          <h4 style={{
            fontWeight: 'bold',
            textAlign: 'left',
            fontSize: '1.5rem',
            textShadow: '0px 0.5px 2px #696969'
          }}>
            Particuliers ou indépendants ?  Créez dès aujourd’hui votre boutique, proposez vos services et arrondissez vos fins de mois avec My-Alfred !
          </h4>
        </div>
        {popopen ?
          <React.Fragment>
            <div className={classes.paper}>
              <Grid container style={{padding:'5%'}}>
                <Grid item xs={4} style={{height: '1px'}}/>
                <Grid item xs={4}><img src={'../../../static/popupResa.svg'} style={{width: 110,}} alt={'Logo Bleu'}/></Grid>
                <Grid item xs={3} style={{height: '1px'}}/>
                <Grid item xs={1} style={{height: '4px', zIndex: '10'}}>
                  <p onClick={this.handleClose} style={{color: '#F8727F', cursor: 'pointer'}}>x</p>
                </Grid>
                <Grid item xs={12}>
                  <h2 style={{textAlign: 'center',color: 'rgba(84,89,95,0.95)',letterSpacing: -2, fontWeight: 'bold',}}>Les réservations seront disponibles en Mars !</h2>
                </Grid>
                <Grid item xs={5}/>
                <Grid item xs={2} style={{marginTop: '-10px'}}><hr className={classes.grosHR}/></Grid>
                <Grid item xs={5}/>
              </Grid>
            </div>
            <div onClick={this.handleClose} style={{position: 'absolute' , top: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '9999px', zIndex: '99998'}}/>
            </React.Fragment>
            : null}
      </Fragment>
    );
  };
}

Homeheader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Homeheader);
