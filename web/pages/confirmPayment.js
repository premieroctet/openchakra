const {clearAuthenticationToken}=require('../utils/authentication')
const {setAxiosAuthentication}=require('../utils/authentication')
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import styles from '../static/css/pages/confirmPayment/confirmPayment';

import Stepper from "../components/Stepper/Stepper";
import AddressAndFacturation from "../components/Payment/AddressAndFacturation/AddressAndFacturation";
import PaymentChoice from "../components/Payment/PaymentChoice/PaymentChoice";
import LayoutPayment from "../hoc/Layout/LayoutPayment";

const {snackBarError}=require('../utils/notifications')
moment.locale('fr');

class ConfirmPayment extends React.Component {
  constructor(props) {
    super(props);
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
    };
  }

  static getInitialProps({query: {booking_id}}) {
    return {booking_id: booking_id};
  }

  componentDidMount() {

    setAxiosAuthentication()
    axios.get(`/myAlfred/api/booking/${this.props.booking_id}`)
      .then(res => {
        const bookingObj = res.data
        console.log(JSON.stringify(bookingObj, null, 2))
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
          equipments: bookingObj.equipments
        })

        axios.get('/myAlfred/api/serviceUser/' + bookingObj.serviceUserId).then(res => {
          this.setState({user: res.data.user})
        })

      })

    axios.get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({currentUser: res.data});
      })
      .catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          clearAuthenticationToken()
          Router.push({pathname: '/'});
        }
      })

    axios.get('/myAlfred/api/payment/cardsActive')
      .then(response => {
        let cards = response.data;
        this.setState({cards: cards});
      })
      .catch(err => {
        console.error(err);
      });

    localStorage.setItem('path', Router.pathname);

  }

  handleStep = () => {
      this.setState({activeStep: this.state.activeStep + 1});
  };

  payDirect = () => {
    const {pending}=this.state
    if (pending) {
      return snackBarError(`Paiement en cours de traitement`)
    }
    const total = parseFloat(this.state.grandTotal);
    const fees = parseFloat(this.state.fees);
    const data = {
      booking_id: this.props.booking_id,
      id_card: this.state.id_card,
      amount: total,
      fees: fees,
    };
    this.setState({pending: true})
    axios.post('/myAlfred/api/payment/payInDirect', data)
      .then(res => {
        const payInResult=res.data
        console.log(`Received result:${JSON.stringify(payInResult)}`)
        if (payInResult.SecureModeNeeded) {
          Router.push(payInResult.SecureModeRedirectURL)
        }
        else {
          if (payInResult.RedirectURL) {
            Router.push(payInResult.RedirectURL)
          }
          else {
            Router.push(`/paymentSuccess?booking_id=${this.props.booking_id}`)
          }
        }
      })
      .catch( err => {
        this.setState({pending: false})
        console.error(err)
      });
  };

  pay = () => {
    const total = parseFloat(this.state.grandTotal);
    const fees = parseFloat(this.state.fees);
    const data = {
      booking_id: this.props.booking_id,
      amount: total,
      fees: fees,
    };

    axios.post('/myAlfred/api/payment/payIn', data)
      .then(res => {
        const payInResult=res.data
        console.log(`Received result:${JSON.stringify(payInResult)}`)
        if (payInResult.SecureModeNeeded) {
          Router.push(payInResult.SecureModeRedirectURL)
        }
        else if (payInResult.RedirectURL) {
          Router.push(payInResult.RedirectURL)
        }
        else {
          Router.push(`/paymentSuccess?booking_id=${this.props.booking_id}`)
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  computePricedPrestations() {
    let result = {};
    this.state.prestations.forEach(p => {
      result[p.name] = p.price * p.value;
    });
    return result;
  }

  computeCountPrestations() {
    let result = {};
    this.state.prestations.forEach(p => {
      result[p.name] = p.value;
    });
    return result;
  }

  handleCardSelected = (e) =>{
      this.setState({id_card: e});
  };

  renderSwitch(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AddressAndFacturation
          {...this.state}
          handleStep={this.handleStep}
          pricedPrestations={this.computePricedPrestations}
          countPrestations={this.computeCountPrestations}/>;
      case 1:
        return <PaymentChoice
          {...this.state}
          pricedPrestations={this.computePricedPrestations}
          countPrestations={this.computeCountPrestations}
          payDirect={this.payDirect}
          pay={this.pay}
          handleCardSelected={this.handleCardSelected}
        />;
    }
  }

  render() {
    const {classes} = this.props;
    const {currentUser, user, activeStep} = this.state;

    return (
      <React.Fragment>
        {user === null || currentUser === null ? null : (
          <Grid style={{position: 'relative'}}>
            <LayoutPayment>
              <Grid className={classes.contentStepper}>
                <Stepper activeStep={activeStep} isType={'confirmPaiement'}/>
              </Grid>
              <Grid  className={classes.mainContainer}>
                {this.renderSwitch(activeStep)}
              </Grid>
            </LayoutPayment>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ConfirmPayment);
