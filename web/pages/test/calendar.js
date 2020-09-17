import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './style';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);
import Button from '@material-ui/core/Button';

class calendarTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  prevMonth= () => {
    var date = this.state.date
    date.setMonth(date.getMonth()-1)
    this.setState({ date: date})
  }

  nextMonth= () => {
    var date = this.state.date
    date.setMonth(date.getMonth()+1)
    this.setState({ date: date})
  }

  render() {
    const {classes} = this.props
    const {date} = this.state

    //const offsets=[-1, 0, 1]
    const offsets=[-1,0,1]
    const dates= offsets.map( off => {
      var dt=new Date(date)
      dt.setMonth(date.getMonth()+off)
      return dt
    })

    console.log(`Dates:${dates}`)
    return (

      <Grid>
      <Button onClick={this.prevMonth}>Prev</Button>
      <Button onClick={this.nextMonth}>Next</Button>
      {dates.map( dt => {
        return <Calendar
          events={[]}
          localizer={localizer}
          views={[Views.MONTH]}
          defaultView={Views.MONTH}
          defaultDate={new Date(dt)}
          />
        })}
      </Grid>
    );
  }

}

export default withStyles(styles, {withTheme: true})(calendarTest);
