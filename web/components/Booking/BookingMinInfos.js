import React from 'react'
import UserAvatar from '../Avatar/UserAvatar'
import ServiceAvatar from '../Avatar/ServiceAvatar'
import {BOOK_STATUS} from '../../utils/consts'
import {booking_datetime_str} from '../../utils/dateutils'

const BookingMinInfos = ({booking, alfredMode}) => {

  return (
    <>
      <div className="booking_avatar">
        {booking.is_service ?
        // TODO Display service picture
          <ServiceAvatar service={booking.service}/>
          :
          <UserAvatar user={alfredMode ? booking.user : booking.alfred}/>
        }
      </div>

      <div className='booking_desc'>
        <p>
          <strong> {booking.status==BOOK_STATUS.CUSTOMER_PAID ? 'Payée' : booking.status} - {booking.is_service ? booking.service.label : alfredMode ? booking.user.firstname : booking.alfred.firstname}</strong>
        </p>
        <p className='booking_title'>{booking.service}</p>
        <p className='booking_date'>
          {booking_datetime_str(booking)}
        </p>
        <p style={{color: 'rgba(39,37,37,35%)'}}>{booking.service.label}</p>
                    
        { booking.customer_booking &&
          <Typography style={{color: 'rgba(39,37,37,35%)'}}><strong>Réservation AvoCotés</strong></Typography>
        }
                  
      </div>
    </>
  )
}


export default BookingMinInfos
