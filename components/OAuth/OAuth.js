import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styles from './OAuthStyle' ;
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

class OAuth extends Component {

    components = {
        google: GoogleLoginButton,
        facebook: FacebookLoginButton
    };

    startAuth = () => {
        const { provider } = this.props
        Router.push(`/myAlfred/api/authentication/${provider}`)
    }

    render() {
        const { provider, login } = this.props
        const ProviderLoginButton = this.components[provider]

        return (
            <Grid>
              <Grid container style={{display: 'flex', border:'1px solid rgba(0, 0, 0, 0.54)', borderRadius: 35, alignItems: 'center'}} on onClick={this.startAuth}>
                  <Grid style={{margin: 10}}>
                      <img src={'../../static/assets/img/unnamed.png'} alt={'google'} title={'google'} width={20}/>
                  </Grid>
                  <Grid>
                      <Divider orientation="vertical" flexItem />
                  </Grid>
                  <Grid>
                      <p style={{
                          color:'rgba(0, 0, 0, 0.54)',
                          fontSize: '1rem',
                          fontFamily: 'Helvetica',
                          fontWeight: 400,
                          lineHeight: 1
                      }}>
                      { login ? `Connexion ${provider}` : `Inscription ${provider}` }
                      </p>
                  </Grid>
              </Grid>
            </Grid>
        )
    }
}

OAuth.propTypes = {
    provider: PropTypes.string.isRequired,
    // Login : true => connect, false : register
    login: PropTypes.string.isRequired,
};

export default withStyles(styles)(OAuth)
