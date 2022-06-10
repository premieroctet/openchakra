const withParams = require('../../../components/withParams')
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

import {snackBarSuccess} from '../../../utils/notifications'

import DashboardLayout from '../../../hoc/Layout/DashboardLayout'

const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')

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

class View extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      filterPresentation: {},
      label: '',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    const id = this.props.params.id
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/filterPresentation/all/${id}`)
      .then(response => {
        let filterPresentation = response.data
        this.setState({filterPresentation: filterPresentation})

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
    const state = this.state.filterPresentation
    state[e.target.name] = e.target.value
    this.setState({filterPresentation: state})
  };

  onSubmit = e => {
    e.preventDefault()

    const {label} = this.state.filterPresentation
    const id = this.props.params.id
    axios.put(`/myAlfred/api/admin/filterPresentation/all/${id}`, {label})
      .then(() => {
        snackBarSuccess('Filtre modifié avec succès')
        Router.push({pathname: '/dashboard/filterPresentation/all'})
      })
      .catch(err => {
        console.error(err)
      })


  };

  handleClick() {
    const id = this.props.params.id
    axios.delete(`/myAlfred/api/admin/filterPresentation/all/${id}`)
      .then(() => {
        snackBarSuccess('Filtre supprimé avec succès')
        Router.push({pathname: '/dashboard/filterPresentation/all'})
      })
      .catch(err => {
        console.error(err)
      })


  }


  render() {
    const {classes} = this.props
    const {filterPresentation} = this.state


    return (
      <DashboardLayout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{filterPresentation.label}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={filterPresentation.label}
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


export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(View)))
