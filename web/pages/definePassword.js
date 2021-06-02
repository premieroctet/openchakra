import React from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {checkPass1, checkPass2} from '../utils/passwords';
import axios from 'axios';
import Router from 'next/router';
import styles from '../static/css/pages/definePassword/definePassword'
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const {snackBarSuccess, snackBarError} = require('../utils/notifications')
const {ADMIN, MANAGER} = require('../utils/consts')
const _ = require('lodash')

class definePassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      password2: '',
      token: '',
      status1: {error: '', check: false},
      status2: {error: '', check: false},
      showPassword: false
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
        Router.push({pathname: '/'});
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data.msg);
      });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) =>{
    event.preventDefault();
  };

  render() {
    const {classes} = this.props;
    const {showPassword} = this.state;

    return (
      <Grid container spacing={2} style={{width:'100%', margin:0, backgroundColor: '#353A51', height: '100%', minHeight: '100vh'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <img style={{filter: 'invert(1)'}} height={96} alt={'logo_myAlfred'} title={'logo_myAlfred'} src={"../../static/assets/icon/logo.png"}/>
        </Grid>
        <Grid className={classes.containerImg} item xl={6} lg={6} md={6} sm={6} xs={6}>
          <img height={450} alt={"illu_define_password"} title={'illu_define_password'} src={"../../static/assets/img/business/myalfredwelcome.svg"}/>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Grid className={classes.formContainer}>
            <Card className={classes.card}>
              <Grid container spacing={2} style={{margin:0, width: '100%'}}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h2 style={{color: '#353A51'}}>Bienvenue !</h2>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h3 style={{color: '#353A51'}}>L'administrateur My Alfred de votre entreprise vous invite à vous inscrire sur My Alfred.</h3>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h4 style={{color: '#353A51'}}>Pour finaliser votre inscription, veuillez définir votre mot de passe :</h4>
                </Grid>
                <Grid container spacing={4} style={{margin:0, width: '100%'}}>
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
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      id="standard-with-placeholder"
                      label="Répéter le mot de passe"
                      placeholder="Mot de passe"
                      style={{width: '100%'}}
                      type={showPassword ? "text" : "password"}
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                      onKeyUp={this.onChange2}
                      error={this.state.status2.error}
                      helperText={this.state.status2.error}
                      InputProps={{
                        endAdornment:(
                          <InputAdornment position="end">
                            <IconButton
                              tabIndex="-1"
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                          )
                      }}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                      variant="contained"
                      onClick={this.onSubmit}
                      classes={{root: classes.saveButton}}
                      disabled={!(this.state.status1.check && this.state.status2.check)}
                    >
                      Valider
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(definePassword);

