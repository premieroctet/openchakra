import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AlgoliaPlaces from "algolia-places-react";
import DatePicker, {registerLocale,setDefaultLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import Birthday from '@material-ui/icons/CakeOutlined'
import Footer from '../hoc/Layout/Footer/Footer';
import { toast } from 'react-toastify';
registerLocale('fr', fr);



const { config } = require('../config/config');
const url = config.apiUrl;
const styles = theme => ({
  fullContainer: {
    backgroundImage: 'url(../static/bailey-zindel-396399-unsplash-min.jpg)',
    filter: 'blur(5px)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    alignItems: 'center',
    height: '180vh',
    justifyContent: 'top',
    flexDirection: 'column',
  },
  signupContainer: {
    backgroundColor: 'rgba(0,0,0, 0.35)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    alignItems: 'center',
    height: '180vh',
    flexDirection: 'column',
    position: 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2',
  },
  card: {
    //padding: '1.5rem 3rem',
    width: 600,
    marginTop: '100px',
    boxShadow: '0px 2px 66px -37px rgba(10,10,10,0.65)',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
  CGU: {
    marginTop:'5px!important',
  },
  datenaissance: {
    marginTop: 20,
    width: '100%'
  },
  banner: {
    marginBottom: 25,
    backgroundColor: '#2FBCD3',
    height: 80,

  },
  newContainer: {
    padding: 20,
  },
  title: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 22,
    letterSpacing: 1,
  },
  country: {
    width: '100%'
  },
  menu: {
    width: 200,
  },



});

/*const Input2 = ({value,  onClick }) => (
    <Button value={value} color={"primary"} variant={"contained"} style={{color:"white"}} className="example-custom-input" onClick={onClick}>
      {value}
    </Button>

);*/

class signup extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          firstname:'',
          name: '',
          birthday: '',
          email: '',
          password: '',
          address: '',
          city: '',
          zip_code: '',
          country: '',
          checked: false,
          errors: {},
          lat: '',
          lng: '',

        };
        this.handleChecked = this.handleChecked.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

      }

      componentDidMount() {
        document.body.style.overflow = 'auto';
        const token = localStorage.getItem('token');
        if(token !== null) {
          toast.warn('Vous êtes déjà inscrit');
          Router.push('/')
        }
      }


  onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    onChangeAddress({query, rawAnswer, suggestion, suggestionIndex}) {
        this.setState({city: suggestion.city, address: suggestion.name, zip_code: suggestion.postcode,country: suggestion.country,
            lat: suggestion.latlng.lat, lng: suggestion.latlng.lng});

    }

  onChangeBirthday = date => {
      this.setState({birthday: date})
  };

  handleChecked () {
    this.setState({checked: !this.state.checked});
  }

      onSubmit = e => {
        e.preventDefault();

        const newUser = {
          firstname: this.state.firstname,
          name: this.state.name,
          birthday: this.state.birthday,
          email: this.state.email,
          password: this.state.password,
          address: this.state.address,
          zip_code: this.state.zip_code,
          city: this.state.city,
          country: this.state.country,
          lat: this.state.lat,
          lng: this.state.lng,

        };
        const username = this.state.email;
        const password = this.state.password;


        axios
            .post(url+'myAlfred/api/users/register', newUser)
            .then(res => {
              toast.info('Inscription réussi');
              axios.post(url+'myAlfred/api/users/login',{username, password})
                  .then(response => {
                    const {token} = response.data;
                    localStorage.setItem('token',token);
                    Router.push({pathname:'/addPicture'})
                  })
                  .catch(error => {
                    console.log(error);
                  })

            })
            .catch(err => {
                  console.log(err);
                  this.setState({errors: err.response.data})

            }

            );



      };

      render() {
        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <Layout>
              <Grid className={classes.fullContainer}></Grid>
              <Grid container className={classes.signupContainer}>
                <div className="fonts">
                <Card className={classes.card}>
                  <div className={classes.banner}>
                    <h2 className={classes.title}>Inscription</h2>

                  </div>
                  <div className={classes.newContainer}>

                    <form onSubmit={this.onSubmit}>
                      <Grid container>
                        <Grid item style={{width: '100%'}}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Email"
                              placeholder="Email"
                              margin="normal"
                              style={{ width: '100%' }}
                              variant="outlined"
                              type="email"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                              error={errors.email}
                          />
                          <em>{errors.email}</em>
                        </Grid>
                        <Grid item style={{width: '48%', marginRight: 20}}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Prénom"
                              placeholder="Prénom"
                              margin="normal"
                              style={{ width: '100%' }}
                              variant="outlined"
                              type="text"
                              name="firstname"
                              value={this.state.firstname}
                              onChange={this.onChange}
                              error={errors.firstname}
                          />
                          <em>{errors.firstname}</em>
                        </Grid>
                        <Grid item style={{width: '48%'}}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Nom"
                              placeholder="Nom"
                              margin="normal"
                              variant="outlined"
                              style={{ width: '100%' }}
                              type="text"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                              error={errors.name}
                          />
                          <em>{errors.name}</em>
                        </Grid>
                      </Grid>
                      <Grid container style={{marginTop: 15}}>
                        <Typography style={{fontSize: '1.2rem', width:'100%'}}>Adresse postale</Typography>
                        <p>Votre adresse ne sera pas visible, mais nous l’utiliserons pour vous proposer<br/>
                        ou proposer vos services aux utilisateurs ou Alfred proches de chez vous.</p>
                        <Grid item style={{width: '100%'}}> <AlgoliaPlaces
                              placeholder='Recherchez votre adresse'

                              options={{
                                  appId: 'plKATRG826CP',
                                  apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                                  language: 'fr',
                                  countries: ['fr'],
                                  type: 'address',
                                  useDeviceLocation: 'true'


                              }}


                              onChange={(suggestion) =>this.onChangeAddress(suggestion)}
                        /></Grid>
                        <Grid item style={{width: '100%'}}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Rue"
                              placeholder="Rue"
                              margin="normal"
                              variant="outlined"
                              style={{ width: '100%' }}
                              type="text"
                              name="address"
                              value={this.state.address}
                              onChange={this.onChange}
                              error={errors.address}
                          />
                          <em>{errors.address}</em>
                        </Grid>
                        <Grid item style={{width: '25%', marginRight: 20}}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Code postal"
                              placeholder="Code postal"
                              margin="normal"
                              variant="outlined"
                              style={{ width: '100%' }}
                              type="text"
                              name="zip_code"
                              value={this.state.zip_code}
                              onChange={this.onChange}
                              error={errors.zip_code}
                          />
                          <em>{errors.zip_code}</em>
                        </Grid>
                        <Grid item style={{width: '71%'}}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Ville"
                              placeholder="Ville"
                              margin="normal"
                              variant="outlined"
                              style={{ width: '100%' }}
                              type="text"
                              name="city"
                              value={this.state.city}
                              onChange={this.onChange}
                              error={errors.city}
                          />
                          <em>{errors.city}</em>
                        </Grid>
                        <Grid item className={classes.country}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Pays"
                              value={this.state.country}
                              name="country"
                              type="text"
                              onChange={this.onChange}
                              style={{ width: '100%' }}
                              margin="normal"
                              variant="outlined"
                              error={errors.country}
                          />
                          <em>{errors.country}</em>
                        </Grid>
                        <Grid item style={{width: '100%'}}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Créer un mot de passe"
                              placeholder="Créer un mot de passe"
                              margin="normal"
                              style={{ width: '100%' }}
                              variant="outlined"
                              type="password"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChange}
                              error={errors.password}
                              helperText="8 caractères minimum"
                          />
                        </Grid>
                      </Grid>
                      <Typography style={{fontSize: '1.2rem', width:'100%', marginTop: 15}}>Date de naissance</Typography>
                      <p>Pour vous inscrire, vous devez être agé d’au moins 16 ans. Les autres<br/>
                        utilisateurs ne verront pas votre date de naissance.
                      </p>
                      <Grid item className={classes.datenaissance} style={{display:"flex",alignItems:"center"}}>
                        {/*<TextField
                            id="date"
                            label="Date de naissance"
                            type="date"
                            name="birthday"
                            style={{width: '100%'}}
                            className={classes.textField}
                            value={this.state.birthday}
                            onChange={this.onChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                        />*/}
                        <Birthday style={{marginRight:20}}/>
                        <DatePicker
                          selected={this.state.birthday}
                          onChange={(date)=>this.onChangeBirthday(date)}
                          //customInput={<Input2 />}
                          locale='fr'
                          placeholderText="jj/mm/aaaa"
                          showYearDropdown
                          showMonthDropdown
                          dateFormat="dd/MM/yyyy"


                        />

                      </Grid>



                      <Grid container style={{marginTop: 15}}>
                        <FormControlLabel
                            control={
                              <Checkbox
                                  checked={this.state.checked}
                                  onChange={this.handleChecked}
                                  value="checked"
                                  color="primary"
                              />
                            }
                            label="J’accepte les conditions générales d’utilisation de My-Alfred."
                        />
                      </Grid>

                      <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                        {this.state.checked ? <Button type="submit" variant="contained" color="primary" style={{ width: '100%',color:"white" }}>
                          Inscription
                        </Button> : <Button disabled type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                          Inscription
                        </Button> }

                      </Grid>
                    </form>
                    <hr/>
                    <Grid container>
                    <Grid item>
                    <p>Vous avez déjà un compte My Alfred ? </p>
                    </Grid>
                    <Grid item style={{paddingTop: 16, marginLeft: 5}}>
                      <Link href={'/login'}><a style={{color:'#68b7c5', textDecoration: 'none'}}>Connexion</a></Link>
                    </Grid>
                    </Grid>
                  </div>
                </Card>
                </div>
              </Grid>
              <Footer/>
            </Layout>
        );
      };
}

export default withStyles(styles)(signup);
