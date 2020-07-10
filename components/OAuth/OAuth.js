import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import styles from './OAuthStyle' ;


class OAuth extends Component {

    components = {
        google: GoogleLoginButton,
        facebook: FacebookLoginButton
    };

    startAuth = () => {
        const { provider } = this.props;
        Router.push(`/myAlfred/api/authentication/${provider}`)
    };

    render() {
        const { provider, text } = this.props;
        const { classes } = this.props;
        const ProviderLoginButton = this.components[provider];

        return (
            <Grid>
              <Grid container className={classes.contentOauth} onClick={this.startAuth}>
                  <Grid style={{margin: 10}}>
                      <img src={'../../static/assets/img/unamed.png'} alt={'google'} title={'google'} width={20}/>
                  </Grid>
                  <Grid>
                      <p style={{
                          color:'rgba(0, 0, 0, 0.54)',
                          fontSize: '1rem',
                          fontFamily: 'Helvetica',
                          fontWeight: 400,
                          lineHeight: 1
                      }}>{text === 'login' ? 'Se connecter avec Gmail' : 'S\'inscrire avec Gmail'}</p>
                  </Grid>
              </Grid>
            </Grid>
        )
    }
}

OAuth.propTypes = {
    provider: PropTypes.string.isRequired,
};

export default withStyles(styles)(OAuth)
