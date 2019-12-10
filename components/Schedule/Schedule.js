import React from 'react'
import { Calendar, Views, momentLocalizer   } from 'react-big-calendar';
import events from '../events'
import _ from 'lodash'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

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

const styles = theme => ({
  modalContainer:{
    position: 'absolute',
    width: 600,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: '2%',
  }
});

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: _.cloneDeep(events),
      title: '',
      sAddModalOpen: false,
      isEditModalOpen: false,
      service:'',
      selectedDateStart: new Date(),
      timePickerStart: new Date(),
      selectedDateEnd: new Date(),
      timePickerEnd: new Date(),
      isCheckedRecurence: false,
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
  };

  toggleAddModal = ({start, end}) => {
    if (!this.state.isEditModalOpen) {
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
          },
        ],

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
    const { classes } = this.props;

    return (
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
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
            open={this.state.isAddModalOpen}
            onClose={this.toggleAddModal}
          >
            <Fade in={this.state.isAddModalOpen}>
              <Grid className={classes.modalContainer}>
                <Grid id={'title'}>
                    <Grid>
                      <h2>Nouvel Event</h2>
                    </Grid>
                </Grid>
                <Grid id={'content'}>
                  <FormControl style={{width:"100%"}}>
                    <InputLabel id="demo-simple-select-label">Service(s)</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.service}
                      onChange={this.onChange}
                    >
                      <MenuItem value={10}>Service A</MenuItem>
                      <MenuItem value={20}>Service B</MenuItem>
                      <MenuItem value={30}>Service C</MenuItem>
                    </Select>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date de début"
                          value={this.state.selectedDateStart}
                          onChange={() => {
                            this.setState({ selectedDateStart: this.state.selectedDateStart });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          label="Heures début"
                          ampm={false}
                          value={this.state.timePickerStart}
                          onChange={() => {
                            this.setState({ timePickerStart: this.state.timePickerStart });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date de fin"
                          value={this.state.selectedDateEnd}
                          onChange={() => {
                            this.setState({ selectedDateEnd: this.state.selectedDateEnd });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                        <KeyboardTimePicker
                          ampm={false}
                          margin="normal"
                          id="time-picker"
                          label="Heure fin"
                          value={this.state.timePickerEnd}
                          onChange={() => {
                            this.setState({ timePickerEnd: this.state.timePickerEnd });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid>
                      <ExpansionPanel>
                        <ExpansionPanelSummary>
                          <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                            control={<Checkbox />}
                            label="Récurence"
                          />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Typography color="textSecondary">
                            If you forget to put an aria-label on the nested action, the label of the action will
                            also be included in the label of the parent button that controls the panel expansion.
                          </Typography>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </Grid>
                    <Grid>
                    <TextField
                      style={{width:'100%'}}
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows="4"
                      defaultValue="Ajouter une description"
                      margin="normal"
                      variant="outlined"
                    />
                    </Grid>
                    <Grid>
                      <button type="button">Save
                      </button>
                      <button type="button">Cancel
                      </button>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
          </Fade>
        </Modal>
        </div>
    )
  }
}

Schedule.propTypes = propTypes;

export default withStyles(styles)(Schedule)
