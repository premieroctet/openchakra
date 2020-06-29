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
import AlgoliaPlaces from "algolia-places-react";
import DatePicker, {registerLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import styles from './signup/signupStyle'
import {checkPass1, checkPass2} from '../utils/passwords';

registerLocale('fr', fr);


class signup extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          firstname:'',
          name: '',
          birthday: '',
          email: '',
          password: '',
          password2: '',
          address: '',
          city: '',
          zip_code: '',
          country: '',
          checked: false,
          status1: {error:'', check:false},
          status2: {error:'', check:false},
          errors: {},
          lat: '',
          lng: '',

        };
        this.handleChecked = this.handleChecked.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

      }

      componentDidMount() {
        const token = localStorage.getItem('token');
        if(token !== null) {
          toast.warn('Vous êtes déjà inscrit');
          Router.push('/')
        }
      }


  onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

  onChangePassword = e => {
    this.setState({
      status1: checkPass1(this.state.password),
      status2: checkPass2(this.state.password, this.state.password2),
    })
  };

    onChangeAddress({suggestion}) {
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
          password2: this.state.password2,
          address: this.state.address,
          zip_code: this.state.zip_code,
          city: this.state.city,
          country: this.state.country,
          lat: this.state.lat,
          lng: this.state.lng,

        };
        const username = this.state.email;
        const password = this.state.password;

        console.log("Submitting");
        axios
            .post('/myAlfred/api/users/register', newUser)
            .then(res => {
              toast.info('Inscription réussie');
              axios.post('/myAlfred/api/users/login',{username, password})
                  .then(response => {
                    const {token} = response.data;
                    localStorage.setItem('token',token);
                    axios.defaults.headers.common['Authorization'] = token;
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
            <Helmet>
              <title>Inscription - My Alfred </title>
              <meta property="description" content="Inscrivez-vous à My Alfred, plateforme de services entre particuliers et autoentrepreneurs. Proposez vos services et trouvez vos clients ! Recherchez vos services et trouvez votre Alfred ! Inscription gratuite et rapide " />
            </Helmet>
            <Grid className={classes.fullContainer}/>
            <Grid container className={classes.signupContainer}>
              <div className="fonts">
              <Card className={classes.card}>
                <div className={classes.newContainer}>
                  <div className={classes.banner}>
                    <h2 className={classes.title}>Inscription</h2>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <Grid container>
                      <Grid item style={{width: '100%'}}>
                        <TextField
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
                        <em style={{color:'red'}}>{errors.email}</em>
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
                        <em style={{color:'red'}}>{errors.firstname}</em>
                      </Grid>
                      <Grid item style={{width: '48%'}}>
                        <TextField
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
                        <em style={{color:'red'}}>{errors.name}</em>
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
                        }}
                        onChange={(suggestion) =>this.onChangeAddress(suggestion)}
                      /></Grid>
                      <Grid item style={{width: '100%'}}>
                        <TextField
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
                        <em style={{color:'red'}}>{errors.address}</em>
                      </Grid>
                      <Grid item style={{width: '30%', marginRight: 20}}>
                        <TextField
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
                        <em style={{color:'red'}}>{errors.zip_code}</em>
                      </Grid>
                      <Grid item style={{width: '66%'}}>
                        <TextField
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
                        <em style={{color:'red'}}>{errors.city}</em>
                      </Grid>
                      <Grid item className={classes.country}>
                        <TextField
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
                        <em style={{color:'red'}}>{errors.country}</em>
                      </Grid>
                      <Grid item style={{width: '100%'}}>
                        <TextField
                            label="Créer un mot de passe"
                            placeholder="Créer un mot de passe"
                            margin="normal"
                            style={{ width: '100%' }}
                            variant="outlined"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            onKeyUp ={this.onChangePassword}
                            error={this.state.status1.error}
                            helperText={this.state.status1.error}
                        />
                      </Grid>
                      <Grid item style={{width: '100%'}}>
                        <TextField
                            label="Saisir à nouveau le mot de passe"
                            placeholder="Saisir à nouveau le mot de passe"
                            margin="normal"
                            style={{ width: '100%' }}
                            variant="outlined"
                            type="password"
                            name="password2"
                            value={this.state.password2}
                            onChange={this.onChange}
                            onKeyUp ={this.onChangePassword}
                            error={this.state.status2.error}
                            helperText={this.state.status2.error}
                        />
                      </Grid>
                    </Grid>
                    <Typography style={{fontSize: '1.2rem', width:'100%', marginTop: 15}}>Date de naissance</Typography>
                    <p>Pour vous inscrire, vous devez être âgé d’au moins 16 ans. Les autres<br/>
                      utilisateurs ne verront pas votre date de naissance.
                    </p>
                    <Grid item className={classes.datenaissance} style={{display:"flex",alignItems:"center"}}>
                      <DatePicker
                        selected={this.state.birthday}
                        onChange={(date)=>this.onChangeBirthday(date)}
                        locale='fr'
                        placeholderText="jj/mm/aaaa"
                        showYearDropdown
                        showMonthDropdown
                        className={classes.birthday}
                        maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                      />
                    </Grid>
                      <em style={{color:'red'}}>
                        {this.state.errors.birthday}
                      </em>
                    <Grid container style={{marginTop: 15, alignItems: 'center'}}>
                      <Grid>
                        <Checkbox
                          checked={this.state.checked}
                          onChange={this.handleChecked}
                          value="checked"
                          color="primary"
                        />
                      </Grid>
                      <Grid>
                        <a href={"footer/cguPage"} target="_blank">J’accepte les conditions générales d’utilisation de My-Alfred.</a>
                      </Grid>
                    </Grid>

                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                       <Button
                           disabled = {!(this.state.checked && this.state.status1.check && this.state.status2.check)}
                           type="submit"
                           variant="contained"
                           color="primary"
                           style={{ width: '100%',color:"white" }}>
                        Inscription
                      </Button>

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
                  <Grid>
                    <Grid>
                      <Link href={'/needHelp/needHelp'} target="_blank">
                        <a target="_blank">Besoin d'aide pour proposer vos services ? Prenez rendez-vous avec l'équipe My Alfred ici.</a>
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </Card>
              </div>
        </Grid>
      </Layout>
    );
  };
}

export default withStyles(styles)(signup);
