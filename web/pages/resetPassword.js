import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {checkPass1, checkPass2} from '../utils/passwords';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import Router from 'next/router';
import styles from '../static/css/pages/resetPassword/resetPassword'
import {isB2BStyle} from "../utils/context";
const {snackBarSuccess, snackBarError}=require('../utils/notifications')
const {ADMIN, MANAGER}=require('../utils/consts')
const _ = require('lodash')


class resetPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      password2: '',
      token: '',
      status1: {error: '', check: false},
      status2: {error: '', check: false},
      user: {}
    };
  }

  static getInitialProps({query: {token}}) {
    return {token: token};

  }

  componentDidMount() {
    const token = this.props.token;
    this.setState({token: token});

    axios.get('/myAlfred/api/users/current').then( res =>{
      this.setState({user: res.data})
    }).catch( err => (console.error(err)))

  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChange2 = e => {
    this.setState({
      status1: checkPass1(this.state.password),
      status2: checkPass2(this.state.password, this.state.password2),
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      password: this.state.password,
      token: this.state.token,
    };
    axios.post('/myAlfred/api/users/resetPassword', data)
      .then(res => {
        const user = res.data
        snackBarSuccess('Mot de passe modifié avec succès');
        // Rediriger vers /particular ou /professional suivant les rôles
        if (_.intersection(user.roles, [ADMIN, MANAGER]).length>0) {
          localStorage.setItem('b2b', 'true');
        }
        else {
          localStorage.removeItem('b2b');
        }
        Router.push({pathname: '/'});
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data.msg);
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
              <h2>Réinitialisation du mot de passe</h2>
            </Grid>
            <Grid item container spacing={2} style={{width:'100%', margin:0}}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="standard-with-placeholder"
                  label="Nouveau mot de passe"
                  placeholder="Mot de passe"
                  style={{width: '100%'}}
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  onKeyUp={this.onChange2}
                  error={this.state.status1.error}
                  helperText={this.state.status1.error}
                  variant={'outlined'}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="standard-with-placeholder"
                  label="Répéter le mot de passe"
                  placeholder="Mot de passe"
                  variant={'outlined'}
                  style={{width: '100%'}}
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  onKeyUp={this.onChange2}
                  error={this.state.status2.error}
                  helperText={this.state.status2.error}
                />
              </Grid>
            </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                <Button
                  variant="contained"
                  onClick={this.onSubmit}
                  style={{backgroundColor: isB2BStyle(user) ? '#353A51' : 'rgba(178,204,251,1)'}}
                  disabled={!(this.state.status1.check && this.state.status2.check)}
                  classes={{root: classes.buttonSubmit}}
                >
                  Valider
                </Button>
              </Grid>
          </Card>
        </Grid>
      </Layout>
    );
  };
}


export default withStyles(styles)(resetPassword);
