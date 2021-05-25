const {clearAuthenticationToken}=require('../utils/authentication')
const {setAxiosAuthentication}=require('../utils/authentication')
import React from 'react';
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
const {BOOK_STATUS, COMM_CLIENT, MANAGER}=require('../utils/consts')

const isEmpty = require('../server/validation/is-empty');
const {isDateAvailable} = require('../utils/dateutils')
const {computeBookingReference} = require('../utils/functions');
const {emptyPromise} = require('../utils/promise');
const {isMomentAvailable, getDeadLine} = require('../utils/dateutils');
const {computeDistanceKm} = require('../utils/functions');
const {snackBarError}=require('../utils/notifications')

const moment = require('moment');
const {is_b2b_admin, is_b2b_manager, get_role}=require('../utils/context')

moment.locale('fr');
registerLocale('fr', fr);

// TODO : gérer affichage si utilisateur non connecté
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
      company_amount: 0,
      company_percent: 0,
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
      use_cesu: false,
      albums:[],
      excludedDays: [],
      available_budget: Number.MAX_SAFE_INTEGER,
      pending: false,
    };
    this.checkBook = this.checkBook.bind(this)
    this.hasWarningPerimeter = this.hasWarningPerimeter.bind(this)
    this.book = this.book.bind(this)
    this.getClientAddress = this.getClientAddress.bind(this)
    this.isInPerimeter = this.isInPerimeter.bind(this)
  }

  setState = (st, cb) => {
    console.log(`setState:${Object.keys(st)}`)
    return super.setState(st, cb)
  }

  static getInitialProps({query: {id, address}}) {
    return {service_id: id, address: address};
  }

  // Converts 'all' to 'main'
  get_prop_address = () => {
    return this.props.address=='all' ? 'main' : this.props.address
  }

  componentDidMount() {

    const id = this.props.service_id;

    setAxiosAuthentication()

    let bookingObj = JSON.parse(localStorage.getItem('bookingObj'));
    if (bookingObj && bookingObj.serviceUserId.toString() !== id) {
      bookingObj = null;
      localStorage.removeItem('bookingObj');
    }

    var st={}
    axios.get(`/myAlfred/api/serviceUser/${id}`)
      .then(res => {
        let serviceUser = res.data;
        var count = Object.fromEntries(serviceUser.prestations.map(p => [p._id, null]))

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

        var st = []
        axios.get('/myAlfred/api/users/current')
          .catch (err => {})
          .then(res => {
            let user = res ? res.data : null
            // Mode compagnie : l'admin a un budget illimité comme un user standard, le manager a le budget de son département
            if (user && user.company) {
              axios.get(`/myAlfred/api/companies/budget/${user._id}/${get_role()}`)
                .then ( res => {
                  this.setState({available_budget: res.data, role: get_role()})
                })
                .catch (err => {
                  console.error(err)
                  this.setState({available_budget: 0})
                })
              axios.get(`/myAlfred/api/companies/supported/${user._id}/${serviceUser.service._id}/${get_role()}`)
                .then( res => {
                  const percent=res.data
                  this.setState({company_percent: percent})
                })
                .catch (err => {
                  console.error(err)
                })

            }
            st['user']=user
            const promise = is_b2b_admin(user)||is_b2b_manager(user) ? axios.get('/myAlfred/api/companies/current') : emptyPromise({ data : user})
            promise
              .then(res => {
                var allAddresses = {'main': res.data.billing_address};
                res.data.service_address.forEach(addr => {
                  allAddresses[addr._id] = addr
                });
                st['allAddresses']=allAddresses

                axios.get(`/myAlfred/api/availability/userAvailabilities/${serviceUser.user._id}`)
                  .then(res => {
                    let availabilities = res.data;
                    st['availabilities']=availabilities
                    const excludedDays = this.getExcludedDays(availabilities)
                    st['excludedDays']=excludedDays
                    axios.get('/myAlfred/api/reviews/' + serviceUser.user._id)
                      .then(response => {
                        const skills = response.data;
                        st['skills']=skills
                        axios.get('/myAlfred/api/shop/alfred/' + serviceUser.user._id)
                          .then(res => {
                            let shop = res.data;
                            st['shop']=shop
                            st['flexible']=shop.flexible_cancel
                            st['moderate']=shop.moderate_cancel
                            st['strict']=shop.strict_cancel
                            st['use_cesu']=shop.cesu !== 'Disabled'
                            axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${serviceUser.user._id}`)
                              .then(res => {
                                var reviews = res.data;
                                if (id) {
                                  reviews = reviews.filter(r => r.serviceUser._id === id);
                                }
                                st['reviews']=reviews
                                const equipmentsPromise=serviceUser.service.equipments.map( res => axios.get(`/myAlfred/api/equipment/${res}`))
                                Promise.all(equipmentsPromise)
                                  .then( res => {
                                    st['allDetailEquipments']=res.map( r => r.data)
                                    this.setState({
                                      serviceUser: serviceUser,
                                      service: serviceUser.service,
                                      equipments: serviceUser.equipments,
                                      prestations: serviceUser.prestations,
                                      allEquipments: serviceUser.service.equipments,
                                      alfred: serviceUser.user,
                                      count: count,
                                      pick_tax: null,
                                      date: bookingObj && bookingObj.date_prestation ? moment(bookingObj.date_prestation, 'DD/MM/YYYY').toDate() : null,
                                      time: bookingObj && bookingObj.time_prestation ? moment(bookingObj.time_prestation).toDate() : null,
                                      location: bookingObj ? bookingObj.location : null,
                                      commission: bookingObj ? bookingObj.fees : null,
                                      ...st
                                    }, () => {
                                      if (!bookingObj) {
                                        this.setDefaultLocation();
                                      }
                                      this.computeTotal()
                                    })
                                  })
                              })
                          })
                      })
                  })
              })
              .catch(err => console.error(err))
      })
    })
      .catch(err => console.error(err));

    localStorage.removeItem('bookingObj');
  }

  getExcludedDays = (availabilities) =>  {
    const date=moment(new Date())
    var currMoment=moment(date).set("date", 1)
    const endMoment=moment(date).add(1, "year")
    var exclude=[]
    while (currMoment<endMoment) {
      if (!isDateAvailable(currMoment, availabilities)) {
        exclude.push(currMoment.toDate())
      }
      currMoment.add(1, "d")
    }
    return exclude
  }


  setDefaultLocation = () => {
    console.log('setDefaultLocation')
    const serviceUser = this.state.serviceUser;
    const user = this.state.user;
    var location = serviceUser.location.client && (!user || this.isInPerimeter()) ? this.get_prop_address() || 'main' : serviceUser.location.alfred ? 'alfred' : serviceUser.location.visio ? 'visio' : null;
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
    if (Object.values(this.state.count).every(v => !v)) {
      errors['prestations'] = 'Sélectionnez au moins une prestation';
    }
    else if (this.state.totalPrestations < this.state.serviceUser.minimum_basket) {
      errors['prestations'] = 'Commande minimum des prestation de ' + this.state.serviceUser.minimum_basket + '€ requise';
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

    if (this.hasWarningBudget()) {
      errors['total'] = 'Le montant dépasse le budget disponible pour votre département';
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
    var st={[name]:value}
    if (name === 'location' && value !== 'alfred') {
      st['pick_tax']=null
      st['isChecked']=false
    }
    this.setState(st, this.checkBook)
  };

  onLocationChanged = (id, checked) => {
    // Ne pas permettre la déselection
    if (!checked) {
      return
    }
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
      count[id] = Math.max(0, value - 1);
    }
      this.setState({count: count}, () => this.computeTotal());
  };

  isServiceAtHome = () => {
    return this.state.location && (!['visio', 'alfred'].includes(this.state.location))
  }

  computeTravelTax = () => {
    return this.state.serviceUser.travel_tax && this.isServiceAtHome() ? this.state.serviceUser.travel_tax : 0;
  };

  computePickTax = () => {
    return this.state.isChecked && this.state.location === 'alfred' ? this.state.serviceUser.pick_tax : 0;
  };

  computeTotal = () => {
    const {user, service, available_budget, company_percent}=this.state

    let totalPrestations = 0;
    let totalCesu = 0;
    let count = this.state.count;
    this.state.prestations.forEach(p => {
      if (count[p._id] > 0) {
        totalPrestations += count[p._id] * p.price;
        if (p.prestation.cesu_eligible && this.state.use_cesu) {
          totalCesu += count[p._id] * p.price;
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

    const company_amount=Math.min( total*company_percent, available_budget)
    this.setState({
      totalPrestations: totalPrestations,
      commission: commission,
      total: total,
      company_amount: company_amount,
      cesu_total: totalCesu,
    }, () => this.checkBook());
  };

  isInPerimeter = () => {
    const coordSU = this.state.serviceUser.service_address.gps;
    if (!this.getClientAddress()) {
      return false
    }
    const coordUser = this.getClientAddress().gps;
    const dist = computeDistanceKm(coordSU, coordUser);
    const inPerimeter = parseFloat(dist) < parseFloat(this.state.serviceUser.perimeter);
    return inPerimeter;
  };

  hasWarningPerimeter = () => {
    if (isEmpty(this.state.serviceUser) || isEmpty(this.state.user)) {
      return false;
    }
    if (isEmpty(this.state.location)) {
      return true
    }
    if (this.isServiceAtHome() && !this.isInPerimeter()) {
      return true
    }
    return false
  };

  hasWarningBudget = () => {
    if (get_role()==MANAGER) {
      const warningBudget = this.state.company_amount < this.state.total
      return warningBudget
    }
    return false
  }

  getClientAddress = () => {
    const {user, allAddresses}=this.state
    if (!user) {
      return null
    }
    const{address}=this.props
    if (!address || ['client', 'main', 'all'].includes(address)) {
      return allAddresses['main']
    }
    var res = user ? allAddresses[address] : null
    if (res) {
      res.gps = { lat: res.lat, lng: res.lng}
    }
    return res
  }

  getClientAddressLabel = () => {
    const {location, user, allAddresses}=this.state
    if (['client', 'main'].includes(location)) {
      return 'A mon adresse principale'
    }
    return user ? (allAddresses[location] || {label:''}).label : ''
  }

  getLocationLabel = () => {
    const titles = {
      'client': this.getClientAddressLabel(),
      'main': this.getClientAddressLabel(),
      'alfred': `Chez ${this.state.alfred.firstname}`,
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

  book = actual => { //actual : true=> book, false=>infos request

    const {count, user, serviceUser, pending} = this.state

    if (pending) {
      snackBarError(`Réservation en cours de traitement`)
      return
    }

    let prestations = [];
    this.state.prestations.forEach(p => {
      if (this.state.count[p._id]) {
        prestations.push({price: p.price, value: count[p._id], name: p.prestation.label});
      }
    });

    let place;
    if (user) {
      switch (this.state.location) {
        case 'alfred':
          place = this.state.serviceUser.service_address;
          break;
        case 'visio':
          break;
        default:
          place = this.getClientAddress()
      }
    }


    let bookingObj = {
      reference: user ? computeBookingReference(user, this.state.serviceUser.user) : '',
      service: this.state.serviceUser.service.label,
      serviceId: this.state.serviceUser.service._id,
      address: place,
      location: this.state.location,
      equipments: this.state.serviceUser.equipments,
      amount: this.state.total,
      company_amount: this.state.company_amount,
      date_prestation: this.state.date ? moment(this.state.date).format('DD/MM/YYYY') : null,
      time_prestation: this.state.time,
      alfred: this.state.serviceUser.user._id,
      user: user ? user._id : null,
      prestations: prestations,
      travel_tax: this.computeTravelTax(),
      pick_tax: this.computePickTax(),
      cesu_amount: this.state.cesu_total,
      fees: this.state.commission,
      status: actual ? BOOK_STATUS.TO_PAY : BOOK_STATUS.INFO,
      serviceUserId: this.state.serviceUser._id,
    };

    let chatPromise = !user ?
      emptyPromise({res: null})
      :
      axios.post('/myAlfred/api/chatRooms/addAndConnect', {
        emitter: this.state.user._id,
        recipient: this.state.serviceUser.user._id,
      });

    chatPromise.then(res => {

      if (user) {
        bookingObj['chatroom'] = res.data._id;
      }

      if (this.state.selectedOption !== null) {
        bookingObj.option = this.state.selectedOption;
      }

      localStorage.setItem('bookingObj', JSON.stringify(bookingObj));

      if (!this.state.user) {
        localStorage.setItem('path', Router.asPath)
        Router.push('/?login=true');
        return
      }

      this.setState({pending: true})
      axios.post('/myAlfred/api/booking/add', bookingObj)
        .then(response => {
          const booking = response.data
          axios.put('/myAlfred/api/chatRooms/addBookingId/' + bookingObj.chatroom, {booking: booking._id})
            .then(() => {
              if (actual) {
                Router.push({pathname: '/confirmPayment',query: {booking_id: booking._id}})
              }
              else {
                Router.push(`/profile/messages?user=${response.data.user}&relative=${response.data.alfred}`)
              }
            });
        })
        .catch(err => {
          this.setState({ pending: false})
          console.error(err)
        })
    })
  }

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
    const res = album ? album.pictures : []
    return res
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
                      <UserAvatar user={this.state.alfred}/>
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
                {this.state.allDetailEquipments.length !== 0 ?
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
                      Voir les services
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
                          warningPerimeter={this.hasWarningPerimeter()}
                          warningBudget={this.hasWarningBudget()}
                          clientAddress={this.getClientAddressLabel()}
                          clientAddressId={this.get_prop_address()}
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
                      warningPerimeter={this.hasWarningPerimeter()}
                      warningBudget={this.hasWarningBudget()}
                      clientAddress={this.getClientAddressLabel()}
                      clientAddressId={this.get_prop_address()}
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
    const {classes, address} = this.props;
    const {service,alfred, user, total, available_budget} = this.state;

    if (!this.state.serviceUser) {
      return null
    }

    const res = (
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
          <Layout user={user} selectedAddress={address}>
            {this.content(classes)}
          </Layout>
        </Hidden>
        <Hidden only={['lg', 'xl', 'sm', 'md']}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
      </React.Fragment>
    )
    return res
  }
}

export default withStyles(styles)(UserServicesPreview);
