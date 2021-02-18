import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import Router from 'next/router';
const {snackBarSuccess, snackBarError} = require('../utils/notifications');

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

class forgotPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
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
        snackBarSuccess(`Un email de récupération a été envoyé à l\'adresse ${email}`);
        setTimeout(
          () =>  Router.push({pathname: '/'}),
          2000
        )
      })
      .catch(res => {
        snackBarError(res.response.data.error)
      });


  };

  render() {
    const {classes} = this.props;
    const {message, error}=this.state

    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>Mot de passe oublié</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    style={{width: '100%'}}
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Valider
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    );
  };
}


export default withStyles(styles)(forgotPassword);
