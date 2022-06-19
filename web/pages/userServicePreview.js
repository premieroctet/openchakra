import {Link} from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import {registerLocale} from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import Head from 'next/head'
import lodash from 'lodash'
import DevLog from '../components/DevLog'
import Place from '../components/Place'
import ServiceUserDescription from '../components/ServiceUserDescription'
import Planning from '../components/Planning'
import Topic from '../hoc/Topic/Topic'
import UserAvatar from '../components/Avatar/UserAvatar'
import styles from '../static/css/pages/userServicePreviewPage/userServicePreviewStyle'
import Layout from '../hoc/Layout/Layout'
import CustomButton from '../components/CustomButton/CustomButton'
import {snackBarError} from '../utils/notifications'
import Album from '../components/Album/Album'
import SummaryCommentary from '../components/SummaryCommentary/SummaryCommentary'
import DrawerBooking from '../components/Drawer/DrawerBooking/DrawerBooking'
import LayoutMobile from '../hoc/Layout/LayoutMobile'

import ListIconsSkills from '../components/ListIconsSkills/ListIconsSkills'
import Equipments from '../components/Equipments'

const moment = require('moment')
const {computeBookingReference} = require('../utils/text')
const {computeDistanceKm} = require('../utils/functions')
const isEmpty = require('../server/validation/is-empty')
const {BOOK_STATUS}=require('../utils/consts')
const {
  getDeadLine,
  isDateAvailable,
  isMomentAvailable,
} = require('../utils/dateutils')
const {setAxiosAuthentication}=require('../utils/authentication')
const withParams = require('../components/withParams')
const {isLoggedUserAdmin}=require('../utils/context')

moment.locale('fr')
registerLocale('fr', fr)

// TODO : gérer affichage si utilisateur non connecté
class UserServicesPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      booking_date: null,
      shop: null,
      reviews: [],
      serviceUser: null,
      availabilities: [],
      bottom: false,
      location: null,
      errors: {},
      albums: [],
      pending: false,
      avocotesBooking: null,
    }
  }

  componentDidMount() {

    const id = this.props.params.id

    if (!id) {
      return
    }

    setAxiosAuthentication()

    let bookingObj = JSON.parse(localStorage.getItem('bookingObj'))
    if (bookingObj && bookingObj.serviceUserId.toString() !== id) {
      console.warn('Incorrect bookingObj.serviceUserId')
      bookingObj = null
      localStorage.removeItem('bookingObj')
    }

    axios.get(`/myAlfred/api/serviceUser/${id}`)
      .then(res => {
        let serviceUser = res.data
        this.setState({serviceUser: serviceUser})

        axios.get(`/myAlfred/api/shop/alfred/${ serviceUser.user._id}`)
          .then(res => {
            let shop = res.data
            this.setState({shop: shop})
          })
        axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${serviceUser.user._id}`)
          .then(res => {
            let reviews = res.data
            if (id) {
              reviews = reviews.filter(r => r.serviceUser._id === id)
            }
            this.setState({reviews: reviews})
            this.setState({
              date: bookingObj && bookingObj.prestation_date ? moment(bookingObj.prestation_date, 'DD/MM/YYYY').toDate() : null,
              time: bookingObj && bookingObj.prestation_date ? moment(bookingObj.prestation_date).toDate() : null,
            })
          })

        axios.get(`/myAlfred/api/availability/userAvailabilities/${serviceUser.user._id}`)
          .then(res => {
            let availabilities = res.data
            this.setState({availabilities: availabilities})
          })

      })
      .catch(err => console.error(err))


    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({user: user})
      })
      .catch(err => console.error(err))

    localStorage.removeItem('bookingObj')
  }

  onAvocotesBookingChange = booking => {
    // Test to avoid recusivity vs DrawerBooking
    if (this.state.avocotesBooking?._id!=booking?._id) {
      this.setState({avocotesBooking: booking})
    }
  }

  /**
  checkBook = () => {
    let errors = {}
    if (Object.values(this.state.count).every(v => !v)) {
      errors.prestations = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_presta'))
    }
    else if (this.state.totalPrestations < this.state.serviceUser.minimum_basket) {
      errors.prestations = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_minimum_basket', {minimum_basket: this.state.serviceUser.minimum_basket}))
    }

    if (!errors.datetime && this.state.date == null) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_select_date'))
    }

    if (!errors.datetime && this.state.time == null) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_select_hour'))
    }

    const reservationDate = this.computeReservationDate()
    if (!errors.datetime && reservationDate.isValid() && !isMomentAvailable(reservationDate, this.state.availabilities)) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_not_available', {firstname: this.state.serviceUser.user.firstname}))
    }

    const minBookingDate = getDeadLine(this.state.serviceUser.deadline_before_booking)
    if (!errors.datetime && reservationDate.isBefore(minBookingDate)) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_delay_prevenance'))
    }

    if (reservationDate && reservationDate.isBefore(moment())) {
      errors.datetime = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_resa_now'))
    }

    if (!this.state.location) {
      errors.location = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_place'))
    }

    if (this.hasWarningSelf()) {
      errors.user = ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.error_resa_myself'))
    }
    this.setState({errors: errors})
  }
  */

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    this.setState({...this.state, [side]: open})
  }

  // TODO : force computing disponibility
  scheduleDateChanged = (dates, mmt, mode) => {
    const dt = moment(mmt)
    if (dt.isValid() && isMomentAvailable(dt, this.state.availabilities)) {
      this.setState({booking_date: dt.toDate()})
    }
  }

  content = classes => {
    const {shop, serviceUser, availabilities, avocotesBooking}=this.state

    const showProfileEnabled = !!serviceUser?.user?._id

    return(
      <Grid style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Grid>
          <Grid className={`custompreviewmain ${classes.mainContainer}`}>
            <Grid container className={classes.widthContainer}>
              <Grid item lg={6} xs={12} className={classes.leftContainer}>
                <Grid container className={classes.avatarAnDescription}>
                  <Grid item sm={3} className={classes.avatarContainer}>
                    <Grid item className={classes.itemAvatar}>
                      <UserAvatar user={serviceUser.user} animateStartup={true}/>
                    </Grid>
                  </Grid>
                  <Grid item sm={9} className={classes.flexContentAvatarAndDescription}>
                    <Grid className={classes.marginAvatarAndDescriptionContent}>
                      <Grid container spacing={1} style={{margin: 0, width: '100%'}}>
                        <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                          <Typography variant="h6">{serviceUser.user.firstname} - {serviceUser.service.label}</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={12} sm={12} xs={12} className={classes.containerListSkills}>
                          <ListIconsSkills data={{insurance_text: shop.insurance_text, grade_text: serviceUser.grade_text}}/>
                        </Grid>
                      </Grid>
                      {
                        serviceUser.service_address &&
                          <Grid>
                            <Typography style={{color: 'rgba(39,37,37,35%)'}} className={'custompreviewplace'}>
                              {serviceUser.service_address.city}, {serviceUser.service_address.country} - {serviceUser.perimeter}km autour de {serviceUser.service_address.city}
                            </Typography>
                          </Grid>
                      }
                      {
                        avocotesBooking &&
                          <Grid>
                            <Typography style={{color: 'rgba(39,37,37,35%)'}}>{`Réservation Avocotés pour ${avocotesBooking.user.full_name}`}</Typography>
                          </Grid>
                      }
                    </Grid>
                    <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
                      <Grid item sm={6} xs={12}>
                        <CustomButton variant={'outlined'} classes={{root: 'custompreviewshowprofil'}} className={classes.userServicePreviewButtonProfil}
                          disabled={!showProfileEnabled} onClick={() => Router.push(`/profile/about?user=${serviceUser.user._id}`)}>
                          {ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.button_show_profil'))}
                        </CustomButton>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Link href="#availabilities">
                          <CustomButton variant={'outlined'} classes={{root: 'custompreviewshowprofil'}} className={classes.userServicePreviewButtonProfil}>
                            {ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.button_show_availabilities'))}
                          </CustomButton>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={'custompreviewboxdescription'} style={{marginTop: '10%'}}>
                  <ServiceUserDescription classes={classes} serviceUser={serviceUser} alfred={serviceUser.user}
                    flexible={shop.flexible_cancel} moderate={shop.moderate_cancel} strict={shop.strict_cancel}/>
                </Grid>
                <Grid className={`custompreviewschedulecont ${classes.scheduleContainer}`}>
                  <Planning availabilities={availabilities} scheduleDateChanged={this.scheduleDateChanged}
                    alfred={serviceUser.user} classes={classes}/>
                </Grid>
                {this.state.serviceUser.service &&
                  <Grid className={classes.equipmentsContainer}>
                    <Equipments classes={classes}
                      allEquipments={serviceUser.service.equipments}
                      selectedEquipments={serviceUser.equipments}
                      alfred={serviceUser.user}/>
                  </Grid>
                }
                <Grid className={`custompreviewbookingmap ${classes.perimeterContent}`}>
                  {
                    serviceUser &&
                      <Place title={ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_place'))}
                        subTitle={serviceUser.user.firstname ? ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_zone_intervention')) + serviceUser.user.firstname + ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_zone_intervention_end')) : ''}
                        location={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]}
                        perimeter={serviceUser.perimeter * 1000}/>
                  }
                </Grid>
                <Grid style={{height: '300px'}}>
                  <Album user={serviceUser.user._id} key={serviceUser} underline={true} readOnly={true}/>
                </Grid>
                <Hidden only={['xl', 'lg']} implementation={'css'} className={classes.hidden}>
                  <Grid className={classes.showReservation}>
                    <CustomButton
                      variant="contained"
                      color="primary"
                      aria-label="add"
                      classes={{root: classes.buttonReservation}}
                      onClick={this.toggleDrawer('bottom', true)}
                    >
                      {ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.button_show_services'))}
                    </CustomButton>
                  </Grid>
                  <Hidden only={['xl', 'lg']} implementation={'css'} className={classes.hidden}>
                    <Drawer anchor="bottom" open={this.state.bottom} onClose={this.toggleDrawer('bottom', false)} classes={{root: 'custompreviewdrawer'}}>
                      <Grid className={classes.drawerContent}>
                        <DrawerBooking
                          serviceUserId={serviceUser._id}
                          date={this.state.booking_date}
                          side={'bottom'}
                          toggleDrawer={this.toggleDrawer}
                          onAvocotesBookingChange={this.onAvocotesBookingChange}
                        />
                      </Grid>
                    </Drawer>
                  </Hidden>
                </Hidden>
              </Grid>
              {/* ------------------------------------------------------- ici content right ---------------------------------------------------*/}
              <Grid className={classes.contentRightContainer} item xl={6} lg={6} md={12} sm={12} xs={12}>
                <Grid className={classes.contentRight}>
                  <DrawerBooking
                    serviceUserId={serviceUser._id}
                    date={this.state.booking_date}
                    all_avocotes={this.state.all_avocotes}
                    onAvocotesBookingChange={this.onAvocotesBookingChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'center'}}>
            <Grid style={{width: '80%', paddingLeft: '5%', paddingRight: '5%'}}>
              {
                this.state.reviews.length === 0 ? null :
                  <Grid style={{marginTop: '5%'}}>
                    <Topic
                      underline={true}
                      titleTopic={ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_commentary'))}
                      titleSummary={serviceUser.user.firstname ?
                        ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_commentary_summary', {firstname: serviceUser.user.firstname}))
                        :
                        ''}
                    >
                      <SummaryCommentary user={serviceUser.user._id} serviceUser={this.props.params.id}/>
                    </Topic>
                  </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  render() {
    const {classes} = this.props
    const {address} = this.props.params
    const {serviceUser, user, shop} = this.state

    if (!serviceUser || !shop) {
      return null
    }
    const description=`${serviceUser.service.label} par ${serviceUser.user.firstname}`
    let picture=serviceUser.service.picture
    if (!picture.startsWith('http') && !picture.startsWith('/')) {
      picture = `/${picture}`
    }

    const SULayout = ({children}) => {
      return (
        <>
          <Hidden only={['xs']} implementation={'css'} className={classes.hidden}>
            <Layout user={user} selectedAddress={address}>
              {children}
            </Layout>
          </Hidden>
          <Hidden only={['lg', 'xl', 'sm', 'md']} implementation={'css'} className={classes.hidden}>
            <LayoutMobile>
              {children}
            </LayoutMobile>
          </Hidden>
        </>
      )
    }
    return (
      <React.Fragment>
        <Head>
          <title>{serviceUser.service.label} par {serviceUser.user.full_name}</title>
          <meta property="og:image" content={picture}/>
          <meta property="og:image:secure_url" content={picture}/>
          <meta property="og:description" content={description}/>
          <meta property="description" content={description}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://my-alfred.io"/>
        </Head>
        <SULayout>
          {this.content(classes)}
        </SULayout>
      </React.Fragment>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(UserServicesPreview)))
