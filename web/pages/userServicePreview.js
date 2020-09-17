import './userServicePreview/userServicePreviewStyle.css';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../hoc/Layout/Layout';
import styles from './userServicePreview/userServicePreviewStyle';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import axios from 'axios';
import BannerReservation from '../components/BannerReservation/BannerReservation';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UserAvatar from '../components/Avatar/UserAvatar';
import Skills from '../components/Skills/Skills';
import Typography from '@material-ui/core/Typography';
import Schedule from '../components/Schedule/Schedule';
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonSwitch from '../components/ButtonSwitch/ButtonSwitch';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MapComponent from '../components/map';
import DatePicker, {registerLocale} from 'react-datepicker';
import Commentary from '../components/Commentary/Commentary';
import fr from 'date-fns/locale/fr';
import Switch from '@material-ui/core/Switch';
import BookingDetail from '../components/BookingDetail/BookingDetail';
import {Helmet} from 'react-helmet';
import Link from 'next/link';
import cookie from 'react-cookies';
import Information from '../components/Information/Information';

const isEmpty = require('../server/validation/is-empty');
const {computeBookingReference} = require('../utils/functions');
const {COMM_CLIENT} = require('../utils/consts');
const emptyPromise = require('../utils/promise');
const {isMomentAvailable, getDeadLine} = require('../utils/dateutils');
const {computeDistanceKm} = require('../utils/functions');
const moment = require('moment');
moment.locale('fr');
registerLocale('fr', fr);
const {frenchFormat} = require('../utils/text');
const I18N = require('../utils/i18n');


const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: '#47bdd7',
      '& + $track': {
        backgroundColor: 'white',

      },
    },
    '&$focusVisible $thumb': {
      color: 'white',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({classes, ...props}) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

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
    },
      this.onQtyChanged = this.onQtyChanged.bind(this);
    this.checkBook = this.checkBook.bind(this);
  }

  static getInitialProps({query: {id}}) {
    return {service_id: id};
  }

  componentDidMount() {
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
                  return bp.name == p.prestation.label;
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
                  use_cesu: shop.cesu != 'Disabled',
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
    if (Object.values(this.state.count).every(v => v == 0 || v == null)) {
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

  extractFilters() {
    var result = {};
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
  }

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
    if (name == 'location' && value != 'alfred') {
      this.setState({pick_tax: null, isChecked: false});
    }
  };

  onLocationChanged = (id, checked) => {
    this.onChange({target: {name: 'location', value: checked ? id : null}});
  };

  onQtyChanged = event => {
    var {name, value} = event.target;
    if (!value) {
      value = null;
    }
    value = parseInt(value);
    value = !isNaN(value) && value >= 0 ? value : null;
    var count = this.state.count;
    count[name] = value;
    this.setState({count: count}, () => this.computeTotal());
  };

  computeTravelTax = () => {
    return this.state.serviceUser.travel_tax && this.state.location == 'client' ? this.state.serviceUser.travel_tax : 0;
  };

  computePickTax = () => {
    return this.state.isChecked && this.state.location == 'alfred' ? this.state.serviceUser.pick_tax : 0;
  };

  computeTotal = () => {
    var totalPrestations = 0;
    var totalCesu = 0;
    var count = this.state.count;
    var su = this.state.serviceUser;
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

    var commission = totalPrestations * COMM_CLIENT;
    var total = totalPrestations;
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
    var prestations = [];
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


    var chatPromise = (actual || !user) ? emptyPromise({res: null}) : axios.post('/myAlfred/api/chatRooms/addAndConnect', {
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

  needPanel(prestations, fltr, classes, index) {

    return (
      <Grid style={{width: '100%'}}>
        <ExpansionPanel defaultExpanded={index == 0}>

          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{fltr ? fltr : ''}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.contentPanel(prestations, classes)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    );
  };

  contentPanel(prestations, classes) {
    return (
      <Grid style={{width: '100%'}}>
        {prestations.map((p) => {
          return (
            <Grid style={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <Grid>
                <TextField
                  id="outlined-number"
                  label="Quantité"
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{shrink: true}}
                  margin="dense"
                  variant="outlined"
                  name={p._id}
                  value={this.state.count[p._id]}
                  onChange={this.onQtyChanged}
                />
              </Grid>
              <Grid style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                <Grid style={{width: '100%', marginLeft: 10}}>
                  <label>{p.prestation.label}
                  </label>
                </Grid>
                <Grid style={{width: '50%'}}>
                  <label>{p.price ? p.price.toFixed(2) : '?'}€</label>
                </Grid>
                <Grid style={{width: '50%'}}>
                  <label>{p.billing ? p.billing.label : '?'}</label>
                </Grid>
                <Grid style={{width: '10%'}}>
                  {p.prestation.cesu_eligible && this.state.use_cesu ?
                    <img src="/static/assets/img/cesu.svg" width="40px"
                         alt={`${p.prestation.label} est une prestation éligible au CESU`}
                         title={`${p.prestation.label} est une prestation éligible au CESU`}/>
                    :
                    <div style={{width: '40px'}}/>
                  }
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  formatDeadline = dl => {
    if (!dl) {
      return dl;
    }
    ;
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
    const dt = new Date([...dates][0])
    this.setState({date : dt, time: mode=='week' ? mmt : undefined}, () => this.checkBook())
  }

  render() {
    const {classes} = this.props;
    const {date, time, location, serviceUser, shop, service, equipments, alfred, errors, isChecked} = this.state;

    const filters = this.extractFilters();

    const pricedPrestations = this.computePricedPrestations();

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    const drawer = side => (
      <Grid className={classes.borderContentRight}>
        <Grid style={{marginBottom: 30}}>
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <Typography variant="h6" style={{color: '#505050', fontWeight: 'bold'}}>Date & heure</Typography>
              <em style={{color: '#f87280'}}>{errors['datetime']}</em>
            </Grid>
            <Hidden lgUp>
              <Grid>
                <IconButton aria-label="Edit" className={classes.iconButtonStyle}>
                  <CloseIcon color={'secondary'} onClick={this.toggleDrawer(side, false)}/>
                </IconButton>
              </Grid>
            </Hidden>
          </Grid>
          <Grid style={{display: 'flex', marginLeft: 10, marginTop: 20}}>
            <Grid>
              <DatePicker
                selected={this.state.date}
                dateFormat="dd/MM/yyyy"
                onChange={this.onChangeDate}
                placeholderText="Date"
                locale='fr'
                minDate={new Date()}
                className={classes.datePickerStyle}
              />
            </Grid>
            <Grid style={{marginLeft: 50}}>
              <DatePicker
                selected={this.state.time}
                onChange={this.onChangeTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Heure"
                placeholderText="Heure"
                dateFormat="HH:mm"
                locale='fr'
                minDate={new Date()}
                className={classes.datePickerStyle}
              />

            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 30}}>
          <Grid>
            <Typography variant="h6" style={{color: '#505050', fontWeight: 'bold'}} error={errors.prestations}>Mes
              prestations</Typography>
            <em style={{color: '#f87280'}}>{errors['prestations']}</em>
          </Grid>
          <Grid style={{marginTop: 30}}>
            {/* Start filter */}
            {Object.keys(filters).sort().map((key, index) => {
              var fltr = key;
              var prestations = filters[key];
              return (
                <Grid>
                  {fltr === '' ?
                    this.contentPanel(prestations, classes) :
                    this.needPanel(prestations, fltr, classes, index)
                  }
                </Grid>
              );
            })
            }
            {/* End filter */}

          </Grid>
        </Grid>
        <Grid style={{marginBottom: 30}}>
          <Grid>
            <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Lieu de la prestation</Typography>
            <em style={{color: '#f87280'}}>{errors['location']}</em>
          </Grid>
          <Grid>
            {serviceUser.location && serviceUser.location.client && this.isInPerimeter() ?
              <Grid>
                <ButtonSwitch key={moment()} id='client' label={'A mon adresse principale'} isEditable={false}
                              isPrice={false} isOption={false} checked={location === 'client'}
                              onChange={this.onLocationChanged}/>
              </Grid>
              : null
            }
            {
              serviceUser.location && serviceUser.location.alfred && alfred.firstname !== undefined ?
                <Grid>
                  <ButtonSwitch key={moment()} id='alfred' label={'Chez ' + alfred.firstname} isEditable={false}
                                isPrice={false} isOption={false} checked={location === 'alfred'}
                                onChange={this.onLocationChanged}/>
                </Grid>
                : null
            }
            {
              serviceUser.location && serviceUser.location.visio ?
                <Grid>
                  <ButtonSwitch key={moment()} id='visio' label={'En visio'} isEditable={false} isPrice={false}
                                isOption={false} checked={location === 'visio'} onChange={this.onLocationChanged}/>
                </Grid>
                : null
            }
          </Grid>
        </Grid>
        {serviceUser.pick_tax || this.computeTravelTax() ?
          <Grid style={{marginBottom: 30}}>
            <Grid>
              <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Option(s) de la
                prestation</Typography>
            </Grid>
            <Grid style={{marginTop: 20, marginLeft: 5, marginRight: 15}}>
              {serviceUser.travel_tax && location == 'client' ?
                <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Grid>
                    Frais de déplacement
                  </Grid>
                  <Grid>
                    {serviceUser.travel_tax.toFixed(2)}€
                  </Grid>
                </Grid>
                : null
              }
              {serviceUser.pick_tax && location == 'alfred' ?
                <Grid>
                  <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Grid>
                        <IOSSwitch
                          color="primary"
                          type="checkbox"
                          checked={isChecked}
                          onChange={this.onPickTaxChanged}
                        />
                      </Grid>
                      <Grid>
                        <label>Retrait & livraison</label>
                      </Grid>
                    </Grid>

                    {
                      isChecked ?
                        <Grid>
                          {serviceUser.pick_tax.toFixed(2)}€
                        </Grid> : null
                    }

                  </Grid>
                </Grid>

                : null
              }
            </Grid>
          </Grid> : null
        }
        <Grid style={{marginBottom: 30}}>
          <Grid>
            <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Détails de la
              prestation</Typography>
          </Grid>
          <Grid style={{marginTop: 20, marginLeft: 10}}>
            <Grid style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
              <Grid>
                <img style={{width: 40, height: 40}} alt={'adresse'} title={'adresse'}
                     src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
              </Grid>
              <Grid style={{marginLeft: 10}}>
                <label>{this.getLocationLabel()}</label>
              </Grid>
            </Grid>
            <Grid style={{display: 'flex', alignItems: 'center'}}>
              <Grid>
                <img style={{width: 40, height: 40}} alt={'calendrier'} title={'calendrier'}
                     src={'../../static/assets/img/userServicePreview/calendrier.svg'}/>
              </Grid>
              <Grid style={{marginLeft: 10}}>
                <label>Le {date ? moment(date).format('DD/MM/YYYY') : ''} à {time ? moment(time).format('HH:mm') : ''}</label>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{display: 'flex', flexDirection: 'column', marginLeft: 15, marginRight: 15, marginBottom: 30}}>
          <BookingDetail prestations={pricedPrestations} count={this.state.count} travel_tax={this.computeTravelTax()}
                         pick_tax={this.state.pick_tax} total={this.state.total} client_fee={this.state.commission}
                         cesu_total={this.state.cesu_total}/>
        </Grid>
        <Grid>
          <Grid style={{display: 'flex', justifyContent: 'space-around'}}>
            <Grid>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                aria-label="add"
                className={classes.margin}
                disabled={!isEmpty(errors)}
                onClick={() => this.book(false)}
              >
                Demande d’informations
              </Button>
            </Grid>
            <Grid>
              <Button
                style={{color: 'white'}}
                variant="contained"
                size="medium"
                color="secondary"
                aria-label="add"
                className={classes.margin}
                disabled={!isEmpty(errors)}
                onClick={() => this.book(true)}
              >
                Réserver
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

    return (
      <>
        <Helmet>
          <meta property="og:image" content={`/${service.picture}`}/>
          <meta property="og:image:secure_url" content={`/${service.picture}`}/>
          <meta property="og:description" content={`${service.label} par ${alfred.firstname}`}/>
          <meta property="description" content={`${service.label} par ${alfred.firstname}`}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://my-alfred.io"/>
        </Helmet>
        <Grid>
          <Layout>
            <Information
              open={this.state.warningPerimeter}
              onClose={() => this.setState({warningPerimeter: false})}
              type='warning'
              text={I18N.OUTSIDE_PERIMETER}
            />
            <Grid style={{width: '100%'}}>
              <BannerReservation serviceUser={service} shop={shop} user={alfred}/>
              <Grid className={classes.mainContainer}>
                <Grid className={classes.leftContainer}>
                  <Grid className={classes.avatarAnDescription}>
                    <Grid className={classes.flexContentAvatarAndDescription}>
                      <Grid className={classes.marginAvatarAndDescriptionContent}>
                        <Grid>
                          <Typography variant="h6">{service.label} par {alfred.firstname}</Typography>
                        </Grid>
                      </Grid>
                      <Grid style={{display: 'flex', alignItems: 'center'}}>
                        <Grid>
                          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                            <Badge badgeContent={alfred.score} color={'primary'} classes={{badge: classes.badge}}>
                              <StyledRating name="read-only" value={alfred.score} readOnly className={classes.rating}/>
                            </Badge>
                          </Box>
                        </Grid>
                        {
                          alfred.score < 0 ?
                            <Grid>
                              <a href={'#'}>Voir plus de commentaires</a>
                            </Grid> : null
                        }
                      </Grid>
                      <Grid className={classes.middleHr}>
                        <Grid>
                          <hr style={{color: 'rgb(80, 80, 80, 0.2)'}}/>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Grid>
                          {
                            serviceUser.description !== '' ? <p>{serviceUser.description}</p> :
                              <p>Cet utilisateur n'a pas encore de description.</p>
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className={classes.avatarContainer}>
                      <Grid item className={classes.itemAvatar}>
                        <UserAvatar classes={'avatarLetter'} user={alfred} className={classes.avatarLetter}/>
                        <Typography style={{marginTop: 20}}
                                    className={classes.textAvatar}>{alfred.firstname}</Typography>
                        <Grid style={{textAlign: 'center'}}>
                          <Link
                            href={{
                              pathname: '/viewProfile',
                              query: {id: this.state.alfred._id},
                            }}
                          >
                            <Typography
                              style={{
                                color: 'rgb(47, 188, 211)',
                                cursor: 'pointer',
                              }}
                            >
                              Voir le profil
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.responsiveListContainer}>
                    <List dense={this.state.dense} className={classes.flexPosition}>
                      <Grid className={classes.itemListContainer}>
                        <Grid className={classes.marginRight}>
                          <ListItem className={classes.noPadding}>
                            <ListItemIcon className={classes.minWidth}>
                              <img
                                src={serviceUser.graduated && serviceUser.graduated !== '' && serviceUser.graduated !== null && serviceUser.graduated !== undefined ? '../../static/assets/img/iconCardAlfred/graduated.svg' : '../../static/assets/img/iconCardAlfred/no_graduated.svg'}
                                alt={'Diplome'} title={'Diplome'} className={classes.imageStyle}/>
                            </ListItemIcon>
                            <ListItemText
                              classes={{primary: classes.sizeText}}
                              primary={'Diplômé(e)'}
                            />
                          </ListItem>
                        </Grid>
                        <Grid className={classes.marginRight}>
                          <ListItem className={classes.noPadding} style={{marginLeft: 5}}>
                            <ListItemIcon className={classes.minWidth}>
                              <img
                                src={serviceUser.is_certified && serviceUser.is_certified !== '' && serviceUser.is_certified !== null && serviceUser.is_certified !== undefined ? '../../static/assets/img/iconCardAlfred/certificate.svg' : '../../static/assets/img/iconCardAlfred/no_certificate.svg'}
                                alt={'Certifié'} title={'Certifié'} className={classes.imageStyle}/>
                            </ListItemIcon>
                            <ListItemText
                              classes={{primary: classes.sizeText}}
                              primary="Certifié(e)"
                            />
                          </ListItem>
                        </Grid>
                        <Grid>
                          <ListItem className={classes.noPadding} style={{marginLeft: 5}}>
                            <ListItemIcon className={classes.minWidth}>
                              <img
                                src={serviceUser.level > 0 ? '/static/assets/img/iconCardAlfred/experience.svg' : '/static/assets/img/iconCardAlfred/no_experience.svg'}
                                alt={'Expérimenté'} title={'Expérimenté'} className={classes.imageStyle}/>
                            </ListItemIcon>
                            <ListItemText
                              classes={{primary: classes.sizeText}}
                              primary="Expérimenté(e)"
                            />
                          </ListItem>
                        </Grid>
                      </Grid>
                    </List>
                  </Grid>
                  <Grid style={{marginTop: 30}}>
                    <Grid className={classes.skillsContentContainer}>
                      <Skills alfred={alfred} widthHr={500} skills={this.state.skills}/>
                    </Grid>
                  </Grid>
                  {equipments.length !== 0 ?
                    <Grid className={classes.equipmentsContainer}>
                      <Grid>
                        <Typography variant="h6">{alfred.firstname} fournit :</Typography>
                      </Grid>
                      <Grid className={classes.hrStyle}>
                        <hr style={{color: 'rgb(80, 80, 80, 0.2)'}}/>
                      </Grid>
                      <Grid>
                        <Grid className={classes.textEquipments}>
                          <p>Dans le cadre de son service, votre Alfred peut fournir du matériel et des produits en
                            fonction des prestations. Ces produits & matériels sont fournis sans surcoût. </p>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Grid container spacing={1} style={{marginRight: 10, marginLeft: 10}}>
                          {equipments.map((result) => {
                            return (
                              <Grid key={result.id} item xl={2} lg={3} md={4} sm={4} xs={4}>
                                <img src={`../../static/equipments/${result.logo.slice(0, -4)}_Selected.svg`}
                                     height={100} width={100} alt={`${result.name_logo.slice(0, -4)}_Selected.svg`}/>
                              </Grid>
                            );
                          })
                          }
                        </Grid>
                      </Grid>
                    </Grid> : null
                  }
                  <Grid className={classes.scheduleContainer}>
                    <Grid className={classes.scheduleContainerTitle}>
                      <Grid>
                        <Typography
                          variant="h6">{frenchFormat(`Les disponibilités de ${alfred.firstname}`)}</Typography>
                      </Grid>
                      <Grid className={classes.hrStyle}>
                        <hr style={{color: 'rgb(80, 80, 80, 0.2)'}}/>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Schedule availabilities={this.state.availabilities} bookings={[]} services={[]}
                                selectable={true} height={400} nbSchedule={1} handleSelection={this.scheduleDateChanged}
                                singleSelection={true} mode={'week'} style={classes}
                      />
                    </Grid>
                  </Grid>
                  <Grid className={classes.basketMinimumContainer}>
                    <Grid>
                      <Typography variant="h6">Panier minimum de réservation</Typography>
                    </Grid>
                    <Grid className={classes.hrStyle}>
                      <hr style={{color: 'rgb(80, 80, 80, 0.2)'}}/>
                    </Grid>
                    <Grid>
                      <Grid className={classes.textContentBasket}>
                        <p>Le montant minimum de réservation correspond au panier minimum requis pour réserver ce
                          service. Si votre Alfred indique un montant de 10€, vous ne pourrez pas réserver ce service si
                          la somme des prestations n’atteint pas ce montant.</p>
                      </Grid>
                    </Grid>
                    <Grid className={classes.priceBasketContent}>
                      <Grid>
                        <img style={{width: 40, height: 40}} title={'shop'} alt={'shop'}
                             src={'../../static/assets/img/userServicePreview/shop.svg'}/>
                      </Grid>
                      <Grid style={{fontSize: 'x-large', marginLeft: 15}}>
                        {serviceUser.minimum_basket} €
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.delayPrevenance}>
                    <Grid>
                      <Typography variant="h6">{frenchFormat(`Délai de prévenance de ${alfred.firstname}`)}</Typography>
                    </Grid>
                    <Grid className={classes.hrStyle}>
                      <hr style={{color: 'rgb(80, 80, 80, 0.2)'}}/>
                    </Grid>
                    <Grid>
                      <Grid className={classes.textContentDelay}>
                        <p>Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation
                          du service. Par exemple, si votre Alfred impose un délai de 24 heures, vous pourrez réserver
                          votre service au minimum 24 heures avant son intervention. </p>
                      </Grid>
                    </Grid>
                    <Grid className={classes.delayPrevenanceContent}>
                      <Grid>
                        <img style={{width: 40, height: 40}} title={'prevenance'} alt={'prevenance'}
                             src={'../../static/assets/img/userServicePreview/prevenance.svg'}/>
                      </Grid>
                      <Grid style={{fontSize: 'x-large', marginLeft: 15}}>
                        {
                          this.formatDeadline(serviceUser.deadline_before_booking)
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.perimeterContent}>
                    <Grid>
                      <Typography
                        variant="h6">{frenchFormat(`Périmètre d'intervention de ${alfred.firstname}`)}</Typography>
                    </Grid>
                    <Grid className={classes.hrStyle}>
                      <hr style={{color: 'rgb(80, 80, 80, 0.2)'}}/>
                    </Grid>
                    <Grid>
                      <Grid className={classes.textContentPerimeter}>
                        <p>Le périmètre d’intervention de votre Alfred est la zone dans laquelle votre Alfred accepte de
                          se déplacer pour réaliser ses services. Par mesure de sécurité et conformément à notre
                          politique de confidentialité, l’adresse de votre Alfred n’est pas communiquée. </p>
                      </Grid>
                      <Grid style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                        <Grid>
                          <img style={{width: 40, height: 40}} title={'adresse'} alt={'adresse'}
                               src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
                        </Grid>
                        <Grid style={{fontSize: 'x-large', marginLeft: 15}}>
                          {serviceUser.perimeter} km
                        </Grid>
                      </Grid>
                      <Grid style={{width: '100%', height: 300}}>
                        {serviceUser && serviceUser.service_address ?
                          <MapComponent
                            position={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]}
                            perimeter={serviceUser.perimeter * 1000} alfred={alfred.firstname}/>
                          :
                          <p>Emplacement de l'Alfred</p>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.bookingConditionContent}>
                    <Grid className={classes.bookingConditionContentTitle}>
                      <Typography
                        variant="h6">{frenchFormat(`Les conditions d’annulation de ${alfred.firstname}`)}</Typography>
                    </Grid>
                    <Grid className={classes.hrStyle}>
                      <hr style={{color: 'rgb(80, 80, 80, 0.2)'}}/>
                    </Grid>
                    <Grid className={classes.listContent}>
                      <Grid className={classes.listStyle}>
                        <Grid>
                          <Checkbox
                            disabled={true}
                            checked={this.state.flexible}
                            value={this.state.flexible}
                            color="primary"
                            name={'strict_cancel'}
                            inputProps={{
                              'aria-label': 'secondary checkbox',
                            }}
                            icon={<CircleUnchecked/>}
                            checkedIcon={<RadioButtonCheckedIcon/>}
                          />
                        </Grid>
                        <Grid>
                          <p>
                            Flexibles - Remboursement intégral jusqu’à un jour avant la prestation
                          </p>
                        </Grid>
                      </Grid>
                      <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                        <Grid>
                          <Checkbox
                            disabled={true}
                            checked={this.state.moderate}
                            value={this.state.moderate}
                            color="primary"
                            name={'strict_cancel'}
                            inputProps={{
                              'aria-label': 'secondary checkbox',
                            }}
                            icon={<CircleUnchecked/>}
                            checkedIcon={<RadioButtonCheckedIcon/>}
                          />
                        </Grid>
                        <Grid>
                          <p>
                            Modérées - Remboursement intégral jusqu’à 5 jours avant la prestation
                          </p>
                        </Grid>
                      </Grid>
                      <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                        <Grid>
                          <Checkbox
                            disabled={true}
                            checked={this.state.strict}
                            value={this.state.strict}
                            color="primary"
                            name={'strict_cancel'}
                            inputProps={{
                              'aria-label': 'secondary checkbox',
                            }}
                            icon={<CircleUnchecked/>}
                            checkedIcon={<RadioButtonCheckedIcon/>}
                          />
                        </Grid>
                        <Grid>
                          <p>
                            Strictes - Remboursement intégral jusqu’à 10 jours avant la prestation
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.commentaryContent}>
                    <Grid className={classes.bookingConditionContentTitle}>
                      <Typography variant="h6">{frenchFormat(`Les évaluations de ${alfred.firstname}`)}</Typography>
                    </Grid>
                    <Grid className={classes.hrStyle}>
                      <hr style={{color: 'rgb(80, 80, 80, 0.2)'}}/>
                    </Grid>
                    <Grid>
                      <Commentary alfred_mode={true} user_id={alfred._id} service_id={this.props.service_id}
                                  key={moment()}/>
                    </Grid>
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
                        {drawer('bottom')}
                      </Grid>
                    </Drawer>
                  </Hidden>
                </Grid>
                {/* ------------------------------------------------------- ici content right ---------------------------------------------------*/}
                <Hidden mdDown implementation="css">
                  <Grid className={classes.contentRight}>
                    {drawer()}
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Layout>
        </Grid>
      </>
    );
  }
}

UserServicesPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default withStyles(styles, {withTheme: true})(UserServicesPreview);
