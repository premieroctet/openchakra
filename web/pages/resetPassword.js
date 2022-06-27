const withParams = require('../components/withParams')
import CustomButton from '../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import {RESET_PASSWORD} from '../utils/i18n'
import {checkPass1, checkPass2} from '../utils/passwords'

import Layout from '../hoc/Layout/Layout'
import styles from '../static/css/pages/resetPassword/resetPassword'

const lodash = require('lodash')

const {ADMIN, MANAGER}=require('../utils/consts')
const {snackBarSuccess, snackBarError}=require('../utils/notifications')


class resetPassword extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      password: '',
      password2: '',
      status1: {error: '', check: false},
      status2: {error: '', check: false},
      user: {},
    }
  }

  componentDidMount() {
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({user: res.data})
      })
      .catch(err => {
        console.error(err)
      })

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
      token: this.props.token,
    }
    axios.post('/myAlfred/api/users/resetPassword', data)
      .then(res => {
        const user = res.data
        snackBarSuccess(ReactHtmlParser(this.props.t('RESET_PASSWORD.password_update')))
        // Rediriger vers /particular ou /professional suivant les rôles
        if (lodash.intersection(user.roles, [ADMIN, MANAGER]).length>0) {
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

  render() {
    const {classes} = this.props
    const {user} = this.state


    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid item style={{display: 'flex', justifyContent: 'center'}}>
              <h2>{ReactHtmlParser(this.props.t('RESET_PASSWORD.title'))}</h2>
            </Grid>
            <Grid item container spacing={2} style={{width: '100%', margin: 0}}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="standard-with-placeholder"
                  label={ReactHtmlParser(this.props.t('RESET_PASSWORD.new_pass'))}
                  placeholder={ReactHtmlParser(this.props.t('RESET_PASSWORD.password'))}
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
                  label={ReactHtmlParser(this.props.t('RESET_PASSWORD.repeat_password'))}
                  placeholder={ReactHtmlParser(this.props.t('RESET_PASSWORD.password'))}
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
              <CustomButton
                variant="contained"
                onClick={this.onSubmit}
                color={'primary'}
                disabled={!(this.state.status1.check && this.state.status2.check)}
                classes={{root: classes.buttonSubmit}}
              >
                {
                  ReactHtmlParser(this.props.t('RESET_PASSWORD.button_confirm'))
                }
              </CustomButton>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    )
  }
}


export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(resetPassword)))
