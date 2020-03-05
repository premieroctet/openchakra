import React, { Fragment } from 'react';
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
import {Helmet} from 'react-helmet';

const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
  fullContainer: {
    display:'flex',
    flexDirection:'row',
    width: '100%',
    height:'100vh',
    [theme.breakpoints.down('sm')]: {
      //height:'65vh',
    }
},
  loginContainer: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    width: '40%',
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
    marginTop: '15%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',

    }
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },

  [theme.breakpoints.between('sm','xl')]: {
    secondContainer: {
      width: '60%',
      heigh: '100vh',
      textAlign: 'center',
    }
  },
  [theme.breakpoints.down('sm')]: {
    secondContainer: {
      display:'none'
    },
    hrStyle:{
      display:'none'
    },
    fullContainer: {
      flexDirection:'column',
    },
    loginContainer:{
      width : 'inherit'
    }
  },
  [theme.breakpoints.only('xs')]:{
    loginContainer:{
      marginTop:'2%'
    }
  },

  hrStyle:{
    borderWidth: 0.5,
    color:'lightgray'
  }
});

class login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };
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
                if(path === '/'){
                  Router.push('/search')
                } else {
                  Router.back();
                }
              })
              .catch(err=> console.log(err));





        })
        .catch(err => {
          console.log(err);
          if (err.response) {
            this.setState({errors: err.response.data});
          }
        })


};

  render()  {
    const { classes } = this.props;
    const {errors} = this.state;

    return (
      <Layout>
	<Helmet>
        <title> Connexion - My Alfred </title>
        <meta property="description" content="Connectez-vous à My Alfred, application de services entre particuliers. Trouvez des services de bricolage, plomberie, garde d’animaux près de chez vous ! Trouvez, réservez votre Alfred et notez votre service en quelques clics. Plus de 2000 services référencés, trouvez le vôtre dès aujourd’hui " />
      </Helmet>
        <Grid className={classes.fullContainer}>
          <Grid container className={classes.loginContainer}>
            <Card className={classes.card}>
              <Grid>
                <Grid item style={{textAlign:'center'}}>
                  <Typography style={{ fontSize: 30 }}>Connexion</Typography>
                  <img src={'../static/background/connexion.svg'} alt={'bienvenu'} style={{width:100, height:100}}/>
                </Grid>
                <form onSubmit={this.onSubmit} style={{marginBottom:15}}>
                  <Grid item>
                    <TextField
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
                  <Grid item style={{backgroundColor:'borwn'}}>
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
                  <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30}}>
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%',color: 'white' }}>
                      Connexion
                    </Button>
                  </Grid>
                </form>
                <Grid item style={{display:'flex',flexDirection:'column'}}>
                  <Link href={"/forgotPassword"}><a color="primary" style={{textDecoration: 'none', color: '#2FBCD3'}}>Mot de passe oublié ?</a></Link>
                  <Link href={"/signup"}><a color="primary" style={{textDecoration: 'none', color: '#2FBCD3'}}>Pas encore inscrit ? Inscrivez-vous !</a></Link>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <hr className={classes.hrStyle}/>
          <Grid className={classes.secondContainer}>
            <img src={'../static/background/Illustration Inscription-connexion_Plan de travail 1 copie-01.svg'} style={{height:'100vh', width:'90%'}} alt={'test'}/>
          </Grid>
        </Grid>
        {/* <Footer/>*/}

      </Layout>
    );
  };
}

export default withStyles(styles)(login);
