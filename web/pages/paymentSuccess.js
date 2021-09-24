import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import io from 'socket.io-client'

import {PAYMENT_SUCCESS} from '../utils/i18n'
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
    axios.get(`/myAlfred/api/booking/${booking_id}`)
      .then(res => {
        const booking = res.data
        this.setState({booking: booking})
        axios.get(`/myAlfred/api/payment/payin/${booking.mangopay_payin_id}`)
          .then(result => {
            let transaction = result.data
            console.log(`Transaction:${JSON.stringify(transaction)}`)
            if (transaction.Status === 'FAILED') {
              return Router.push(`/paymentFailed?booking_id=${booking_id}`)
            }
            this.setState({success: true})
            this.socket = io()
            this.socket.on('connect', () => {
              this.socket.emit('booking', booking_id)
              const newStatus = booking.user.company_customer ? BOOK_STATUS.CUSTOMER_PAID : booking.status==BOOK_STATUS.PREAPPROVED ? BOOK_STATUS.CONFIRMED : BOOK_STATUS.TO_CONFIRM
              axios.put(`/myAlfred/api/booking/modifyBooking/${booking_id}`, {status: newStatus})
                .then(res => {
                  setTimeout(() => this.socket.emit('changeStatus', res.data), 100)
                  localStorage.removeItem('booking_id')
                  if (!booking.user.company_customer) {
                    setTimeout(() => Router.push('/reservations/reservations'), 4000)
                  }
                })
                .catch()
            })
          })
      })
      .catch(err => {
        console.error(err)
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
          <Grid style={{display: 'flex', backgroundColor: 'rgba(249,249,249, 1)', width: '100%', justifyContent: 'center', padding: '10%', minHeight: '80vh'}}>
            <Grid className={classes.containerPaymentSuccess}>
              <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Grid style={{display: 'flex', flexDirection: 'column'}}>
                  <Grid>
                    <h2>{PAYMENT_SUCCESS.title}</h2>
                  </Grid>
                  <Grid>
                    <Typography>{PAYMENT_SUCCESS.subtitle}</Typography>
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
                        <Typography>{PAYMENT_SUCCESS.message}</Typography>
                      </Grid>
                      <Grid>
                        <Typography>{PAYMENT_SUCCESS.not_working}<a href={'/reservations/reservations'}>{PAYMENT_SUCCESS.link}</a></Typography>
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
