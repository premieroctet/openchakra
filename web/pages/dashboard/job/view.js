import CustomButton from '../../../components/CustomButton/CustomButton'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

import BasePage from '../../basePage'
import Layout from '../../../hoc/Layout/Layout'

const {clearAuthenticationToken, setAxiosAuthentication}=require('../../../utils/authentication')
const {snackBarSuccess} = require('../../../utils/notifications')

const styles = theme => ({
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
  cancelButton: {
    color: 'white',
    backgroundColor: theme.palette.error.main,
  },
})

class View extends BasePage {

  constructor(props) {
    super(props)

    this.state = {
      job: {},
      label: '',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    const id = this.getURLProps().id
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/job/all/${id}`)
      .then(response => {
        let job = response.data
        this.setState({job: job})
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })
  }

  onChange = e => {
    const state = this.state.job
    state[e.target.name] = e.target.value
    this.setState({job: state})
  };

  onSubmit = e => {
    e.preventDefault()

    const {label} = this.state.job
    const id = this.getURLProps().id
    axios.put(`/myAlfred/api/admin/job/all/${id}`, {label})
      .then(() => {
        snackBarSuccess('Métier modifié avec succès')
        Router.push({pathname: '/dashboard/job/all'})
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })
  }

  handleClick() {
    const id = this.getURLProps().id
    axios.delete(`/myAlfred/api/admin/job/all/${id}`)
      .then(res => {
        snackBarSuccess('Métier supprimé avec succès');
        Router.push({pathname: '/dashboard/job/all'});
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })


  }


  render() {
    const {classes} = this.props
    const {job} = this.state


    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{job.label}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={job.label}
                    onChange={this.onChange}

                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <CustomButton type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Modifier
                  </CustomButton>
                  <CustomButton type="button" variant="contained" classes={{root: classes.cancelButton}} style={{width: '100%'}}
                    onClick={this.handleClick}>
                    Supprimer
                  </CustomButton>
                </Grid>
              </form>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    )
  }
}


export default withTranslation('custom', {withRef: true})(withStyles(styles)(View))
