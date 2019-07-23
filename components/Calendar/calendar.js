import moment from 'moment'
import React, { Component } from 'react'
import events from './events'
import BigCalendar from 'react-big-calendar'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../static/stylecalendar.css'
const styles = theme => ({
  cardContainer: {
    height: '85vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll'
  },
  card: {
    padding: '1.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    width: '60%',
    boxShadow: 'none'
  },
  calendar: {
    minHeight: '400px',
  },
  checkboxesMonth: {
    marginTop: '20px',
  },
})

const axios = require('axios');


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);// or globalizeLocalizer

class MyCalendar extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { cal_events: [] };


  }


  componentDidMount() {
    let self = this;
    axios.get('http://localhost:5000/myAlfred/api/calendar/all')
      .then(function (response) {

        let events = response.data;

        for (let i = 0; i < events.length; i++) {

          for (let j = 0; j < events[i].events.length; j++) {

            events[i].events[j].start = moment.utc(events[i].events[j].start).toDate();
            events[i].events[j].end = moment.utc(events[i].events[j].end).toDate();


          }
          self.setState({
            cal_events: events[i].events
          })
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      this.setState({
        cal_events: [
          ...this.state.cal_events,
          {
            start,
            end,
            title,
          },
        ],
      });
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.post('http://localhost:5000/myAlfred/api/calendar/add', {
        title: title,
        start: start,
        end: end
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  onDeleteClick(id) {
    const r = window.confirm("Would you like to remove this event?");
    if (r) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios
        .delete(`http://localhost:5000/myAlfred/api/calendar/event/${id}`)
        .then(res =>
          console.log(res)
        )
        .catch(err =>
          console.log(err)
        );

      window.location.reload();
    }
  }

  render() {
    const { classes } = this.props;
    const { cal_events } = this.state;
    const events = cal_events.map(event => (

      <tr key={event._id}>
        <td>{event.title}</td>
        <td>{moment(event.start).format('l')}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, event._id)}
            className="btndanger"
          >
            Delete
                </button>
        </td>
      </tr>

    ));

    return (
      <Grid container className={classes.cardContainer}>
        <Card className={classes.card}>
          <Grid container>
            <Grid item xs={12}>
              <BigCalendar
                selectable
                events={cal_events}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultView={'week'}
                views={['month', 'week', 'day']}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={this.handleSelect}
                defaultDate={new Date()}
                localizer={localizer}
                className={classes.calendar}
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <tbody className="listdelete">
                <tbody>
                  {events}
                </tbody>
              </tbody>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid container className={classes.checkboxesMonth}>
              {/*Grandes checkboxes*/}
              <Grid item xs={6}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon bigcheck"></span>
                  <span className="contenulabel">je souhaite étendre ces disponibilités aux 12 prochains mois</span>
                </label>
              </Grid>
              <Grid item xs={6}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon bigcheck"></span>
                  <span className="contenulabel">Je souhaite étendre ces disponibilités aux jours fériés</span>
                </label>
              </Grid>

              {/*Petites checkboxes*/}
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Janvier</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Février</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Mars</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Avril</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Mai</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Juin</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Juillet</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Août</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Septembre</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Octobre</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Novembre</span>
                </label>
              </Grid>
              <Grid item xs={2}>
                <label className="checkbox">
                  <input
                    name="oui"
                    type="checkbox"
                  />
                  <span className="checkbox__icon littlecheck"></span>
                  <span className="contenulabel">Décembre</span>
                </label>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }
}

export default withStyles(styles)(MyCalendar);
