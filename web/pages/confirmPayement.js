import React, {Fragment} from 'react';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import Footer from '../hoc/Layout/Footer/Footer';
import About from '../components/About/About';
import UserAvatar from '../components/Avatar/UserAvatar';
import BookingDetail from '../components/BookingDetail/BookingDetail';
import styles from '../static/css/pages/confirmPayement/confirmPayement';
import cookie from 'react-cookies';
import Stepper from "../components/Stepper/Stepper";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import TrustAndSecurity from "../hoc/Layout/TrustAndSecurity/TrustAndSecurity";
import AddressService from "../components/AddressService/AddressService";
import Profile from "../components/Profile/Profile";
import ListAlfredConditions from "../components/ListAlfredConditions/ListAlfredConditions";


const {booking_datetime_str} = require('../utils/dateutils');
import WithTopic from "../hoc/Topic/Topic";
import Divider from '@material-ui/core/Divider';
import DrawerBookingRecap from "../components/Drawer/DrawerBookingRecap/DrawerBookingRecap";


const AddressComponent = WithTopic(AddressService);
const ProfilComponent = WithTopic(Profile);
const EquipementTopic = WithTopic(ListAlfredConditions);


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
      equipments: []
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

  handlePay() {
    localStorage.setItem('emitter', this.state.emitter);
    localStorage.setItem('recipient', this.state.recipient);
    Router.push({
      pathname: '/paymentChoiceCreate',
      query: {total: this.state.grandTotal, fees: this.state.fees},
    });
  }

  computePricedPrestations() {
    var result = {};
    const count = this.state.count;
    this.state.prestations.forEach(p => {
      result[p.name] = p.price * p.value;
    });
    return result;
  }

  computeCountPrestations() {
    var result = {};
    this.state.prestations.forEach(p => {
      result[p.name] = p.value;
    });
    return result;
  }

  render() {
    const {classes} = this.props;
    const {currentUser, user, bookingObj, activeStep, equipments} = this.state;

    if (currentUser && bookingObj) {
      var checkAdd = currentUser.billing_address.address === bookingObj.address.address && currentUser.billing_address.zip_code === bookingObj.address.zip_code && currentUser.billing_address.city === bookingObj.address.city;
    }


    const pricedPrestations = this.computePricedPrestations();
    const countPrestations = this.computeCountPrestations();

    return (
      <Fragment>
        {user === null || currentUser === null ? null : (
          <Grid>
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
              <Grid container style={{width: '90%'}}>
                <Grid item xl={6}>
                  <Grid style={{display: 'flex', flexDirection: 'column'}}>
                    <Grid style={{backgroundColor: 'white', borderRadius: 27}}>
                      <AddressComponent
                        titleTopic={'Adresse du service'}
                        titleSummary={'Votre adresse'}
                        underline={false}
                      />
                    </Grid>
                    <Grid style={{backgroundColor: 'white', borderRadius: 27}}>
                      <ProfilComponent
                        titleTopic={'A propos de Béatrice'}
                        titleSummary={false}
                        underline={false}
                        {...this.state}
                      />
                      <Grid>
                        <Divider style={{height: 2, borderRadius: 10, width: '100%'}}/>
                      </Grid>
                      <EquipementTopic
                        titleTopic={'Material fourni'}
                        titleSummary={equipments.length === 0 ? 'Aucun matériel fourni' : false}
                        underline={false}
                        wrapperComponentProps={equipments}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={6}>
                  <Grid>
                    <DrawerBookingRecap
                      {...this.state}
                      pricedPrestations={pricedPrestations}
                      countPrestations={countPrestations}
                    />
                  </Grid>
                  <Grid>

                  </Grid>

                </Grid>
              </Grid>
            </Grid>
            <Grid style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1%', position: 'absolute', bottom: 0, backgroundColor: 'white'}}>
              <Grid style={{width: '90%'}}>
                <TrustAndSecurity/>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ConfirmPayement);
