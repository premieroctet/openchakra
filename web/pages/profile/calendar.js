const withParams = require('../../components/withParams')
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import axios from 'axios'
import {CALENDAR} from '../../utils/i18n'
import {getLoggedUserId} from '../../utils/context'

import Box from '../../components/Box/Box'
import DrawerAndSchedule from '../../components/Drawer/DrawerAndSchedule/DrawerAndSchedule'
import LayoutMobileProfile from '../../hoc/Layout/LayoutMobileProfile'
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import Topic from '../../hoc/Topic/Topic'
import styles from '../../static/css/pages/profile/calendar/calendar'
import Head from 'next/head'

const {setAxiosAuthentication} = require('../../utils/authentication')

class ProfileCalendar extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      availabilities: [],
      bookings: [],
    }
  }

  loadAvailabilities = () => {
    axios.get(`/myAlfred/api/availability/userAvailabilities/${this.props.user}`)
      .then(res => {
        this.setState({availabilities: res.data})
      })
      .catch(err => console.error(err))
    setAxiosAuthentication()
    Promise.all(['alfredBooking', 'userBooking'].map(u => axios.get(`/myAlfred/api/booking/${u}`)))
      .then(res => {
        const bookings = res[0].data.concat(res[1].data)
        this.setState({bookings: bookings})
      })
      .catch(err => console.error(err))
  };

  componentDidMount() {
    alert('ça ne charge pas !!)')
    if (this.props.user) {
      this.loadAvailabilities()
    }
  }

  content = (classes, bookings, user, readOnly) => {
    return(
      <Grid container className={classes.mainContainerSchedule}>
        <Grid item xs={12} xl={12}>
          <Box>
            <Topic
              titleTopic={CALENDAR.title}
              titleSummary={CALENDAR.subtitle}
              needBackground={false}
              underline={true}
            >
              <DrawerAndSchedule
                availabilities={this.state.availabilities}
                nbSchedule={3}
                availabilityUpdate={this.loadAvailabilities}
                availabilityCreated={this.loadAvailabilities}
                onAvailabilityChanged={this.loadAvailabilities}
                selectable={!readOnly}
                ref={this.scheduleDrawer}
                readOnly={readOnly}
                bookings={bookings}
              />
            </Topic>
          </Box>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {classes, index}=this.props
    const {user}=this.props
    const {bookings}=this.state
    const readOnly = user!==getLoggedUserId()

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Head>
          <title>{user ? user.full_name : 'Calendrier'}</title>
          <meta property="og:description" content={`${user.firstname}`}/>
          <meta property="description" content={`${user.firstname}`}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://my-alfred.io"/>
        </Head>
        <Grid className={classes.profileLayoutContainer}>
          <ProfileLayout user={user} index={index}>
            {this.content(classes, bookings, user, readOnly)}
          </ProfileLayout>
        </Grid>
        <Grid className={classes.layoutMobileProfileContainer}>
          <LayoutMobileProfile user={user} index={index} currentIndex={2}>
            {this.content(classes, bookings)}
          </LayoutMobileProfile>
        </Grid>
      </React.Fragment>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(ProfileCalendar)))
