import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import axios from 'axios';
import DatePicker, {registerLocale} from "react-datepicker";
import AlgoliaPlaces from "algolia-places-react";
import fr from 'date-fns/locale/fr';
import MenuItem from "@material-ui/core/MenuItem";
import moment from 'moment';
registerLocale('fr', fr);
const { config } = require('../../../config/config');
const url = config.apiUrl;

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
    minHeight: '122vh',
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
    boxShadow: '0px 0px 3px #4c4a4a9e',
    padding:'2%',
    minHeight:'470px',
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
    fontSize: '1.3rem!important',
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

class Homeheader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allService: [],
      serviceUser: [],
      service: '',
      city: '',
      gps: null,
      date: Date.now(),
      dateSelected: '',
      hour: '',
      hourSelected: '',
      user:null,
      address:null,
      adressSelected:null,
    };

  }

  componentDidMount() {
    axios.get(url+'myAlfred/api/service/all')
        .then(res => {
          this.setState({allService: res.data})
        })
        .catch()

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({
                  user:user,
                  address: user.billing_address,
                  addressSelected: user.billing_address,
                  otherAddress: user.service_address,
                  gps: user.billing_address.gps,
                });
            })
            .catch(err => { console.log(err); }
            );
  }


  onChange = e => {
    var {name, value} = e.target;
    this.setState({ [name]: value });
    if (name=='addressSelected') {
      this.setState({gps: value=='all'?null: 'gps' in value ? value.gps : {'lat':value['lat'], 'lng':value['lng']}})
    };
  };

  onChangeCity({suggestion}) {
    this.setState({gps:suggestion.latlng, city: suggestion.name});
  };

  search() {
    let date;
    let dateISO;
    let day;
    let hour;
    const service = this.state.service;
    const city = this.state.city;
    const gps = JSON.stringify(this.state.gps);
    if(this.state.dateSelected !== ''){
       date = moment(this.state.dateSelected).format('DD/MM/YYYY');
      dateISO = moment(this.state.dateSelected).format();
      day = moment(this.state.dateSelected).format('dddd');
    } else {
      date = '';
      dateISO = '';
      day = '';
    }
     if(this.state.hourSelected !== ''){
       hour = moment(this.state.hourSelected).format('HH:mm');
     } else {
       hour = '';
     }

    Router.push({
      pathname: '/search',
      query: { keyword: service,city:city,date:date,dateISO:dateISO,day:day,hour:hour,gps: gps, address: JSON.stringify(this.state.addressSelected) }
    })
  }

  render() {
    const {classes} = this.props;
    const {otherAddress, address,popopen, logged} = this.state;

    console.log(this.state.gps);

    return (
        <Fragment>
          <div className={classes.headerimg}></div>
          <div className={classes.headerhomevid}>
            <video id="background-video" loop autoPlay muted playsInline style={{width: '100%'}}>
              <source src="../../../static/newVideoLight.mp4" type="video/mp4"/>
              <source src="../../../static/newVideoLight.mp4" type="video/ogg"/>
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={classes.headeroverlay}></div>
          { /** Start search not connected */ }
            <div className={classes.headerhome}>
            <Grid container>
              <Grid item xs={12}>
                <h3 className={classes.homeform} style={{marginTop:0}}>Et si vous pouviez réserver n'importe quel service immédiatement ?</h3>
              </Grid>
              <Grid item xs={12} style={{width: '100%',}}>

                <Grid container alignItems="center">
                  <Grid item className={classes.pickerhomelocation} style={{textAlign: 'left', fontFamily: 'Helvetica Neue, Helvetica,sans-serif', fontSize: '0.9rem', fontWeight: '400', marginBottom: '15px',color: '#505050'}}>
                    <TextField
                        id="outlined-basic"
                        label="Service"
                        variant="outlined"
                        placeholder={'Coiffure, Plomberie...'}
                        value={this.state.service}
                        onChange={this.onChange}
                        name={'service'}
                        style={{width: '100%', backgroundColor: 'white'}}
                    />
                  </Grid>
                </Grid>


                  <Grid container alignItems="center">
                    <Grid item className={classes.pickerhomelocation} style={{textAlign: 'left', fontFamily: 'Helvetica Neue, Helvetica,sans-serif', fontSize: '0.9rem', fontWeight: '400', color: '#505050'}}>
                      { this.state.user?
                            <TextField
                                    InputProps={{ style:{height: 40}, }}
                                    id="outlined-select-currency"
                                    select
                                    style={{width:'100%', marginTop: '6px'}}
                                    value={this.state.addressSelected}
                                    name={'addressSelected'}
                                    onChange={(e) => {this.onChange(e);}}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value={address}>
                                        Adresse principale, <em> {' '+address.address} {address.zip_code},{address.city}</em>
                                    </MenuItem>
                                    {otherAddress.map(e => (
                                        <MenuItem key={e._id} value={e}>
                                            {e.label+', '} <em> {' '+e.address},{e.zip_code} {e.city}</em>

                                        </MenuItem>
                                    ))}
                                    <MenuItem value={'all'}>
                                        Partout, Rechercher des Alfred partout
                                    </MenuItem>
                                </TextField>
                       :
                      <AlgoliaPlaces
                          placeholder='Dans quelle ville ?'
                          style={{color: '#505050', height: '55px'}}
                          options={{
                            appId: 'plKATRG826CP',
                            apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                            language: 'fr',
                            countries: ['fr'],
                            type: 'city',
                            useDeviceLocation: 'true'
                          }}
                          onChange={(suggestion) =>this.onChangeCity(suggestion)}
                          onClear={()=>this.setState({city:'', gps:null})}
                      /> }
                    </Grid>
                  </Grid>


                <Grid container style={{marginTop:20}}>
                  <Grid item xs={5}>
                    <Grid container style={{alignItems:"center"}}>
                      <Grid item xs={12}>
                    <DatePicker
                        selected={this.state.dateSelected}
                        onChange={(date)=>{
                          this.setState({dateSelected:date});
                          if(date===null){
                            this.setState({dateSelected:''})
                          }}

                        }
                        style={{fontWeight: 100}}
                        customInput={<TextField label="Quel jour ?" style={{backgroundColor: 'white',fontWeight: 100}} variant={"outlined"}/>}

                        /*customInput={<Input2 />}*/
                        locale='fr'
                        showMonthDropdown
                        dateFormat="dd/MM/yyyy"
                        placeholderText={moment(this.state.date).format('DD/MM/YYYY')}
                        minDate={new Date()}
                    />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={2}>
                    <p style={{color:"gray",fontWeight: 100}}>À</p>
                  </Grid>
                  <Grid item xs={5} >
                    <Grid container style={{alignItems:"center"}}>
                      <Grid item xs={12}>
                        <DatePicker
                            selected={this.state.hourSelected}
                            onChange={(date)=>{
                                this.setState({hourSelected:date});
                                if(date===null){
                                  this.setState({hourSelected:''})
                                }}
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Heure"
                            dateFormat="HH:mm"
                            locale='fr'
                            placeholderText={'09:00'}
                            style={{fontWeight: 100}}
                            customInput={<TextField label="Quelle heure ?" style={{backgroundColor: 'white',fontWeight: 100}} variant={"outlined"}/>}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Button disabled={(this.state.service ==='' && this.state.place ==='' && this.state.dateSelected !== '') || (this.state.service ==='' && this.state.place ==='' && this.state.hourSelected !== '') } onClick={()=>this.search()}  variant="contained" color={'primary'} style={{marginTop:30}} className={classes.button}>
                  Rechercher
                </Button>

              </Grid>
            </Grid>

          </div>
          { /** End search not connected */ }

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



          {popopen ? <React.Fragment>
                <div className={classes.paper}>
                  <Grid container>
                    <Grid item xs={4} style={{height: '1px'}}></Grid>
                    <Grid item xs={4} style={{height: '35px'}}><img src={'../../../static/logo_final_My-Alfred.svg'} style={{width: 110,}} alt={'Logo Bleu'}/></Grid>
                    <Grid item xs={3} style={{height: '1px'}}></Grid>
                    <Grid item xs={1} style={{height: '4px', zIndex: '10'}}>
                      <p onClick={this.handleClose} style={{color: '#F8727F', cursor: 'pointer'}}>x</p>
                    </Grid>
                    <Grid item xs={12}>
                      <h2 style={{textAlign: 'center',color: 'rgba(84,89,95,0.95)',letterSpacing: -2, fontWeight: 'bold',}}>Les réservations ne seront disponible qu'à partir de Novembre</h2>
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={2} style={{marginTop: '-10px'}}><hr className={classes.grosHR}/></Grid>
                    <Grid item xs={5}></Grid>
                  </Grid>
                </div>

                <div onClick={this.handleClose} style={{position: 'absolute' , top: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '9999px', zIndex: '99998'}}></div>
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
