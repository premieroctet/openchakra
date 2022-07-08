import React, {useCallback, useEffect, useState} from 'react'
// import DateField from '@internationalized/date'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import DatePicker from 'react-datepicker'
import TextField from '@material-ui/core/TextField'
import {useUserContext} from '../../../contextes/user.context'
import {getDataModel} from '../../../config/config'
import {client} from '../../../utils/client'
import {API_PATH} from '../../../utils/consts'
import {getExcludedTimes, getExcludedDays} from '../../../utils/dateutils'
import {computeDistanceKm} from '../../../utils/functions'
import CPF from '../Payments/CPF'
import StyledDrawerBooking from './StyledDrawerBooking'

const labelLocations = {
  main: `à mon adresse principale`,
  alfred: (name) => `chez ${name}`,
  visio: `en visio`,
  elearning: `en e-learning`, 
}

const PureDrawerBooking = ({
  t,
  serviceUserId,
  onlyOneService,
}) => {

  const {user} = useUserContext()
  
  const [bookingParams, setBookingParams] = useState({
    locations: [],
  })
  const [booking, setBooking] = useState({
    date: null,
    location: null,
    prestations: {},
  })

  const [prices, setPrices]=useState({})
  
  const computeDistance = useCallback(({location, servicePosition, clientPosition}) => {
    if (location!='main') {
      return 0
    }

    return computeDistanceKm(servicePosition, clientPosition)
  }, [])

  const computeTotal = useCallback(async({location, serviceUser, prestations, servicePosition, clientPosition}) => {
    
    const compute = await client('/myAlfred/api/booking/compute', {data: {
      prestations,
      serviceUser,
      location,
      distance: computeDistance({location, servicePosition, clientPosition}),
    }})
      .catch(err => {
        console.error(err)
        snackBarError(err.response)
      })
    
    setPrices(compute)
    console.log(prices)
      
  }, [location, booking.services, booking.prestations, computeDistance, prices])

  const onBookingDateChange = selecteddate => {
    setBooking({...booking, date: selecteddate})
  }

  useEffect(() => {
    computeTotal({
      location: booking.location,
      serviceUser: serviceUserId,
      prestations: booking.prestations,
      servicePosition: bookingParams?.serviceUser?.service_address.gps,
      clientPosition: user?.billing_address.gps,
    })
  }, [booking.location, booking.prestations, serviceUserId])

  useEffect(() => {

    const settle = async id => {
      if (id) {
        const serviceUser = await client(`${API_PATH}/serviceUser/${id}`)
          .catch(err => console.log(`cant fetch serviceUser`, err))

        const setUpBooking = {...booking}
        
        if (onlyOneService) {
          Object.assign(setUpBooking, {prestations: {[serviceUser.prestations[0]._id]: 1}})
        }

        // Force location if only one option
        const places = Object.entries(serviceUser?.location).filter(([place, proposed]) => proposed)
        if (places.length === 1) {
          const [justOnePlace] = places
          Object.assign(setUpBooking, {location: justOnePlace[0]})
        }

        setBooking(setUpBooking)
        
        const availabilities = serviceUser && await client(`${API_PATH}/availability/userAvailabilities/${serviceUser.user._id}`)
          .catch(err => console.log(err))

        setBookingParams({
          serviceUser,
          availabilities,
          excludeddates: getExcludedDays(availabilities),
          onePlace: places.length === 1
        })
      }
    }

    settle(serviceUserId)
      
  }, [])

  console.log('Current theme: ', getDataModel(), bookingParams)
  const theme = getDataModel()
  
  const serviceToDisplay = bookingParams?.serviceUser && bookingParams?.serviceUser.service
  const prestaToDisplay = onlyOneService && bookingParams?.serviceUser?.prestations[0]

  console.log(prestaToDisplay)

  // const canBook = !!serviceUser && location && lodash.sum(Object.values(count)) && bookingDate && warnings.length==0

  return (
    <StyledDrawerBooking theme={theme} >
      
      
      {/* Titre */}
      <h3>{bookingParams?.serviceUser?.service.label} - {bookingParams?.serviceUser?.user.firstname}</h3>
      
      <form className='container-sm'>

        {/* CPF compatible */}
        {bookingParams?.serviceUser?.cpf_eligible && <CPF />}

        {/* Date - Date/heure */}
        <section className='date'>
          <label htmlFor='booking_date'>Date</label>
          <TextField
            id={'booking_date'}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: () => {
                return (
                  <DatePicker
                    id={'booking_date'}
                    selected={booking.date}
                    dateFormat='dd/MM/yyyy'
                    onChange={onBookingDateChange}
                    placeholderText='Date'
                    locale='fr'
                    minDate={new Date()}
                    excludeDates={bookingParams?.excludeddates}
                  />
                )
              },
              disableUnderline: true,
            }}
          />

        </section>
        
        {/* Prestations */}
        <section className='prestations'>
          <h4>Détails</h4>
          {onlyOneService ? <div className='training'>
            <dl>
            <dt>{prestaToDisplay?.prestation.label}</dt>
            <dd>{prestaToDisplay?.prestation && prestaToDisplay.price} €</dd>
            <dt>Durée</dt>
            <dd>{serviceToDisplay?.duration_days} jours</dd>
            </dl>
          </div> : null}
        </section>
        
        {/* Lieu de la prestation */}
        {bookingParams.onePlace ? 
        <section>
          <p>formation {labelLocations[booking.location]}</p>
        </section>
        : <div>Choix d'endroits</div>
        }
        
        {/* Détails */}



        {/* Types de paiements  */}
        <h2>Total à payer</h2>
        
        {/* Message d'information */}

        <p className='tip'>
          <span className='img'>💡</span>
        Votre demande de réservation doit être approuvée par lʼAftral. Vous recevrez vos accès au contenu de la formation dès lors que votre réservation sera confirmée
        </p>

        <button 
          type='submit'
          onClick={() => book(true)}
          >
          {ReactHtmlParser(t('DRAWER_BOOKING.resa_button'))}
        </button>

      </form>

    </StyledDrawerBooking>
  )
}

export default withTranslation('custom', {withRef: true})(PureDrawerBooking)

