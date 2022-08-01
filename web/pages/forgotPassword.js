import CustomButton from '../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import Layout from '../hoc/Layout/Layout'
import axios from 'axios'
import styles from '../static/css/pages/forgotPassword/forgotPassword'
import Router from 'next/router'
const {snackBarSuccess, snackBarError} = require('../utils/notifications')
const {ADMIN, MANAGER} = require('../utils/consts')
const lodash = require('lodash')
import {FORGOT_PASSWORD} from '../utils/i18n'


class forgotPassword extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      user: {},
    }
  }

  componentDidMount() {
    axios.get('/myAlfred/api/users/current').then(res => {
      this.setState({user: res.data})
    }).catch(err => (console.error(err)))
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  onSubmit = e => {
    e.preventDefault()
    const {email}=this.state

    const user = {
      email: email,
    }

    axios.post('/myAlfred/api/users/forgotPassword', user)
      .then(res => {
        const user= res.data
        snackBarSuccess(ReactHtmlParser(this.props.t('FORGOT_PASSWORD.snackbar_send_email')) + email)
        // Rediriger vers /particular ou /professional suivant les rôles
        const redirect_url=lodash.intersection(user.roles, [ADMIN, MANAGER]).length>0 ? '/professional': '/particular'
        setTimeout(() => Router.push({pathname: redirect_url}), 2000)
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data.error)
      })
  };

  render() {
    const {classes} = this.props
    const {user} = this.state

    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid item style={{display: 'flex', justifyContent: 'center'}}>
              <h2>{ReactHtmlParser(this.props.t('FORGOT_PASSWORD.title'))}</h2>
            </Grid>
            <Grid item>
              <TextField
                id="standard-with-placeholder"
                label={ReactHtmlParser(this.props.t('FORGOT_PASSWORD.textfield_email'))}
                placeholder={ReactHtmlParser(this.props.t('FORGOT_PASSWORD.placeholder_email'))}
                style={{width: '100%'}}
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                variant={'outlined'}
              />
            </Grid>
            <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
              <CustomButton variant="contained" color={'primary'} classes={{root: classes.buttonSubmit}} onClick={this.onSubmit}>
                {ReactHtmlParser(this.props.t('FORGOT_PASSWORD.button_confirm'))}
              </CustomButton>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    )
  }
}


export default withTranslation(null, {withRef: true})(withStyles(styles)(forgotPassword))
