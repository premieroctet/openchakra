import CustomButton from '../../components/CustomButton/CustomButton'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import React from 'react'
import Router from 'next/router'
import Select from 'react-dropdown-select'
import axios from 'axios'

import BasePage from '../basePage'
import DashboardLayout from '../../hoc/Layout/DashboardLayout'

const {ROLES} = require('../../utils/consts')
const {clearAuthenticationToken, setAxiosAuthentication, setAuthToken}=require('../../utils/authentication')

const styles = {
  loginContainer: {
    alignItems: 'center',
    height: '85vh',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '5%',
  },
  card: {
    padding: '1.5rem 3rem',
    width: 500,
    height: '100%',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}

class LogAsUser extends BasePage {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      roles: [],
      role: null,
      errors: null,
      muUsers: [],
    }

    this.onUserChanged = this.onUserChanged.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/users/all_light')
      .then(response => {
        let users = response.data
        const muUsers = users.map(u => {
          return {
            label: `${u.name} ${u.firstname} ${u.email} (${u._id})`,
            value: u._id,
            key: u.email,
            roles: u.roles,
          }
        })
        this.setState({muUsers: muUsers})
        const email=this.getURLProps().email
        if (email) {
          this.setState({user: muUsers.find(m => m.key==email)})
        }
      })
      .catch(err => {
        console.error(err)
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'})
        }
      })
  }

  onUserChanged = e => {
    this.setState({
      user: e[0],
      roles: e[0].roles.map(r => { return {label: ROLES[r], value: r} }),
      role: e[0].roles.length==1 ? e[0].roles[0] : null})
  }

  onRoleChanged = e => {
    console.log(JSON.stringify(e))
    this.setState({role: e[0].value})
  }

  onSubmit = e => {
    e.preventDefault()

    setAxiosAuthentication()
    axios.post('/myAlfred/api/admin/loginAs', {
      username: this.state.user.key, role: this.state.role,
    })
      .then(() => {
        setAuthToken()
        Router.push('/')
      })
      .catch(err => {
        console.error(err)
        if (err.response) {
          this.setState({errors: err.response.data})
        }
      })
  }

  render() {
    const {classes} = this.props
    const {muUsers, user, roles, role} = this.state

    console.log(`User ${user}, roles:${roles}, role:${role}`)
    const logEnabled = user && (roles.length==0 || role)

    return (
      <DashboardLayout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{this.props.t('DASHBOARD.logAs')}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item style={{width: '100%'}}>
                  <Select
                    input={<Input name="user" id="genre-label-placeholder"/>}
                    displayEmpty
                    name="user"
                    onChange={this.onUserChanged}
                    options={muUsers}
                    values={muUsers.filter(m => m.value==(user && user.value))}
                    multi={false}
                  >
                  </Select>
                  { roles && roles.length>0 ?
                    <>
                      <Typography style={{fontSize: 15, marginTop: '10px'}}>avec le rôle</Typography>
                      <Select
                        input={<Input name="user" id="genre-label-placeholder"/>}
                        displayEmpty
                        name="user"
                        onChange={this.onRoleChanged}
                        options={roles}
                        values={roles.filter(r => r.value==role)}
                        multi={false}
                      >
                      </Select>
                    </>
                    :
                    null
                  }
                </Grid>
                <em style={{color: 'red'}}>{this.state.errors}</em>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <CustomButton type="submit" variant="contained" color="primary" style={{width: '100%'}}
                    disabled={!logEnabled}>
                    Connexion
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


export default withTranslation('custom', {withRef: true})(withStyles(styles)(LogAsUser))
