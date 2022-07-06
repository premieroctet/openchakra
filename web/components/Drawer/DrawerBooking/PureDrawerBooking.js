import React, {useEffect, useState} from 'react'
// import DateField from '@internationalized/date'
import DatePicker from 'react-datepicker'
import TextField from '@material-ui/core/TextField'
import {getDataModel} from '../../../config/config'
import {client} from '../../../utils/client'
import {API_PATH} from '../../../utils/consts'
import {getExcludedTimes, getExcludedDays} from '../../../utils/dateutils'
import StyledDrawerBooking from './StyledDrawerBooking'

const PureDrawerBooking = ({
  serviceUserId,
  onlyOneService,
}) => {

  const [bookingParams, setBookingParams] = useState({
    locations: [],
  })
  const [booking, setBooking] = useState({
    date: null,
    location: null,
    prestations: {},
  })


  const computeTotal = () => {

    setAxiosAuthentication()
    axios.post('/myAlfred/api/booking/compute', {
      prestations: count,
      serviceUser: serviceUserId,
      distance: computeDistance(),
      location: location,
    })
      .then(res => {
        setPrices(res.data)
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response)
      })
  }

  const onBookingDateChange = selecteddate => {
    setBooking({...booking, date: selecteddate})
  }

  useEffect(() => {

    const settle = async id => {
      if (id) {
        const services = await client(`${API_PATH}/serviceUser/${id}`)
          .catch(err => console.log(err))

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
        /* Si formation eligible cpf, on part du principe qu'il n'y a qu'un seul service */
        // NON. Doit être un param qui rend cette presta unique
        if (services?.cpf_eligible) {
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
      {bookingParams?.services?.cpf_eligible && <p>CPF !</p>}

      {/* Date - Date/heure */}
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputComponent: () => {
            return (
              <DatePicker
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
      
      {/* Prestations */}
      
      {/* Lieu de la prestation */}
      
      {/* Types de paiements  */}
      
      {/* Message d'information */}


    </StyledDrawerBooking>
  )
}

export default PureDrawerBooking

