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
    width: 600,
    backgroundColor: 'white',
    border: '2px solid #4fbdd7',
    padding: '2%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
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
  }
});

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: _.cloneDeep(this.props.events),
      title: '',
      sAddModalOpen: false,
      isEditModalOpen: false,
      servicesSelected:[],
      isCheckedRecurence: false,
      dayLayoutAlgorithm: 'no-overlap',
      selectedDateEndRecu: null,
      isDateActiveLu:'default',
      isDateActiveMa:'default',
      isDateActiveMe:'default',
      isDateActiveJe:'default',
      isDateActiveVe:'default',
      isDateActiveSa:'default',
      isDateActiveDi:'default',
      buttonSendState: true,
      services: [
        'Service A',
        'Service B',
        'Service C',
      ]
    };
  }

  onChange = e => {
    this.setState({servicesSelected: e.target.value });
    if(e.target.value.length === 0){
      this.setState({buttonSendState: true});
    }else{
      this.setState({buttonSendState: false});
    }
  };

  toggleAddModal =  ({ start, end })  => {
      this.setState({
          selectedDateStart: start,
          selectedDateEnd: end,
          selectedTimeStart: start.toLocaleTimeString("fr-FR", {hour12: false}).slice(0, 5),
          selectedTimeEnd: end.toLocaleTimeString("fr-FR", {hour12: false}).slice(0, 5),
        isAddModalOpen: !this.state.isAddModalOpen,
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
     if(isExpanded && this.state.selectedDateEndRecu === null){
       this.setState({buttonSendState: true})
     }else if (!isExpanded  && this.state.selectedDateEndRecu !== null){
       this.setState({selectedDateEndRecu: null})
     }else if (!isExpanded  && this.state.selectedDateEndRecu === null){
       this.setState({buttonSendState: false})
     }
   };

   handleDateStartChange = date => {
    this.setState({selectedDateStart: date});
  };

  handleDateEndChange = date => {
    this.setState({selectedDateEnd: date});
  };

  handleDateEndChangeRecu = date => {
    this.setState({ selectedDateEndRecu: date });
    if(this.state.isExpanded === "panel1" && this.state.selectedDateEndRecu !== null ) {
    this.setState({ buttonSendState: false })
   }
  };

  onSubmit = e => {
    e.preventDefault();
  };

  closeModal = () =>{
    this.setState({isAddModalOpen: false})
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
                    <h2>Nouvel Event</h2>
                  </Grid>
              </Grid>
              <Grid container>
                <form onSubmit={this.onSubmit}>
                  <FormControl style={{width:"100%"}}>
                    <InputLabel id="demo-simple-select-label">Sélectionnez au moins un service</InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      input={<Input />}
                      renderValue={selected => selected.join(', ')}
                      value={this.state.servicesSelected}
                      onChange={this.onChange}
                      MenuProps={MenuProps}
                    >
                      {this.state.services.map(name => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={this.state.servicesSelected.indexOf(name) > -1} />
                          <ListItemText primary={name} />
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
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  <Grid container>
                    <ExpansionPanel expanded={this.state.isExpanded === 'panel1'}>
                      <ExpansionPanelSummary>
                        <FormControlLabel
                          aria-label="Acknowledge"
                          onClick={event => event.stopPropagation()}
                          onFocus={event => event.stopPropagation()}
                          control={<Checkbox />}
                          label="Récurence"
                          onChange={this.handleChange('panel1')}
                        />
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{alignItems: 'end'}}>
                        <Grid container style={{width : '50%'}}>
                          <Chip
                            clickable
                            label="Lu"
                            color={this.state.isDateActiveLu}
                            className={this.state.isDateActiveLu === "secondary" ? classes.textFieldChips : classes.test}
                            onClick={() => {
                              if(this.state.isDateActiveLu === "secondary"){
                                this.setState({isDateActiveLu: ""});
                              }else{
                                this.setState({isDateActiveLu: "secondary"});
                              }
                            }
                          } />
                          <Chip
                            clickable
                            label="Ma"
                            className={this.state.isDateActiveMa === "secondary" ? classes.textFieldChips : classes.test}
                            color={this.state.isDateActiveMa}
                            onClick={() => {
                            if(this.state.isDateActiveMa === "secondary"){
                              this.setState({isDateActiveMa: ""});
                            }else{
                              this.setState({isDateActiveMa: "secondary"});
                            }
                          }
                          } />
                          <Chip
                            clickable
                            label="Me"
                            className={this.state.isDateActiveMe === "secondary" ? classes.textFieldChips : classes.test}
                            color={this.state.isDateActiveMe}
                            onClick={() => {
                            if(this.state.isDateActiveMe === "secondary"){
                              this.setState({isDateActiveMe: ""});
                            }else{
                              this.setState({isDateActiveMe: "secondary"});
                            }
                          }
                          } />
                          <Chip
                            clickable
                            label="Je"
                            className={this.state.isDateActiveJe === "secondary" ? classes.textFieldChips : classes.test}
                            color={this.state.isDateActiveJe}
                            onClick={() => {
                            if(this.state.isDateActiveJe === "secondary"){
                              this.setState({isDateActiveJe: ""});
                            }else{
                              this.setState({isDateActiveJe: "secondary"});
                            }
                          }
                          } />
                          <Chip
                            clickable
                            label="Ve"
                            className={this.state.isDateActiveVe === "secondary" ? classes.textFieldChips : classes.test}
                            color={this.state.isDateActiveVe}
                            onClick={() => {
                            if(this.state.isDateActiveVe === "secondary"){
                              this.setState({isDateActiveVe: ""});
                            }else{
                              this.setState({isDateActiveVe: "secondary"});
                            }
                          }
                          } />
                          <Chip
                            clickable
                            label="Sa"
                            className={this.state.isDateActiveSa === "secondary" ? classes.textFieldChips : classes.test}
                            color={this.state.isDateActiveSa}
                            onClick={() => {
                            if(this.state.isDateActiveSa === "secondary"){
                              this.setState({isDateActiveSa: ""});
                            }else{
                              this.setState({isDateActiveSa: "secondary"});
                            }
                          }
                          } />
                          <Chip
                            clickable
                            label="Di"
                            color={this.state.isDateActiveDi}
                            className={this.state.isDateActiveDi === "secondary" ? classes.textFieldChips : classes.test}
                            onClick={() => {
                            if(this.state.isDateActiveDi === "secondary"){
                              this.setState({isDateActiveDi: ""});
                            }else{
                              this.setState({isDateActiveDi: "secondary"});
                            }
                          }
                          } />
                        </Grid>
                        <Grid container style={{width : '50%'}}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date de fin"
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
                    <Button type="submit" disabled={this.state.buttonSendState} variant="contained" className={classes.textFieldButton} color={'primary'}>Envoyer
                    </Button>
                    <Button variant="contained" className={classes.textFieldButton} color={'secondary'}>Annuler
                    </Button>
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
