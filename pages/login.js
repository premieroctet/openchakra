import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import setAuthToken from '../utils/setAuthToken';

import Footer from '../hoc/Layout/Footer/Footer';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";

const { config } = require('../config/config');
const url = config.apiUrl;
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
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },
};

class login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}

    };
  }

  componentDidMount() {
    document.body.style.overflow = 'auto';
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post(url+'myAlfred/api/users/login',user)
        .then(res => {
          const {token} = res.data;
          localStorage.setItem('token',token);
          setAuthToken(token);
          axios.put(url+'myAlfred/api/users/account/lastLogin')
              .then(data => {
                let path = localStorage.getItem('path');
                Router.push({pathname:path});
              })
              .catch(err=> console.log(err));





        })
        .catch(err => {
          console.log(err);
          this.setState({errors: err.response.data});
        })


};

  render()  {
    const { classes } = this.props;
    const {errors} = this.state;


    return (
        <Layout>
          <Grid container className={classes.loginContainer}>
            <Card className={classes.card}>
              <Grid>
                <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography style={{ fontSize: 30 }}>Connexion</Typography>
                </Grid>
                <form onSubmit={this.onSubmit}>
                  <Grid item>
                    <TextField
                        id="standard-with-placeholder"
                        label="Email"
                        placeholder="Email"
                        margin="normal"
                        style={{ width: '100%' }}
                        type="email"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        error={errors.username}

                    />
                    <em>{errors.username}</em>
                  </Grid>
                  <Grid item>
                    <TextField
                        id="standard-with-placeholder"
                        label="Mot de passe"
                        placeholder="Mot de passe"
                        margin="normal"
                        style={{ width: '100%' }}
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}

                    />
                    <em>{errors.password}</em>
                  </Grid>
                  <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%',color: 'white' }}>
                      Connexion
                    </Button>
                  </Grid>
                </form>
                <Link href="/forgotPassword"><a>Mot de passe oublié ?</a></Link>
              </Grid>
            </Card>
          </Grid>
          <Footer/>
        </Layout>
    );
  };
}



export default withStyles(styles)(login);
