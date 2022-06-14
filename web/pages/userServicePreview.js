import {Link} from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import {registerLocale} from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import Head from 'next/head'
import lodash from 'lodash'
import DevLog from '../components/DevLog'
import Place from '../components/Place'
import ServiceUserDescription from '../components/ServiceUserDescription'
import Planning from '../components/Planning'
import Topic from '../hoc/Topic/Topic'
import UserAvatar from '../components/Avatar/UserAvatar'
import styles from '../static/css/pages/userServicePreviewPage/userServicePreviewStyle'
import Layout from '../hoc/Layout/Layout'
import CustomButton from '../components/CustomButton/CustomButton'
import {snackBarError} from '../utils/notifications'
import Album from '../components/Album/Album'
import SummaryCommentary from '../components/SummaryCommentary/SummaryCommentary'
import DrawerBooking from '../components/Drawer/DrawerBooking/DrawerBooking'
import LayoutMobile from '../hoc/Layout/LayoutMobile'

import ListIconsSkills from '../components/ListIconsSkills/ListIconsSkills'
import Equipments from '../components/Equipments'

const moment = require('moment')
const {computeBookingReference} = require('../utils/text')
const {computeDistanceKm} = require('../utils/functions')
const isEmpty = require('../server/validation/is-empty')
const {BOOK_STATUS}=require('../utils/consts')
const {
  getDeadLine,
  isDateAvailable,
  isMomentAvailable,
} = require('../utils/dateutils')
const {setAxiosAuthentication}=require('../utils/authentication')
const withParams = require('../components/withParams')
const {isLoggedUserAdmin}=require('../utils/context')

moment.locale('fr')
registerLocale('fr', fr)

// TODO : gérer affichage si utilisateur non connecté
class UserServicesPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      shop: null,
      reviews: [],
      serviceUser: null,
      availabilities: [],
      bottom: false,
      count: {},
      totalPrestations: 0,
      customer_fee: 0,
      provider_fee: 0,
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
      use_cesu: false,
      albums: [],
      excludedDays: [],
      allAddresses: [],
      pending: false,
      avocotes: null,
      all_avocotes: [],
    }
    this.checkBook = this.checkBook.bind(this)
    this.hasWarningPerimeter = this.hasWarningPerimeter.bind(this)
    this.book = this.book.bind(this)
    this.getClientAddress = this.getClientAddress.bind(this)
    this.isInPerimeter = this.isInPerimeter.bind(this)
  }

  // Converts 'all' to 'main'
  get_prop_address = () => {
    return this.props.params.address=='all' ? 'main' : this.props.params.address
  }

  componentDidMount() {

    const id = this.props.params.id

    if (!id) {
      return
    }

    setAxiosAuthentication()

    let bookingObj = JSON.parse(localStorage.getItem('bookingObj'))
    if (bookingObj && bookingObj.serviceUserId.toString() !== id) {
      console.warn('Incorrect bookingObj.serviceUserId')
      bookingObj = null
      localStorage.removeItem('bookingObj')
    }

    axios.get('/myAlfred/api/booking/avocotes')
      .then(res => {
        this.setState({all_avocotes: res.data})
      })
      .catch(err => {
        console.error(err)
      })

    axios.get(`/myAlfred/api/serviceUser/${id}`)
      .then(res => {
        let serviceUser = res.data
        let count = Object.fromEntries(serviceUser.prestations.map(p => [p._id, null]))

        if (bookingObj) {
          serviceUser.prestations.forEach(p => {
            const bookP = bookingObj.prestations.find(bp => bp.name === p.prestation.label)
            if (bookP) { count[p._id] = parseInt(bookP.value) }
          })
        }

        // Filter private_company prestations
        serviceUser.prestations=serviceUser.prestations.filter(p => {
          const company=p.prestation.private_company
          return !company || isLoggedUserAdmin()
        })
        this.setState({serviceUser: serviceUser})

        axios.get(`/myAlfred/api/reviews/${serviceUser.user._id}`)
          .then(response => {
            this.setState({skills: response.data})
          })
        axios.get(`/myAlfred/api/shop/alfred/${ serviceUser.user._id}`)
          .then(res => {
            let shop = res.data
            this.setState({shop: shop})
            this.setState({use_cesu: shop.cesu !== 'Disabled'})
          })
        axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${serviceUser.user._id}`)
          .then(res => {
            let reviews = res.data
            if (id) {
              reviews = reviews.filter(r => r.serviceUser._id === id)
            }
            this.setState({reviews: reviews})
            this.setState({
              count: count,
              pick_tax: null,
              date: bookingObj && bookingObj.prestation_date ? moment(bookingObj.prestation_date, 'DD/MM/YYYY').toDate() : null,
              time: bookingObj && bookingObj.prestation_date ? moment(bookingObj.prestation_date).toDate() : null,
              location: bookingObj ? bookingObj.location : null,
              customer_fee: bookingObj ? bookingObj.customer_fee : null,
              provider_fee: bookingObj ? bookingObj.provider_fee : null,
            }, () => {
              this.setDefaultLocation()
              this.computeTotal()
            })
          })

        axios.get(`/myAlfred/api/availability/userAvailabilities/${serviceUser.user._id}`)
          .then(res => {
            let availabilities = res.data
            this.setState({availabilities: availabilities, excludedDays: this.getExcludedDays(availabilities)})
          })

      })
      .catch(err => console.error(err))


    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({user: user})
        if (user) {
          let allAddresses = {'main': {...res.data.billing_address, label: this.props.t('USERSERVICEPREVIEW.at_home')}}
          res.data.service_address.forEach(addr => {
            allAddresses[addr._id] = addr
          })
          this.setState({allAddresses: allAddresses})
        }
      })
      .catch(err => console.error(err))

    localStorage.removeItem('bookingObj')
  }

  getExcludedDays = availabilities => {
    const date=moment(new Date())
    let currMoment=moment(date).set('date', 1)
    const endMoment=moment(date).add(1, 'year')
    let exclude=[]
    while (currMoment<endMoment) {
      if (!isDateAvailable(currMoment, availabilities)) {
        exclude.push(currMoment.toDate())
      }
      currMoment.add(1, 'd')
    }
    return exclude
  }


  setDefaultLocation = () => {
    const serviceUser = this.state.serviceUser
    const user = this.state.user
    let location = serviceUser.location.client && (!user || this.isInPerimeter()) ? this.get_prop_address() || 'main' : serviceUser.location.alfred ? 'alfred' : serviceUser.location.visio ? 'visio' : null
    this.setState({location: location})
  }

  computeReservationDate = () => {
    let dt = moment(this.state.date)
    let tm = moment(this.state.time)
    if (!dt.isValid() || !tm.isValid()) {
      return null
    }
    dt.hour(tm.hour()).minute(tm.minute())
    return dt
  }

  getAvocotesBooking = () => {
    const {avocotes, all_avocotes}=this.state
    if (!avocotes) {
      return null
    }
    const avocotes_booking=all_avocotes.find(a => a._id==avocotes)
    if (!avocotes_booking) {
      console.error(`Can not find booking ${avocotes}`)
    }
    return avocotes_booking
  }

  onAvocotesChanged = event => {
    const {name, value}=event.target
    const {all_avocotes, serviceUser}=this.state
    const avocotes_booking=all_avocotes.find(a => a._id==value)
    if (!avocotes_booking) {
      return snackBarError(ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.snackbar_no_booking')))
    }
    const suPrestaNames=serviceUser.prestations.map(p => p.prestation.label)
    const avocotesPrestaNames=avocotes_booking.prestations.map(p => p.name)
    const diff=lodash.difference(avocotesPrestaNames, suPrestaNames)
    if (diff.length>0) {
      return snackBarError(ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.snackbar_error_avc')) + diff.join(','))
    }
    let count={}
    avocotes_booking.prestations.forEach(p => {
      const presta = serviceUser.prestations.find(pr => pr.prestation.label == p.name)
      count[presta._id]=p.value
    })
    const allAddresses={'main': avocotes_booking.address}
    this.setState({[name]: value, count: count, allAddresses: allAddresses, location: 'main'}, () => this.computeTotal())
  }

  checkBook = () => {
    let errors = {}
    if (Object.values(this.state.count).every(v => !v)) {
      errors.prestations = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_presta'))
    }
    else if (this.state.totalPrestations < this.state.serviceUser.minimum_basket) {
      errors.prestations = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_minimum_basket', {minimum_basket: this.state.serviceUser.minimum_basket}))
    }

    if (!errors.datetime && this.state.date == null) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_select_date'))
    }

    if (!errors.datetime && this.state.time == null) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_select_hour'))
    }

    const reservationDate = this.computeReservationDate()
    if (!errors.datetime && reservationDate.isValid() && !isMomentAvailable(reservationDate, this.state.availabilities)) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_not_available', {firstname: this.state.serviceUser.user.firstname}))
    }

    const minBookingDate = getDeadLine(this.state.serviceUser.deadline_before_booking)
    if (!errors.datetime && reservationDate.isBefore(minBookingDate)) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_delay_prevenance'))
    }

    if (reservationDate && reservationDate.isBefore(moment())) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_resa_now'))
    }

    if (!this.state.location) {
      errors.location = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_place'))
    }

    if (this.hasWarningSelf()) {
      errors.user = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_resa_myself'))
    }
    if (this.hasWarningPerimeter()) {
      errors.alfred = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_place_far_away'))
    }

    this.setState({errors: errors})
  }

  extractFilters = () => {
    let result = {}
    const {prestations}=this.state.serviceUser
    if (!prestations?.length) {
      return result
    }
    prestations.forEach(p => {
      if (p.prestation == null) {
        // FIX : réaffecter les prestations persos
        console.error(`Error:${p.id} has a null prestation`)
      }
      else {
        let filter = p.prestation.filter_presentation
        let key = !filter || filter.label === 'Aucun' ? '' : filter.label
        if (key in result) {
          result[key].push(p)
        }
        else {
          result[key] = [p]
        }
      }
    })
    return result
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    this.setState({...this.state, [side]: open})
  }

  onChangeTime = tm => {
    this.onChange({target: {name: 'time', value: tm}})
  }

  onChangeDate = dt => {
    this.onChange({target: {name: 'date', value: dt}})
  }

  onChange = event => {
    const {name, value} = event.target
    let st={[name]: value}
    if (name === 'location' && value !== 'alfred') {
      st.pick_tax=null
      st.isChecked=false
    }
    this.setState(st, this.computeTotal)
  }

  onLocationChanged = (id, checked) => {
    // Ne pas permettre la déselection
    if (!checked) {
      return
    }
    this.onChange({target: {name: 'location', value: checked ? id : null}})
  }

  onQtyChanged = (state, id) => () => {
    let value = this.state.count[id]
    if (!value) {
      value = null
    }
    value = parseInt(value)
    value = !isNaN(value) && value >= 0 ? value : null
    let count = this.state.count
    if(state=== 'add') {
      count[id] = value + 1

    }
    else{
      count[id] = Math.max(0, value - 1)
    }
    this.setState({count: count}, () => this.computeTotal())
  }

  isServiceAtHome = () => {
    return this.state.location && (!['visio', 'alfred'].includes(this.state.location))
  }

  computeTotal = () => {

    const {count, serviceUser, location}=this.state

    const avocotes=this.getAvocotesBooking()
    const avocotes_amount = avocotes ? avocotes.amount : null

    setAxiosAuthentication()
    axios.post('/myAlfred/api/booking/compute', {
      prestations: count,
      serviceUser: serviceUser._id,
      distance: this.computeDistance(),
      location: location,
      avocotes_amount: avocotes_amount,
    })
      .then(res => {
        this.setState({
          total: res.data.total,
          totalPrestations: res.data.total_prestations,
          customer_fees: res.data.customer_fees,
          provider_fees: res.data.provider_fees,
          customer_fee: res.data.customer_fee,
          provider_fee: res.data.provider_fee,
          travel_tax: res.data.travel_tax,
          pick_tax: res.data.pick_tax,
          cesu_total: res.data.total_cesu,
        },
        this.checkBook)
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response)
      })
  }

  computeDistance = () => {
    const coordSU = this.state.serviceUser.service_address.gps
    const avocotes_booking=this.getAvocotesBooking()
    if (!this.getClientAddress() && !avocotes_booking) {
      return null
    }
    const coordUser = avocotes_booking ? avocotes_booking.address.gps : this.getClientAddress().gps
    const distance=computeDistanceKm(coordSU, coordUser)
    return distance
  }

  isInPerimeter = () => {
    if (!this.getClientAddress()) {
      return false
    }
    const dist = this.computeDistance()
    return parseFloat(dist) < parseFloat(this.state.serviceUser.perimeter)
  }

  hasWarningPerimeter = () => {
    if (isEmpty(this.state.serviceUser) || isEmpty(this.state.user)) {
      return false
    }
    if (isEmpty(this.state.location) && !this.getAvocotesBooking()) {
      return true
    }
    if (this.isServiceAtHome() && !this.isInPerimeter()) {
      return true
    }
    return false
  }

  hasWarningSelf = () => {
    const {user, serviceUser: {user: alfred}}=this.state
    return user && alfred && user._id.toString()==alfred._id.toString()
  }

  getClientAddress = () => {
    const {user, allAddresses}=this.state
    if (!user) {
      return null
    }
    const{address}=this.props.params
    if (!address || ['client', 'main', 'all'].includes(address)) {
      return allAddresses.main
    }
    let res = user ? allAddresses[address] : null
    if (res) {
      res.gps = {lat: res.lat, lng: res.lng}
    }
    return res
  }

  getClientAddressLabel = () => {
    const avocotes_booking=this.getAvocotesBooking()
    if (avocotes_booking) {
      return `Chez ${avocotes_booking.user.full_name} (${avocotes_booking.user.billing_address.city})`
    }
    const {user, allAddresses}=this.state
    if (!user || !allAddresses?.length==0) {
      return ''
    }
    return allAddresses? allAddresses[this.get_prop_address()]?.label : ''
  }

  getLocationLabel = () => {
    const titles = {
      'client': this.getClientAddressLabel(),
      'main': this.getClientAddressLabel(),
      'alfred': `Chez ${this.state.serviceUser.user.firstname}`,
      'visio': ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.at_remote')),
    }
    if (!this.state.location) {
      return ''
    }
    return titles[this.state.location]

  }

  book = actual => { // actual : true=> book, false=>infos request

    const {count, user, pending} = this.state

    if (pending) {
      snackBarError(ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.snackbar_error_resa')))
      return
    }

    let prestations = []
    this.state.prestations.forEach(p => {
      if (this.state.count[p._id]) {
        prestations.push({price: p.price, value: count[p._id], name: p.prestation.label})
      }
    })

    let place
    if (user) {
      switch (this.state.location) {
        case 'alfred':
          place = this.state.serviceUser.service_address
          break
        case 'visio':
          break
        default:
          place = this.getClientAddress()
      }
    }

    const avocotes_booking = this.getAvocotesBooking()

    const date=moment(this.state.date)
    const time=moment(this.state.time)
    const prestation_date=date.set('hours', time.hours()).set('minutes', time.minutes()).set('seconds', 0)

    let bookingObj = {
      reference: user ? computeBookingReference(user, this.state.serviceUser.user) : '',
      service: this.state.serviceUser.service.label,
      serviceId: this.state.serviceUser.service._id,
      address: avocotes_booking ? avocotes_booking.address : place,
      location: this.state.location,
      equipments: this.state.serviceUser.equipments,
      amount: this.state.total,
      prestation_date: prestation_date,
      alfred: this.state.serviceUser.user._id,
      user: user ? user._id : null,
      prestations: prestations,
      travel_tax: this.state.travel_tax,
      pick_tax: this.state.pick_tax,
      cesu_amount: this.state.cesu_total,
      customer_fee: this.state.customer_fee,
      provider_fee: this.state.provider_fee,
      customer_fees: this.state.customer_fees,
      provider_fees: this.state.provider_fees,
      status: avocotes_booking ? BOOK_STATUS.TO_CONFIRM : actual ? BOOK_STATUS.TO_PAY : BOOK_STATUS.INFO,
      serviceUserId: this.state.serviceUser._id,
      customer_booking: avocotes_booking ? avocotes_booking._id : null,
    }

    let chatPromise = !user ?
      Promise.resolve({res: null})
      :
      axios.post('/myAlfred/api/chatRooms/addAndConnect', {
        emitter: this.state.user._id,
        recipient: this.state.serviceUser.user._id,
      })

    chatPromise.then(res => {

      if (user) {
        bookingObj.chatroom = res.data._id
      }

      localStorage.setItem('bookingObj', JSON.stringify(bookingObj))

      if (!this.state.user) {
        localStorage.setItem('path', Router.asPath)
        Router.push('/?login=true')
        return
      }

      this.setState({pending: true})
      axios.post('/myAlfred/api/booking', bookingObj)
        .then(response => {
          const booking = response.data
          axios.put(`/myAlfred/api/chatRooms/addBookingId/${bookingObj.chatroom}`, {booking: booking._id})
            .then(() => {
              if (booking.customer_booking) {
                Router.push({pathname: '/paymentSuccess', query: {booking_id: booking._id}})
              }
              else if (actual) {
                Router.push({pathname: '/confirmPayment', query: {booking_id: booking._id}})
              }
              else {
                Router.push(`/profile/messages?user=${booking.user}&relative=${booking.alfred}`)
              }
            })
        })
        .catch(err => {
          this.setState({pending: false})
          console.error(err)
        })
    })
  }

  computePricedPrestations = () => {
    const {count, serviceUser: {prestations}} = this.state
    let result = {}
    prestations?.forEach(p => {
      if (count[p._id]) {
        result[p.prestation.label] = count[p._id] * p.price
      }
    })
    return result
  }

  // TODO : force computing disponibility
  scheduleDateChanged = (dates, mmt, mode) => {
    const dt = moment(mmt)
    if (dt.isValid() && isMomentAvailable(dt, this.state.availabilities)) {
      this.setState({date: dt.toDate(), time: dt.toDate()}, () => this.checkBook())
    }
  }

  content = classes => {
    const filters = this.extractFilters()
    const pricedPrestations = this.computePricedPrestations()
    const avocotes_booking=this.getAvocotesBooking()
    const {shop, serviceUser, availabilities}=this.state

    const showProfileEnabled = !!serviceUser?.user?._id

    const warnings=[
      this.hasWarningPerimeter() && this.props.t('DRAWER_BOOKING.warning_perimiter'),
      this.hasWarningSelf() && this.props.t('DRAWER_BOOKING.warning_self')].filter(v => !!v)

    return(
      <Grid style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Grid>
          <Grid className={`custompreviewmain ${classes.mainContainer}`}>
            <Grid container className={classes.widthContainer}>
              <Grid item lg={6} xs={12} className={classes.leftContainer}>
                <Grid container className={classes.avatarAnDescription}>
                  <Grid item sm={3} className={classes.avatarContainer}>
                    <Grid item className={classes.itemAvatar}>
                      <UserAvatar user={serviceUser.user} animateStartup={true}/>
                    </Grid>
                  </Grid>
                  <Grid item sm={9} className={classes.flexContentAvatarAndDescription}>
                    <Grid className={classes.marginAvatarAndDescriptionContent}>
                      <Grid container spacing={1} style={{margin: 0, width: '100%'}}>
                        <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                          <Typography variant="h6">{serviceUser.user.firstname} - {serviceUser.service.label}</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={12} sm={12} xs={12} className={classes.containerListSkills}>
                          <ListIconsSkills data={{insurance_text: shop.insurance_text, grade_text: serviceUser.grade_text}}/>
                        </Grid>
                      </Grid>
                      {
                        serviceUser.service_address &&
                          <Grid>
                            <Typography style={{color: 'rgba(39,37,37,35%)'}} className={'custompreviewplace'}>
                              {serviceUser.service_address.city}, {serviceUser.service_address.country} - {serviceUser.perimeter}km autour de {serviceUser.service_address.city}
                            </Typography>
                          </Grid>
                      }
                      {
                        avocotes_booking &&
                          <Grid>
                            <Typography style={{color: 'rgba(39,37,37,35%)'}}>{`Réservation Avocotés pour ${avocotes_booking.user.full_name}`}</Typography>
                          </Grid>
                      }
                    </Grid>
                    <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
                      <Grid item sm={6} xs={12}>
                        <CustomButton variant={'outlined'} classes={{root: 'custompreviewshowprofil'}} className={classes.userServicePreviewButtonProfil}
                          disabled={!showProfileEnabled} onClick={() => Router.push(`/profile/about?user=${serviceUser.user._id}`)}>
                          {ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.button_show_profil'))}
                        </CustomButton>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Link href="#availabilities">
                          <CustomButton variant={'outlined'} classes={{root: 'custompreviewshowprofil'}} className={classes.userServicePreviewButtonProfil}>
                            {ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.button_show_availabilities'))}
                          </CustomButton>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={'custompreviewboxdescription'} style={{marginTop: '10%'}}>
                  <ServiceUserDescription classes={classes} serviceUser={serviceUser} alfred={serviceUser.user}
                    flexible={shop.flexible_cancel} moderate={shop.moderate_cancel} strict={shop.strict_cancel}/>
                </Grid>
                <Grid className={`custompreviewschedulecont ${classes.scheduleContainer}`}>
                  <Planning availabilities={availabilities} scheduleDateChanged={this.scheduleDateChanged}
                    alfred={serviceUser.user} classes={classes}/>
                </Grid>
                {this.state.serviceUser.service &&
                  <Grid className={classes.equipmentsContainer}>
                    <Equipments classes={classes}
                      allEquipments={serviceUser.service.equipments}
                      selectedEquipments={serviceUser.equipments}
                      alfred={serviceUser.user}/>
                  </Grid>
                }
                <Grid className={`custompreviewbookingmap ${classes.perimeterContent}`}>
                  {
                    serviceUser?.service_address &&
                      <Place title={ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_place'))}
                        subTitle={serviceUser.user.firstname ? ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_zone_intervention')) + serviceUser.user.firstname + ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_zone_intervention_end')) : ''}
                        location={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]}
                        perimeter={serviceUser.perimeter * 1000}/>
                  }
                </Grid>
                <Grid style={{height: '300px'}}>
                  <Album user={serviceUser.user._id} key={serviceUser} underline={true} readOnly={true}/>
                </Grid>
                <Hidden only={['xl', 'lg']} implementation={'css'} className={classes.hidden}>
                  <Grid className={classes.showReservation}>
                    <CustomButton
                      variant="contained"
                      color="primary"
                      aria-label="add"
                      classes={{root: classes.buttonReservation}}
                      onClick={this.toggleDrawer('bottom', true)}
                    >
                      {ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.button_show_services'))}
                    </CustomButton>
                  </Grid>
                  <Hidden only={['xl', 'lg']} implementation={'css'} className={classes.hidden}>
                    <Drawer anchor="bottom" open={this.state.bottom} onClose={this.toggleDrawer('bottom', false)} classes={{root: 'custompreviewdrawer'}}>
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
                          travelTax={this.state.travel_tax}
                          getLocationLabel={this.getLocationLabel}
                          onAvocotesChanged={this.onAvocotesChanged}
                          warnings={warnings}
                          clientAddress={this.getClientAddressLabel()}
                          clientAddressId={this.get_prop_address()}
                          book={this.book}
                          alfred_pro={shop.is_professional}
                        />
                      </Grid>
                    </Drawer>
                  </Hidden>
                </Hidden>
              </Grid>
              {/* ------------------------------------------------------- ici content right ---------------------------------------------------*/}
              <Grid className={classes.contentRightContainer} item xl={6} lg={6} md={12} sm={12} xs={12}>
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
                    travelTax={this.state.travel_tax}
                    getLocationLabel={this.getLocationLabel}
                    onAvocotesChanged={this.onAvocotesChanged}
                    warnings={warnings}
                    clientAddress={this.getClientAddressLabel()}
                    clientAddressId={this.get_prop_address()}
                    book={this.book}
                    alfred_pro={shop.is_professional}
                    {...this.state}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'center'}}>
            <Grid style={{width: '80%', paddingLeft: '5%', paddingRight: '5%'}}>
              {
                this.state.reviews.length === 0 ? null :
                  <Grid style={{marginTop: '5%'}}>
                    <Topic
                      underline={true}
                      titleTopic={ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_commentary'))}
                      titleSummary={serviceUser.user.firstname ?
                        ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_commentary_summary', {firstname: serviceUser.user.firstname}))
                        :
                        ''}
                    >
                      <SummaryCommentary user={serviceUser.user._id} serviceUser={this.props.params.id}/>
                    </Topic>
                  </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  render() {
    const {classes} = this.props
    const {address} = this.props.params
    const {serviceUser, user, shop} = this.state

    if (!serviceUser || !shop) {
      return null
    }
    const description=`${serviceUser.service.label} par ${serviceUser.user.firstname}`
    let picture=serviceUser.service.picture
    if (!picture.startsWith('http') && !picture.startsWith('/')) {
      picture = `/${picture}`
    }

    const res = (
      <React.Fragment>
        <Head>
          <title>{serviceUser.service.label} par {serviceUser.user.full_name}</title>
          <meta property="og:image" content={picture}/>
          <meta property="og:image:secure_url" content={picture}/>
          <meta property="og:description" content={description}/>
          <meta property="description" content={description}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://my-alfred.io"/>
        </Head>
        <DevLog>{JSON.stringify(this.state.serviceUser?.service?.location)}</DevLog>
        <Hidden only={['xs']} implementation={'css'} className={classes.hidden}>
          <Layout user={user} selectedAddress={address}>
            {this.content(classes)}
          </Layout>
        </Hidden>
        <Hidden only={['lg', 'xl', 'sm', 'md']} implementation={'css'} className={classes.hidden}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
      </React.Fragment>
    )
    return res
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(UserServicesPreview)))
