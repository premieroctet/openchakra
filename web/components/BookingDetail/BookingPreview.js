import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
import {withTranslation} from 'react-i18next'
import {Link} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import moment from 'moment'
import io from 'socket.io-client'
import Router from 'next/router'
import DatePicker, {registerLocale} from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import Hidden from '@material-ui/core/Hidden'
import BookingDetail from '../../components/BookingDetail/BookingDetail'
import styles from '../../static/css/components/BookingDetail/BookingPreview/BookingPreview'
import CustomButton from '../CustomButton/CustomButton'
import {booking_datetime_str} from '../../utils/dateutils'
import {BOOK_STATUS, API_PATH} from '../../utils/consts'
import {BOOKING} from '../../utils/i18n'
import {UserContext} from '../../contextes/user.context'
import BookingMinInfos from '../Booking/BookingMinInfos'
import AskForCPF from '../Training/CPF/AskForCPF'
import DialogCancel from './DialogCancel'
import DialogReject from './DialogReject'

registerLocale('fr', fr)
moment.locale('fr')

const Input2 = ({value, onClick}) => (
  <CustomButton value={value} color={'inherit'} variant={'outlined'} style={{color: 'gray'}} className="example-custom-input"
    onClick={onClick}>
    {value}
  </CustomButton>

)

class BookingPreview extends React.Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
    this.state = {
      booking: null,
      currentUser: null,
      is_alfred: null,
      end_datetime: null,
      alfred_pro: false,
      rejectOpen: false,
      cancelOpen: false,
    }
    this.routingDetailsMessage = this.routingDetailsMessage.bind(this)
    this.getPrestationMinMoment = this.getPrestationMinMoment.bind(this)
  }

  static getInitialProps({query: {id}}) {
    return {
      booking_id: id,
    }
  }

  getPrestationMinMoment = () => {
    const {booking} = this.state
    if (!booking) {
      return null
    }
    return moment(booking.prestation_date).add(1, 'hours')
  }

  componentDidMount() {

    const booking_id = this.props.booking_id
    const {user: currentUser} = this.context

    axios.get(`${API_PATH}/booking/${booking_id}`).then(res => {
      const booking = res.data
      const end_datetime = moment(booking.prestation_date).add(1, 'hours')
      this.setState(
        {
          currentUser,
          booking,
          is_alfred: booking?.alfred._id === currentUser?._id,
          end_datetime,
        },
      )

      // Alfred part/pto
      axios.get(`${API_PATH}/shop/alfred/${booking.alfred._id}`)
        .then(res => {
          this.setState({alfred_pro: res.data.is_professional})
        })
        .catch(err => {
          console.error(err)
        })

      if (res.data.serviceUserId) {
        axios.get(`${API_PATH}/serviceUser/${this.state.booking.serviceUserId}`).then(res => {
          let resultat = res.data
          this.setState({category: resultat.service.category})
        }).catch(error => {
          console.error(error)
        })
      }

      this.socket = io()
      this.socket.on('connect', () => {
        this.socket.emit('booking', this.state.booking._id)
      })
      this.socket.on('displayStatus', data => {
        this.setState({booking: data})
      })
    })
      .catch(error => {
        console.error(error)
      })
    
  }

  changeStatus(status, reason=null) {
    console.trace(`change status:${reason}`)
    axios.put(`${API_PATH}/booking/modifyBooking/${this.props.booking_id}`, {status: status, reason: reason})
      .then(() => {
        this.componentDidMount()
        this.socket.emit('changeStatus', this.state.booking)
      })
      .catch(err => console.error(err))
  }

  openRejectReason = () => {
    this.setState({rejectOpen: true})
  }

  onReject = reason => {
    this.changeStatus(BOOK_STATUS.REFUSED, reason)
    this.onRejectClose()
  }

  onRejectClose = () => {
    this.setState({rejectOpen: false})
  }

  openCancelReason = () => {
    this.setState({cancelOpen: true})
  }

  onCancel = reason => {
    this.changeStatus(BOOK_STATUS.CANCELLED, reason)
    this.onCancelClose()
  }

  onCancelClose = () => {
    this.setState({cancelOpen: false})
  }

  onChangeEndDate = ev => {
    const m = moment(`${moment(ev).format('DD/MM/YYYY')} ${moment(this.state.end_datetime).format('HH:mm')}`, 'DD/MM/YYYY HH:mm')
    if (m.isAfter(this.getPrestationMinMoment())) {
      this.setState({end_datetime: m})
    }
  }

  onChangeEndTime = ev => {
    const m = moment(`${moment(this.state.end_datetime).format('DD/MM/YYYY')} ${moment(ev).format('HH:mm')}`, 'DD/MM/YYYY HH:mm')
    if (m.isAfter(this.getPrestationMinMoment())) {
      this.setState({end_datetime: m})
    }
  }

  computePricedPrestations() {
    let result = {}
    if (this.state.booking) {
      this.state.booking.prestations.forEach(p => {
        result[p.name] = p.price * p.value
      })
    }
    return result
  }

  computeCountPrestations() {
    let result = {}
    if (this.state.booking) {
      this.state.booking.prestations.forEach(p => {
        result[p.name] = p.value
      })
    }
    return result
  }

  onConfirm = () => {
    const {end_datetime} = this.state
    const endDate = moment(end_datetime)
    const modifyObj = {end_date: endDate, status: BOOK_STATUS.CONFIRMED}

    axios.put(`${API_PATH}/booking/modifyBooking/${this.props.booking_id}`, modifyObj)
      .then(res => {
        this.componentDidMount()
        setTimeout(() => this.socket.emit('changeStatus', res.data), 100)
      })
      .catch(err => console.error(err))
  }

  routingDetailsMessage() {
    const {currentUser, booking} = this.state
    const displayUser = currentUser._id === booking.user._id ? (booking.alfred || null) : booking.user
    Router.push({
      pathname: '/profile/messages',
      query: {
        user: this.state.currentUser._id,
        relative: displayUser._id,
      },
    })
  }

  callDrawer = () => {
    this.child.current.handleDrawerToggle()
  }

  phoneDigit(str, index, chr) {
    if (index > str.length - 1) { return str }
    return str.substring(0, index) + chr + str.substring(index + 1)
  }

  render() {
    const {classes, booking_id} = this.props
    const {booking, currentUser, is_alfred, end_datetime, alfred_pro, rejectOpen, cancelOpen} = this.state

    if (!booking || !currentUser) {
      return null
    }
    const pricedPrestations = this.computePricedPrestations()
    const countPrestations = this.computeCountPrestations()

    const isCPF = !!booking?.cpf_booked

    const amount = is_alfred ? parseFloat(booking.alfred_amount) : parseFloat(booking.amount)
    const provider_fee = 0
    const customer_fee = is_alfred ? 0 : booking.customer_fee

    // Am i the service provider ?
    const amIAlfred = currentUser._id == booking.alfred._id
    const displayUser = amIAlfred ? booking.user : booking.alfred

    const status = booking.status
    const paymentTitle =
      amIAlfred ?
        status === BOOK_STATUS.REFUSED ? ReactHtmlParser(this.props.t('BOOKING.payment_no_finish'))
          : [BOOK_STATUS.FINISHED, BOOK_STATUS.CONFIRMED].includes(status) ? ReactHtmlParser(this.props.t('BOOKING.versement')) : BOOKING.potential_incomes
        :
        [BOOK_STATUS.REFUSED, BOOK_STATUS.CANCELLED, BOOK_STATUS.EXPIRED].includes(status) ?
          ReactHtmlParser(this.props.t('BOOKING.payment_no_finish'))
          :
          status === BOOK_STATUS.FINISHED ?
            ReactHtmlParser(this.props.t('BOOKING.payment_title'))
            :
            [BOOK_STATUS.CONFIRMED, BOOK_STATUS.PREAPPROVED, BOOK_STATUS.INFO, BOOK_STATUS.TO_CONFIRM].includes(status) ?
              ReactHtmlParser(this.props.t('BOOKING.payment_if_accept'))
              :
              ReactHtmlParser(this.props.t('BOOKING.potential_incomes'))

    const momentTitle = [BOOK_STATUS.PREAPPROVED, BOOK_STATUS.CONFIRMED, BOOK_STATUS.FINISHED].includes(status) ?
      `du ${moment(booking.prestation_date).format('DD/MM/YY HH:mm')}
       au ${moment(booking.end_date).format('DD/MM/YY HH:mm')}`
      :
      booking_datetime_str(booking)

    const phone = amIAlfred ? booking.user.phone : booking.alfred.phone

    if ((currentUser._id != booking.user._id) && (booking.alfred && booking.alfred._id != currentUser._id)) {
      return (
        <Typography>{ReactHtmlParser(this.props.t('BOOKING.disabled_user_access'))}</Typography>
      )
    }
    return (
      <StyledBookingPreview>
          
        <BookingMinInfos booking={booking} amIAlfred={amIAlfred}/>
        <hr className={classes.hrSeparator}/>
        
        {booking === null ||
                  currentUser === null ? null : booking.status ===
                  BOOK_STATUS.FINISHED ? (
              currentUser._id === booking.alfred._id ? (
                <>
                  <Grid container
                    style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%'}}>
                    <Grid container>
                      <Typography style={{marginBottom: '5%'}}>{ReactHtmlParser(this.props.t('BOOKING.commentary'))}</Typography>
                    </Grid>
                    <div style={{display: 'flex', flexFlow: 'row'}}>
                      {booking.user_evaluated ?
                        <Grid container>
                          <Grid item md={12} xs={12} style={{marginBottom: '35px'}}>
                            <Typography>{ReactHtmlParser(this.props.t('BOOKING.already_evaluate'))}</Typography>
                          </Grid>
                        </Grid>
                        :
                        <Grid container>
                          <Grid item md={6} xs={12}>
                            <Typography>
                              {ReactHtmlParser(this.props.t('BOOKING.MSG_EVALUATE'))}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}/>
                          <Grid item md={4} xs={12}>
                            <Link
                              href={`/evaluateClient?booking=${booking._id}&id=${booking.serviceUserId}&client=${booking.user._id}`}>
                              <CustomButton color={'primary'} variant={'contained'} style={{color: 'white'}}>{ReactHtmlParser(this.props.t('BOOKING.button_evaluate_client'))}</CustomButton>
                            </Link>
                          </Grid>
                        </Grid>}
                    </div>
                  </Grid>
                  <hr className={classes.hrSeparator}/>
                </>
              ) : (
                <>
                  <Grid container
                    style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%'}}>
                    <Grid container>
                      <Typography style={{marginTop: '-3%', fontSize: '1.7rem', marginBottom: '5%'}}>
                        {ReactHtmlParser(this.props.t('BOOKING.commentary'))}
                      </Typography>
                    </Grid>
                    <div style={{display: 'flex', flexFlow: 'row'}}>
                      {booking.alfred_evaluated ?
                        <Grid container>
                          <Grid item md={12} xs={12} style={{marginBottom: '35px'}}>
                            <Typography>{ReactHtmlParser(this.props.t('BOOKING.already_evaluate_alfred'))}</Typography>
                          </Grid>
                        </Grid>
                        :
                        <Grid container>
                          <Grid item md={6} xs={12} style={{marginBottom: '35px'}}>
                            <Typography>{ReactHtmlParser(this.props.t('BOOKING.info_commentary'))}</Typography>
                          </Grid>
                          <Grid item xs={2}/>
                          <Grid item md={4} xs={12}>
                            <Link
                              href={`/evaluate?booking=${booking._id}&id=${booking.serviceUserId}`}
                            >
                              <Grid
                                style={{
                                  textAlign: 'center',
                                  width: '200px',
                                  height: '40px',
                                  backgroundColor: '#F8727F',
                                  lineHeight: 2.5,
                                  borderRadius: '50px',
                                  cursor: 'pointer',
                                }}
                              >
                                <a
                                  style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                  }}
                                >
                                  {ReactHtmlParser(this.props.t('BOOKING.evaluate_alfred_button'))}
                                </a>
                              </Grid>
                            </Link>
                          </Grid>
                        </Grid>}
                    </div>
                  </Grid>
                  <hr className={classes.hrSeparator}/>
                </>
              )
            ) : null}
        
        {amIAlfred &&
          <>
            <Grid container className={classes.mainContainerAboutResa}>
                    
              <Typography className={classes.fontSizeTitleSectionAbout}>
                {ReactHtmlParser(this.props.t('PROFIL.about', {firstname: displayUser && displayUser.firstname}))}
              </Typography>
                    
              <Grid container className={classes.reservationContainer}>
                { displayUser &&
                <Grid item xl={6}>
                  <Grid container>
                    <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                      <Grid item>
                        {displayUser.id_confirmed && <Typography>{ReactHtmlParser(this.props.t('BOOKING.id_checked'))}</Typography>}
                        <Typography>
                          {ReactHtmlParser(this.props.t('BOOKING.member_since')) + moment(displayUser.creation_date).format('MMMM YYYY')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>}
                <Grid item xl={6} className={classes.mainContainerAbout}>
                  <Grid item container className={classes.containerButtonGroup}>
                    <Grid item>
                      <CustomButton variant={'contained'} color={'primary'} onClick={this.routingDetailsMessage}
                        style={{textTransform: 'initial', color: 'white'}}>{ReactHtmlParser(this.props.t('BOOKING.button_send_message'))}</CustomButton>
                    </Grid>
                    {booking.status === BOOK_STATUS.CONFIRMED && phone?
                      <Grid item className={classes.containerPhone}>
                        <Hidden only={['xl', 'lg', 'md', 'sm']}>
                          <CustomButton>
                            <a
                              href={`tel:${phone}`}
                              style={{textDecoration: 'none', color: 'rgba(178,204,251,1)', cursor: 'pointer'}}
                            >
                              {ReactHtmlParser(this.props.t('BOOKING.button_call'))}
                            </a>
                          </CustomButton>
                        </Hidden>
                      </Grid> : null
                    }
                  </Grid>
                </Grid>
                {
                  booking.status === BOOK_STATUS.CONFIRMED && phone?
                    <Hidden only={['xs']}>
                      <Grid item xl={6}>
                        <Grid>
                          <Typography>{ReactHtmlParser(this.props.t('BOOKING.phone_number'))}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xl={6}>
                        <Grid>
                          <Typography
                            style={{textAlign: 'center'}}> {this.phoneDigit(phone.substring(1), 0, '0')}</Typography>
                        </Grid>
                      </Grid>
                    </Hidden> : null
                }
              </Grid>
            </Grid>
            <hr className={classes.hrSeparator}/>
          </>
        }

        {!amIAlfred && isCPF && booking.status !== BOOK_STATUS.CONFIRMED
          && <><AskForCPF link={booking?.cpf_link} /><hr className={classes.hrSeparator}/></>}

        <Grid container className={classes.mainContainerAboutResa}>
          <Grid item xs={12} className={classes.containerTitleSectionAbout}>
            <Typography className={classes.fontSizeTitleSectionAbout}>{ReactHtmlParser(this.props.t('BOOKING.about_resa'))}</Typography>
          </Grid>
          <Grid className={classes.reservationContainer}>
            <Grid item>
              <Grid container>
                <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                  <Grid item>
                    <Typography>
                      {booking.service.label}
                    </Typography>
                    <Typography>
                      {momentTitle}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                  <Grid item>
                    <Typography>
                      {booking.address
                        ? `au ${booking.address.address}, ${booking.address.zip_code} ${booking.address.city}`
                        : ReactHtmlParser(this.props.t('BOOKING.visio'))
                      }
                    </Typography>
                    <Typography>
                      {ReactHtmlParser(this.props.t('BOOKING.created_date')) + moment(booking.date).format('DD/MM/YYYY')} à {moment(booking.date).format('HH:mm')}
                    </Typography>
                  </Grid>
                </Grid>
                {booking.status === BOOK_STATUS.TO_CONFIRM && amIAlfred ?
                  <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                    <Grid item>
                      <Typography>{ReactHtmlParser(this.props.t('BOOKING.end_date'))}</Typography>
                      <DatePicker
                        selected={moment(end_datetime).toDate()}
                        onChange={this.onChangeEndDate}
                        locale='fr'
                        showMonthDropdown
                        dateFormat="dd/MM/yyyy"
                        customInput={<Input2/>}
                      />
                                -
                      <DatePicker
                        selected={moment(end_datetime).toDate()}
                        onChange={this.onChangeEndTime}
                        customInput={<Input2/>}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Heure"
                        dateFormat="HH:mm"
                        locale='fr'
                        minDate={new Date()}
                      />
                    </Grid>
                  </Grid>
                  :
                  null
                }
              </Grid>
            </Grid>
            <Grid container className={classes.mainContainerStateResa}>
              <Grid>
                {status === BOOK_STATUS.TO_CONFIRM ? (
                  amIAlfred ? (
                    <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <Grid className={classes.labelReservation}>
                        <Typography>
                          {ReactHtmlParser(this.props.t('BOOKING.info_end_resa')) + moment(booking.date)
                            .add(1, 'd')
                            .format('DD/MM/YYYY') + ReactHtmlParser(this.props.t('BOOKING.a')) + moment(booking.date).format('HH:mm')}
                        </Typography>
                      </Grid>
                      <Grid className={classes.buttonConfirmResa}>
                        <CustomButton color={'primary'} variant={'contained'} className={classes.buttonConfirm}
                          onClick={this.onConfirm}>{ReactHtmlParser(this.props.t('COMMON.btn_confirm'))}</CustomButton>
                      </Grid>
                      <Grid>
                        <CustomButton variant={'outlined'} classes={{root: classes.buttonCancel}}
                          onClick={this.openRejectReason}>{ReactHtmlParser(this.props.t('BOOKING.button_cancel'))}</CustomButton>
                      </Grid>
                    </Grid>
                  )
                    :
                    null
                )
                  :
                  booking.status === BOOK_STATUS.INFO && currentUser._id === booking.alfred._id ? (
                    <Grid container className={classes.groupButtonsContainer} spacing={1}>
                      <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                        <CustomButton onClick={() => this.props.onConfirmPreapproved(booking_id)} color={'primary'}
                          variant={'contained'}
                          style={{color: 'white', textTransform: 'initial'}}>{ReactHtmlParser(this.props.t('BOOKING.pre_approved_button'))}</CustomButton>
                      </Grid>
                      <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                        <CustomButton
                          onClick={this.openRejectReason}
                          variant={'outlined'}
                          style={{textTransform: 'initial'}}
                          color={'primary'}>
                          {ReactHtmlParser(this.props.t('BOOKING.button_cancel'))}
                        </CustomButton>
                      </Grid>
                    </Grid>
                  )
                    :
                    booking.status === BOOK_STATUS.TO_PAY && currentUser._id === booking.user._id ? (
                      <Grid className={classes.groupButtonsContainer}>
                        <CustomButton onClick={() => Router.push(`/confirmPayment?booking_id=${booking_id}`)}
                          color={'primary'} variant={'contained'}
                          style={{color: 'white', textTransform: 'initial'}}>{ReactHtmlParser(this.props.t('BOOKING.paid_button'))}</CustomButton>
                      </Grid>
                    )
                      :
                      booking.status === BOOK_STATUS.INFO && currentUser._id === booking.user._id ?
                        null
                        :
                        booking.status === BOOK_STATUS.PREAPPROVED && currentUser._id === booking.user._id ? (
                          <Grid className={classes.groupButtonsContainer}>
                            <CustomButton onClick={() => Router.push(`/confirmPayment?booking_id=${booking_id}`)}
                              color={'primary'} variant={'contained'}
                              style={{color: 'white', textTransform: 'initial'}}>{ReactHtmlParser(this.props.t('BOOKING.paid_button'))}</CustomButton>
                          </Grid>
                        )
                          :
                          null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr className={classes.hrSeparator}/>

        {/* Stuff */}
        <BookingPreviewRow>
          <h3>
            {ReactHtmlParser(this.props.t('BOOKING.stuff'))}
          </h3>
            
          {booking === null ? null : booking.equipments
            .length ? (
              booking.equipments.map(equipment => {
                return (
                  <Grid item xs={1} style={{textAlign: 'center'}}>
                    <img
                      alt={equipment.logo}
                      title={equipment.logo}
                      style={{width: '98%'}}
                      src={`/static/equipments/${equipment.logo}`}
                    />
                  </Grid>
                )
              })
            ) : (
              <Typography>{ReactHtmlParser(this.props.t('BOOKING.no_stuff'))}</Typography>
            )}
        </BookingPreviewRow>
                
        {/* Potential earnings */}
        <Grid container
          style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%'}}>
          <Grid item>
            <Typography variant={'h3'} className={classes.fontSizeTitleSectionAbout}>
              {paymentTitle}
            </Typography>
          </Grid>
          <Grid container style={{display: 'flex', flexDirection: 'column'}}>
            <Grid className={classes.bookingDetailContainer}>
              <Grid item>
                <BookingDetail
                  prestations={pricedPrestations}
                  count={countPrestations}
                  provider_fee={provider_fee}
                  customer_fee={customer_fee}
                  travel_tax={booking.travel_tax}
                  pick_tax={booking.pick_tax}
                  total={amount}
                  cesu_total={booking.cesu_amount}
                  alfred_pro={alfred_pro}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
                
        {/* Cancel booking */}
        {([BOOK_STATUS.TO_CONFIRM, BOOK_STATUS.INFO].includes(status) && !amIAlfred) ||
                  status === BOOK_STATUS.CONFIRMED || status === BOOK_STATUS.PREAPPROVED ? (
            <Grid
              container
              style={{
                borderBottom: '1.5px #8281813b solid',
                paddingBottom: '3%',
                paddingTop: '3%',
              }}
            >
              <a style={{textDecoration: 'none', color: 'rgba(178,204,251,1)', cursor: 'pointer'}}
                onClick={this.openCancelReason}>
                {ReactHtmlParser(this.props.t('BOOKING.cancel_resa'))}
              </a>
            </Grid>
          ) : null}

        {/* Report user */}
        <Grid
          container
          style={{
            borderBottom: '1.5px #8281813b solid',
            marginTop: '2%',
            paddingBottom: '3%',
          }}
        >
          <a
            href="mailto:contact@myalfred.io"
            style={{
              textDecoration: 'none',
              color: 'rgba(178,204,251,1)',
            }}
          >
            {ReactHtmlParser(this.props.t('BOOKING.warning_behavior'))}
          </a>
        </Grid>
        {booking === null ||
                  currentUser === null ? null : booking.status ===
                  BOOK_STATUS.FINISHED && (
            <Grid
              container
              style={{borderBottom: '1.5px #8281813b solid', marginTop: '2%', paddingBottom: '3%'}}
            >
              <a
                href="mailto:contact@myalfred.io"
                style={{textDecoration: 'none',
                  color: 'rgb(47, 188, 211)',
                }}
              >{ReactHtmlParser(this.props.t('BOOKING.reclamation'))}</a>
            </Grid>
          )}
        <DialogReject open={rejectOpen} onRefuse={this.onReject} onClose={this.onRejectClose}/>
        <DialogCancel open={cancelOpen} onCancel={this.onCancel} onClose={this.onCancelClose}/>
      </StyledBookingPreview>
    )
  }
}

BookingPreview.contextType = UserContext

const BookingPreviewRow = ({hr=true, children, ...props}) => {

  return <><StyledBookingPreviewRow {...props}>
    {children}
  </StyledBookingPreviewRow>
  {hr && <hr />}
  </>
}

const StyledBookingPreview = styled.div`
  padding: var(--spc-4);
`

const StyledBookingPreviewRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--spc-6);
  padding-block: var(--spc-4);

`

export default withTranslation(null, {withRef: true})(withStyles(styles)(BookingPreview))
