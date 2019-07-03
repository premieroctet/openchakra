import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Checkboxes from '../components/Checkboxes/checkboxes';
//import Selectgenre from '../components/Select/select';
//import Datenaissance from '../components/Datenaissance/datepicker';
import Router from 'next/router';




import Layout from '../hoc/Layout/Layout';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const { config } = require('../config/config');
const url = config.apiUrl;
const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    height: '190vh',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    //padding: '1.5rem 3rem',
    width: 800,
    marginTop: '100px',
    fontFamily: 'helveticaNeue'
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
    backgroundColor: '#00abed',
    height: 80,

  },
  newContainer: {
    padding: 20,
  },
  title: {
    fontFamily: 'helveticaNeue',
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
          errors: {}
        };
        this.handleChecked = this.handleChecked.bind(this);
      }

      componentDidMount() {
        localStorage.setItem('path',Router.pathname);
      }


  onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
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

        };

        axios
            .post(url+'myAlfred/api/users/register', newUser)
            .then(res => {
              Router.push({pathname:'/addPicture'})
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
              <Grid container className={classes.signupContainer}>
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
                        <Grid item style={{width: '100%'}}>
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
                        <Grid item style={{width: '100%'}}>
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
                        <Typography style={{fontSize: '1.2rem',fontFamily: 'helveticaNeue', width:'100%'}}>Adresse</Typography>
                        <p style={{fontFamily: 'helveticaNeue'}}>Votre adresse ne sera pas visible, mais nous l’utiliserons pour vous proposer<br/>
                        ou proposer vos services aux utilisateurs ou Alfred proches de chez vous.</p>

                        <Grid item style={{width: '100%'}}>
                          <TextField
                              id="standard-with-placeholder"
                              label="Adresse"
                              placeholder="Adresse"
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
                        <Grid item style={{width: '72.3%'}}>
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
                              id="outlined-select-currency"
                              select
                              label="Pays"
                              value={this.state.country}
                              name="country"
                              onChange={this.onChange}
                              style={{ width: '100%' }}
                              SelectProps={{
                                MenuProps: {
                                  className: classes.menu,
                                },
                              }}
                              margin="normal"
                              variant="outlined"
                              error={errors.country}
                          >

                                <MenuItem value="France">
                                  France
                                </MenuItem>
                            <MenuItem value="Maroc">
                              Maroc
                            </MenuItem>

                          </TextField>
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
                              helperText="8 charactères minimum"
                          />
                        </Grid>
                      </Grid>
                      <Typography style={{fontSize: '1.2rem',fontFamily: 'helveticaNeue', width:'100%', marginTop: 15}}>Date de naissance</Typography>
                      <p style={{fontFamily: 'helveticaNeue'}}>Pour vous inscrire, vous devez être agé d’au moins 16 ans. Les autres<br/>
                        utilisateurs ne verront pas votre date de naissance.
                      </p>
                      <Grid item className={classes.datenaissance}>
                        <TextField
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
                        {this.state.checked ? <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
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
              </Grid>
            </Layout>
        );
      };
}

export default withStyles(styles)(signup);
