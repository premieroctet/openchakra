import CustomButton from '../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import {Link} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import moment from 'moment'
import UserAvatar from '../../components/Avatar/UserAvatar'
import io from 'socket.io-client'
import styles from '../../static/css/components/BookingDetail/BookingPreview/BookingPreview'
import BookingDetail from '../../components/BookingDetail/BookingDetail'
import Router from 'next/router'
import DatePicker, {registerLocale} from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import Hidden from '@material-ui/core/Hidden'

const {BOOK_STATUS} = require('../../utils/consts')

const {BOOKING} = require('../../utils/i18n')

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
      bookingObj: null,
      currentUser: null,
      is_alfred: null,
      end_datetime: null,
      loading: false,
      alfred_pro: false,
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
    const {bookingObj} = this.state
    if (!bookingObj) {
      return null
    }
    return moment(`${bookingObj.date_prestation} ${moment(bookingObj.time_prestation).format('HH:mm')}`, 'DD/MM/YYYY HH:mm').add(1, 'hours')
  }

  setLoading = () => {
    this.setState({loading: true})
  }

  componentDidMount() {

    const booking_id = this.props.booking_id

    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current').then(res => {
      let result = res.data
      this.setState({currentUser: result})

      axios.get(`/myAlfred/api/booking/${booking_id}`).then(res => {
        const booking = res.data
        const end_datetime = moment(`${booking.date_prestation} ${moment(booking.time_prestation).format('HH:mm')}`, 'DD/MM/YYYY HH:mm').add(1, 'hours')
        this.setState(
          {
            bookingObj: booking,
            is_alfred: booking.alfred._id === result._id,
            end_datetime: end_datetime,
          },
        )

        // Alfred part/pto
        axios.get(`/myAlfred/api/shop/alfred/${booking.alfred._id}`)
          .then(res => {
            this.setState({alfred_pro: res.data.is_professional})
          })
          .catch(err => {
            console.error(err)
          })

        if (res.data.serviceUserId) {
          axios.get(`/myAlfred/api/serviceUser/${this.state.bookingObj.serviceUserId}`).then(res => {
            let resultat = res.data
            this.setState({category: resultat.service.category})
          }).catch(error => {
            console.error(error)
          })
        }

        this.socket = io()
        this.socket.on('connect', () => {
          this.socket.emit('booking', this.state.bookingObj._id)
        })
        this.socket.on('displayStatus', data => {
          this.setState({bookingObj: data})
        })
      })
        .catch(error => {
          console.error(error)
        })
    })
      .catch(error => {
        console.error(error)
        if (error.response && error.response.status === 401 || error.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })
  }

  changeStatus(status) {
    axios.put(`/myAlfred/api/booking/modifyBooking/${this.props.booking_id}`, {status: status})
      .then(() => {
        this.componentDidMount()
        this.socket.emit('changeStatus', this.state.bookingObj)
      })
      .catch(err => console.error(err))
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
    if (this.state.bookingObj) {
      this.state.bookingObj.prestations.forEach(p => {
        result[p.name] = p.price * p.value
      })
    }
    return result
  }

  computeCountPrestations() {
    let result = {}
    if (this.state.bookingObj) {
      this.state.bookingObj.prestations.forEach(p => {
        result[p.name] = p.value
      })
    }
    return result
  }

  onConfirm = () => {
    const {end_datetime} = this.state
    const endDate = moment(end_datetime).format('YYYY-MM-DD')
    const endHour = moment(end_datetime).format('HH:mm')
    const modifyObj = {end_date: endDate, end_time: endHour, status: BOOK_STATUS.CONFIRMED}

    axios.put(`/myAlfred/api/booking/modifyBooking/${this.props.booking_id}`, modifyObj)
      .then(res => {
        this.componentDidMount()
        setTimeout(() => this.socket.emit('changeStatus', res.data), 100)
      })
      .catch(err => console.error(err))
  }

  routingDetailsMessage() {
    const {currentUser, bookingObj} = this.state
    const displayUser = currentUser._id === bookingObj.alfred._id ? bookingObj.user : bookingObj.alfred
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
    const {bookingObj, currentUser, is_alfred, end_datetime, alfred_pro} = this.state

    if (!bookingObj || !currentUser) {
      return null
    }
    const pricedPrestations = this.computePricedPrestations()
    const countPrestations = this.computeCountPrestations()

    const amount = is_alfred ? parseFloat(bookingObj.alfred_amount) : parseFloat(bookingObj.amount)
    const alfred_fee = 0
    const customer_fee = is_alfred ? 0 : bookingObj.customer_fee

    // Am i the service provider ?
    const amIAlfred = currentUser._id === bookingObj.alfred._id
    const displayUser = amIAlfred ? bookingObj.user : bookingObj.alfred

    const status = bookingObj.status
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

    const momentTitle = [BOOK_STATUS.CONFIRMED, BOOK_STATUS.FINISHED].includes(status) ?
      `du ${bookingObj.date_prestation} à ${moment(bookingObj.time_prestation).format('HH:mm')}
       au ${moment(bookingObj.end_date).format('DD/MM/YYYY')} à ${bookingObj.end_time}`
      :
      `le ${bookingObj.date_prestation} à ${moment(bookingObj.time_prestation).format('HH:mm')}`

    const phone = amIAlfred ? bookingObj.user.phone : bookingObj.alfred.phone
    const customer_booking_title = bookingObj.customer_booking && ReactHtmlParser(this.props.t('BOOKING.avocotes_resa')) + bookingObj.customer_booking.user.full_name

    return (
      <Grid>
        {currentUser._id !==
        bookingObj.alfred._id && currentUser._id !== bookingObj.user._id ? (
            <Typography>{ReactHtmlParser(this.props.t('BOOKING.disabled_user_access'))}</Typography>
          ) : (
            <Grid>
              <Grid container className={classes.bigContainer}>
                <Grid container>
                  <Grid className={classes.Rightcontent} item xs={12} sm={12} md={12} xl={12} lg={12}>
                    <Grid container className={classes.mobilerow}>
                      <Grid item xs={2} sm={3} md={3} xl={3} lg={3}>
                        <UserAvatar user={displayUser}/>
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} xl={9} lg={9}>
                        <Grid>
                          <Typography>
                            {displayUser.full_name}
                          </Typography>
                        </Grid>
                        <Grid style={{marginTop: '2%'}}>
                          <Typography>
                            {`${bookingObj.service} le ${bookingObj.date_prestation} à ${moment(bookingObj.time_prestation).format('HH:mm')}`}
                          </Typography>
                        </Grid>
                        <Grid>
                          <h2>
                            {status === BOOK_STATUS.PREAPPROVED ?
                              amIAlfred ? ReactHtmlParser(this.props.t('BOOKING.pre_approved')) : BOOKING.invit_checking
                              :
                              status
                            }
                          </h2>
                        </Grid>
                        { customer_booking_title &&
                        <Typography>
                          {customer_booking_title}
                        </Typography>
                        }
                      </Grid>
                    </Grid>
                    <hr className={classes.hrSeparator}/>
                    {bookingObj === null ||
                  currentUser === null ? null : bookingObj.status ===
                  BOOK_STATUS.FINISHED ? (
                          currentUser._id === bookingObj.alfred._id ? (
                            <Grid container
                              style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%'}}>
                              <Grid container>
                                <Typography style={{marginBottom: '5%'}}>{ReactHtmlParser(this.props.t('BOOKING.commentary'))}</Typography>
                              </Grid>
                              <div style={{display: 'flex', flexFlow: 'row'}}>
                                {bookingObj.user_evaluated ?
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
                                        href={`/evaluateClient?booking=${bookingObj._id}&id=${bookingObj.serviceUserId}&client=${bookingObj.user._id}`}>
                                        <CustomButton color={'primary'} variant={'contained'} style={{color: 'white'}}>{ReactHtmlParser(this.props.t('BOOKING.button_evaluate_client'))}</CustomButton>
                                      </Link>
                                    </Grid>
                                  </Grid>}
                              </div>
                            </Grid>
                          ) : (
                            <Grid container
                              style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%'}}>
                              <Grid container>
                                <Typography style={{marginTop: '-3%', fontSize: '1.7rem', marginBottom: '5%'}}>
                                  {ReactHtmlParser(this.props.t('BOOKING.commentary'))}
                                </Typography>
                              </Grid>
                              <div style={{display: 'flex', flexFlow: 'row'}}>
                                {bookingObj.alfred_evaluated ?
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
                                        href={`/evaluate?booking=${bookingObj._id}&id=${bookingObj.serviceUserId}`}
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
                          )
                        ) : null}
                    <Grid container className={classes.mainContainerAboutResa}>
                      <Grid item xs={12} className={classes.containerTitleSectionAbout}>
                        <Typography className={classes.fontSizeTitleSectionAbout}>{ReactHtmlParser(this.props.t('PROFIL.about', {firstname: displayUser.firstname}))}</Typography>
                      </Grid>
                      <Grid container className={classes.reservationContainer}>
                        <Grid item xl={6}>
                          <Grid container>
                            <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                              <Grid item>
                                {displayUser.id_confirmed ?
                                  <Typography>{ReactHtmlParser(this.props.t('BOOKING.id_checked'))}</Typography>
                                  :
                                  null
                                }
                                <Typography>
                                  {ReactHtmlParser(this.props.t('BOOKING.member_since')) + moment(displayUser.creation_date).format('MMMM YYYY')}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xl={6} className={classes.mainContainerAbout}>
                          <Grid item container className={classes.containerButtonGroup}>
                            <Grid item>
                              <CustomButton variant={'contained'} color={'primary'} onClick={this.routingDetailsMessage}
                                style={{textTransform: 'initial', color: 'white'}}>{ReactHtmlParser(this.props.t('BOOKING.button_send_message'))}</CustomButton>
                            </Grid>
                            {bookingObj.status === BOOK_STATUS.CONFIRMED && phone?
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
                          bookingObj.status === BOOK_STATUS.CONFIRMED && phone?
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
                                  {bookingObj.service}
                                </Typography>
                                <Typography>
                                  {momentTitle}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                              <Grid item>
                                <Typography>
                                  {bookingObj.address ?
                                    `au ${bookingObj.address.address}, ${bookingObj.address.zip_code} ${bookingObj.address.city}` : ReactHtmlParser(this.props.t('BOOKING.visio'))}
                                </Typography>
                                <Typography>
                                  {ReactHtmlParser(this.props.t('BOOKING.created_date')) + moment(bookingObj.date).format('DD/MM/YYYY')} à {moment(bookingObj.date).format('HH:mm')}
                                </Typography>
                              </Grid>
                            </Grid>
                            {bookingObj.status === BOOK_STATUS.TO_CONFIRM && amIAlfred ?
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
                                      {ReactHtmlParser(this.props.t('BOOKING.info_end_resa')) + moment(bookingObj.date)
                                        .add(1, 'd')
                                        .format('DD/MM/YYYY') + ReactHtmlParser(this.props.t('BOOKING.a')) + moment(bookingObj.date).format('HH:mm')}
                                    </Typography>
                                  </Grid>
                                  <Grid className={classes.buttonConfirmResa}>
                                    <CustomButton color={'primary'} variant={'contained'} className={classes.buttonConfirm}
                                      onClick={this.onConfirm}>{ReactHtmlParser(this.props.t('COMMON.btn_confirm'))}</CustomButton>
                                  </Grid>
                                  <Grid>
                                    <CustomButton variant={'outlined'} classes={{root: classes.buttonCancel}}
                                      onClick={() => this.changeStatus(BOOK_STATUS.REFUSED)}>{ReactHtmlParser(this.props.t('BOOKING.button_cancel'))}</CustomButton>
                                  </Grid>
                                </Grid>
                              )
                                :
                                null
                            )
                              :
                              bookingObj.status === BOOK_STATUS.INFO && currentUser._id === bookingObj.alfred._id ? (
                                <Grid container className={classes.groupButtonsContainer} spacing={1}>
                                  <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                                    <CustomButton onClick={() => this.props.onConfirmPreapproved(booking_id)} color={'primary'}
                                      variant={'contained'}
                                      style={{color: 'white', textTransform: 'initial'}}>{ReactHtmlParser(this.props.t('BOOKING.pre_approved_button'))}</CustomButton>
                                  </Grid>
                                  <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                                    <CustomButton
                                      onClick={() => this.changeStatus(BOOK_STATUS.REFUSED)}
                                      variant={'outlined'}
                                      style={{textTransform: 'initial'}}
                                      color={'primary'}>
                                      Refuser
                                    </CustomButton>
                                  </Grid>
                                </Grid>
                              )
                                :
                                bookingObj.status === BOOK_STATUS.TO_PAY && currentUser._id === bookingObj.user._id ? (
                                  <Grid className={classes.groupButtonsContainer}>
                                    <CustomButton onClick={() => Router.push(`/confirmPayment?booking_id=${booking_id}`)}
                                      color={'primary'} variant={'contained'}
                                      style={{color: 'white', textTransform: 'initial'}}>{ReactHtmlParser(this.props.t('BOOKING.paid_button'))}</CustomButton>
                                  </Grid>
                                )
                                  :
                                  bookingObj.status === BOOK_STATUS.INFO && currentUser._id === bookingObj.user._id ?
                                    null
                                    :
                                    bookingObj.status === BOOK_STATUS.PREAPPROVED && currentUser._id === bookingObj.user._id ? (
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
                    <Grid container style={{
                      borderBottom: '1.5px #8281813b solid',
                      marginTop: '5%',
                      paddingBottom: '7%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <Grid item className={classes.equipmentContainer}>
                        <Typography variant={'h3'} className={classes.fontSizeTitleSectionAbout}>
                          {ReactHtmlParser(this.props.t('BOOKING.stuff'))}
                        </Typography>
                      </Grid>
                      {bookingObj === null ? null : bookingObj.equipments
                        .length ? (
                          bookingObj.equipments.map(equipment => {
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
                          <Grid style={{marginTop: '2%'}}>
                            <Typography>{ReactHtmlParser(this.props.t('BOOKING.no_stuff'))}</Typography>
                          </Grid>
                        )}
                    </Grid>
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
                              alfred_fee={alfred_fee}
                              customer_fee={customer_fee}
                              travel_tax={bookingObj.travel_tax}
                              pick_tax={bookingObj.pick_tax}
                              total={amount}
                              cesu_total={bookingObj.cesu_amount}
                              alfred_pro={alfred_pro}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
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
                            onClick={() => this.props.onCancel(booking_id)}>
                            {ReactHtmlParser(this.props.t('BOOKING.cancel_resa'))}
                          </a>
                        </Grid>
                      ) : null}
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
                    {bookingObj === null ||
                  currentUser === null ? null : bookingObj.status ===
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(BookingPreview))
