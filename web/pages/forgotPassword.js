import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import styles from '../static/css/pages/forgotPassword/forgotPassword'
import Router from 'next/router';
const {snackBarSuccess, snackBarError} = require('../utils/notifications');
const {ADMIN, MANAGER} = require('../utils/consts')
const _ = require('lodash')
import {isB2BStyle} from "../utils/context";


class forgotPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      user:{}
    };
  }

  componentDidMount() {
    axios.get('/myAlfred/api/users/current').then( res =>{
      this.setState({user: res.data})
    }).catch( err => (console.error(err)))
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    const {email}=this.state

    const user = {
      email: email,
    };

    axios.post('/myAlfred/api/users/forgotPassword', user)
      .then(res => {
        const user= res.data
        snackBarSuccess(`Un email de récupération a été envoyé à l\'adresse ${email}`);
        // Rediriger vers /particular ou /professional suivant les rôles
        const redirect_url=_.intersection(user.roles, [ADMIN, MANAGER]).length>0 ? '/professional': '/particular'
        setTimeout( () =>  Router.push({pathname: redirect_url}), 2000)
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data.error)
      });
  };

  render() {
    const {classes} = this.props;
    const {user} = this.state;

    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid item style={{display: 'flex', justifyContent: 'center'}}>
              <h2>Mot de passe oublié</h2>
            </Grid>
            <Grid item>
              <TextField
                id="standard-with-placeholder"
                label="Email"
                placeholder="Email"
                style={{width: '100%'}}
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                variant={'outlined'}
              />
            </Grid>
            <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
              <Button variant="contained" classes={{root: classes.buttonSubmit}}  style={{backgroundColor: isB2BStyle(user) ? '#353A51' : 'rgba(178,204,251,1)'}} onClick={this.onSubmit}>
                Valider
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    );
  };
}


export default withStyles(styles)(forgotPassword);
