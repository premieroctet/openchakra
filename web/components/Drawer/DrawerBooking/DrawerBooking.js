import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import CancelIcon from '@material-ui/icons/Cancel'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import DatePicker from 'react-datepicker'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import withStyles from '@material-ui/core/styles/withStyles'
import {
  getDeadLine,
  isDateAvailable,
  isMomentAvailable,
} from '../../../utils/dateutils'
import DevLog from '../../DevLog'
import {useUserContext} from '../../../contextes/user.context'
import {computeDistanceKm} from '../../../utils/functions'
import {snackBarError} from '../../../utils/notifications'
import {setAxiosAuthentication} from '../../../utils/authentication'
import {is_development} from '../../../config/config'
import styles from '../../../static/css/components/DrawerBooking/DrawerBooking'
import BookingDetail from '../../BookingDetail/BookingDetail'
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch'
import CustomButton from '../../CustomButton/CustomButton'
const moment = require('moment')
const lodash = require('lodash')
const isEmpty = require('../../../server/validation/is-empty')

moment.locale('fr')

const DrawerBooking = ({classes, t, serviceUserId, date, onAvocotesBookingChange}) => {

  const [serviceUser, setServiceUser]=useState(null)
  const [avocotesBooking, setAvocotesBooking]=useState(null)
  const [avocotesBookings, setAvocotesBookings]=useState([])
  const [count, setCount]=useState({})
  const [bookingDate, setBookingDate]=useState(date)
  const [expanded, setExpanded]=useState(null)
  const [locations, setLocations]=useState({})
  const [location, setLocation]=useState(null)
  const [warnings, setWarnings]=useState([])
  const [errors, setErrors]=useState({})
  const [availabilities, setAvailabilities]=useState([])
  const [excludedDays, setExcludedDays]=useState([])
  const [travel_tax, setTravelTax]=useState(0)
  const [pick_tax, setPickTax]=useState(0)
  const [pricedPrestations, setPricedPrestations]=useState({})
  const [total, setTotal]=useState(0)
  const [customer_fee, setCustomerFee]=useState(0)
  const [cesu_total, setCesuTotal]=useState(0)
  const [alfred_pro, setAlfredPro]=useState(false)
  const [shop, setShop]=useState(null)
  const [canBook, setCanBook]=useState(null)
  const [prices, setPrices]=useState({})

  const {user} = useUserContext()

  useEffect(() => {
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/serviceUser/${serviceUserId}`)
      .then(res => {
        setServiceUser(res.data)
      })
    axios.get('/myAlfred/api/booking/avocotes')
      .then(res => {
        setAvocotesBookings(res.data)
      })
  }, [])

  const getExcludedDays = availabilities => {
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

  useEffect(() => {
    onAvocotesBookingChange && onAvocotesBookingChange(avocotesBooking)
  }, [avocotesBooking])


  useEffect(() => {
    if (serviceUser) {
      let w=[]
      if (location=='main' && serviceUser && computeDistance()>serviceUser.perimeter) {
        w.push(t('DRAWER_BOOKING.warning_perimiter'))
      }
      if (moment(bookingDate).isBefore(moment())) {
        w.push(t('USERSERVICEPREVIEW.error_resa_now'))
      }
      const minBookingDate = getDeadLine(serviceUser.deadline_before_booking)
      if (moment(bookingDate).isBefore(minBookingDate)) {
        w.push(t('USERSERVICEPREVIEW.error_delay_prevenance'))
      }
      setWarnings(w)
    }
  }, [location, serviceUser, user, bookingDate])

  useEffect(() => {
    if (serviceUser) {
      axios.get(`/myAlfred/api/availability/userAvailabilities/${serviceUser.user._id}`)
        .then(res => {
          let avail = res.data
          setAvailabilities(avail)
          setExcludedDays(getExcludedDays(avail))
        })
      axios.get(`/myAlfred/api/shop/alfred/${serviceUser.user._id}`)
        .then(res => {
          let shop = res.data
          setShop(shop)
        })
    }
  }, [serviceUser])

  useEffect(() => {
    if (lodash.sum(Object.values(count))>0 && location && serviceUser && bookingDate) {
      computeTotal()
    }
  }, [count, location, bookingDate, serviceUser])

  useEffect(() => {
    const bookingEnabled=!!serviceUser && location && lodash.sum(Object.values(count)) && bookingDate && warnings.length==0
    setCanBook(bookingEnabled)
  }, [serviceUser, count, location, warnings, bookingDate])

  useEffect(() => {
    if (!serviceUser || !user) { return }
    const locations={}
    if (serviceUser.location.client) {
      const avocotes_booking=avocotesBookings.find(a => a._id==avocotes)
      if (avocotes_booking) {
        locations.main=`Chez ${avocotes_booking.user.full_name}`
      }
      else {
        locations.main=`A mon adresse principale`
      }
    }
    if (serviceUser.location.alfred) {
      locations.alfred=`Chez ${serviceUser.user.firstname}`
    }
    if (serviceUser.location.visio) {
      locations.visio=`En visio`
    }
    if (serviceUser.location.elearning) {
      locations.alfred=`En e-learning`
    }
    setLocations(locations)
  }, [serviceUser, avocotesBooking])

  const onBookingDateChange = dt => {
    setBookingDate(dt)
  }

  useEffect(() => {
    setBookingDate(date)
  }, [date])

  const onQuantityChange = (prestation_id, delta) => () => {
    const newCount = Math.max(0, (count[prestation_id] || 0) + delta)
    setCount({...count, [prestation_id]: newCount})
  }

  const onLocationChange = (id, checked) => {
    if (checked) {
      setLocation(id)
    }
  }

  const book = actual => { // actual : true=> book, false=>infos request

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

    const avocotesBooking = this.state.avocotesBooking

    const date=moment(this.state.date)
    const time=moment(this.state.time)
    const prestation_date=date.set('hours', time.hours()).set('minutes', time.minutes()).set('seconds', 0)

    let bookingObj = {
      reference: user ? computeBookingReference(user, this.state.serviceUser.user) : '',
      service: this.state.serviceUser.service.label,
      serviceId: this.state.serviceUser.service._id,
      address: avocotesBooking?.address || place,
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
      status: avocotesBooking ? BOOK_STATUS.TO_CONFIRM : actual ? BOOK_STATUS.TO_PAY : BOOK_STATUS.INFO,
      serviceUserId: this.state.serviceUser._id,
      customer_booking: avocotesBooking ? avocotesBooking._id : null,
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


  const computeTotal = () => {

    const avocotes_amount = avocotesBooking?.amount || null

    setAxiosAuthentication()
    axios.post('/myAlfred/api/booking/compute', {
      prestations: count,
      serviceUser: serviceUserId,
      distance: computeDistance(),
      location: location,
      avocotes_amount: avocotes_amount,
    })
      .then(res => {
        setPrices(res.data)
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response)
      })
  }

  const onAvocotesChanged = event => {
    const {name, value}=event.target
    const {avocotesBookings, serviceUser}=this.state
    const avocotes_booking=avocotesBookings.find(a => a._id==value)
    if (!avocotes_booking) {
      onAvocotesBookingChange(null)
      return snackBarError(ReactHtmlParser(t('USERSERVICEPREVIEW.snackbar_no_booking')))
    }
    const suPrestaNames=serviceUser.prestations.map(p => p.prestation.label)
    const avocotesPrestaNames=avocotes_booking.prestations.map(p => p.name)
    const diff=lodash.difference(avocotesPrestaNames, suPrestaNames)
    if (diff.length>0) {
      return snackBarError(ReactHtmlParser(t('USERSERVICEPREVIEW.snackbar_error_avc')) + diff.join(','))
    }
    let count={}
    avocotes_booking.prestations.forEach(p => {
      const presta = serviceUser.prestations.find(pr => pr.prestation.label == p.name)
      count[presta._id]=p.value
    })
    const allAddresses={'main': avocotes_booking.address}
    setLocations(allAddresses)
    setAvocotesBooking(avocotes_booking)
    onAvocotesBookingChange && onAvocotesBookingChange(avocotes_booking)
  }

  const computeDistance = () => {
    if (location!='main') {
      return 0
    }
    const serviceGps = serviceUser.service_address.gps
    const clientGps=avocotesBooking && avocotesBooking.address.gps || user.billing_address.gps
    const distance=computeDistanceKm(serviceGps, clientGps)
    return distance
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const selectedPresta = prestations => {
    const use_cesu=['Mandatory', 'Optional'].includes(shop?.cesu)

    return (
      lodash.sortBy(prestations, p => (p && p.prestation ? p.prestation.order: 0)).map((p, index) => (
        <Grid container style={{display: 'flex', alignItems: 'center', width: '100%', marginBottom: '5%'}} key={index}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <Grid container style={{display: 'flex', flexDirection: 'column'}}>
              <Grid>
                <Typography>{p.prestation.label}</Typography>
              </Grid>
              <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Grid>
                  <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                    {p.price ? p.price.toFixed(2) : '?'}€
                  </Typography>
                </Grid>
                <Grid style={{marginLeft: '5%', marginRight: '5%'}}>
                  <Typography style={{color: 'rgba(39,37,37,35%)'}}>/</Typography>
                </Grid>
                <Grid style={{whiteSpace: 'nowrap'}}>
                  <Typography style={{color: 'rgba(39,37,37,35%)'}}>{p.billing ? p.billing.label : '?'}</Typography>
                </Grid>
              </Grid>
              {p.prestation.cesu_eligible && use_cesu ?
                <Grid>
                  <Typography style={{color: 'rgba(39,37,37,35%)'}}><em>
                    {ReactHtmlParser(t(shop?.is_professional ? 'PRESTATION.cis_eligible': 'PRESTATION.cesu_eligible'))}
                  </em></Typography>
                </Grid>
                : null
              }
            </Grid>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Grid>
                <IconButton onClick={onQuantityChange(p._id, -1)}>
                  <RemoveIcon/>
                </IconButton>
              </Grid>
              <Grid style={{marginLeft: '4%', marginRight: '4%'}}>
                <Typography>{count[p._id.toString()] || 0}</Typography>
              </Grid>
              <Grid>
                <IconButton onClick={onQuantityChange(p._id, 1)}>
                  <AddIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))
    )
  }

  const accordion = (prestations, fltr, classes) => {
    return(
      <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>{fltr ? fltr : ''}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
          {selectedPresta(prestations)}
        </AccordionDetails>
      </Accordion>
    )
  }

  const getExcludedTimes = () => {
    if (is_development()) {
      return []
    }
    let currMoment=moment(this.props.date || new Date()).set({hour: 0, minute: 0})
    let exclude=[]
    while (currMoment.hour()!=23 || currMoment.minute()!=30) {
      if (!isMomentAvailable(currMoment, this.props.availabilities)) {
        exclude.push(currMoment.toDate())
      }
      currMoment.add(30, 'minutes')
    }
    return exclude
  }

  const excludedTimes = getExcludedTimes()

  if (!serviceUser) {
    return null
  }

  const filters=lodash.groupBy(serviceUser.prestations, p => p.prestation.filter_presentation?.label ||'')
  const res = (
    <Grid>
      <DevLog>{JSON.stringify(locations)}
      Perim: {serviceUser?.perimeter}
      Location:{location}
      BookingDate:{JSON.stringify(bookingDate)}
      Date prop:{JSON.stringify(date)}
      </DevLog>
      {
        warnings.length>0 &&
            <Grid className={classes.userServicePreviewWarningContainer}>
              <Grid>
                <CancelIcon classes={{root: classes.cancelButton}}/>
              </Grid>
              <Grid>
                { warnings.map(w => <Typography>{ReactHtmlParser(w)}</Typography>)}
              </Grid>
            </Grid>
      }
      <Grid className={classes.borderContentRight}>
        <Grid className={classes.mainDrawerBooking}>
          <Grid style={{marginBottom: 30}}>
            <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
              <Grid>
                <Typography variant='h6' style={{color: '#505050', fontWeight: 'bold'}}>{serviceUser.service.label} - {serviceUser.user.firstname}</Typography>
              </Grid>
              <Grid className={classes.hideOnBigSreen}>
                <IconButton aria-label='Edit' className={classes.iconButtonStyle} /* onClick= TODO toggleDrawer(side, false)*/>
                  <CloseIcon classes={{root: classes.cancelButton}} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid style={{marginTop: '5%'}}>
              <Grid style={{padding: '10px 16px', display: 'flex', alignItems: 'center', border: '1px solid rgba(112,112,112,0.5)', borderRadius: 14, width: '100%'}}>
                <Grid style={{width: '50%'}}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: () => {
                        return (
                          <DatePicker
                            selected={bookingDate}
                            dateFormat='dd/MM/yyyy'
                            onChange={onBookingDateChange}
                            placeholderText='Date'
                            locale='fr'
                            minDate={new Date()}
                            className={classes.datePickerStyle}
                            excludeDates={excludedDays}
                          />
                        )
                      },
                      disableUnderline: true,
                    }}
                  />
                </Grid>
                <Divider style={{height: 28, margin: 4}} orientation='vertical' />
                <Grid style={{width: '50%', marginLeft: '3%'}}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: () => {
                        return (
                          <DatePicker
                            selected={bookingDate}
                            onChange={onBookingDateChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption='Heure'
                            placeholderText={ReactHtmlParser(t('DRAWER_BOOKING.hours'))}
                            dateFormat='HH:mm'
                            locale='fr'
                            className={classes.datePickerStyle}
                            excludeTimes={excludedTimes}
                          />
                        )
                      },
                      disableUnderline: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <em className={classes.cancelButton}>{errors.datetime}</em>
            </Grid>
          </Grid>
          <Grid style={{marginBottom: 30}}>
            <Accordion classes={{root: `customdrawerbookaccordion ${classes.rootAccordion}`}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>{ReactHtmlParser(t('DRAWER_BOOKING.presta_choice'))}</Typography>
              </AccordionSummary>
              <AccordionDetails classes={{root: classes.userServicePreviewAccordionDetails}}>
                {
                  Object.keys(filters).sort().map((key, index) => {
                    let fltr = key
                    let prestations = filters[key]
                    return (
                      <Grid style={{zIndex: 0}} key={index}>
                        {
                          fltr ?
                            accordion(prestations, fltr, classes) :
                            selectedPresta(prestations)
                        }
                      </Grid>
                    )
                  })
                }
              </AccordionDetails>
            </Accordion>
            <Grid>
              <em className={classes.cancelButton}>{errors.prestations}</em>
            </Grid>
          </Grid>
          <Grid style={{marginBottom: 30}}>
            <Accordion classes={{root: `customdrawerbookaccordion ${classes.rootAccordion}`}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography style={{color: '#505050'}}>{ReactHtmlParser(t('DRAWER_BOOKING.presta_place'))}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                {
                  Object.entries(locations).map(([key, label]) => (
                    <Grid>
                      <ButtonSwitch
                        key={moment()}
                        id={key}
                        label={label}
                        isEditable={false}
                        isPrice={false}
                        isOption={false}
                        checked={location==key}
                        onChange={onLocationChange}/>
                    </Grid>
                  ))
                }
                <Grid>
                  <em className={classes.cancelButton}>{errors.location}</em>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {serviceUser.pick_tax || travel_tax ?
            <Grid style={{marginBottom: 30}}>
              <Accordion classes={{root: `customdrawerbookaccordion ${classes.rootAccordion}`}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{ReactHtmlParser(t('DRAWER_BOOKING.presta_option'))}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                  {travel_tax ?
                    <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                      <Grid>{ReactHtmlParser(t('DRAWER_BOOKING.deplacement_cost'))}</Grid>
                      <Grid>{travel_tax}€</Grid>
                    </Grid>
                    : null
                  }
                  {serviceUser.pick_tax && location === 'alfred' ?
                    <Grid>
                      <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Grid style={{display: 'flex', alignItems: 'center'}}>
                          <Grid>
                            <label>{ReactHtmlParser(t('DRAWER_BOOKING.delivery'))}</label>
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
                </AccordionDetails>
              </Accordion>
            </Grid>
            : null
          }
          <Grid style={{marginBottom: 30}}>
            <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>{ReactHtmlParser(t('DRAWER_BOOKING.display_details'))}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                  <Grid >
                    <Typography>{locations[location]}</Typography>
                  </Grid>
                  <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Typography>{bookingDate ? `Le ${moment(bookingDate).format('DD/MM/YYYY')} à ${moment(bookingDate).format('HH:mm')}`: ''}</Typography>
                  </Grid>
                </Grid>
                <Grid style={{display: 'flex', flexDirection: 'column'}}>
                  <BookingDetail
                    {...prices}
                    prestations={pricedPrestations}
                    count={count}
                    travel_tax={travel_tax}
                    pick_tax={pick_tax}
                    cesu_total={cesu_total}
                    alfred_pro={alfred_pro}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid>
            { avocotesBookings.length>0 &&
              <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: 20}}>
                <Typography>{ReactHtmlParser(t('DRAWER_BOOKING.resa_avc'))}</Typography>
                <Select value={avocotes} name='avocotes' multi={false} onChange={this.onAvocotesChanged}>
                  {avocotesBookings.map(avocotes =>
                    <MenuItem value={avocotes._id}>{`${avocotes.user.full_name} pour ${avocotes.prestations.map(p => p.name).join(',')}`}</MenuItem>,
                  )}
                </Select>
              </Grid>
            }
          </Grid>
          <Grid>
            <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Grid style={{width: '100%'}}>
                <CustomButton
                  classes={{root: `custombookinresabutton ${classes.userServicePButtonResa}`}}
                  variant='contained'
                  color='primary'
                  aria-label='add'
                  disabled={!canBook}
                  onClick={() => this.props.book(true)}
                >
                  <Typography>{ReactHtmlParser(t('DRAWER_BOOKING.resa_button'))}</Typography>
                </CustomButton>
              </Grid>
              <Grid style={{marginTop: 15, marginBottom: 15}}>
                <Typography className={'custombookinginfoprice'} style={{color: 'rgba(39, 37, 37, 0.35)'}}>{ReactHtmlParser(t('DRAWER_BOOKING.next_step_paiment'))}</Typography>
              </Grid>
              <Grid>
                <CustomButton
                  startIcon={<HelpOutlineIcon />}
                  disabled={!isEmpty(errors)}
                  onClick={() => this.props.book(false)}
                >
                  <Typography style={{textDecoration: 'underline', textTransform: 'initial'}} className={'custombookingaskinfo'}>{ReactHtmlParser(t('DRAWER_BOOKING.button_info'))}</Typography>
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
  return res

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(DrawerBooking))
