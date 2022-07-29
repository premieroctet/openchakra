import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import UserAvatar from '../Avatar/UserAvatar'
import ServiceAvatar from '../Avatar/ServiceAvatar'
import {BOOK_STATUS} from '../../utils/consts'
import {booking_datetime_str} from '../../utils/dateutils'
import {is_development, isMonoProvider} from '../../config/config'
import {BOOKING} from '../../utils/i18n'

const displayBookStatus = (status, amIAlfred, t) => {
  
  switch(status) {
    case BOOK_STATUS.CUSTOMER_PAID:
      return 'Payée'
    case BOOK_STATUS.PREAPPROVED:
      return amIAlfred ? ReactHtmlParser(t('BOOKING.pre_approved')) : BOOKING.invit_checking
    default:
      return status
  }
  
}

const BookingMinInfos = ({t, booking, amIAlfred}) => {

  const displayUser = amIAlfred ? booking.user : booking.alfred
  const displayStatus = displayBookStatus(booking.status, amIAlfred, t)
  const customer_booking_title = booking.customer_booking && ReactHtmlParser(t('BOOKING.avocotes_resa')) + booking.customer_booking.user.full_name


  return (
    <>
      <div className="booking_avatar">
        {booking.is_service ?
        // TODO Display service picture
          <ServiceAvatar service={booking.service}/>
          :
          <UserAvatar user={amIAlfred ? booking.user : booking.alfred}/>
        }
      </div>

      <div className='booking_desc'>

        <p>
          {displayStatus}
          {!isMonoProvider() &&
          <span>
            {' - '}{displayUser && displayUser.full_name}
          </span>
          }
        </p>
        
        <h2 className='booking_title'>{booking.service}</h2>
        <p className='booking_date'>
          {booking_datetime_str(booking)}
        </p>
        <p style={{color: 'rgba(39,37,37,35%)'}}>{booking.service.label}</p>
                    
        { booking.customer_booking &&
          <Typography style={{color: 'rgba(39,37,37,35%)'}}><strong>Réservation AvoCotés</strong></Typography>
        }

        {is_development() && <p>Dev only:${booking._id}</p>}
        { customer_booking_title &&
            <p>
              {customer_booking_title}
            </p>
        }
                  
      </div>
    </>
  )
}


export default withTranslation(null, {withRef: true})(BookingMinInfos)
