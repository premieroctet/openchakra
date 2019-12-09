import React from 'react'
import { Calendar, Views, momentLocalizer   } from 'react-big-calendar';
import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'
import _ from 'lodash'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const propTypes = {};
const localizer = momentLocalizer(moment);

let formats = {
  timeGutterFormat : 'HH:mm', // Axe Y horaires week/day
  eventTimeRangeFormat: ({
    start,
    end
  }, culture, local) =>
    local.format(start, 'HH:mm', culture) + ' - ' + // Affichage de l'event dans le calendrier h début (week/day)
    local.format(end, 'HH:mm', culture), // Affichage de l'event dans le calendrier h fin (week/day)
  dayFormat: 'dddd' + ' ' + 'DD/MM', // header de weekly (lun. dd/mm) (week)
  agendaTimeRangeFormat: ({
    start,
    end
  }, culture, local) =>
    local.format(start, 'HH:mm', culture) + ' - ' + // Affichage de l'event dans Agenda - Horaires h début (agenda)
    local.format(end, 'HH:mm', culture), // Affichage de l'event dans Agenda - Horaires h fin (agenda)
  agendaDateFormat: 'ddd' + ' ' + 'DD/MM', // Affichage de l'event dans agenda - Date format (ddd. DD/MM) (agenda)
  dayRangeHeaderFormat: ({
    start,
    end
  }, culture, local) =>
    local.format(start,  'dddd' + ' ' + 'DD/MM/YYYY', culture) + ' au ' + // Title de week - date début (week)
    local.format(end,  'dddd' + ' ' + 'DD/MM/YYYY', culture),// Title de week - date fin (week)
  dayHeaderFormat: 'dddd DD MMMM'
};

class Schedule extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      events: _.cloneDeep(events),
      dayLayoutAlgorithm: 'no-overlap',
    }
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
    return (
      <>
        <ExampleControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
            <br />
            The events are being arranged by `no-overlap` algorithm.
          </strong>
        </ExampleControlSlot.Entry>
        <div style={{height:700}}>
          <Calendar
            selectable
            culture='fr-FR'
            localizer={localizer}
            events={this.state.events}
            defaultView={Views.WEEK}
            defaultDate={new Date()}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.handleSelect}
            dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
            messages={{
              'today': "Aujourd'hui",
              "previous":'précédente',
              "next":"suivante",
              "month": "Mois",
              "week": "Semaine",
              "day": "Aujourd'hui",
              "agenda": "Agenda",
              "event" :"Evénement",
              "date" : "Date",
              "time" : "Horaires"
            }}
            formats={formats}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
      </>
    )
  }
}

Schedule.propTypes = propTypes;

export default Schedule
