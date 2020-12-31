import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);
import Button from '@material-ui/core/Button';
import styles from '../myShop/myAvailabilities/myAvailabilitiesStyle';
import Schedule from '../../components/Schedule/Schedule';

class calendarTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props

    return (
      <Grid>
        <Grid><h1>Calendrier semaine</h1>
        <Schedule style={classes} nbSchedule={1} mode={'week'}/>
        </Grid>
        <Grid><h1>Calendrier mois</h1>
        <Schedule style={classes} nbSchedule={3}/>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(calendarTest);
