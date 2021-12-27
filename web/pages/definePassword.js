import CustomButton from '../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import React from 'react'
import Router from 'next/router'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import axios from 'axios'
import {DEFINE_PASSWORD} from '../utils/i18n'
import {checkPass1, checkPass2} from '../utils/passwords'
import BasePage from './basePage'
import styles from '../static/css/pages/definePassword/definePassword'

const lodash = require('lodash')

const {ADMIN, MANAGER} = require('../utils/consts')
const {snackBarSuccess, snackBarError} = require('../utils/notifications')

class DefinePassword extends BasePage {

  constructor(props) {
    super(props)

    this.state = {
      password: '',
      password2: '',
      status1: {error: '', check: false},
      status2: {error: '', check: false},
      showPassword: false,
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onChange2 = () => {
    this.setState({
      status1: checkPass1(this.state.password),
      status2: checkPass2(this.state.password, this.state.password2),
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const data = {
      password: this.state.password,
      token: this.getURLProps().token,
    }
    axios.post('/myAlfred/api/users/resetPassword', data)
      .then(res => {
        const user = res.data
        snackBarSuccess(ReactHtmlParser(this.props.t('DEFINE_PASSWORD.snackbar_password_update')))
        // Rediriger vers /particular ou /professional suivant les rôles
        if (lodash.intersection(user.roles, [ADMIN, MANAGER]).length > 0) {
          localStorage.setItem('b2b', 'true')
        }
        else {
          localStorage.removeItem('b2b')
        }
        Router.push({pathname: '/'})
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data.msg)
      })
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword})
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  render() {
    const {classes} = this.props
    const {showPassword} = this.state

    return (
      <Grid container spacing={2} style={{width: '100%', margin: 0, backgroundColor: '#353A51', height: '100%', minHeight: '100vh'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <img style={{filter: 'invert(1)'}} height={96} alt={'logo_myAlfred'} title={'logo_myAlfred'} src={'/static/assets/icon/logo.png'}/>
        </Grid>
        <Grid className={classes.containerImg} item xl={6} lg={6} md={6} sm={6} xs={6}>
          <img height={450} alt={'illu_define_password'} title={'illu_define_password'} src={'/static/assets/img/business/myalfredwelcome.svg'}/>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Grid className={classes.formContainer}>
            <Card className={classes.card}>
              <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h2 style={{color: '#353A51'}}>{ReactHtmlParser(this.props.t('DEFINE_PASSWORD.title'))}</h2>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h3 style={{color: '#353A51'}}>{ReactHtmlParser(this.props.t('DEFINE_PASSWORD.subtitle'))}</h3>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h4 style={{color: '#353A51'}}>{ReactHtmlParser(this.props.t('DEFINE_PASSWORD.signin_message'))}</h4>
                </Grid>
                <Grid container spacing={4} style={{margin: 0, width: '100%'}}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      id="standard-with-placeholder"
                      label={ReactHtmlParser(this.props.t('DEFINE_PASSWORD.new_password'))}
                      placeholder={ReactHtmlParser(this.props.t('DEFINE_PASSWORD.new_password_placeholder'))}
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
                      label={ReactHtmlParser(this.props.t('DEFINE_PASSWORD.repeat_password'))}
                      placeholder={ReactHtmlParser(this.props.t('DEFINE_PASSWORD.new_password_placeholder'))}
                      style={{width: '100%'}}
                      type={showPassword ? 'text' : 'password'}
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                      onKeyUp={this.onChange2}
                      error={this.state.status2.error}
                      helperText={this.state.status2.error}
                      InputProps={{
                        endAdornment: (
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
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CustomButton
                      variant="contained"
                      onClick={this.onSubmit}
                      classes={{root: classes.saveButton}}
                      disabled={!(this.state.status1.check && this.state.status2.check)}
                    >
                      {ReactHtmlParser(this.props.t('DEFINE_PASSWORD.button_confirm'))}
                    </CustomButton>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(DefinePassword))
