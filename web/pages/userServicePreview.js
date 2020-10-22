import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../hoc/Layout/Layout';
import styles from '../static/css/userServicePreviewPage/userServicePreviewStyle';
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
import WithTopic from "../hoc/Topic/Topic";
import ListAlfredConditions from "../components/ListAlfredConditions/ListAlfredConditions";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GallerySlidePics from "../components/GallerySlidePics/GallerySlidePics";
import SummaryCommentary from "../components/SummaryCommentary/SummaryCommentary"
import DrawerBooking from "../components/Drawer/DrawerBooking/DrawerBooking";


const isEmpty = require('../server/validation/is-empty');
const {computeBookingReference} = require('../utils/functions');
const {COMM_CLIENT} = require('../utils/consts');
const emptyPromise = require('../utils/promise');
const {isMomentAvailable, getDeadLine} = require('../utils/dateutils');
const {computeDistanceKm} = require('../utils/functions');
const moment = require('moment');
moment.locale('fr');
registerLocale('fr', fr);

const DescriptionTopic = WithTopic(ListAlfredConditions);
const ScheduleTopic = WithTopic(Schedule);
const EquipementTopic = WithTopic(ListAlfredConditions);
const MapTopic = WithTopic(MapComponent);
const PhotoTopic = WithTopic(GallerySlidePics);
const CommentaryTopic = WithTopic(SummaryCommentary);

class UserServicesPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      shop: {},
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
    };
    this.checkBook = this.checkBook.bind(this);
  }

  static getInitialProps({query: {id}}) {
    return {service_id: id};
  }

  componentDidMount() {
    const token = cookie.load('token');
    if (token) {
      this.setState({logged: true});
    }
    let bookingObj = JSON.parse(localStorage.getItem('bookingObj'));

    const id = this.props.service_id;

    if (bookingObj) {
      if (bookingObj.serviceUserId.toString() !== id) {
        bookingObj = null;
        localStorage.removeItem('bookingObj');
      }
    }
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
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
    let location = serviceUser.location.client && (!user || this.isInPerimeter()) ? 'client' : serviceUser.location.alfred ? 'alfred' : serviceUser.location.visio ? 'visio' : null;
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
    const inPerimeter = dist < this.state.serviceUser.perimeter;
    return inPerimeter;
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

  render() {
    const {classes} = this.props;
    const {serviceUser, service, equipments, alfred, user, allDetailEquipments} = this.state;

    const serviceAddress = serviceUser.service_address;

    const filters = this.extractFilters();

    const pricedPrestations = this.computePricedPrestations();

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
        <Grid>
          <Layout user={user}>
            <Grid style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Grid>
                <Grid className={classes.mainContainer}>
                  <Grid container style={{width: '80%'}}>
                    <Grid item xl={6}  style={{paddingLeft: '5%', paddingRight: '5%'}} className={classes.leftContainer}>
                      <Grid container className={classes.avatarAnDescription}>
                        <Grid item xl={3} sm={3} className={classes.avatarContainer}>
                          <Grid item className={classes.itemAvatar}>
                            <UserAvatar user={alfred} className={classes.avatarLetter}/>
                          </Grid>
                        </Grid>
                        <Grid item xl={9} sm={9} className={classes.flexContentAvatarAndDescription}>
                          <Grid className={classes.marginAvatarAndDescriptionContent}>
                            <Grid>
                              <Typography variant="h6">{alfred.firstname} - {service.label}</Typography>
                            </Grid>
                            {
                              serviceAddress ?
                                <Grid>
                                  <Typography style={{color:'rgba(39,37,37,35%)'}}>{serviceAddress.city}, {serviceAddress.country} - {serviceUser.perimeter}km autour de {serviceAddress.city}</Typography>
                                </Grid> : null
                            }
                          </Grid>
                          <Grid style={{display: 'flex', alignItems: 'center'}}>
                            {
                              alfred.score < 0 ?
                                <Grid>
                                  <a href={'#'}>Voir plus de commentaires</a>
                                </Grid> : null
                            }
                          </Grid>
                          <Grid>
                            <Grid>
                              <Link
                                href={{
                                  pathname: '/viewProfile',
                                  query: {id: this.state.alfred._id},
                                }}
                              >
                                <Button variant={'outlined'} className={classes.userServicePreviewButtonProfil}>Voir le profil</Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid style={{marginTop: '10%'}}>
                        <DescriptionTopic
                          titleTopic={'Description'}
                          titleSummary={serviceUser.description ? serviceUser.description : 'Cet utilisateur n\'a pas encore de description.'}
                          needBackground={true}
                          underline={true}
                          columnsXl={12}
                          wrapperComponentProps={
                            [
                              {
                                label: alfred.firstname ? 'Délai de prévenance' : '',
                                summary: alfred.firstname ? `${alfred.firstname} a besoin de ${this.formatDeadline(serviceUser.deadline_before_booking)} pour préparer son service` : '',
                                IconName: alfred.firstname ? <InsertEmoticonIcon fontSize="large"/> : ''
                              },
                              {
                                label:  alfred.firstname ? 'Conditions d’annulation' : '',
                                summary: alfred.firstname ? `${alfred.firstname} vous permet d’annuler votre réservation jusqu’à ${this.state.flexible ? '1 jour' : this.state.moderate ? '5 jours' : '10 jours'} avant la date prévue` : '',
                                IconName:  alfred.firstname ? <CalendarTodayIcon fontSize="large"/> : ''
                              },
                              {
                                label:  alfred.firstname ? 'Panier minimum' : '',
                                summary: alfred.firstname ? `Le panier minimum de ${alfred.firstname} est de ${serviceUser.minimum_basket}€` : '',
                                IconName:  alfred.firstname ? <ShoppingCartIcon fontSize="large"/> : ''
                              },
                            ]
                          }
                        />
                      </Grid>
                      <Grid className={classes.scheduleContainer}>
                        <ScheduleTopic
                          titleTopic={'Sélectionnez vos dates'}
                          titleSummary={alfred.firstname ? `Choisissez vos dates selon les disponibilités de ${alfred.firstname}` : ''}
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
                      </Grid>
                      {equipments.length !== 0 ?
                        <Grid className={classes.equipmentsContainer}>
                          <EquipementTopic
                            titleTopic={'Matériel'}
                            columnsXl={6}
                            columnsLG={6}
                            columnsMD={6}
                            columnsSM={6}
                            columnsXS={6}
                            needBackground={true}
                            underline={true}
                            titleSummary={alfred.firstname ? `Le matériel de ${alfred.firstname}` : ''}
                            wrapperComponentProps={allDetailEquipments}
                            equipmentsSelected={equipments}
                          />
                        </Grid> : null
                      }
                      <Grid className={classes.perimeterContent}>
                        {
                          serviceUser && serviceUser.service_address ?
                            <Grid style={{width: '100%'}}>
                              <MapTopic
                                underline={true}
                                titleTopic={'Lieu de la prestation'}
                                titleSummary={alfred.firstname ? `La zone dans laquelle ${alfred.firstname} peut intervenir` : ''}
                                position={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]}
                                perimeter={serviceUser.perimeter * 1000}
                              />
                            </Grid> : ''
                        }
                      </Grid>
                      <Hidden mdUp implementation="css">
                        <Grid className={classes.showReservation}>
                          <Button
                            style={{color: 'white'}}
                            variant="contained"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            className={classes.buttonReservation}
                            onClick={this.toggleDrawer('bottom', true)}
                          >
                            Réserver
                          </Button>
                        </Grid>
                        <Drawer anchor="bottom" open={this.state.bottom} onClose={this.toggleDrawer('bottom', false)}>
                          <Grid className={classes.drawerContent}>
                            <DrawerBooking
                              side={'bottom'}
                              classes={classes}
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
                              book={this.book}

                              {...this.state}
                            />
                          </Grid>
                        </Drawer>
                      </Hidden>
                    </Grid>
                    {/* ------------------------------------------------------- ici content right ---------------------------------------------------*/}
                    <Grid item xl={6} style={{paddingLeft: '5%', paddingRight: '5%'}}>
                      <Hidden mdDown implementation="css" className={classes.contentRight}>
                        <Grid>
                          <DrawerBooking
                            filters={filters}
                            pricedPrestations={pricedPrestations}
                            classes={classes}
                            toggleDrawer={this.toggleDrawer}
                            onChangeDate={this.onChangeDate}
                            onChangeTime={this.onChangeTime}
                            onQtyChanged={this.onQtyChanged}
                            isInPerimeter={this.isInPerimeter}
                            onLocationChanged={this.onLocationChanged}
                            computeTravelTax={this.computeTravelTax}
                            getLocationLabel={this.getLocationLabel}
                            book={this.book}
                            {...this.state}
                          />
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid style={{display: 'flex', justifyContent: 'center'}}>
                  <Grid style={{width: '80%', paddingLeft: '5%', paddingRight: '5%'}}>
                    <Grid style={{marginTop: '5%'}}>
                      <PhotoTopic
                        underline={true}
                        titleTopic={alfred.firstname ? `Les photos de ${alfred.firstname}` : ''}
                        titleSummary={alfred.firstname ? `Un aperçu du travail de ${alfred.firstname}` : ''}
                        needBackground={true}
                      />
                    </Grid>
                    <Grid style={{marginTop: '5%'}}>
                      <CommentaryTopic
                        underline={true}
                        titleTopic={'Commentaires'}
                        titleSummary={alfred.firstname ? `Ici, vous pouvez laisser des commentaires à ${alfred.firstname} !` : ''}
                        alfred_mode={true}
                        user_id={alfred._id}
                        service_id={this.props.service_id}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Layout>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(UserServicesPreview);
