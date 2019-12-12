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
  KeyboardTimePicker,
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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  contentTimeSlot:{
    justifyContent: 'space-around',
    alignItems: 'baseline'
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
      service:'',
      selectedDateStart: new Date(),
      timePickerStart: new Date(),
      selectedDateEnd: new Date(),
      timePickerEnd: new Date(),
      isCheckedRecurence: false,
      dayLayoutAlgorithm: 'no-overlap',
      isDateActiveLu:'',
      isDateActiveMa:'',
      isDateActiveMe:'',
      isDateActiveJe:'',
      isDateActiveVe:'',
      isDateActiveSa:'',
      isDateActiveDi:'',
      isActivateDate:{
        endDateRecurrency: new Date(),
        lundi:{
          label: "Lu",
          isActivate: false
        },
        mardi:{
          label: "Ma",
          isActivate: false
        },
        mercredi:{
          label: "Me",
          isActivate: false
        },
        jeudi:{
          label: "Je",
          isActivate: false
        },
        vendredi:{
          label: "Ve",
          isActivate: false
        },
        samedi:{
          label: "Sa",
          isActivate: false
        },
        dimanche:{
          label: "Di",
          isActivate: false
        },
      }
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
                          onChange={() => {
                            this.setState({ selectedDateStart: this.state.selectedDateStart });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                        <TextField
                          id="time"
                          label="Heure de début"
                          type="time"
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
                          onChange={() => {
                            this.setState({ selectedDateEnd: this.state.selectedDateEnd });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                        <TextField
                          id="time"
                          label="Heure de fin"
                          type="time"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
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
                      <ExpansionPanelDetails style={{alignItems: 'end'}}>
                        <Grid style={{width : '50%'}}>
                          <Chip
                            clickable
                            label="Lu"
                            color={this.state.isDateActiveLu}
                            onClick={() => {
                              if(this.state.isDateActiveLu === "secondary"){
                                this.setState({isDateActiveLu: ""});
                              }else{
                                this.setState({isDateActiveLu: "secondary"});
                              }
                            }
                          } />
                          <Chip clickable label="Ma" color={this.state.isDateActiveMa} onClick={() => {
                            if(this.state.isDateActiveMa === "secondary"){
                              this.setState({isDateActiveMa: ""});
                            }else{
                              this.setState({isDateActiveMa: "secondary"});
                            }
                          }
                          } />
                          <Chip clickable label="Me" color={this.state.isDateActiveMe} onClick={() => {
                            if(this.state.isDateActiveMe === "secondary"){
                              this.setState({isDateActiveMe: ""});
                            }else{
                              this.setState({isDateActiveMe: "secondary"});
                            }
                          }
                          } />
                          <Chip clickable label="Je" color={this.state.isDateActiveJe} onClick={() => {
                            if(this.state.isDateActiveJe === "secondary"){
                              this.setState({isDateActiveJe: ""});
                            }else{
                              this.setState({isDateActiveJe: "secondary"});
                            }
                          }
                          } />
                          <Chip clickable label="Ve" color={this.state.isDateActiveVe} onClick={() => {
                            if(this.state.isDateActiveVe === "secondary"){
                              this.setState({isDateActiveVe: ""});
                            }else{
                              this.setState({isDateActiveVe: "secondary"});
                            }
                          }
                          } />
                          <Chip clickable label="Sa" color={this.state.isDateActiveSa} onClick={() => {
                            if(this.state.isDateActiveSa === "secondary"){
                              this.setState({isDateActiveSa: ""});
                            }else{
                              this.setState({isDateActiveSa: "secondary"});
                            }
                          }
                          } />
                          <Chip clickable label="Di" color={this.state.isDateActiveDi} onClick={() => {
                            if(this.state.isDateActiveDi === "secondary"){
                              this.setState({isDateActiveDi: ""});
                            }else{
                              this.setState({isDateActiveDi: "secondary"});
                            }
                          }
                          } />
                        </Grid>
                        <Grid style={{width : '50%'}}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
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
                         </MuiPickersUtilsProvider>
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                  {/*<Grid> // TODO pour plus tard
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
                  </Grid>*/}
                  <Grid>
                    <button type="button">Envoyer
                    </button>
                    <button type="button">Annuler
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
