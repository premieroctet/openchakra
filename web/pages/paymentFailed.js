import CustomButton from '../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import {PAYMENT_FAILED} from '../utils/i18n'
import BasePage from './basePage'
import LayoutPayment from '../hoc/Layout/LayoutPayment'
import styles from '../static/css/pages/paymentSuccess/paymentSuccess'

const {setAxiosAuthentication}=require('../utils/authentication')

class PaymentFailed extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      booking: null,
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({user: user})
      })
      .catch(err => {
        console.error(err)
      })
    axios.get(`/myAlfred/api/booking/${this.getURLProps().booking_id}`)
      .then(res => {
        this.setState({booking: res.data})
      })
      .catch(err => {
        console.error(err)
      })
  }


  render() {
    const {classes} = this.props
    const {booking}=this.state

    if (!booking) {
      return null
    }
    const avocotes_mode = Boolean(booking.company_customer)

    const booking_link = avocotes_mode ? '/avocotes' : '/reservations/reservations'
    return (
      <React.Fragment>
        <LayoutPayment>
          <Grid className={`custompaymentfailedcontainer ${classes.mainContainer}`}>
            <Grid className={classes.containerPaymentSuccess}>
              <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Grid style={{display: 'flex', flexDirection: 'column'}}>
                  <Grid>
                    <h2>{ReactHtmlParser(this.props.t('PAYMENT_FAILED.title'))}</h2>
                  </Grid>
                  <Grid>
                    <Typography>{ReactHtmlParser(this.props.t('PAYMENT_FAILED.subtile'))}</Typography>
                  </Grid>
                </Grid>
                <Grid style={{marginTop: '5vh'}}>
                  <Grid>
                    <CustomButton variant={'contained'} className={'custompaymentfailedbuttonback'} color={'primary'} style={{color: 'white'}} onClick={() => Router.push(booking_link)}>
                      {ReactHtmlParser(this.props.t('PAYMENT_FAILED.back_resa'))}
                    </CustomButton>
                    { !avocotes_mode &&
                      <CustomButton variant={'contained'} className={'custompaymentfailedbuttonhome'} color={'primary'} style={{color: 'white'}} onClick={() => Router.push('/')}>
                        {ReactHtmlParser(this.props.t('PAYMENT_FAILED.back_home'))}
                      </CustomButton>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </LayoutPayment>
      </React.Fragment>
    )
  }
}


export default withTranslation('custom', {withRef: true})(withStyles(styles)(PaymentFailed))
