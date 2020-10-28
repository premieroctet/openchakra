import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import styles from '../static/css/pages/confirmPayement/confirmPayement';
import cookie from 'react-cookies';
import Stepper from "../components/Stepper/Stepper";
import AddressAndFacturation from "../components/Payement/AddressAndFacturation/AddressAndFacturation";
import PaymentChoice from "../components/Payement/PaymentChoice/PaymentChoice";
import LayoutPayment from "../hoc/Layout/LayoutPayment";

moment.locale('fr');

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
        Router.push({pathname: '/'});
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

  handleStep = () => {
      this.setState({activeStep: this.state.activeStep + 1});
      localStorage.setItem('emitter', this.state.emitter);
      localStorage.setItem('recipient', this.state.recipient);
  };

  payDirect = () => {
    const total = parseFloat(this.state.total);
    const fees = parseFloat(this.state.fees);
    const data = {
      id_card: this.state.id_card,
      amount: total,
      fees: fees,
    };
    axios.post('/myAlfred/api/payment/payInDirect', data)
      .then(() => {
        Router.push('/paymentSuccess?id=' + this.state.booking_id);
      })
      .catch( err => { console.error(err)});
  };

  pay = () => {
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

export default withStyles(styles)(ConfirmPayement);
