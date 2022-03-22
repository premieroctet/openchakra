const {ignoreFailedPayment} = require('../config/config')
const {delayedPromise} = require('../utils/promise')
const {snackBarError} = require('../utils/notifications')
import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import io from 'socket.io-client'

import BasePage from './basePage'
import LayoutPayment from '../hoc/Layout/LayoutPayment'
import styles from '../static/css/pages/paymentSuccess/paymentSuccess'

const {BOOK_STATUS}=require('../utils/consts')
const {setAxiosAuthentication}=require('../utils/authentication')

class paymentSuccess extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      booking: null,
      success: false,
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
    const booking_id = this.getURLProps().booking_id
    let transaction=null
    let booking=null
    axios.get(`/myAlfred/api/booking/${booking_id}`)
      .then(res => {
        booking = res.data
        this.setState({booking: booking})
        return delayedPromise(1000, () => axios.get(`/myAlfred/api/payment/payin/${booking.mangopay_payin_id}`))
      })
      .then(result => {
        transaction = result.data
        console.log(`Transaction:${JSON.stringify(transaction)}`)
        return axios.put(`/myAlfred/api/booking/modifyBooking/${booking_id}`, {mangopay_payin_status: transaction.Status})
      })
      .then(() => {
        if (transaction.Status != 'SUCCEEDED' && !ignoreFailedPayment()) {
          return Router.push(`/paymentFailed?booking_id=${booking_id}`)
        }
        this.setState({success: true})
        this.socket = io()
        this.socket.on('connect', () => {
          this.socket.emit('booking', booking_id)
          const newStatus = booking.is_service ? BOOK_STATUS.CUSTOMER_PAID : booking.status==BOOK_STATUS.PREAPPROVED ? BOOK_STATUS.CONFIRMED : BOOK_STATUS.TO_CONFIRM
          axios.put(`/myAlfred/api/booking/modifyBooking/${booking_id}`, {status: newStatus})
            .then(res => {
              setTimeout(() => this.socket.emit('changeStatus', res.data), 100)
              localStorage.removeItem('booking_id')
              if (!booking.user.company_customer) {
                setTimeout(() => Router.push('/reservations/reservations'), 4000)
              }
            })
        })
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })

  }


  render() {
    const {classes} = this.props
    const {success, booking} = this.state

    if (!success) {
      return null
    }
    return (
      <React.Fragment>
        <LayoutPayment>
          <Grid className={`custompaymentfailedcontainer ${classes.mainContainer}`}>
            <Grid className={classes.containerPaymentSuccess}>
              <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Grid style={{display: 'flex', flexDirection: 'column'}}>
                  <Grid>
                    <h2>{ReactHtmlParser(this.props.t('PAYMENT_SUCCESS.title'))}</h2>
                  </Grid>
                  <Grid>
                    <Typography>{ReactHtmlParser(this.props.t('PAYMENT_SUCCESS.subtitle'))}</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  { booking.user.company_customer ?
                    <Grid>
                      <Typography>{ReactHtmlParser(this.props.t('BOOKING.search_presta'))}</Typography>
                    </Grid>
                    :
                    <>
                      <Grid>
                        <Typography>{ReactHtmlParser(this.props.t('PAYMENT_SUCCESS.message'))}</Typography>
                      </Grid>
                      <Grid>
                        <Typography>{ReactHtmlParser(this.props.t('PAYMENT_SUCCESS.not_working'))}<a href={'/reservations/reservations'}>{ReactHtmlParser(this.props.t('PAYMENT_SUCCESS.link'))}</a></Typography>
                      </Grid>
                    </>
                  }
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </LayoutPayment>
      </React.Fragment>
    )
  }
}


export default withTranslation('custom', {withRef: true})(withStyles(styles)(paymentSuccess))
