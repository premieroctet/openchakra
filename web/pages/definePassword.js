import React from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {checkPass1, checkPass2} from '../utils/passwords';
import axios from 'axios';
import Router from 'next/router';

const {snackBarSuccess, snackBarError} = require('../utils/notifications')
const {ADMIN, MANAGER} = require('../utils/consts')
const _ = require('lodash')

const styles = {
  loginContainer: {
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
  },
};

class definePassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      password2: '',
      token: '',
      status1: {error: '', check: false},
      status2: {error: '', check: false},
    };
  }

  static getInitialProps({query: {token}}) {
    return {token: token};

  }

  componentDidMount() {
    const token = this.props.token;
    this.setState({token: token});

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
        if (_.intersection(user.roles, [ADMIN, MANAGER]).length > 0) {
          localStorage.setItem('b2b', 'true');
        } else {
          localStorage.removeItem('b2b');
        }
        Router.push({pathname: '/login'});
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data.msg);
      });
  };

  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.loginContainer}
            style={{
              background: '#353A51'
            }}>
        <Grid style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '-15px'
        }}>
          <Grid style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '9vw'
          }}>
            <Grid>
              <img style={{
                height: 96, filter: 'invert(1)', marginTop: '-5vh'
              }} alt={'logo_myAlfred'} src={"../../static/assets/icon/logo.png"}/>
            </Grid>
            <Grid>
              <img style={{
                height: '450px'
              }} alt={"illudefinepassword"} src={"../../static/assets/img/business/myalfredwelcome.svg"}/></Grid>
          </Grid>
          <Grid>
            <Card
              className={classes.card}
            >
              <Grid>
                <Grid item style={{display: 'flex', flexDirection: 'column'}}>
                  <Typography style={{fontSize: 35, color: '#353A51', fontWeight: 'bolder'}}>Bienvenue !</Typography>
                  <Typography style={{fontSize: 16, color: '#353A51', fontWeight: 'bold', marginBottom: '1vh'}}>L'administrateur
                    My Alfred de votre entreprise vous invite à vous
                    inscrire sur My Alfred.</Typography>
                  <Typography style={{fontSize: 16, color: '#353A51', fontWeight: 'bold'}}>Pour finaliser votre
                    inscription, veuillez définir votre mot de
                    passe
                    :</Typography>
                </Grid>
                <form onSubmit={this.onSubmit}>
                  <Grid item>
                    <TextField
                      id="standard-with-placeholder"
                      label="Nouveau mot de passe"
                      placeholder="Mot de passe"
                      margin="normal"
                      style={{width: '100%'}}
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      onKeyUp={this.onChange2}
                      error={this.state.status1.error}
                      helperText={this.state.status1.error}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-with-placeholder"
                      label="Répéter le mot de passe"
                      placeholder="Mot de passe"
                      margin="normal"
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
                  <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                    <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}
                            disabled={!(this.state.status1.check && this.state.status2.check)}>
                      Valider
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(definePassword);

