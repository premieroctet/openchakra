import React from 'react'
import { Calendar, Views, momentLocalizer   } from 'react-big-calendar';
import _ from 'lodash'
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import frLocale from "date-fns/locale/fr";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import {availabilities2events, eventUI2availability, availability2eventUI, DAYS} from '../../utils/converters';
import {ALL_SERVICES} from '../../utils/consts.js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Typography } from '@material-ui/core'; // Import css
import styles from './ScheduleStyle'
import PropTypes from 'prop-types';

const localizer = momentLocalizer(moment);

const formats = {
  timeGutterFormat : 'HH:mm', // Axe Y horaires week/day
  eventTimeRangeFormat: ({
    start,
    end
  }, culture, local) =>
    local.format(start, 'HH:mm', culture) + ' - ' + // Affichage de l'event dans le calendrier h début (week/day)
    local.format(end, 'HH:mm', culture), // Affichage de l'event dans le calendrier h fin (week/day)
  dayFormat: 'ddd' + ' ' + 'DD' , // header de weekly (lun. dd/mm) (week)
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
    local.format(start,  'MMM' + ' ' + 'YYYY', culture) + // Title de week - date début (week)
    local.format(end,  '' + ' ' + '', culture),// Title de week - date fin (week)
  dayHeaderFormat: 'dddd DD MMMM'
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: _.cloneDeep(this.props.events),
      title: '',
      isAddModalOpen: false,
      isEditModalOpen: false,
      servicesSelected:[ALL_SERVICES],
      dayLayoutAlgorithm: 'no-overlap',
      selectedDateEndRecu: null,
      isExpanded: true,
      // Days (1=>7)
      recurrDays: new Set(),
      services: [ALL_SERVICES, ...this.props.services] || [ALL_SERVICES],
    };
    this.closeModal = this.closeModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
    On peut envoyer si service(s) sélectionné(s), date/heure début et fin saisis
    et, si récurrence, au moins un jour sélectionné
  */
  isButtonSendEnabled() {
    let enabled=this.state.servicesSelected.length > 0;
    enabled = enabled && this.state.selectedDateStart && this.state.selectedTimeStart && this.state.selectedDateEnd && this.state.selectedTimeEnd;
    enabled = enabled && (!this.state.isExpanded || this.state.recurrDays.size>0);
    return enabled;
  }

  toggleRecurrDay(item) {
    this.state.recurrDays.has(item) ? this.removeRecurrDay(item) : this.addRecurrDay(item);
  }

  addRecurrDay(item) {
    this.setState(({ recurrDays }) => ({
      recurrDays: new Set(recurrDays).add(item)
    }));
  }

  removeRecurrDay(item) {
    this.setState(({ recurrDays }) => {
      const newChecked = new Set(recurrDays);
      newChecked.delete(item);

      return {
       recurrDays: newChecked
      };
    });
  }


  onChangeServices = e => {
    let all_serv = e.target.value.filter(serv => serv[0]===ALL_SERVICES[0]);
    let contains = all_serv.length>0;
    if (contains) {
      this.setState({servicesSelected: [ALL_SERVICES]});
    }
    else {
      this.setState({servicesSelected: e.target.value });
    }
  };

  toggleAddModal =  ({ start, end })  => {
      this.setState({
          selectedDateStart: start,
          selectedDateEnd: end,
          selectedTimeStart: start.toLocaleTimeString("fr-FR", {hour12: false}).slice(0, 5),
          selectedTimeEnd: end.toLocaleTimeString("fr-FR", {hour12: false}).slice(0, 5),
          servicesSelected: [ALL_SERVICES],
          isAddModalOpen: !this.state.isAddModalOpen,
          isExpanded: 'panel1',
          recurrDays: new Set(),
      }, () => this.addDefaultValue());

  };

  addDefaultValue(){
    var dt = new Date(this.state.selectedDateEnd);
    dt.setMonth( dt.getMonth() + 6 );
    if (this.state.isExpanded && this.state.recurrDays.size===0 && this.state.selectedDateStart ) {
      this.setState({
        selectedDateEndRecu: dt,
        recurrDays: new Set([0, 1, 2, 3, 4 , 5])
      });
    }
  }

  toggleEditModal = event => {

    var avail=this.props.availabilities.filter( a => a.ui_id==event.ui_id || a._id==event._id);
    if (avail.length==0) {
      console.error(`No avail found for ${event.ui_id}`)
      return
    }
    avail = avail[0]

    const eventUI = availability2eventUI(avail);

    this.setState({...eventUI, isAddModalOpen: true});

    if (!this.state.isAddModalOpen) {
      this.setState({
        currentEvent: event,
        isEditModalOpen: !this.state.isEditModalOpen,
      });
    }
  };

   handleChange(){
     this.setState({isExpanded: !this.state.isExpanded});
     if (this.state.isExpanded && this.state.recurrDays.size===0 && this.state.selectedDateStart ) {
       let dayOfWeek = new Date(this.state.selectedDateStart).getDay();
       dayOfWeek = (dayOfWeek+6)%7
       this.setState({recurrDays: new Set([dayOfWeek])});
     }
   };

   handleDateStartChange = date => {
     this.setState({selectedDateStart: date});

   };

  handleDateEndChange = date => {
    this.setState({selectedDateEnd: date});
  };

  handleTimeStartChange = time =>{
    let hours = time.target.value.substring(0,2);
    let minutes = time.target.value.substring(3,5);
    this.setState({selectedTimeStart: time.target.value});
    this.state.selectedDateStart.setHours(hours);
    this.state.selectedDateStart.setMinutes(minutes);
  };

  handleTimeEndChange = time =>{
    let hours = time.target.value.substring(0,2);
    let minutes = time.target.value.substring(3,5);
    this.setState({selectedTimeEnd: time.target.value});
    this.state.selectedDateEnd.setHours(hours);
    this.state.selectedDateEnd.setMinutes(minutes);
  };

  handleDateEndChangeRecu = date => {
    this.setState({ selectedDateEndRecu: date });
  };

  onSubmit = e => {
    let avail=eventUI2availability(this.state);
    if (this.state.ui_id|| this.state._id) { // Modif
      this.props.onUpdateAvailability(avail);
    }
    else {
      this.props.onCreateAvailability(avail);
    }
    this.setState({ui_id: null})
    this.closeModal();
  };

  onDelete = e => {
    let avail=eventUI2availability(this.state);
    let res = this.props.onDeleteAvailability(avail);
    this.setState({ui_id: null})
    this.closeModal();
  };

  closeModal = () =>{
    this.setState({isAddModalOpen: false})
  };

  render() {
    const { classes, title, subtitle, selectable, height } = this.props;

    let events = availabilities2events(this.props.availabilities);

    return (
      <Grid className={classes.heightContainer} style={{height: height}}>
        { title || subtitle  ?
          <Grid style={{ marginBottom: 50 }}>
            { title ?
              <Grid>
                <Typography className={classes.policySizeTitle}>{title}</Typography>
              </Grid> : null
            }
            { subtitle ?
              <Grid>
                <p className={classes.policySizeContent}>{subtitle}</p>
              </Grid> : null
            }
          </Grid>
          : null
        }
        <Calendar
          scrollToTime={new Date(1970, 1, 1, 7)}
          selectable={selectable}
          popup={false}
          culture='fr-FR'
          localizer={localizer}
          // FIX: use state instead of props
          events={events}
          defaultView={Views.WEEK}
          views={['week', 'day', 'month']}
          defaultDate={new Date()}
          onSelectSlot={this.toggleAddModal}
          onSelectEvent={this.toggleEditModal}
          dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
          messages={{
            'today': "Aujourd'hui",
            "previous":'<',
            "next":">",
            "month": "Mois",
            "week": "Semaine",
            "day": "Aujourd'hui",
            "agenda": "Agenda",
            "event" :"Evénement",
            "date" : "Date",
            "time" : "Horaires",
            'noEventsInRange': 'Aucun évènement dans cette période',
          }}
          formats={formats}
          className={classes.sizeSchedulle}
          step={60}
          timeslots={1}
        />
        <Modal
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
          open={this.state.isAddModalOpen}
          onClose={this.closeModal}
        >
          <Fade in={this.state.isAddModalOpen}>
            <Grid container className={classes.modalContainer}>
              <Grid container>
                  <Grid>
                    <h2>{ this.state.ui_id||this.state._id ? `Modifier disponibilité` : `Nouvelle disponibilité`}</h2>
                  </Grid>
              </Grid>
              <Grid container>
                <form >
                  <FormControl style={{width:"100%"}}>
                    <InputLabel id="demo-simple-select-label">Sélectionnez au moins un service</InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      input={<Input />}
                      renderValue={selected => selected.map(s=>s[0]).join(',')}
                      value={this.state.servicesSelected}
                      onChange={this.onChangeServices}
                      MenuProps={MenuProps}
                    >
                      {[ALL_SERVICES, ...this.props.services].map(name => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={this.state.servicesSelected.indexOf(name) > -1} />
                          <ListItemText primary={name[0]} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                    <Grid container className={classes.contentTimeSlot}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date de début"
                          className={classes.formSchedule}
                          value={this.state.selectedDateStart}
                          onChange={this.handleDateStartChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          autoOk={true}
                        />
                        <TextField
                          id="time"
                          label="Heure de début"
                          type="time"
                          defaultValue={this.state.selectedTimeStart}
                          onChange={this.handleTimeStartChange}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                        />
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date de fin"
                          className={classes.formSchedule}
                          value={this.state.selectedDateEnd}
                          onChange={this.handleDateEndChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          autoOk={true}
                          minDate={this.state.selectedDateStart}
                          minDateMessage={`Date de fin incorrecte`}
                        />
                        <TextField
                          id="time"
                          label="Heure de fin"
                          type="time"
                          className={classes.textField}
                          defaultValue={this.state.selectedTimeEnd}
                          onChange={this.handleTimeEndChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  <Grid container className={classes.containerRecurrence}>
                    <ExpansionPanel expanded={this.state.isExpanded} style={{width:'100%'}}>
                      <ExpansionPanelSummary>
                        <FormControlLabel
                          aria-label="Acknowledge"
                          checked={this.state.isExpanded === 'panel1'}
                          onClick={event => event.stopPropagation()}
                          onFocus={event => event.stopPropagation()}
                          control={<Checkbox />}
                          label="Récurrence"
                          onChange={this.handleChange}
                          checked={this.state.isExpanded}
                        />
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.panelForm}>
                        <Grid container className={classes.panelFormDays}>
                          {[0,1,2,3,4,5,6].map( d => {
                            return (<Chip
                              clickable
                              label={DAYS[d]}
                              color={this.state.recurrDays.has(d) ? 'secondary' :  ''}
                              className={this.state.recurrDays.has(d) ? classes.textFieldChips : classes.test}
                              onClick={() => {
                                  this.toggleRecurrDay(d);
                              }
                            } />)
                          })}
                        </Grid>
                        <Grid container className={classes.panelFormRecu}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date de fin"
                                className={classes.textField}
                                value={this.state.selectedDateEndRecu}
                                onChange={this.handleDateEndChangeRecu}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                autoOk={true}
                              />
                         </MuiPickersUtilsProvider>
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                  <Grid container justify="flex-end" style={{marginTop: 20}}>
                    <Button type="button" variant="contained" className={classes.textFieldButton} color={'secondary'} onClick={() => this.setState({isAddModalOpen: false})} >Annuler </Button>
                    <Button type="button" disabled={!this.isButtonSendEnabled()} variant="contained" className={classes.textFieldButton} color={'primary'}  onClick={() => this.onSubmit()}>
                      { this.state.ui_id||this.state._id  ? `Modifier` : `Ajouter` }
                    </Button>
                    { this.props.onDeleteAvailability && (this.state.ui_id||this.state._id) ?
                        <Button type="button" variant="contained" className={classes.textFieldButton} color={'primary'}  onClick={() => this.onDelete()}>Supprimer </Button>
                        :
                        null
                    }
                  </Grid>
                </form>
              </Grid>
            </Grid>
        </Fade>
      </Modal>
      </Grid>
    )
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (Schedule);
