import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import DrawerAndSchedule from '../../components/Drawer/DrawerAndSchedule/DrawerAndSchedule'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';
const I18N=require('../../utils/i18n')
import {getLoggedUserId} from '../../utils/functions'

class ProfileCalendar extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      availabilities:[]
    }
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  loadAvailabilities = () => {
    axios.get(`/myAlfred/api/availability/userAvailabilities/${this.props.user}`)
      .then(res => {
        this.setState({availabilities: res.data});
      })
      .catch(err => console.error(err));
  };

  componentDidMount() {
    this.loadAvailabilities()
  }

  render() {
    const {user}=this.props
    const readOnly=this.props.user!=getLoggedUserId()
    if (!user) {
      return null
    }
    return (
      <ProfileLayout user={user}>
        <Grid container>
          <Grid item xs={12}>
            <DrawerAndSchedule
            availabilities={this.state.availabilities}
                                     title={I18N.SCHEDULE_TITLE}
                                     subtitle={I18N.SCHEDULE_SUBTITLE}
                                     nbSchedule={3}
                                     availabilityUpdate={this.loadAvailabilities}
                                     availabilityCreated={this.loadAvailabilities}
                                     onAvailabilityChanged={this.loadAvailabilities}
                                     style={this.props.classes}
                                     selectable={!readOnly}
                                     ref={this.scheduleDrawer}
                                     readOnly={readOnly}/>
          </Grid>
        </Grid>
      </ProfileLayout>
    )
  }

}

export default withStyles(styles)(ProfileCalendar)
