import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Router from 'next/router'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
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
import moment from 'moment'
import lodash from 'lodash'
import DevLog from '../../DevLog'
import {BOOK_STATUS} from '../../../utils/consts'
import {computeBookingReference} from '../../../utils/text'
import {
  getDeadLine,
  isDateAvailable,
  isMomentAvailable,
} from '../../../utils/dateutils'
import {useUserContext} from '../../../contextes/user.context'
import {computeDistanceKm} from '../../../utils/functions'
import {snackBarError} from '../../../utils/notifications'
import {setAxiosAuthentication} from '../../../utils/authentication'
// const is_development = () => false
import styles from '../../../static/css/components/DrawerBooking/DrawerBooking'
import BookingDetail from '../../BookingDetail/BookingDetail'
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch'
import CustomButton from '../../CustomButton/CustomButton'
import isEmpty from '../../../server/validation/is-empty'
import {isLoggedUserAdmin} from '../../../utils/context'

moment.locale('fr')

const DrawerBooking = ({
  classes,
  t,
  serviceUserId,
  onAvocotesBookingChange: onAvocotesBookingChangeExternal,
  toggleDrawer,
  trainingMode,
}) => {

  const [serviceUser, setServiceUser]=useState(null)
  const [avocotesBooking, setAvocotesBooking]=useState(null)
  const [avocotesBookings, setAvocotesBookings]=useState([])
  const [count, setCount]=useState({})
  const [bookingDate, setBookingDate]=useState(null)
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
  const [alfred_pro, setAlfredPro]=useState(false)
  const [shop, setShop]=useState(null)
  const [canBook, setCanBook]=useState(null)
  const [prices, setPrices]=useState({})
  const [pending, setPending]=useState(false)

  const {user} = useUserContext()

  const computeDistance = () => {
    if (location!='main') {
      return 0
    }
    const serviceGps = serviceUser.service_address.gps
    const clientGps=avocotesBooking && avocotesBooking.address.gps || user.billing_address.gps
    return computeDistanceKm(serviceGps, clientGps)
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
    const pricedPrestas={}
    serviceUser?.prestations.forEach(p => {
      if (count[p._id]) {
        pricedPrestas[p.prestation.label] = count[p._id] * p.price
      }
    })
    setPricedPrestations(pricedPrestas)
  }, [count])

  // Select the only prestation in case of training
  useEffect(() => {
    if (trainingMode && serviceUser) {
      setCount({[serviceUser.prestations[0]._id]: 1})
    }
  }, [trainingMode, serviceUser])

  useEffect(() => {
    if (serviceUserId && !serviceUser) {
      setAxiosAuthentication()
      axios.get(`/myAlfred/api/serviceUser/${serviceUserId}`)
        .then(res => {
          const su=res.data
          setServiceUser(su)
          axios.get(`/myAlfred/api/availability/userAvailabilities/${su.user._id}`)
            .then(res => {
              let avail = res.data
              setAvailabilities(avail)
              setExcludedDays(getExcludedDays(avail))
            })
          axios.get(`/myAlfred/api/shop/alfred/${su.user._id}`)
            .then(res => {
              let shop = res.data
              setShop(shop)
            })

        })

      if (isLoggedUserAdmin()) {
        axios.get('/myAlfred/api/booking/avocotes')
          .then(res => {
            setAvocotesBookings(res.data)
          })
          .catch(e => console.error(e))

      }
    }
  }, [serviceUserId])


  useEffect(() => {
    onAvocotesBookingChangeExternal && onAvocotesBookingChangeExternal(avocotesBooking)
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
    if (lodash.sum(Object.values(count))>0 && location && serviceUser) {
      computeTotal()
    }
  }, [count, location, serviceUser])

  useEffect(() => {
    const bookingEnabled=!!serviceUser && location && lodash.sum(Object.values(count)) && bookingDate && warnings.length==0
    setCanBook(bookingEnabled)
  }, [serviceUser, count, location, warnings, bookingDate])

  useEffect(() => {
    if (!serviceUser) { return }
    const locations={}
    if (serviceUser.location.client) {
      if (avocotesBooking) {
        locations.main=`Chez ${avocotesBooking.user.full_name}`
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
      locations.elearning=`En e-learning`
    }
    setLocations(locations)
    // Force location if only one possibility
    const locationsKeys=Object.keys(locations)
    if (locationsKeys.length==1) {
      setLocation(locationsKeys[0])
    }
  }, [serviceUser, avocotesBooking])

  const onBookingDateChange = dt => {
    setBookingDate(dt)
  }

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

    if (pending) {
      snackBarError(ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.snackbar_error_resa')))
      return
    }

    let prestations = []
    serviceUser.prestations.forEach(p => {
      if (count[p._id]) {
        prestations.push({price: p.price, value: count[p._id], name: p.prestation.label})
      }
    })

    let place=null
    if (user) {
      switch (location) {
        case 'alfred':
          place = serviceUser.service_address
          break
        case 'visio':
          break
        default:
          place = avocotesBooking?.address || user.billing_address
      }
    }

    let bookingObj = {
      reference: user ? computeBookingReference(user, serviceUser.user) : '',
      service: serviceUser.service.label,
      serviceId: serviceUser.service._id,
      address: place,
      location: location,
      equipments: serviceUser.equipments,
      amount: prices.total,
      prestation_date: bookingDate,
      alfred: serviceUser.user._id,
      user: user ? user._id : null,
      prestations: prestations,
      travel_tax: prices.travel_tax,
      pick_tax: prices.pick_tax,
      cpf_amount: prices.cpf_amount,
      cesu_amount: prices.cesu_total,
      customer_fee: prices.customer_fee,
      provider_fee: prices.provider_fee,
      customer_fees: prices.customer_fees,
      provider_fees: prices.provider_fees,
      status: avocotesBooking ? BOOK_STATUS.TO_CONFIRM : actual ? BOOK_STATUS.TO_PAY : BOOK_STATUS.INFO,
      serviceUserId: serviceUser._id,
      customer_booking: avocotesBooking?._id || null,
    }

    let chatPromise = !user ?
      Promise.resolve({res: null})
      :
      axios.post('/myAlfred/api/chatRooms/addAndConnect', {
        emitter: user._id,
        recipient: serviceUser.user._id,
      })

    chatPromise.then(() => {

      localStorage.setItem('bookingObj', JSON.stringify(bookingObj))

      if (!user) {
        localStorage.setItem('path', Router.asPath)
        Router.push('/?login=true')
        return
      }

      setPending(true)
      axios.post('/myAlfred/api/booking', bookingObj)
        .then(response => {
          const booking = response.data
          if (booking.customer_booking) {
            Router.push({pathname: `/reservations/resvations?id=${booking._id}`, query: {booking_id: booking._id}})
          }
          else if (actual) {
            Router.push({pathname: '/confirmPayment', query: {booking_id: booking._id}})
          }
          else {
            Router.push(`/profile/messages?user=${booking.user}&relative=${booking.alfred}`)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          setPending(false)
        })
    })
  }


  const onAvocotesBookingChange = event => {
    const {value}=event.target
    const avocotes_booking=avocotesBookings.find(a => a._id==value)
    if (!avocotes_booking) {
      return snackBarError(ReactHtmlParser(t('USERSERVICEPREVIEW.snackbar_no_booking')))
    }
    const suPrestationsLabels=serviceUser.prestations.map(p => p.prestation.label)
    const avocotesPrestationsLabels=avocotes_booking.prestations.map(p => p.name)
    const diff=lodash.difference(avocotesPrestationsLabels, suPrestationsLabels)

    if (diff.length>0) {
      return snackBarError(t('USERSERVICEPREVIEW.snackbar_error_avc')+diff.join(','))
    }
    let newCount={}
    avocotes_booking.prestations.forEach(p => {
      const presta = serviceUser.prestations.find(pr => pr.prestation.label == p.name)
      newCount[presta._id]=p.value
    })
    setCount(newCount)
    setLocation('main')
    setAvocotesBooking(avocotes_booking)
  }


  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  // Training can not change prestation quantity
  const canChangeQuantity = !avocotesBooking && !trainingMode

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
              {canChangeQuantity && <Grid>
                <IconButton onClick={onQuantityChange(p._id, -1)}>
                  <RemoveIcon/>
                </IconButton>
              </Grid>}
              <Grid style={{marginLeft: '4%', marginRight: '4%'}}>
                <Typography>{count[p._id.toString()] || 0}</Typography>
              </Grid>
              {canChangeQuantity && <Grid>
                <IconButton onClick={onQuantityChange(p._id, 1)}>
                  <AddIcon/>
                </IconButton>
              </Grid>}
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
    let currMoment=moment(bookingDate || new Date()).set({hour: 0, minute: 0})
    let exclude=[]
    while (currMoment.hour()!=23 || currMoment.minute()!=30) {
      if (!isMomentAvailable(currMoment, availabilities)) {
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
  return (
    <Grid>
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
                <IconButton aria-label='Edit' className={classes.iconButtonStyle} onClick={toggleDrawer && toggleDrawer(false)}>
                  <CloseIcon classes={{root: classes.cancelButton}} />
                </IconButton>
              </Grid>
            </Grid>
            {/** TODO RPA expand date component in training mode */}
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
                {/** Hide time in training mode */}
                {!trainingMode && <><Divider style={{height: 28, margin: 4}} orientation='vertical' />
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
                </>}
              </Grid>
            </Grid>
            <Grid>
              <em className={classes.cancelButton}>{errors.datetime}</em>
            </Grid>
          </Grid>
          {!trainingMode && // Hide prestation slection in training mode
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
          }
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
                <Select value={avocotesBooking?._id} name='avocotes' multi={false} onChange={onAvocotesBookingChange}>
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
                  onClick={() => book(true)}
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
                  onClick={() => book(false)}
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
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(DrawerBooking))
