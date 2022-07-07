import React, {useCallback, useEffect, useState} from 'react'
// import DateField from '@internationalized/date'
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

const PureDrawerBooking = ({
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
      servicePosition: bookingParams?.services?.service_address.gps,
      clientPosition: user?.billing_address.gps,
    })
  }, [booking.location, booking.prestations, serviceUserId])

  useEffect(() => {

    const settle = async id => {
      if (id) {
        const services = await client(`${API_PATH}/serviceUser/${id}`)
          .catch(err => console.log(`cant fetch serviceUser`, err))

        /* locations */
        const locations = {}
        if (services.location.client) {
          if (avocotesBooking) {
            locations.main=`Chez ${avocotesBooking.user.full_name}`
          }
          else {
            locations.main=`A mon adresse principale`
          }
        }
        if (services.location.alfred) {
          locations.alfred=`Chez ${services.user.firstname}`
        }
        if (services.location.visio) {
          locations.visio=`En visio`
        }
        if (services.location.elearning) {
          locations.elearning=`En e-learning`
        }

        const setUpBooking = {...booking}
        
        if (onlyOneService) {
          Object.assign(setUpBooking, {prestations: {[services.prestations[0]._id]: 1}})
        }
        
        if (Object.keys(locations).length === 1) {
          Object.assign(setUpBooking, {location: Object.keys(locations)[0]})
        }

        setBooking(setUpBooking)
        
        const availabilities = services && await client(`${API_PATH}/availability/userAvailabilities/${services.user._id}`)
          .catch(err => console.log(err))

        setBookingParams({
          locations,
          services,
          availabilities,
          excludeddates: getExcludedDays(availabilities),
        })
      }
    }

    settle(serviceUserId)
      
  }, [])

  console.log('Current theme: ', getDataModel(), bookingParams)
  const theme = getDataModel()

  // const canBook = !!serviceUser && location && lodash.sum(Object.values(count)) && bookingDate && warnings.length==0

  return (
    <StyledDrawerBooking theme={theme} >
      
      
      {/* Titre */}
      <h3>{bookingParams?.services?.service.label} - {bookingParams?.services?.user.firstname}</h3>
      
      {/* CPF compatible */}
      {bookingParams?.services?.cpf_eligible && <CPF />}

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
      
      {/* Lieu de la prestation */}
      
      {/* Types de paiements  */}
      
      {/* Message d'information */}


    </StyledDrawerBooking>
  )
}

export default PureDrawerBooking

