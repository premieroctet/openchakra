import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../hoc/Layout/Layout';
import styles from '../static/css/pages/userServicePreviewPage/userServicePreviewStyle';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import axios from 'axios';
import UserAvatar from '../components/Avatar/UserAvatar';
import Typography from '@material-ui/core/Typography';
import Schedule from '../components/Schedule/Schedule';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MapComponent from '../components/map';
import {registerLocale} from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import Switch from '@material-ui/core/Switch';
import {Helmet} from 'react-helmet';
import Link from 'next/link';
import cookie from 'react-cookies';
import Topic from "../hoc/Topic/Topic";
import ListAlfredConditions from "../components/ListAlfredConditions/ListAlfredConditions";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GallerySlidePics from "../components/GallerySlidePics/GallerySlidePics";
import SummaryCommentary from "../components/SummaryCommentary/SummaryCommentary"
import DrawerBooking from "../components/Drawer/DrawerBooking/DrawerBooking";
import LayoutAccount from "../hoc/Layout/LayoutAccount";
import LayoutMobile from "../hoc/Layout/LayoutMobile";
import withSlide from "../hoc/Slide/SlideShow";
import withGrid from "../hoc/Grid/GridCard";
import CardAlbum from "../components/Card/CardAlbum/CardAlbum";
const ImageSlide=withSlide(withGrid(CardAlbum));
const {SlideGridDataModel}=require('../utils/models/SlideGridDataModel');



const isEmpty = require('../server/validation/is-empty');
const {computeBookingReference} = require('../utils/functions');
const {COMM_CLIENT} = require('../utils/consts');
const emptyPromise = require('../utils/promise');
const {isMomentAvailable, getDeadLine} = require('../utils/dateutils');
const {computeDistanceKm} = require('../utils/functions');
const moment = require('moment');
moment.locale('fr');
registerLocale('fr', fr);

class UserServicesPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      shop: {},
      reviews:[],
      serviceUser: {},
      alfred: {},
      service: {},
      equipments: [],
      allDetailEquipments: [],
      prestations: [],
      flexible: false,
      moderate: false,
      strict: false,
      allEquipments: [],
      availabilities: [],
      bottom: false,
      count: {},
      totalPrestations: 0,
      commission: 0,
      cesu_total: 0,
      total: 0,
      location: null,
      date: null,
      time: null,
      skills: {
        careful: 0,
        punctual: 0,
        flexible: 0,
        reactive: 0,
      },
      errors: {},
      isChecked: false,
      warningPerimeter: false,
      use_cesu: false,
      albums:[]
    };
    this.checkBook = this.checkBook.bind(this)
    this.hasWarningPerimeter = this.hasWarningPerimeter.bind(this)
  }

  static getInitialProps({query: {id}}) {
    return {service_id: id};
  }

  componentDidMount() {
    const token = cookie.load('token');
    if (token) {
      this.setState({logged: true});
    }
    axios.defaults.headers.common['Authorization'] = token;
    let bookingObj = JSON.parse(localStorage.getItem('bookingObj'));

    const id = this.props.service_id;

    if (bookingObj) {
      if (bookingObj.serviceUserId.toString() !== id) {
        bookingObj = null;
        localStorage.removeItem('bookingObj');
      }
    }
    localStorage.setItem('path', Router.pathname);
    axios.get(`/myAlfred/api/serviceUser/${id}`)
      .then(res => {
        axios.get('/myAlfred/api/users/current')
          .then(res => {
            let user = res.data;
            this.setState({user: user});
          })
          .catch(err => console.error(err))
          .finally(() => {

            let serviceUser = res.data;
            var count = {};
            serviceUser.prestations.forEach(p => count[p._id] = null);

            if (bookingObj) {
              serviceUser.prestations.forEach(p => {
                const bookP = bookingObj.prestations.find(bp => {
                  return bp.name === p.prestation.label;
                });
                if (bookP) {
                  count[p._id] = parseInt(bookP.value);
                }
              });
            }

            axios.get(`/myAlfred/api/availability/userAvailabilities/${serviceUser.user._id}`)
              .then(res => {
                let availabilities = res.data;
                this.setState({availabilities: availabilities});
              })
              .catch(err => console.error(err));

            axios.get('/myAlfred/api/reviews/' + serviceUser.user._id)
              .then(response => {
                const skills = response.data;
                this.setState({skills: skills});
              })
              .catch(error => console.error(error));

            axios.get('/myAlfred/api/shop/alfred/' + serviceUser.user._id)
              .then(res => {
                let shop = res.data;
                this.setState({
                  shop: shop,
                  flexible: shop.flexible_cancel,
                  moderate: shop.moderate_cancel,
                  strict: shop.strict_cancel,
                  use_cesu: shop.cesu !== 'Disabled',
                });
              })
              .catch(err => console.error(err));

            axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${serviceUser.user._id}`)
              .then(res => {
                var reviews = res.data;
                if (id) {
                  reviews = reviews.filter(r => r.serviceUser._id === id);
                }
                this.setState({reviews: reviews});
              })
              .catch(err => console.error(err));

            this.setState({
              serviceUser: serviceUser,
              service: serviceUser.service,
              equipments: serviceUser.equipments,
              prestations: serviceUser.prestations,
              allEquipments: serviceUser.service.equipments,
              alfred: serviceUser.user,
              count: count,
              pick_tax: null,
              date: bookingObj ? moment(bookingObj.date_prestation, 'DD/MM/YYYY').toDate() : null,
              time: bookingObj ? moment(bookingObj.time_prestation).toDate() : null,
              location: bookingObj ? bookingObj.location : null,
              commission: bookingObj ? bookingObj.fees : null,
            }, () => {
              if (!bookingObj) {
                this.setDefaultLocation();
              }
            });
            this.state.allEquipments.map( res => {
              axios.get(`/myAlfred/api/equipment/${res}`).then( res => {let data = res.data ; this.setState({allDetailEquipments: [...this.state.allDetailEquipments, data]})}).catch( err => {console.error(err)});
            });
          });
      })
      .catch(err => console.error(err));


    localStorage.removeItem('bookingObj');
    setTimeout(() => {
      this.computeTotal();
    }, 3000);
  }

  setDefaultLocation = () => {
    const serviceUser = this.state.serviceUser;
    const user = this.state.user;
    var location = serviceUser.location.client && (!user || this.isInPerimeter()) ? 'client' : serviceUser.location.alfred ? 'alfred' : serviceUser.location.visio ? 'visio' : null;
    if (location == null && user) {
      this.setState({warningPerimeter: true});
    }
    this.setState({location: location});
  };

  computeReservationDate = () => {
    var dt = moment(this.state.date);
    var tm = moment(this.state.time);
    if (!dt.isValid() || !tm.isValid()) {
      return null;
    }
    dt.hour(tm.hour()).minute(tm.minute());
    return dt;
  };

  checkBook = () => {
    var errors = {};
    if (Object.values(this.state.count).every(v => v === 0 || v == null)) {
      errors['prestations'] = 'Sélectionnez au moins une prestation';
    }
    if (this.state.totalPrestations < this.state.serviceUser.minimum_basket) {
      errors['total'] = 'Commande minimum des prestation de ' + this.state.serviceUser.minimum_basket + '€ requise';
    }

    if (!errors.datetime && this.state.date == null) {
      errors['datetime'] = 'Sélectionnez une date';
    }

    if (!errors.datetime && this.state.time == null) {
      errors['datetime'] = 'Sélectionnez une heure';
    }

    const reservationDate = this.computeReservationDate();
    if (!errors.datetime && reservationDate.isValid() && !isMomentAvailable(reservationDate, this.state.availabilities)) {
      errors['datetime'] = this.state.alfred.firstname + ' n\'est pas disponible à cette date/heure';
    }

    const minBookingDate = getDeadLine(this.state.serviceUser.deadline_before_booking);
    if (!errors.datetime && reservationDate.isBefore(minBookingDate)) {
      errors['datetime'] = 'Le délai de prévenance n\'est pas respecté';
    }

    if (reservationDate && reservationDate.isBefore(moment())) {
      errors['datetime'] = 'Réservation impossible avant maintenant';
    }

    if (!this.state.location) {
      errors['location'] = 'Sélectionnez un lieu de prestation';
    }
    this.setState({errors: errors});
  };

  extractFilters = () => {
    let result = {};
    if (this.state.prestations.length === 0) {
      return result;
    }
    this.state.prestations.forEach(p => {
      if (p.prestation == null) {
        // FIX : réaffecter les prestations persos
        console.error(`Error:${p.id} has a null prestation`);
      } else {
        var filter = p.prestation.filter_presentation;
        var key = !filter || filter.label === 'Aucun' ? '' : filter.label;
        if (key in result) {
          result[key].push(p);
        } else {
          result[key] = [p];
        }
      }
    });
    // Set "no filter" to first position
    return result;
  };

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({...this.state, [side]: open});
  };

  onChangeTime = tm => {
    this.onChange({target: {name: 'time', value: tm}});
  };

  onChangeDate = dt => {
    this.onChange({target: {name: 'date', value: dt}});
  };

  onChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value}, () => this.computeTotal());
    if (name === 'location' && value !== 'alfred') {
      this.setState({pick_tax: null, isChecked: false});
    }
  };

  onLocationChanged = (id, checked) => {
    this.onChange({target: {name: 'location', value: checked ? id : null}});
  };

  onQtyChanged = (state, id) => (event) => {
    let value = this.state.count[id];
    if (!value) {
      value = null;
    }
    value = parseInt(value);
    value = !isNaN(value) && value >= 0 ? value : null;
    let count = this.state.count;
    if(state=== 'add'){
      count[id] = value + 1;

    }else{
      count[id] = value - 1;
    }
      this.setState({count: count}, () => this.computeTotal());
  };

  computeTravelTax = () => {
    return this.state.serviceUser.travel_tax && this.state.location === 'client' ? this.state.serviceUser.travel_tax : 0;
  };

  computePickTax = () => {
    return this.state.isChecked && this.state.location === 'alfred' ? this.state.serviceUser.pick_tax : 0;
  };

  computeTotal = () => {
    let totalPrestations = 0;
    let totalCesu = 0;
    let count = this.state.count;
    this.state.prestations.forEach(p => {
      if (count[p._id] > 0) {
        totalPrestations += count[p._id] * p.price;
        if (p.prestation.cesu_eligible && this.state.use_cesu) {
          totalCesu += count[p._id] * p.price;
          totalCesu += count[p._id] * p.price * COMM_CLIENT;
        }
      }
    });
    const travelTax = this.computeTravelTax();
    const pickTax = this.computePickTax();
    totalPrestations += travelTax ? parseFloat(travelTax) : 0;
    totalPrestations += pickTax ? parseFloat(pickTax) : 0;

    // Ajout frais dep & retrait/livraison si CESU
    if (totalCesu) {
      totalCesu += travelTax ? parseFloat(travelTax) : 0;
      totalCesu += pickTax ? parseFloat(pickTax) : 0;
    }

    let commission = totalPrestations * COMM_CLIENT;
    let total = totalPrestations;
    total += commission;
    this.setState({
      totalPrestations: totalPrestations,
      commission: commission,
      total: total,
      cesu_total: totalCesu,
    }, () => this.checkBook());
  };

  isInPerimeter = () => {
    if (isEmpty(this.state.serviceUser) || isEmpty(this.state.user)) {
      return false;
    }
    const coordSU = this.state.serviceUser.service_address.gps;
    const coordUser = this.state.user.billing_address.gps;
    const dist = computeDistanceKm(coordSU, coordUser);
    const inPerimeter = parseFloat(dist) < parseFloat(this.state.serviceUser.perimeter);
    return inPerimeter;
  };

  hasWarningPerimeter = () => {
    if (isEmpty(this.state.serviceUser) || isEmpty(this.state.user)) {
      return false;
    }
    const result=!Boolean(this.isInPerimeter());
    console.log(`hasWarningPerimeter()=>${result}`);
  };

  getLocationLabel = () => {
    const titles = {
      'client': 'A mon adresse principale',
      'alfred': 'Chez ' + this.state.alfred.firstname,
      'visio': 'En visio',
    };
    if (!this.state.location) {
      return '';
    } else {
      return titles[this.state.location];
    }
  };

  onPickTaxChanged = (id, checked) => {
    this.setState({isChecked: !this.state.isChecked});
    this.onChange({target: {name: 'pick_tax', value: checked ? this.state.serviceUser.pick_tax : null}});
  };

  book = (actual) => { //actual : true=> book, false=>infos request

    const count = this.state.count;
    const user = this.state.user;
    let prestations = [];
    this.state.prestations.forEach(p => {
      if (this.state.count[p._id]) {
        prestations.push({price: p.price, value: count[p._id], name: p.prestation.label});
      }
    });

    let place;
    if (user) {
      switch (this.state.location) {
        case 'client':
          place = this.state.user.billing_address;
          break;
        case 'alfred':
          place = this.state.serviceUser.service_address;
          break;
      }
    }


    let chatPromise = (actual || !user) ? emptyPromise({res: null}) : axios.post('/myAlfred/api/chatRooms/addAndConnect', {
      emitter: this.state.user._id,
      recipient: this.state.serviceUser.user._id,
    });

    chatPromise.then(res => {
      let bookingObj = {
        reference: user ? computeBookingReference(user, this.state.serviceUser.user) : '',
        service: this.state.serviceUser.service.label,
        serviceId: this.state.serviceUser.service._id,
        address: place,
        location: this.state.location,
        equipments: this.state.serviceUser.equipments,
        amount: this.state.total,
        date_prestation: moment(this.state.date).format('DD/MM/YYYY'),
        time_prestation: this.state.time,
        alfred: this.state.serviceUser.user._id,
        user: user ? user._id : null,
        prestations: prestations,
        travel_tax: this.computeTravelTax(),
        pick_tax: this.computePickTax(),
        cesu_amount: this.state.cesu_total,
        fees: this.state.commission,
        status: actual ? 'En attente de confirmation' : 'Demande d\'infos',
        serviceUserId: this.state.serviceUser._id,
      };

      if (!actual && user) {
        bookingObj['chatroom'] = res.data._id;
      }

      if (this.state.selectedOption !== null) {
        bookingObj.option = this.state.selectedOption;
      }

      if (actual) {
        localStorage.setItem('bookingObj', JSON.stringify(bookingObj));
        if (user) {
          localStorage.setItem('emitter', this.state.user._id);
          localStorage.setItem('recipient', this.state.serviceUser.user._id);
          localStorage.removeItem('address');
        }

        if (!this.state.user) {
          cookie.remove('token', {path: '/'});
          Router.push({pathname: '/login'});
        } else {
          Router.push({
            pathname: '/confirmPayement',
            query: {id: this.props.service_id},
          });
        }
      } else {
        if (!user) {
          cookie.remove('token', {path: '/'});
          localStorage.setItem('bookingObj', JSON.stringify(bookingObj));
          localStorage.setItem('path', Router.pathname);
          Router.push({pathname: '/login'});
        } else {
          axios.post('/myAlfred/api/booking/add', bookingObj)
            .then(response => {
              axios.put('/myAlfred/api/chatRooms/addBookingId/' + bookingObj.chatroom, {booking: response.data._id})
                .then(() => {
                  localStorage.removeItem('address');
                  Router.push({
                    pathname: '/reservations/messagesDetails',
                    query: {id: bookingObj.chatroom, booking: response.data._id},
                  });
                });
            })
            .catch(err => console.error(err));
        }
      }
    });
  };

  formatDeadline = dl => {
    if (!dl) {
      return dl;
    }
    dl = dl.replace('jours', 'jour(s)').replace('semaines', 'semaine(s)').replace('heures', 'heure(s)');
    return dl;
  };

  computePricedPrestations = () => {
    const count = this.state.count;
    var result = {};
    this.state.prestations.forEach(p => {
      if (count[p._id]) {
        result[p.prestation.label] = count[p._id] * p.price;
      }
    });
    return result;
  };

  // TODO : force computing disponibility
  scheduleDateChanged = (dates, mmt, mode) => {
    const dt = new Date([...dates][0]);
    this.setState({date : dt, time: mode==='week' ? mmt : undefined}, () => this.checkBook())
  };

  loadAlbums = () => {
    console.log('bonjour')
    axios.get(`/myAlfred/api/users/profile/albums/${this.state.alfred._id}`)
      .then( res => {
        this.setState({ albums: res.data})
      })
      .catch (err => console.error(err))
  };

  getAlbum = (id) => {
    return this.state.albums.find( a => a._id===id)
  };

  getAlbumPictures = () => {
    const album=this.getAlbum(this.state.selectedAlbum);
    return album ? album.pictures : []
  };

  content = (classes) => {
    const serviceAddress = this.state.serviceUser.service_address;

    const filters = this.extractFilters();

    const pricedPrestations = this.computePricedPrestations();

    const pictures = this.getAlbumPictures();


    return(
      <Grid style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Grid>
          <Grid className={classes.mainContainer}>
            <Grid container className={classes.widthContainer}>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12} className={classes.leftContainer}>
                <Grid container className={classes.avatarAnDescription}>
                  <Grid item xl={3} sm={3} className={classes.avatarContainer}>
                    <Grid item className={classes.itemAvatar}>
                      <UserAvatar user={this.state.alfred} className={classes.avatarLetter}/>
                    </Grid>
                  </Grid>
                  <Grid item xl={9} sm={9} className={classes.flexContentAvatarAndDescription}>
                    <Grid className={classes.marginAvatarAndDescriptionContent}>
                      <Grid>
                        <Typography variant="h6">{this.state.alfred.firstname} - {this.state.service.label}</Typography>
                      </Grid>
                      {
                        serviceAddress ?
                          <Grid>
                            <Typography style={{color:'rgba(39,37,37,35%)'}}>{serviceAddress.city}, {serviceAddress.country} - {this.state.serviceUser.perimeter}km autour de {serviceAddress.city}</Typography>
                          </Grid> : null
                      }
                    </Grid>
                    <Grid>
                      <Link
                        href={{
                          pathname: '/profile/about',
                          query: {user: this.state.alfred._id},
                        }}
                      >
                        <Button variant={'outlined'} className={classes.userServicePreviewButtonProfil}>Voir le profil</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid style={{marginTop: '10%'}}>
                  <Grid className={classes.overrideCssChild}>
                    <Topic
                      titleTopic={'Description'}
                      titleSummary={this.state.serviceUser.description ? this.state.serviceUser.description : 'Cet utilisateur n\'a pas encore de description.'}
                      needBackground={true}
                      underline={true}
                    >
                      <ListAlfredConditions
                        columnsXl={12}
                        wrapperComponentProps={
                          [
                            {
                              label: this.state.alfred.firstname ? 'Délai de prévenance' : '',
                              summary: this.state.alfred.firstname ? `${this.state.alfred.firstname} a besoin de ${this.formatDeadline(this.state.serviceUser.deadline_before_booking)} pour préparer son service` : '',
                              IconName:this.state. alfred.firstname ? <InsertEmoticonIcon fontSize="large"/> : ''
                            },
                            {
                              label:  this.state.alfred.firstname ? 'Conditions d’annulation' : '',
                              summary: this.state.alfred.firstname ? `${this.state.alfred.firstname} vous permet d’annuler votre réservation jusqu’à ${this.state.flexible ? '1 jour' : this.state.moderate ? '5 jours' : '10 jours'} avant la date prévue` : '',
                              IconName:  this.state.alfred.firstname ? <CalendarTodayIcon fontSize="large"/> : ''
                            },
                            {
                              label:  this.state.alfred.firstname ? 'Panier minimum' : '',
                              summary: this.state.alfred.firstname ? `Le panier minimum de ${this.state.alfred.firstname} est de ${this.state.serviceUser.minimum_basket}€` : '',
                              IconName:  this.state.alfred.firstname ? <ShoppingCartIcon fontSize="large"/> : ''
                            },
                          ]
                        }
                      />
                    </Topic>
                  </Grid>
                </Grid>
                <Grid className={classes.scheduleContainer}>
                  <Topic
                    underline={true}
                    style={classes}
                    titleTopic={'Sélectionnez vos dates'}
                    titleSummary={this.state.alfred.firstname ? `Choisissez vos dates selon les disponibilités de ${this.state.alfred.firstname}` : ''}
                  >
                    <Schedule
                      availabilities={this.state.availabilities}
                      bookings={[]}
                      services={[]}
                      selectable={true}
                      height={400}
                      nbSchedule={1}
                      handleSelection={this.scheduleDateChanged}
                      singleSelection={true}
                      mode={'week'}
                      underline={true}
                      style={classes}
                    />
                  </Topic>
                </Grid>
                {this.state.equipments.length !== 0 ?
                  <Grid className={classes.equipmentsContainer}>
                    <Topic
                      titleTopic={'Matériel'}
                      needBackground={true}
                      underline={true}
                      titleSummary={this.state.alfred.firstname ? `Le matériel de ${this.state.alfred.firstname}` : ''}
                    >
                      <ListAlfredConditions
                        columnsXl={6}
                        columnsLG={6}
                        columnsMD={6}
                        columnsSM={6}
                        columnsXS={6}
                        wrapperComponentProps={this.state.allDetailEquipments}
                        equipmentsSelected={this.state.equipments}
                      />
                    </Topic>
                  </Grid> : null
                }
                <Grid className={classes.perimeterContent}>
                  {
                    this.state.serviceUser && this.state.serviceUser.service_address ?
                      <Grid style={{width: '100%'}}>
                        <Topic
                          underline={true}
                          titleTopic={'Lieu de la prestation'}
                          titleSummary={this.state.alfred.firstname ? `La zone dans laquelle ${this.state.alfred.firstname} peut intervenir` : ''}
                        >
                          <MapComponent
                            position={[this.state.serviceUser.service_address.gps.lat, this.state.serviceUser.service_address.gps.lng]}
                            perimeter={this.state.serviceUser.perimeter * 1000}
                          />
                        </Topic>
                      </Grid> : ''
                  }
                </Grid>
                <Hidden only={['xl', 'lg']}>
                  <Grid className={classes.showReservation}>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-label="add"
                      classes={{root: classes.buttonReservation}}
                      onClick={this.toggleDrawer('bottom', true)}
                    >
                      Réserver
                    </Button>
                  </Grid>
                  <Hidden only={['xl', 'lg']}>
                    <Drawer anchor="bottom" open={this.state.bottom} onClose={this.toggleDrawer('bottom', false)}>
                      <Grid className={classes.drawerContent}>
                        <DrawerBooking
                          side={'bottom'}
                          filters={filters}
                          pricedPrestations={pricedPrestations}
                          toggleDrawer={this.toggleDrawer}
                          onChangeDate={this.onChangeDate}
                          onChangeTime={this.onChangeTime}
                          isInPerimeter={this.isInPerimeter}
                          onQtyChanged={this.onQtyChanged}
                          onLocationChanged={this.onLocationChanged}
                          computeTravelTax={this.computeTravelTax}
                          getLocationLabel={this.getLocationLabel}
                          warningPerimeter={this.state.warningPerimeter}
                          book={this.book}
                          {...this.state}
                        />
                      </Grid>
                    </Drawer>
                  </Hidden>
                </Hidden>
              </Grid>
              {/* ------------------------------------------------------- ici content right ---------------------------------------------------*/}
              <Hidden only={['xs', 'sm', 'md']}>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12} style={{paddingLeft: '5%', paddingRight: '5%'}}>
                  <Grid className={classes.contentRight}>
                    <DrawerBooking
                      filters={filters}
                      pricedPrestations={pricedPrestations}
                      toggleDrawer={this.toggleDrawer}
                      onChangeDate={this.onChangeDate}
                      onChangeTime={this.onChangeTime}
                      onQtyChanged={this.onQtyChanged}
                      isInPerimeter={this.isInPerimeter}
                      onLocationChanged={this.onLocationChanged}
                      computeTravelTax={this.computeTravelTax}
                      getLocationLabel={this.getLocationLabel}
                      warningPerimeter={this.state.warningPerimeter}
                      book={this.book}
                      {...this.state}
                    />
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'center'}}>
            <Grid style={{width: '80%', paddingLeft: '5%', paddingRight: '5%'}}>
              { false ? <Grid style={{marginTop: '5%'}}>
                <Topic
                  underline={true}
                  titleTopic={this.state.alfred.firstname ? `Les photos de ${this.state.alfred.firstname}` : ''}
                  titleSummary={this.state.alfred.firstname ? `Un aperçu du travail de ${this.state.alfred.firstname}` : ''}
                  needBackground={true}
                >
                  <Grid>
                    {pictures.length === 0 ? null :
                      <ImageSlide
                        model={new SlideGridDataModel(pictures, 4, 1, true)}
                        style={classes}
                      />
                    }
                  </Grid>
                </Topic>
              </Grid>: null}

              {
                this.state.reviews.length === 0 ? null :
                  <Grid style={{marginTop: '5%'}}>
                    <Topic
                      underline={true}
                      titleTopic={'Commentaires'}
                      titleSummary={this.state.alfred.firstname ? `Ici, vous pouvez laisser des commentaires à ${this.state.alfred.firstname} !` : ''}
                    >
                      <SummaryCommentary user={this.state.alfred._id}  serviceUser={this.props.service_id}/>
                    </Topic>

                  </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {classes} = this.props;
    const {service,alfred, user,} = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <meta property="og:image" content={`/${service.picture}`}/>
          <meta property="og:image:secure_url" content={`/${service.picture}`}/>
          <meta property="og:description" content={`${service.label} par ${alfred.firstname}`}/>
          <meta property="description" content={`${service.label} par ${alfred.firstname}`}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://my-alfred.io"/>
        </Helmet>
        <Hidden only={['xs', ]}>
          <Layout user={user}>
            {this.content(classes)}
          </Layout>
        </Hidden>
        <Hidden only={['lg', 'xl', 'sm', 'md']}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserServicesPreview);
