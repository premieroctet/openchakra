const {formatAddress} = require('../../utils/text')
import CustomButton from '../CustomButton/CustomButton'
import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React, {Fragment} from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import DatePicker, {registerLocale} from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import io from 'socket.io-client'
import styles from '../../static/css/components/BookingPreApprouve/BookingPreApprouve'
import About from '../../components/About/About'
import UserAvatar from '../../components/Avatar/UserAvatar'
import Typography from '@material-ui/core/Typography'
import BookingDetail from '../../components/BookingDetail/BookingDetail'

import {Divider} from '@material-ui/core'
const {BOOK_STATUS}=require('../../utils/consts')

registerLocale('fr', fr)
moment.locale('fr')
const {frenchFormat} = require('../../utils/text')

const Input2 = ({value, onClick}) => (
  <CustomButton value={value} color={'inherit'} variant={'outlined'} style={{color: 'gray'}} className="example-custom-input"
    onClick={onClick}>
    {value}
  </CustomButton>

)

class BookingPreApprouve extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      booking: null,
      end_date: null,
      minimum_end_date: null,
    }
  }

  static getInitialProps({query: {id}}) {
    return {booking_id: id}
  }

  componentDidMount() {

    const booking_id = this.props.booking_id
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/booking/${booking_id}`)
      .then(res => {
        const booking=res.data
        this.setState({booking: booking})

        const end = moment(booking.prestation_date).add(1, 'hour')

        this.setState({
          booking: booking,
          end_date: end,
          minimum_end_date: end,
        })

        this.socket = io()
        this.socket.on('connect', () => {
          this.socket.emit('booking', booking._id)
        })
      })
  }

  changeStatus() {
    const {booking_id}=this.props
    const {end_date}=this.state
    const dateObj = {end_date: end_date, status: BOOK_STATUS.PREAPPROVED}

    axios.put(`/myAlfred/api/booking/modifyBooking/${booking_id}`, dateObj)

      .then(res => {
        this.setState({booking: res.data})
        setTimeout(() => this.socket.emit('changeStatus', res.data), 100)
      })
      .catch()
  }

  computePricedPrestations() {
    const {booking}=this.state
    if (!booking) {
      return {}
    }
    const result=Object.fromEntries((booking.prestations.map(p => [p.name, p.price*p.value])))
    return result
  }

  computeCountPrestations() {
    const {booking}=this.state
    if (!booking) {
      return {}
    }
    const result=Object.fromEntries((booking.prestations.map(p => [p.name, p.value])))
    return result
  }

  handleEndDateChange = date => {
    const {minimum_end_date}=this.state
    if (moment(date).isSameOrAfter(minimum_end_date)) {
      this.setState({end_date: moment(date)})
    }
  }

  render() {
    const {classes} = this.props
    const {booking, end_date} = this.state

    if (!booking || !end_date) {
      return null
    }

    const pricedPrestations = this.computePricedPrestations()
    const countPrestations = this.computeCountPrestations()

    const amount = booking ? parseFloat(booking.alfred_amount) : 0

    return (
      <Fragment>
        {booking === null ?
          null
          :
          <Grid>
            <Grid container className={classes.bigContainer}>
              <Grid container>
                <Grid item md={12} xl={12} lg={12} sm={12} xs={12}>
                  <Grid
                    container
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '5%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Grid item xs={12} sm={3} md={3} xl={3} lg={3}>
                      <UserAvatar
                        classes={'avatarLetter'}
                        user={booking.user}
                        className={classes.avatarLetter}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9} md={9} xl={9} lg={9}>
                      <Grid item style={{marginTop: '2%'}}>
                        <Typography className={classes.fontSizeTitleSectionAbout}>
                          {frenchFormat(`Pré-approuver la réservation de ${booking.user.firstname} ${booking.user.name} `)}
                        </Typography>
                      </Grid>
                      <Grid container>
                        <Grid item>
                          <Grid style={{marginLeft: '3%', width: '100%'}}>
                            <About user={booking.user._id} profil={false}/>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid container>
                      <Grid style={{width: '100%', marginTop: '5vh', marginBottom: '5vh'}}>
                        <Divider/>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid>
                          <h3>Détail de la réservation</h3>
                        </Grid>
                        <Grid xs={12} style={{marginTop: '3vh'}}>
                          <BookingDetail
                            prestations={pricedPrestations}
                            count={countPrestations}
                            travel_tax={booking ? booking.travel_tax : 0}
                            pick_tax={booking ? booking.pick_tax : 0}
                            total={amount}
                            cesu_total={booking ? booking.cesu_amount : 0}
                          />
                        </Grid>
                      </Grid>
                      <Grid style={{width: '100%', marginTop: '5vh', marginBottom: '5vh'}}>
                        <Divider/>
                      </Grid>
                      <Grid container style={{width: '100%'}}>
                        <Grid>
                          <h3>Planning de la réservation</h3>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: '3vh'}}>
                          <Grid>
                            <Typography>
                              Afin de mettre à jour votre calendrier et donner de la
                              visibilité à votre client sur la réalisation de la
                              prestation, le planning de la réservation doit être
                              mis à jour. Si votre réservation se réalise sur un
                              seul créneau, renseignez l’heure de fin. Si votre
                              prestation se réalise en plusieurs créneaux (peinture,
                              cours etc.), échangez avec votre client sur un
                              planning et des créneaux horaires pour cette
                              prestation.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{marginTop: '3vh'}}>
                          <Grid item>
                            <Grid>
                              <Typography>Adresse de la prestation:</Typography>
                            </Grid>
                            <Grid>
                              <Typography>{formatAddress(booking.address)}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={classes.containerDate}>
                          <Grid item style={{display: 'inline-block', width: '100%'}}>
                            <Typography><strong>Date de début:</strong></Typography>
                            <Typography>{moment(booking.prestation_date).format('DD/MM/YYYY [-] HH:mm')}</Typography>
                          </Grid>
                          <Grid item className={classes.endDateContainer}>
                            <Grid style={{width: '100%'}}>
                              <Typography><strong>Date de fin:</strong></Typography>
                            </Grid>
                            <Grid style={{display: 'flex', alignItems: 'center'}}>
                              <Grid style={{marginRight: 10}}>
                                <DatePicker
                                  selected={end_date.toDate()}
                                  onChange={this.handleEndDateChange}
                                  customInput={<Input2/>}
                                  locale='fr'
                                  showMonthDropdown
                                  dateFormat="dd/MM/yyyy"
                                />
                              </Grid>
                              <Grid>-</Grid>
                              <Grid style={{marginLeft: 10}}>
                                <DatePicker
                                  selected={end_date.toDate()}
                                  onChange={this.handleEndDateChange}
                                  customInput={<Input2/>}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={15}
                                  timeCaption="Heure"
                                  dateFormat="HH:mm"
                                  locale='fr'
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomButton
                      color={'primary'}
                      variant={'contained'}
                      onClick={() => {
                        this.changeStatus()
                        setTimeout(() => this.props.onConfirm(this.state.booking_id), 500)
                      }}
                      style={{
                        color: 'white',
                        width: '100%',
                        textTransform: 'initial',
                      }}
                    >
                      Pré-approuver
                    </CustomButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      </Fragment>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(BookingPreApprouve))
