import React, {Fragment} from 'react';
import axios from 'axios';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import styles from '../static/css/pages/confirmPayement/confirmPayement';
import cookie from 'react-cookies';
import Stepper from "../components/Stepper/Stepper";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import TrustAndSecurity from "../hoc/Layout/TrustAndSecurity/TrustAndSecurity";

import AddressAndFacturation from "../components/Payement/AddressAndFacturation/AddressAndFacturation";
import PaymentChoice from "../components/Payement/PaymentChoice/PaymentChoice";




moment.locale('fr');
const _ = require('lodash');


class ConfirmPayement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentUser: null,
      emitter: null,
      recipient: null,
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
      languages: [],
      alfredId: '',
      activeStep: 0,
      equipments: [],
      cards: [],
      id_card: '',
      cardSelected: false,
      valueother: 'other',
    };
  }

  static getInitialProps({query: {id}}) {
    return {shop_id: id};
  }

  componentDidMount() {
    const token = cookie.load('token');
    const bookingObj = JSON.parse(localStorage.getItem('bookingObj'));
    this.setState({bookingObj: bookingObj});

    axios.defaults.headers.common['Authorization'] = token;

    axios.get('/myAlfred/api/users/current').then(res => {
      this.setState({currentUser: res.data});
    }).catch(err => {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        cookie.remove('token', {path: '/'});
        Router.push({pathname: '/login'});
      }
    });

    axios.get('/myAlfred/api/payment/cardsActive')
      .then(response => {
        let cards = response.data;
        this.setState({cards: cards});
      })
      .catch(err => {
        console.error(err);
      });

    this.setState({
      emitter: localStorage.getItem('emitter'),
      recipient: localStorage.getItem('recipient'),
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
    });

    const id = this.props.shop_id;
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = token;

    axios.get('/myAlfred/api/serviceUser/' + id).then(res => {
      this.setState({
        user: res.data.user,
        languages: res.data.user.languages,
      });
    });
  }

  handlePay = () => {
    localStorage.setItem('emitter', this.state.emitter);
    localStorage.setItem('recipient', this.state.recipient);
    this.setState({activeStep: this.state.activeStep + 1});
  };

  payDirect() {
    const total = parseFloat(this.state.total);
    const fees = parseFloat(this.state.fees);
    const data = {
      id_card: this.state.id_card,
      amount: total,
      fees: fees,
    };
    axios.post('/myAlfred/api/payment/payInDirect', data)
      .then(() => {
        Router.push('/paymentDirectSuccess?id=' + this.state.booking_id);
      })
      .catch( err => { console.error(err)});
  }

  pay() {
    const total = parseFloat(this.state.total);
    const fees = parseFloat(this.state.fees);
    const data = {amount: total, fees: fees};

    axios.post('/myAlfred/api/payment/payIn', data)
      .then(res => {
        localStorage.setItem('booking_id', this.state.booking_id);
        let payIn = res.data;
        Router.push(payIn.RedirectURL);
      })
      .catch(err => {
        console.error(err);
      });
  }


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
    if ( e === 'other'){
      this.setState({id_card: e, cardSelected: false});
    }else{
      this.setState({id_card: e.Id, cardSelected: true});
    }
  };



  renderSwitch(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AddressAndFacturation
          {...this.state}
          handlePay={this.handlePay}
          pricedPrestations={this.computePricedPrestations}
          countPrestations={this.computeCountPrestations}/>;
      case 1:
        return <PaymentChoice
          {...this.state}
          pricedPrestations={this.computePricedPrestations}
          countPrestations={this.computeCountPrestations}
          handlePay={this.handlePay}
          pay={this.pay}
          payDirect={this.payDirect}
          handleCardSelected={this.handleCardSelected}
        />;
    }
  }

  render() {
    const {classes} = this.props;
    const {currentUser, user, bookingObj, activeStep, equipments} = this.state;
    
    return (
      <React.Fragment>
        {user === null || currentUser === null ? null : (
          <Grid style={{position: 'relative', height : '100vh'}}>
            <Grid style={{height: '2vh', backgroundColor: 'rgba(178,204,251,1)'}}/>
            <Grid style={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', height: '8vh'}}>
              <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', width: '90%'}}>
                <Grid>
                  <VerifiedUserIcon/>
                </Grid>
                <Grid style={{display: 'flex', flexDirection:'column'}}>
                  <Grid>
                    <Typography>Paiement</Typography>
                  </Grid>
                  <Grid>
                    <Typography>100% sécurisé</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.contentStepper}>
              <Stepper activeStep={activeStep} isType={'confirmPaiement'}/>
            </Grid>
            <Grid  className={classes.mainContainer}>
              {this.renderSwitch(activeStep)}
            </Grid>
            <Grid style={{width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 0, backgroundColor: 'white'}}>
              <Grid style={{width: '90%'}}>
                <TrustAndSecurity/>
              </Grid>
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ConfirmPayement);
