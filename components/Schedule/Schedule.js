import React from 'react'
import { Calendar, Views } from 'react-big-calendar'
import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'
const propTypes = {};


class Schedule extends React.Component{
  constructor(props){
    super(props);

    this.state = { events }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
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
  };

  render() {
    const { localizer } = this.props;
    return(
      <>
        <ExampleControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
          </strong>
        </ExampleControlSlot.Entry>
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
      </>
    )
  }
}

Schedule.propTypes = propTypes;

export default Schedule;
