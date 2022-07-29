import React from 'react'
import Link from 'next/link'
import {Tooltip} from '@material-ui/core'
import {API_PATH} from '../../utils/consts'
import {BOOKING} from '../../utils/i18n'

const AddToCalendar = ({bookingId}) => {
  
  const getGoogleCalendarURL = bookingId => {
    return `${API_PATH}/booking/${bookingId}/google_calendar`
  }

  const getIcsURL = bookingId => {
    return `${API_PATH}/booking/${bookingId}/ics`
  }

  return (
    <div className='calendar_actions'>
      <Link target="_blank" href={getGoogleCalendarURL(bookingId)}>
        <Tooltip title={BOOKING.ADD_GOOGLE_AGENDA}>
          <img src='/static/assets/icon/google_calendar.svg' width="50px" alt=''/>
        </Tooltip>
      </Link>
      <Link href={getIcsURL(bookingId)}>
        <Tooltip title={BOOKING.ADD_OTHER_AGENDA}>
          <img src='/static/assets/icon/calendar.svg' width="50px" alt=''/>
        </Tooltip>
      </Link>
    </div>
  )
}


export default AddToCalendar
