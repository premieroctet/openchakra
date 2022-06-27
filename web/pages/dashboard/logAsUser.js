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
import CustomButton from '../../components/CustomButton/CustomButton'


import DashboardLayout from '../../hoc/Layout/DashboardLayout'
const withParams = require('../../components/withParams')

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

class LogAsUser extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
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
          }
        })
        this.setState({muUsers: muUsers})
        const email=this.props.email
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
    this.setState({user: e[0]})
  }

  onSubmit = e => {
    e.preventDefault()

    setAxiosAuthentication()
    axios.post('/myAlfred/api/admin/loginAs', {
      username: this.state.user.key,
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
    const {muUsers, user} = this.state

    const logEnabled = user

    return (
      <DashboardLayout title={this.props.t('DASHBOARD.logAs')}>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
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


export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(LogAsUser)))
