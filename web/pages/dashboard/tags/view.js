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
import DashboardLayout from '../../../hoc/Layout/DashboardLayout'
const {snackBarSuccess, snackBarError}=require('../../../utils/notifications')
const {clearAuthenticationToken, setAxiosAuthentication}=require('../../../utils/authentication')


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
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
})

class View extends BasePage {

  constructor(props) {
    super(props)

    this.state = {
      tags: {},
      label: '',
      title: '',
      description: '',

    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    const id = this.getURLProps().id
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/tags/all/${id}`)
      .then(response => {
        let tags = response.data
        this.setState({tags: tags})

      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'})
        }
      })

  }

  onChange = e => {
    const state = this.state.tags
    state[e.target.name] = e.target.value
    this.setState({tags: state})
  };

  onSubmit = e => {
    e.preventDefault()

    const {label, title, description} = this.state.tags
    const id = this.getURLProps().id
    axios.put(`/myAlfred/api/admin/tags/all/${id}`, {label, title, description})
      .then(() => {
        snackBarSuccess('Tag modifié avec succès')
        Router.push({pathname: '/dashboard/tags/all'})
      })
      .catch(err => {
        console.error(err)
        snackBarError(err)
      })
  };

  handleClick() {
    const id = this.getURLProps().id
    axios.delete(`/myAlfred/api/admin/tags/all/${id}`)
      .then(() => {
        snackBarSuccess('Tag supprimé avec succès')
        Router.push({pathname: '/dashboard/tags/all'})
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const {classes} = this.props
    const {tags} = this.state


    return (
      <DashboardLayout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{tags.label}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={tags.label}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="title"
                    value={tags.title}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    multiline
                    rows={4}
                    name="description"
                    value={tags.description}
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
      </DashboardLayout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(View))
