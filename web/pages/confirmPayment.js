import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import moment from 'moment'
import {CONFIRM_PAYMENT} from '../utils/i18n'
import AddressAndFacturation from '../components/Payment/AddressAndFacturation/AddressAndFacturation'
import BasePage from './basePage'
import LayoutPayment from '../hoc/Layout/LayoutPayment'
import PaymentChoice from '../components/Payment/PaymentChoice/PaymentChoice'
import Stepper from '../components/Stepper/Stepper'
import styles from '../static/css/pages/confirmPayment/confirmPayment'

const {clearAuthenticationToken, setAxiosAuthentication} = require('../utils/authentication')
const {snackBarError}=require('../utils/notifications')

moment.locale('fr')

class ConfirmPayment extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      currentUser: null,
      bookingObj: null,
      city: null,
      address: null,
      zip_code: null,
      prestations: [],
      pick_tax: null,
      travel_tax: null,
      total: 0,
      fees: null,
      grandTotal: null,
      cesu_total: 0,
      checkedOption: false,
      optionPrice: null,
      date: null,
      hour: null,
      alfredId: '',
      activeStep: 0,
      equipments: [],
      cards: [],
      id_card: '',
      cardSelected: false,
      pending: false,
    }
  }

  componentDidMount() {

    setAxiosAuthentication()
    axios.get(`/myAlfred/api/booking/${this.getURLProps().booking_id}`)
      .then(res => {
        const bookingObj = res.data
        this.setState({
          prestations: bookingObj.prestations,
          bookingObj: bookingObj,
          date: bookingObj.date_prestation,
          hour: bookingObj.time_prestation,
          travel_tax: bookingObj.travel_tax,
          pick_tax: bookingObj.pick_tax,
          fees: bookingObj.fees,
          grandTotal: bookingObj.amount,
          cesu_total: bookingObj.cesu_amount,
          alfredId: bookingObj.alfred._id,
          equipments: bookingObj.equipments,
        })

        axios.get(`/myAlfred/api/serviceUser/${bookingObj.serviceUserId}`).then(res => {
          this.setState({user: res.data.user})
        })

      })

    axios.get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({currentUser: res.data})
      })
      .catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })

    axios.get('/myAlfred/api/payment/cards')
      .then(response => {
        let cards = response.data
        this.setState({cards: cards})
      })
      .catch(err => {
        console.error(err)
      })

    localStorage.setItem('path', Router.pathname)

  }

  handleStep = () => {
    this.setState({activeStep: this.state.activeStep + 1})
  }

  payDirect = () => {
    const {pending}=this.state
    if (pending) {
      return snackBarError(ReactHtmlParser(this.props.t('CONFIRM_PAYMENT.snackbar_error_payment')))
    }
    const booking_id=this.getURLProps().booking_id
    const total = parseFloat(this.state.grandTotal)
    const fees = parseFloat(this.state.fees)
    const data = {
      booking_id: booking_id,
      id_card: this.state.id_card,
      amount: total,
      fees: fees,
      browserInfo: {
        JavaEnabled: navigator.javaEnabled,
        Language: navigator.language,
        ColorDepth: screen.colorDepth,
        ScreenHeight: screen.height,
        ScreenWidth: screen.width,
        TimeZoneOffset: new Date().getTimezoneOffset(),
        UserAgent: navigator.userAgent,
        JavascriptEnabled: true,
      },
    }

    this.setState({pending: true})
    axios.post('/myAlfred/api/payment/payInDirect', data)
      .then(res => {
        const payInResult=res.data
        if (payInResult.SecureModeRedirectURL) {
          return Router.push(payInResult.SecureModeRedirectURL)
        }
        if (payInResult.RedirectURL) {
          return Router.push(payInResult.RedirectURL)
        }
        Router.push(`/paymentSuccess?booking_id=${booking_id}`)
      })
      .catch(err => {
        this.setState({pending: false})
        console.error(err)
      })
  }

  pay = () => {
    const booking_id=this.getURLProps().booking_id
    const total = parseFloat(this.state.grandTotal)
    const fees = parseFloat(this.state.fees)
    const data = {
      booking_id: booking_id,
      amount: total,
      fees: fees,
    }

    axios.post('/myAlfred/api/payment/payIn', data)
      .then(res => {
        const payInResult=res.data
        if (payInResult.SecureModeRedirectURL) {
          return Router.push(payInResult.SecureModeRedirectURL)
        }
        if (payInResult.RedirectURL) {
          return Router.push(payInResult.RedirectURL)
        }
        return Router.push(`/paymentSuccess?booking_id=${booking_id}`)

      })
      .catch(err => {
        console.error(err)
      })
  }

  computePricedPrestations() {
    let result = {}
    this.state.prestations.forEach(p => {
      result[p.name] = p.price * p.value
    })
    return result
  }

  computeCountPrestations() {
    let result = {}
    this.state.prestations.forEach(p => {
      result[p.name] = p.value
    })
    return result
  }

  handleCardSelected = e => {
    this.setState({id_card: e})
  }

  renderSwitch(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AddressAndFacturation
          {...this.state}
          handleStep={this.handleStep}
          pricedPrestations={this.computePricedPrestations}
          countPrestations={this.computeCountPrestations}/>
      case 1:
        return <PaymentChoice
          {...this.state}
          pricedPrestations={this.computePricedPrestations}
          countPrestations={this.computeCountPrestations}
          payDirect={this.payDirect}
          pay={this.pay}
          handleCardSelected={this.handleCardSelected}
        />
      default:
        return null
    }
  }

  render() {
    const {classes} = this.props
    const {currentUser, user, activeStep} = this.state

    return (
      <React.Fragment>
        {user === null || currentUser === null ? null : (
          <Grid style={{position: 'relative'}}>
            <LayoutPayment>
              <Grid className={classes.contentStepper}>
                <Stepper
                  activeStep={activeStep}
                  steps={[ReactHtmlParser(this.props.t('ADDRESS_FACTURATION.address_billing_title')), ReactHtmlParser(this.props.t('ADDRESS_FACTURATION.payment_title'))]}
                  orientation={'horizontal'}/>
              </Grid>
              <Grid className={classes.mainContainer}>
                {this.renderSwitch(activeStep)}
              </Grid>
            </LayoutPayment>
          </Grid>
        )}
      </React.Fragment>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(ConfirmPayment))
