import React, {useState, useEffect} from 'react'
import {withStyles} from '@material-ui/core/styles'
import styled from 'styled-components'
import {withTranslation} from 'react-i18next'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Router from 'next/router'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'
import {UserContext, useUserContext} from '../../contextes/user.context'
import {BOOK_STATUS, LOCATION_ELEARNING} from '../../utils/consts'
import {bookingUrl} from '../../config/config'
import BookingPreApprouve from '../../components/BookingDetail/BookingPreApprouve'
import BookingPreview from '../../components/BookingDetail/BookingPreview'
import LayoutMobileReservations from '../../hoc/Layout/LayoutMobileReservations'
import LayoutReservations from '../../hoc/Layout/LayoutReservations'
import styles from '../../static/css/pages/reservations/reservations'
import CustomButton from '../../components/CustomButton/CustomButton'
import withParams from '../../components/withParams'
import BookingMinInfos from '../../components/Booking/BookingMinInfos'
import AddToCalendar from '../../components/Calendar/AddToCalendar'

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

moment.locale('fr')

// TODO RASSEMBLER ALLRESERVATIONS + COMINGRESERVATIONS + FINISHEDRESERVATIONS

const AllReservations = ({classes, t, id}) => {

  const [alfredReservations, setAlfredReservations] = useState([])
  const [userReservations, setUserReservations] = useState([])
  const [reservationType, setReservationType] = useState(1)
  const [reservationStatus, setReservationStatus] = useState(0)
  const [bookingPreview, setBookingPreview] = useState(null)
  const [bookingPreApprouved, setBookingPreApprouved] = useState(null)

  const {user} = useUserContext()

  useEffect(() => {
    setReservationType(user?.is_alfred ? 0 : 1)
    loadBookings()
    if (id) {
      setTimeout(() => setBookingPreview(id), 1000)
    }
  }, [user])

  const loadBookings = () => {
    axios.get('/myAlfred/api/booking/alfredBooking')
      .then(res => {
        // On n'affiche pas les résas en attente de paiement
        const alfredBookings=res.data.filter(r => r.status !== BOOK_STATUS.TO_PAY)
        setAlfredReservations(alfredBookings)
        return axios.get('/myAlfred/api/booking/userBooking')
      })
      .then(res => {
        const userBookings=res.data
        setUserReservations(userBookings)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const onReservationTypeChanged = (event, newValue) => {
    setReservationType(newValue)
    setReservationStatus(0)
  }

  const handleReservationStatusChanged = (event, newValue) => {
    setReservationStatus(newValue)
  }

  const isFinished = reservation => {
    return [BOOK_STATUS.REFUSED, BOOK_STATUS.CANCELLED, BOOK_STATUS.FINISHED, BOOK_STATUS.EXPIRED].includes(reservation.status)
  }

  const isComing = reservation => {
    return [BOOK_STATUS.INFO, BOOK_STATUS.TO_CONFIRM, BOOK_STATUS.CONFIRMED, BOOK_STATUS.PREAPPROVED].includes(reservation.status)
  }

  const filterReservations = () => {
    // Alfred/customer reservatioons
    let reservations = reservationType===0 ? alfredReservations : userReservations
    // All/ coming/finished reservations
    if (reservationStatus===1) { reservations = reservations.filter(b => isComing(b)) }
    if (reservationStatus===2) { reservations = reservations.filter(b => isFinished(b)) }
    return reservations
  }

  const openBookingPreview = bookingId => {
    loadBookings()
    setBookingPreview(bookingId)
    setBookingPreApprouved(null)
  }

  const openBookingPreAprouved = bookingId => {
    loadBookings()
    setBookingPreview(null)
    setBookingPreApprouved(bookingId)
  }

  const onClosePreview = () => {
    setBookingPreview(null)
    loadBookings()
  }

  const dialogPreviewModal = classes => {

    return (
      bookingPreview && <Dialog
        style={{width: '100%'}}
        open={Boolean(bookingPreview)}
        onClose={onClosePreview}
        classes={{paper: classes.dialogPreviewPaper}}

      >
        <DialogTitle id="customized-dialog-title" onClose={onClosePreview}/>
        <DialogContent>
          <BookingPreview booking_id={bookingPreview} onConfirmPreapproved={openBookingPreAprouved}/>
        </DialogContent>
      </Dialog>
    )
  }

  const dialogPreApprouved = classes => {

    return (
      bookingPreApprouved && <Dialog
        style={{width: '100%'}}
        open={Boolean(bookingPreApprouved)}
        onClose={() => setBookingPreApprouved(null)}
        classes={{paper: classes.dialogPreviewPaper}}
      >
        <DialogTitle id="customized-dialog-title" onClose={() => setBookingPreApprouved(null)}/>
        <DialogContent>
          <BookingPreApprouve booking_id={bookingPreApprouved} onConfirm={() => setBookingPreApprouved(false)}/>
        </DialogContent>
      </Dialog>
    )
  }

  const newAppointment = booking => {
    let newBooking = booking
    newBooking.prestation_date = null
    localStorage.setItem('bookingObj', JSON.stringify(newBooking))
    Router.push(bookingUrl(newBooking.serviceUserId))
  }

  const content = classes => {
    const reservations = filterReservations()
    const alfredMode = reservationType === 0

    return(
      <Grid style={{width: '100%'}}>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={reservationStatus}
            onChange={handleReservationStatusChanged}
            aria-label="scrollable force tabs"
            scrollButtons="on"
            classes={{indicator: `customscrollmenu ${classes.scrollMenuIndicator}`}}
          >
            <Tab label={ReactHtmlParser(t('RESERVATION.allresa'))} className={classes.scrollMenuTab} />
            <Tab label={ReactHtmlParser(t('RESERVATION.commingresa'))} className={classes.scrollMenuTab} />
            <Tab label={ReactHtmlParser(t('RESERVATION.endingresa'))} className={classes.scrollMenuTab} />
          </Tabs>
        </Grid>
        <Grid style={{width: '100%'}}>
          <Divider/>
        </Grid>
        <Bookings>
          {reservations.length ? (
            reservations.map((booking, index) => {
              return (
                <BookingItem key={index}>

                  <BookingMinInfos booking={booking} amIAlfred={alfredMode} withPrice />

                  <div className='booking_actions'>
                    <CustomButton
                      color={'primary'}
                      variant={'outlined'}
                      classes={{root: `customreservationdetailbutton ${classes.buttonDetail}`}}
                      onClick={() => openBookingPreview(booking._id)}>
                      {ReactHtmlParser(t('RESERVATION.detailbutton'))}
                    </CustomButton>

                    {
                      reservationType === 1 && !booking.customer_booking && booking.location !== LOCATION_ELEARNING ?
                        <CustomButton
                          variant={'contained'}
                          color={'primary'}
                          classes={{root: `customresasaveagain ${classes.buttonResa}`}}
                          onClick={() => newAppointment(booking)}>
                          {ReactHtmlParser(t('RESERVATION.saveagain'))}
                        </CustomButton>
                        : null
                    }

                    {booking?.cpf_booked && !alfredMode &&
                    <Link href={booking.cpf_link || 'https://example.com'}>
                      <a target='_blank'>
                        {ReactHtmlParser(t('RESERVATION.cpfbutton'))}
                      </a>
                    </Link>
                    }

                    <AddToCalendar bookingId={booking._id} />

                  </div>

                </BookingItem>
              )
            })) :
            <Typography className={'customresanoresamessage'}>{alfredMode ? ReactHtmlParser(t('RESERVATION.infomessageAlfred')) : ReactHtmlParser(t('RESERVATION.infomessageUser')) }</Typography>
          }
        </Bookings>
      </Grid>
    )
  }


  render() {
    const {classes} = this.props
    const {reservationType, userInfo, bookingPreview, bookingPreApprouved} = this.state

  return (
    <Grid>
      <Grid className={classes.hiddenMobile}>
        <LayoutReservations reservationType={reservationType} onReservationTypeChanged={onReservationTypeChanged} user={user}>
          {content(classes)}
        </LayoutReservations>
      </Grid>
      <Grid className={classes.hidden}>
        <LayoutMobileReservations reservationType={reservationType} currentIndex={2} onReservationTypeChanged={onReservationTypeChanged} user={user}>
          {content(classes)}
        </LayoutMobileReservations>
      </Grid>
      { bookingPreview ? dialogPreviewModal(classes) : null}
      { bookingPreApprouved ? dialogPreApprouved(classes) : null}
    </Grid>
  )
}

const Bookings = styled.ul`
  display: 'flex';
  flex-direction: column;
  padding: 0;
  margin-top: 10vh;
`

export const BookingItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--spc-8);
  margin-bottom: var(--spc-4);
  padding-block: var(--spc-4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  .booking_infos {
    flex:5;
    flex-basis: 400px;
  }

  .booking_actions {
    flex: 1;
    display: flex;
    flex-basis: 100px;
    flex-direction: column;
    row-gap: var(--spc-2);

    button {
      width: 100%;
      word-break: keep-all;
    }

    a:not(.calendar_actions a) {
      border-radius: var(--rounded-md);
      font-weight: var(--font-bold);
      text-align: center;
      color: var(--white) !important;
      text-decoration: none;
      background-color: var(--secondary-color);
      padding-block: var(--spc-2);
      padding-inline: var(--spc-4);
    }
  }

  .calendar_actions {
    display: flex;
    justify-content: space-evenly;
  }
`

export default withTranslation(null, {withRef: true})(withStyles(styles)(withParams(AllReservations)))
