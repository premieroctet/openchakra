import {Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import RegisterInvitation from '../../components/RegisterInvitation/RegisterInvitation'
import DashboardLayout from '../../hoc/Layout/DashboardLayout'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
const moment = require('moment-timezone')

moment.locale('fr')
const {setAxiosAuthentication} = require('../../utils/authentication')

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
})

class Invitation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
  }

  render() {
    const {classes} = this.props

    return (
      <DashboardLayout title={"Invitation à s'inscrire"}>
        <Grid container className={classes.signupContainer} style={{width: '100%'}}>
          <Grid style={{width: '90%'}}>
            <Paper style={{width: '100%', alignItems: 'center'}}>
              <RegisterInvitation />
            </Paper>
          </Grid>
        </Grid>
      </DashboardLayout>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(Invitation))
