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
      currDate: Date.now(),
      hour: Date.now(),
      begin: null,
      end: null,
      isToday: false,
      isBookingDay: false,
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

        const date_prestation = booking.prestation_date.split('/')
        const day = date_prestation[0]
        const month = date_prestation[1]
        const year = date_prestation[2]
        const end = new Date(moment(`${year }-${ month }-${ day }T00:00:00.000Z`, 'YYYY-MM-DD').startOf('days'))

        this.setState({
          time_prestation: booking.prestation_date,
          min_time_prestation: booking.prestation_date,
          end: end,
          begin: end,
        })


        let isToday = moment(this.state.currDate).isSame(moment(new Date()), 'day')
        this.setState({
          isToday: isToday,
        })

        if (moment(this.state.currDate).isSame(end, 'day')) {
          this.setState({
            isBookingDate: true,
          })
        }

        if (moment(this.state.currDate).isAfter(this.state.end)) {
          this.setState({end: this.state.currDate})

        }


        this.socket = io()
        this.socket.on('connect', () => {
          this.socket.emit('booking', booking._id)
        })
      })
  }

  changeStatus() {
    const {booking_id}=this.props
    const endDate = moment(this.state.end).format('YYYY-MM-DD')
    const dateObj = {end_date: endDate, status: BOOK_STATUS.PREAPPROVED}

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

  render() {
    const {classes} = this.props
    const {booking} = this.state

    if (!booking) {
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
                              <Typography>{booking.address.address}, {booking.address.city} {booking.address.zip_code}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item className={classes.containerDate}>
                          <Grid item style={{display: 'inline-block', width: '100%'}}>
                            <Typography><strong>Date de début:</strong></Typography>
                            <Typography>{moment(booking.prestation_date).format('DD/MM/YYYY [-] HH:mm')}</Typography>
                          </Grid>
                          {booking.end_date &&
                            <Grid item style={{display: 'inline-block', width: '100%'}}>
                              <Grid>
                                <Typography><strong>Date de fin:</strong></Typography>
                              </Grid>
                              <Grid>
                                <Typography>{moment(booking.end_date).format('DD/MM/YYYY [-] HH:mm')}</Typography>
                              </Grid>
                            </Grid>
                          }
                          {typeof booking.end_date === 'undefined' ?
                            typeof this.state.end === null ? null :

                              <Grid item className={classes.endDateContainer}>
                                <Grid style={{width: '100%'}}>
                                  <Typography><strong>Date de fin:</strong></Typography>
                                </Grid>
                                <Grid style={{display: 'flex'}}>
                                  <Grid style={{marginRight: 10}}>
                                    <DatePicker
                                      // selected={moment(this.state.end).isAfter(this.state.currDate) ? this.state.end : this.state.currDate}
                                      selected={Math.max(this.state.end, this.state.currDate)}
                                      onChange={date => {
                                        let isToday = moment(date).isSame(moment(new Date()), 'day')
                                        this.setState({
                                          end: date,
                                          isToday: isToday,
                                        }, () => {
                                          this.setState({
                                          })

                                        })
                                      }}
                                      customInput={<Input2/>}
                                      locale='fr'
                                      showMonthDropdown
                                      dateFormat="dd/MM/yyyy"
                                      minDate={this.state.begin}
                                    />
                                  </Grid>

                                  - {
                                    <Grid style={{marginLeft: 10}}>
                                      <DatePicker
                                        selected={moment(this.state.begin).isSame(this.state.end, 'day') ? new Date(this.state.time_prestation).setHours(new Date(this.state.time_prestation).getHours() + 1) : this.state.currDate}
                                        onChange={
                                          moment(this.state.begin).isSame(this.state.end, 'day') ?
                                            date => this.setState({
                                              time_prestation: moment(date.setHours(date.getHours() - 1)).utc()._d,
                                              hour: date,
                                            })
                                            :
                                            date => this.setState({
                                              currDate: date,
                                              hour: date,
                                            })

                                        }

                                        customInput={<Input2/>}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        minTime={moment(this.state.begin).isSame(this.state.end, 'day') ? new Date(this.state.min_time_prestation).setHours(new Date(this.state.min_time_prestation).getHours() + 1) : this.state.isToday ? this.state.currDate : null}
                                        maxTime={moment(this.state.begin).isSame(this.state.end, 'day') || this.state.isToday ? moment().endOf('day').toDate() : null}
                                        timeCaption="Heure"
                                        dateFormat="HH:mm"
                                        locale='fr'
                                        minDate={new Date()}
                                      />
                                    </Grid>

                                  }
                                </Grid>
                              </Grid>
                            :
                            null}
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

export default withTranslation('custom', {withRef: true})(withStyles(styles)(BookingPreApprouve))
