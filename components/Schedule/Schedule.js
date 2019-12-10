import React from 'react'
import { Calendar, Views, momentLocalizer   } from 'react-big-calendar';
import events from '../events'
import _ from 'lodash'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const propTypes = {};
const localizer = momentLocalizer(moment);

const formats = {
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
  constructor(props) {
    super(props);

    this.state = {
      events: _.cloneDeep(events),
      title: '',
      sAddModalOpen: false,
      isEditModalOpen: false,
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const event = {
      title: this.state.title,
    };
    console.log(event,'ici')
  };

  toggleAddModal = event => {
    if (!this.state.isEditModalOpen) {
      this.setState({
        currentEvent: event,
        isAddModalOpen: !this.state.isAddModalOpen,
      });
    }
  };
  toggleEditModal = event => {
    if (!this.state.isAddModalOpen) {
      this.setState({
        currentEvent: event,
        isEditModalOpen: !this.state.isEditModalOpen,
      });
    }
  };

  render() {
    return (
      <>
        <div style={{height:700}}>
          <Calendar
            selectable
            popup={false}
            culture='fr-FR'
            localizer={localizer}
            events={this.state.events}
            defaultView={Views.WEEK}
            defaultDate={new Date()}
            onSelectSlot={this.toggleAddModal}
            onSelectEvent={this.toggleEditModal}
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
              "time" : "Horaires",

            }}
            formats={formats}
            startAccessor="start"
            endAccessor="end"
          />
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.isAddModalOpen}
            onClose={this.toggleAddModal}
          >
            <div  style={{
              position: 'absolute',
              top: 500,
              left: 500,
              width: 400,
              backgroundColor: 'white',
              border: '2px solid #000',
              padding: '2%',}}>
              <h2 id="simple-modal-title">Ajouter un Evenement</h2>
              <p id="simple-modal-description">
                Titre de l'événement
              </p>
              <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <TextField
                  id="standard-basic"
                  label="Titre"
                  placeholder="Titre"
                  margin="normal"
                  style={{ width: '100%' }}
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                  Envoyer
                </Button>
              </form>
            </div>
          </Modal>
        </div>
      </>
    )
  }
}

Schedule.propTypes = propTypes;

export default Schedule
