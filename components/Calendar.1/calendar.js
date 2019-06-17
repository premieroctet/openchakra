import moment from 'moment'
import React, { Component } from 'react'
import events from './events'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles'
import 'react-big-calendar/lib/css/react-big-calendar.css'
moment.locale('fr');
const styles = theme => ({  
  calendar: {
    minHeight: '400px',
  }
})


const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
class MyCalendar extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = { events }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }


  render() {
    const { classes } = this.props;
    return (
          <BigCalendar
            selectable
            events={this.state.events}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultView={'week'}
            views={['month','week','day']}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.handleSelect} 
            defaultDate={new Date()}
            localizer={localizer}
            className={classes.calendar}
          />
    )
  }
}

export default withStyles(styles)(MyCalendar);
