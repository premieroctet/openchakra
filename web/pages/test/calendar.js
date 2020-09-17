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
      current_date: new Date(),
    };
  }

  prevMonth= () => {
    var date = this.state.current_date
    date.setMonth(date.getMonth()-1)
    this.setState({ current_date: date})
  }

  nextMonth= () => {
    var date = this.state.current_date
    date.setMonth(date.getMonth()+1)
    this.setState({ current_date: date})
  }

  render() {
    const {classes} = this.props
    const {current_date} = this.state

    //const offsets=[-1,0,1]
    const offsets=[0,1]
    const dates= offsets.map( off => {
      var dt=new Date(current_date)
      dt.setMonth(current_date.getMonth()+off)
      console.log(`${current_date} => ${dt}`)
      return new Date(dt)
    })

    console.log(`Dates:${dates}`)
    return (

      <Grid>
      <Button onClick={this.prevMonth}>Prev</Button>
      <Button onClick={this.nextMonth}>Next</Button>
      <h1>Calendriers multiples</h1>
      <>
      {dates.map( dt => (
         <Calendar
          culture={'fr-FR'}
          events={[]}
          localizer={localizer}
          views={[Views.MONTH]}
          defaultView={Views.MONTH}
          defaultDate={dt}
          dayLayoutAlgorithm={'no-overlap'}
          />
        ))}
      </>
        <h1>Calendrier seul avec map()</h1>
        {[current_date].map( dt => {
          return <Calendar
            culture={'fr-FR'}
            events={[]}
            localizer={localizer}
            views={[Views.MONTH]}
            defaultView={Views.MONTH}
            defaultDate={dt}
            />
          })}
        <h1>Calendrier seul sans map()</h1>
        <Calendar
          culture={'fr-FR'}
          events={[]}
          localizer={localizer}
          views={[Views.MONTH]}
          defaultView={Views.MONTH}
          defaultDate={current_date}
        />
      </Grid>
    );
  }

}

export default withStyles(styles, {withTheme: true})(calendarTest);
