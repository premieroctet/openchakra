import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from 'date-fns/locale/fr';
import Chip from '@material-ui/core/Chip';
import {DAYS} from '../../../utils/converters';
import SelectSlotTimer from '../../SelectSlotTimer/SelectSlotTimer';
import {Button} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './DrawerSettingScheduleStyle';
import axios from "axios";
const {timelapsesSetToArray} = require('../../../utils/dateutils')

class DrawerSettingSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      eventsSelected: new Set(),
      availabilities: [],
      expanded: [],
      dirty: false,
      errors:{}
    }
    this.onDateSelectionChanged = this.onDateSelectionChanged.bind(this)
  }

  componentDidMount = () => {
    this.loadAvailabilities()
  }

  isDirty = () => {
    const dirty = this.state.dirty
    return dirty
  }

  loadAvailabilities = () => {
    axios.get('/myAlfred/api/availability/currentAlfred')
      .then ( response => {
        const availabilities = response.data.filter( a => !a.is_punctual).map( a => {
          return {
            _id : a._id,
            startDate: new Date(a.period.begin),
            endDate: new Date(a.period.end),
            recurrDays: new Set(a.period.days),
            timelapses: a.timelapses,
            as_text: a.as_text,
          }
        });
        const expanded = Array.from({length:availabilities.length}, () => false)
        this.setState({availabilities: availabilities, expanded: expanded, dirty: false})
      })
      .catch(err => console.error(err))
  };

  toggleRecurrDay = (dayIndex, availIdx) => {
    this.state.availabilities[availIdx].recurrDays.has(dayIndex) ? this.removeRecurrDay(dayIndex, availIdx) : this.addRecurrDay(dayIndex, availIdx);
    this.setState({dirty: true})
  };

  addRecurrDay = (day, availIdx) => {
    let availabilities = this.state.availabilities;
    availabilities[availIdx].recurrDays.add(day);
    this.setState({availabilities: availabilities});
  };

  removeRecurrDay = (day, availIdx) => {
    let availabilities = this.state.availabilities;
    availabilities[availIdx].recurrDays.delete(day);
    this.setState({availabilities: availabilities});
  };

  onDateSelectionChanged = (eventsSelected) => {
    this.setState({eventsSelected: new Set(eventsSelected)});
  };

    addAvailability = () =>{
      var availabilities=this.state.availabilities;
      let newAvailability = {
        _id: null,
        startDate:null,
        endDate: null,
        recurrDays: new Set(),
        timelapses: [],
        as_text: '',
      };
      availabilities.push(newAvailability);
      const expanded = Array.from({length:this.state.expanded.length}, () => false)
      expanded.push(true)
      this.setState({availabilities: availabilities, expanded: expanded, dirty: true})
    };

    handleDateStart = index => (date) =>{
      var availabilities = this.state.availabilities;
      availabilities[index].startDate=date;
      this.setState({
        availabilities: availabilities,
        dirty: true,
      });
    };

    handleDateEnd = index => (date) => {
      var availabilities = this.state.availabilities;
      availabilities[index].endDate=date;
      this.setState({
        availabilities: availabilities,
        dirty: true,
      });
    };

    removeAvailability = (index) =>{
      const availability=this.state.availabilities[index];
      if (availability._id) {
        axios.delete(`/myAlfred/api/availability/${availability._id}`)
          .then( () => {
            this.props.onAvailabilityChanged ? this.props.onAvailabilityChanged() : () => {}
          })
      }
      this.loadAvailabilities()
    };

    slotTimerChanged = availIdx => (slotIndex) => {
        let availabilities = this.state.availabilities
        let tlSet =new Set([...availabilities[availIdx].timelapses])
        if (tlSet.has(slotIndex)) {
          tlSet.delete(slotIndex);
        }
        else {
          tlSet.add(slotIndex);
        }
        availabilities[availIdx].timelapses = [...tlSet]
        this.setState({availabilities: availabilities, dirty: true });
    };


    save = (index, event) => {
      const availability = this.state.availabilities[index];
      axios.post('/myAlfred/api/availability/addRecurrent', {
        _id: availability._id,
        available: true,
        startDate: availability.startDate,
        endDate: availability.endDate,
        days: [...availability.recurrDays],
        timelapses: [...availability.timelapses],
      })
      .then ( res => {
        var errors=this.state.errors;
        errors[index]={};
        this.setState({errors: errors });
        this.props.onAvailabilityChanged ? this.props.onAvailabilityChanged() : () => {};
        this.loadAvailabilities();
      })
      .catch( err => {
        var errors=this.state.errors;
        errors[index]=err.response.data;
        this.setState({errors: errors})
      })
    };


    saveEnabled = availIdx => {
      const availability = this.state.availabilities[availIdx]
      if (availability.recurrDays.size==0) {
        return false
      }
      if (availability.timelapses.length==0) {
        return false
      }

      if (!availability.startDate || isNaN(availability.startDate.valueOf())) {
        return false
      }
      if (!availability.endDate || isNaN(availability.endDate.valueOf())) {
        return false
      }
      return true
    };

    addPeriodEnabled = () => {
      const unsaved = this.state.availabilities.some( a => !a._id)
      return !unsaved
    }

    onAccordionChange = availIdx => (event, exp) => {
      const expanded=this.state.expanded
      expanded[availIdx]=exp
      this.setState({expanded: expanded})
    }

    render(){

        const {classes} = this.props;
        const {availabilities, errors, expanded} = this.state;

        return(
            <Grid>
                <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                        <Typography className={classes.policySizeTitle}>Paramétrez vos disponibilités</Typography>
                    </Grid>
                    <Hidden mdUp implementation="css">
                      <Grid>
                        <IconButton aria-label="CLOSE">
                          <CloseIcon color={'secondary'} onClick={this.props.handleDrawer}/>
                        </IconButton>
                      </Grid>
                    </Hidden>
                </Grid>
                <Divider />
                <Grid>
                {
                  availabilities.map((availResult, availIdx) =>{
                    const error = errors[availIdx] || {};
                    return(
                      <Accordion expanded={expanded[availIdx]} onChange={this.onAccordionChange(availIdx)}>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="Math.random()"
                          >
                              <Grid>
                                  <Grid>
                                      <Typography>{ availResult.as_text }</Typography>
                                  </Grid>
                              </Grid>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Grid style={{width: '100%'}}>
                                  <Grid>
                                      <Grid>
                                          <h3>Période :</h3>
                                      </Grid>
                                      <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                                              <Grid style={{display : 'flex', alignItems: 'center'}}>
                                                  <Grid>
                                                    <Grid>
                                                      <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        id="date-picker-inline"
                                                        label="Date de début"
                                                        className={classes.formSchedule}
                                                        value={availResult.startDate}
                                                        onChange={this.handleDateStart(availIdx)}
                                                        KeyboardButtonProps={{
                                                          'aria-label': 'change date',
                                                        }}
                                                        autoOk={true}
                                                      />
                                                    </Grid>
                                                    <Grid>
                                                      <em style={{ color: 'red' }}>{ error.startDate}</em>
                                                    </Grid>
                                                  </Grid>
                                              </Grid>
                                              <Grid style={{display : 'flex', alignItems: 'center'}}>
                                                  <Grid style={{display: 'flex', flexDirection: 'column'}}>
                                                    <Grid>
                                                      <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        id="date-picker-inline"
                                                        label="Date de fin"
                                                        className={classes.formSchedule}
                                                        value={availResult.endDate}
                                                        onChange={this.handleDateEnd(availIdx)}
                                                        KeyboardButtonProps={{
                                                          'aria-label': 'change date',
                                                        }}
                                                        autoOk={true}
                                                      />
                                                    </Grid>
                                                    <Grid>
                                                      <em style={{ color: 'red' }}>{ error.endDate}</em>
                                                    </Grid>
                                                  </Grid>
                                              </Grid>
                                          </MuiPickersUtilsProvider>
                                      </Grid>
                                  </Grid>
                                  <Grid>
                                      <Grid>
                                          <h3>Jours travaillés :</h3>
                                      </Grid>
                                      <Grid container className={classes.panelFormDays}>
                                        { /* TODO: Utiliser DAYS à la place du tableau [0,1,2,3,4,5,6] */ }
                                          {[0,1,2,3,4,5,6].map( index => {
                                              return (
                                                  <Chip
                                                      key={index}
                                                      clickable
                                                      label={(DAYS[index]).charAt(0)}
                                                      style={{backgroundColor: availabilities[availIdx].recurrDays.has(index) ? '#4fbdd7' :  '#c4c4c4'}}
                                                      className={classes.textFieldChips}
                                                      onClick={() => this.toggleRecurrDay(index, availIdx)}
                                                  />
                                                  )
                                          })}
                                      </Grid>
                                      <em style={{ color: 'red' }}>{ error.days}</em>
                                  </Grid>
                                  <Grid>
                                      <Grid>
                                          <h3>Horaires travaillés :</h3>
                                          <em style={{ color: 'red' }}>{ error.timelapses}</em>
                                      </Grid>
                                      <Grid container>
                                        { 'Nuit Matin Après-midi Soirée'.split(' ').map( (title, index) => {
                                            return (
                                            <Grid item className={classes.containerSelectSlotTimer}>
                                              <Grid>
                                                <h4>{title}</h4>
                                              </Grid>
                                              <Grid>
                                                <SelectSlotTimer arrayLength={6} index={index*6} slots={timelapsesSetToArray(availabilities[availIdx].timelapses)}
                                                                 bookings={{}} onChange={this.slotTimerChanged(availIdx)}/>
                                              </Grid>
                                            </Grid>
                                            )
                                          })
                                        }
                                      </Grid>
                                  </Grid>
                                  <Grid style={{marginTop: 20}}>
                                      <Grid style={{display:'flex', flexDirection:'row-reverse'}}>
                                          <Button disabled={!this.saveEnabled(availIdx)} variant={'contained'} color={'primary'} style={{color: 'white'}} onClick={ ev => this.save(availIdx, ev) }>Enregistrer</Button>
                                          <Button color={'secondary'} style={{marginRight: 10}} onClick={()=>this.removeAvailability(availIdx)}>Supprimer</Button>
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </AccordionDetails>
                      </Accordion>
                    )
                  })
                }
                </Grid>
                <Divider/>
                <Grid style={{marginTop: 10, marginBottom: 10}}>
                    <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <Button disabled={!this.addPeriodEnabled()} variant={'contained'} color={'primary'} style={{color:'white'}} onClick={ this.addAvailability}>Ajouter une période</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(DrawerSettingSchedule);
