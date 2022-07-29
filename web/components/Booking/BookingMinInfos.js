import React from 'react'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import UserAvatar from '../Avatar/UserAvatar'
import ServiceAvatar from '../Avatar/ServiceAvatar'
import {BOOK_STATUS, LOCATION_ELEARNING} from '../../utils/consts'
import {booking_datetime_str} from '../../utils/dateutils'
import {isMonoProvider, getDataModel} from '../../config/config'
import {BOOKING} from '../../utils/i18n'
import {screen} from '../../styles/screenWidths'
import {localeMoneyFormat} from '../../utils/converters'

const displayBookStatus = (status, amIAlfred, t) => {
  
  switch(status) {
    case BOOK_STATUS.TO_CONFIRM:
      return <span className='toconfirm'>{status}</span>
    case BOOK_STATUS.CONFIRMED:
      return <span className='confirmed'>{status}</span>
    case BOOK_STATUS.CUSTOMER_PAID:
      return 'Payée'
    case BOOK_STATUS.PREAPPROVED:
      return amIAlfred ? ReactHtmlParser(t('BOOKING.pre_approved')) : BOOKING.invit_checking
    default:
      return status
  }
  
}


const BookingMinInfos = ({t, booking, amIAlfred, withPrice}) => {

  const theme = getDataModel()
  const displayUser = amIAlfred ? booking.user : booking.alfred
  const displayStatus = displayBookStatus(booking.status, amIAlfred, t)
  const displayDate = new Date(booking.date).toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'})
  const customer_booking_title = booking.customer_booking && ReactHtmlParser(t('BOOKING.avocotes_resa')) + booking.customer_booking.user.full_name
  const isElearning = booking.location === LOCATION_ELEARNING
  const isCPF = !!booking?.cpf_booked


  return (
    <>
      <StyledBookingMinInfos theme={theme}>
        <div className="booking_avatar">
          {booking.is_service ?
          // TODO Display service picture
            <ServiceAvatar service={booking.service}/>
            :
            <UserAvatar user={amIAlfred ? booking.user : booking.alfred}/>
          }
        </div>
      

        <p className='booking_status'>
          {displayStatus}
          {!isMonoProvider() &&
          <span>
            {' - '}{displayUser && displayUser.full_name}
          </span>
          }
        </p>
        
        <h2 className='booking_title'>{booking.service}</h2>
        
        <div className='booking_misc'>
          {isElearning ? <>
            <p>Début de formation le {displayDate}</p>
            <p>Formation e-learning</p>
          </>
            : booking_datetime_str(booking)}
        </div>
          
        {withPrice &&
          <p className='booking_price'>
            {isCPF ? <>{localeMoneyFormat({value: booking.amount})} (CPF)</>
              : <>{(amIAlfred ? booking.alfred_amount : booking.amount).toFixed(2)}€</>}
          </p>
        }
                    
        { booking.customer_booking &&
          <p style={{color: 'rgba(39,37,37,35%)'}}><strong>Réservation AvoCotés</strong></p>
        }

        { customer_booking_title &&
          <p>
            {customer_booking_title}
          </p>
        }
      </StyledBookingMinInfos>
    </>
  )
}

const StyledBookingMinInfos = styled.div`
  
  display: grid;
  row-gap: var(--spc-1);
  column-gap: var(--spc-2);
  flex:5;
  align-content: baseline;
  grid-template-columns: auto;
  grid-template-areas:  'avatar'
                        'status'
                        'title'
                        'misc'
                        'price';
  margin-bottom: var(--spc-4);
      
  
  @media (${screen.sm}) {
    grid-template-columns: 100px auto auto;
    grid-template-areas: 'avatar status status price'
                         'avatar title title price'
                         'avatar misc misc price';
  }

  h2, p {
    margin: 0;
  }

  .booking_avatar {
    grid-area: avatar;
    flex: 1;
    justify-self: center;

    @media (${screen.sm}) {
      justify-self: flex-start;
    }

    p {
      margin: 0;
    }
  }

  .booking_status {
    grid-area: status;
    font-size: var(--text-base);
    font-weight: var(--font-bold);
  }

  .booking_title {
    grid-area: title;
    font-size: var(--text-lg);
  }
  
  .booking_misc {
    grid-area: misc;
  }

  .booking_price {
    grid-area: price;
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    align-self: center;
  }

  /* Status */
  .toconfirm {

  }

  .confirmed {

  }

  ${props => {
  switch (props.theme) {
    case 'aftral':
      
      return `
      @media (${screen.sm}) {
        grid-template-areas:  'avatar status status status'
                              'avatar title title title'
                              'avatar misc misc price';
        
        .booking_price {
          justify-self: end;
        }
      }

      .booking_title {
        color: var(--black);
        text-transform: uppercase;
      }

      .booking_misc {
        color: gray;
      }

      .toconfirm {
        color: darkorange;
      }
      
      .confirmed {
        color: darkseagreen;
      }
      `
    default:
      return `
        
      `
  }
}
  }

`


export default withTranslation(null, {withRef: true})(BookingMinInfos)
