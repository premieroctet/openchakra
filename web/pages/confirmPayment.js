import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import moment from 'moment'
import Head from 'next/head'
import AddressAndFacturation from '../components/Payment/AddressAndFacturation/AddressAndFacturation'

import LayoutPayment from '../hoc/Layout/LayoutPayment'
import PaymentChoice from '../components/Payment/PaymentChoice/PaymentChoice'
import Stepper from '../components/Stepper/Stepper'
import styles from '../static/css/pages/confirmPayment/confirmPayment'
const withParams = require('../components/withParams')

const {clearAuthenticationToken, setAxiosAuthentication} = require('../utils/authentication')
const {snackBarError}=require('../utils/notifications')

moment.locale('fr')

class ConfirmPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alfred: null,
      currentUser: null,
      bookingObj: null,
      city: null,
      address: null,
      zip_code: null,
      prestations: [],
      pick_tax: null,
      travel_tax: null,
      total: 0,
      customer_fee: null,
      grandTotal: null,
      cesu_total: 0,
      checkedOption: false,
      optionPrice: null,
      date: null,
      hour: null,
      activeStep: 0,
      equipments: [],
      cards: [],
      id_card: '',
      cardSelected: false,
      pending: false,
      alfred_pro: false,
    }
  }

  componentDidMount() {

    if (!this.props.booking_id) {
      return
    }
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/booking/${this.props.booking_id}`)
      .then(res => {
        const bookingObj = res.data
        this.setState({
          prestations: bookingObj.prestations,
          bookingObj: bookingObj,
          date: bookingObj.prestation_date,
          hour: moment(bookingObj.prestation_date).format('LT'),
          travel_tax: bookingObj.travel_tax,
          pick_tax: bookingObj.pick_tax,
          customer_fee: bookingObj.customer_fee,
          grandTotal: bookingObj.amount,
          cesu_total: bookingObj.cesu_amount,
          cpf_amount: bookingObj.cpf_amount,
          equipments: bookingObj.equipments,
        })

        !bookingObj.is_service &&
        axios.get(`/myAlfred/api/serviceUser/${bookingObj.serviceUserId}`).then(res => {
          this.setState({alfred: res.data.user})
        })

        // Alfred part/pro
        !bookingObj.is_service &&
        axios.get(`/myAlfred/api/shop/alfred/${bookingObj.alfred._id}`)
          .then(res => {
            this.setState({alfred_pro: res.data.is_professional})
          })
          .catch(err => {
            console.error(err)
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
    const booking_id=this.props.booking_id
    const total = parseFloat(this.state.grandTotal)
    const data = {
      booking_id: booking_id,
      id_card: this.state.id_card,
      amount: total,
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
    const booking_id=this.props.booking_id
    const total = parseFloat(this.state.grandTotal)
    const data = {
      booking_id: booking_id,
      amount: total,
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
          countPrestations={this.computeCountPrestations}
          alfred_pro={this.state.alfred_pro}
        />
      case 1:
        return <PaymentChoice
          {...this.state}
          pricedPrestations={this.computePricedPrestations}
          countPrestations={this.computeCountPrestations}
          payDirect={this.payDirect}
          pay={this.pay}
          handleCardSelected={this.handleCardSelected}
          alfred_pro={this.state.alfred_pro}
        />
      default:
        return null
    }
  }

  render() {
    const {classes} = this.props
    const {currentUser, activeStep, bookingObj} = this.state

    if (!currentUser || !bookingObj) {
      return null
    }
    return (
      <React.Fragment>
        <Head>
          <title>Paiement</title>
        </Head>
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
      </React.Fragment>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(ConfirmPayment)))
