import React from 'react'
import { Calendar, Views, momentLocalizer   } from 'react-big-calendar';
import _ from 'lodash'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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
import {events2availabilities} from '../../utils/converters';
import {ALL_SERVICES} from '../../utils/consts.js';



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

const styles = theme => ({
  modalContainer:{
    position: 'absolute',
    width: 700,
    backgroundColor: 'white',
    border: '2px solid #4fbdd7',
    padding: '2%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft:0,
      marginRight: 0,
      marginBottom: '5%',
      marginTop:'5%'
    },
  },
  contentTimeSlot:{
    justifyContent: 'space-around',
    alignItems: 'baseline',
    marginTop: 20,
    marginBottom: 20
  },
  textFieldButton: {
    color : 'white',
    margin: theme.spacing(1),
  },
  textFieldChips: {
    color: 'white'

  },
  textFieldDefaultChips: {
    color : 'black'
  },
  formSchedule:{
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '5%'
    },
  },
  panelForm:{
    alignItems: 'end',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    },
},
  panelFormDays:{
    width : '250px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  panelFormRecu:{
    width : '250px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '10%'

    },
  },
  containerRecurrence:{
    width:'100%',
    [theme.breakpoints.down('xs')]: {
      display:'inherit',
    },
  }
});

const DAYS='Lu Ma Me Je Ve Sa Di'.split(' ');

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: _.cloneDeep(this.props.events),
      title: '',
      sAddModalOpen: false,
      isEditModalOpen: false,
      servicesSelected:[],
      dayLayoutAlgorithm: 'no-overlap',
      selectedDateEndRecu: null,
      // Days (1=>7)
      recurrDays: new Set(),
      services: [ALL_SERVICES, ...this.props.services] || [ALL_SERVICES],
    };
    this.closeModal = this.closeModal.bind(this);
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
    let all_serv = e.target.value.filter(serv => serv[0]==ALL_SERVICES[0]);
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
          isExpanded: false,
          isAddModalOpen: !this.state.isAddModalOpen,
          recurrDays: new Set(),
      });
  };

  toggleEditModal = event => {
    if (!this.state.isAddModalOpen) {
      this.setState({
        currentEvent: event,
        isEditModalOpen: !this.state.isEditModalOpen,
      });
    }
  };

   handleChange = panel => (event, isExpanded) => {
     this.setState({isExpanded: isExpanded ? panel : false});
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
    if(this.state.isExpanded === "panel1" && this.state.selectedDateEndRecu !== null ) {
   }
  };

  onSubmit = e => {
    let avail=events2availabilities(this.state);
    let res = this.props.cbAvailCreation(avail);
    this.closeModal();
  };

  closeModal = () =>{
    this.setState({isAddModalOpen: false})
  };

  render() {
    const { classes } = this.props;

    console.log("Scheduler.events:"+JSON.stringify(this.props.events));
    return (
      <div style={{height:700}}>
        <Calendar
          selectable
          popup={false}
          culture='fr-FR'
          localizer={localizer}
          // FIX: use state instead of props
          events={this.props.events}
          defaultView={Views.WEEK}
          defaultDate={new Date()}
          onSelectSlot={this.toggleAddModal}
          onSelectEvent={this.toggleEditModal}
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
            "time" : "Horaires",
            'noEventsInRange': 'Aucun évènement dans cette période',
          }}
          formats={formats}
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
                    <h2>Nouvelle disponibilité</h2>
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
                    <ExpansionPanel expanded={this.state.isExpanded === 'panel1'} style={{width:'100%'}}>
                      <ExpansionPanelSummary>
                        <FormControlLabel
                          aria-label="Acknowledge"
                          onClick={event => event.stopPropagation()}
                          onFocus={event => event.stopPropagation()}
                          control={<Checkbox />}
                          label="Récurrence"
                          onChange={this.handleChange('panel1')}
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
                              />
                         </MuiPickersUtilsProvider>
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                  <Grid container justify="flex-end" style={{marginTop: 20}}>
                    <Button type="button" disabled={!this.isButtonSendEnabled()} variant="contained" className={classes.textFieldButton} color={'primary'}  onClick={() => this.onSubmit()}>Envoyer </Button>
                    <Button type="button" variant="contained" className={classes.textFieldButton} color={'secondary'} onClick={() => this.setState({isAddModalOpen: false})} >Annuler </Button>
                  </Grid>
                </form>
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
