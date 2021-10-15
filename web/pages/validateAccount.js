import CustomButton from '../components/CustomButton/CustomButton'
import {Typography} from '@material-ui/core'
import {snackBarError, snackBarSuccess} from '../utils/notifications'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import BasePage from './basePage'
import Layout from '../hoc/Layout/Layout'

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    height: '170vh',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
    marginTop: '100px',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
})

class validateAccount extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const user = this.getURLProps().user
    axios
      .post('/myAlfred/api/users/validateAccount', user)
      .then(() => {
        snackBarSuccess('Compte validé')
        Router.push('/')
      })
      .catch(err => {
        console.error(err)
        snackBarError(err)
      })
  }

  render() {
    const {classes} = this.props

    return (
      <Layout>
        <Grid container className={classes.signupContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>Valider votre inscription</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <CustomButton type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Valider
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

export default withTranslation('custom', {withRef: true})(withStyles(styles)(validateAccount))
