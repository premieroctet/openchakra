import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import SelectSlotTimer from '../../SelectSlotTimer/SelectSlotTimer';
import {Button} from '@material-ui/core';
import React from 'react';
import styles from './DrawerEditingScheduleStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import cookie from 'react-cookies'

class DrawerEditingSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      available: true,
      eventsSelected: new Set(),
      timelapses: Array.from({length:24}, () => false),
      orgTimelapses: Array.from({length:24}, () => false),
      bookings: {},
      errors: {},
      dirty: false,
    };
    this.onDateSelectionChanged = this.onDateSelectionChanged.bind(this);
  }

  isDirty = () => {
    return this.state.dirty
  }

  onDateSelectionChanged = (eventsSelected) => {
    this.setState({eventsSelected: new Set(eventsSelected)})
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.post('/myAlfred/api/availability/dates', { dates: Array(...eventsSelected) })
      .then( result => {
        if (result.data) {
          this.setState({
            available: result.data.available,
            timelapses: result.data.timelapses,
            orgTimelapses: [...result.data.timelapses],
          })
        }
      })
    // If one date, get bookings
    if (eventsSelected && eventsSelected.size==1) {
      const dt=moment([...eventsSelected][0]).format('DD/MM/YYYY')
      console.log(`Date:${dt}`)
      axios.get('/myAlfred/api/booking/currentAlfred')
        .then( result => {
          var bookings = result.data.filter( b => moment(b.date_prestation, 'DD/MM/YYYY').format('DD/MM/YYYY')==dt)
          console.log(`Found bookings #${bookings.length}`)
          var bkgs={}
          bookings.forEach( b => {
            const hour=moment(b.time_prestation).hour()
            bkgs[hour]=b.user.picture
          })
          this.setState({bookings : bkgs})
        })
    }
    else {
      this.setState({bookings : {}})
    }
  };

  handleAvailabilities = (event) => {
    this.setState({availabilities: event.target.value});
  };

  toggleAvailability = () => {
    this.setState({available: !this.state.available, dirty: true});
  };

  // Enabled => Disabled ( => Undefined )
  slotTimerChanged = (slotIndex) => {
    var timelapses = this.state.timelapses;
    const prev = timelapses[slotIndex]
    const hasUndefined = this.state.orgTimelapses[slotIndex]==null
    const next = prev==true ? false : prev==null ? true : hasUndefined ? null : true
    timelapses[slotIndex]=next
    this.setState({timelapses: timelapses, dirty: true});
  };

  save = () => {
    axios.post('/myAlfred/api/availability/addPunctual', {
      punctuals: [...this.state.eventsSelected],
      available: this.state.available,
      timelapses: [...this.state.timelapses],
    })
    .then(res => {
      this.props.onAvailabilityChanged ? this.props.onAvailabilityChanged() : () => {};
      this.setState({eventsSelected: new Set()}, () => this.props.onDateSelectionCleared());
    });
  };

  saveEnabled = () => {
    const enabled = !this.state.available || this.state.timelapses.filter( v => v==true).length > 0;
    return enabled;
  };

  render() {

    const {classes} = this.props;
    const {availabilities, errors, timelapses, available, bookings} = this.state;

    console.log(`Bookings:${JSON.stringify(bookings)}`)
    return (
      <Grid>
        <Grid style={{display: 'flex', alignItems: 'center'}}>
          <Grid>
            <Typography className={classes.policySizeTitle}>Modifier vos disponibilités</Typography>
          </Grid>
          <Hidden smUp implementation="css">
            <Grid>
              <IconButton aria-label="CLOSE">
                <CloseIcon color={'secondary'} onClick={this.props.handleDrawer}/>
              </IconButton>
            </Grid>
          </Hidden>
        </Grid>
        <Divider/>
        <Grid>
          <Grid style={{width: '100%'}}>
            <Grid>
              <Grid>
                <h3>Êtes-vous disponible ?</h3>
                <em style={{ color: 'red'}}>{errors.available}</em>
              </Grid>
              <Grid container>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="availabilities" name="availabilities" value={availabilities}
                              onChange={this.handleAvailabilities}>
                    <FormControlLabel onChange={this.toggleAvailability} checked={!this.state.available}
                                      value="notavailabilities" control={<Radio color="primary"/>}
                                      label="Indisponible pour la journée"/>
                    <FormControlLabel onChange={this.toggleAvailability} checked={this.state.available}
                                      value="availabilities" control={<Radio color="primary"/>}
                                      label="Disponible sur ces horaires : "/>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            {available ?
              <Grid>
                <Grid>
	                <h3>Vos horaires travaillés</h3>
                  <em style={{ color: 'red'}}>{errors.timelapses}</em>
                </Grid>
                <Grid container>
                  { 'Nuit Matin Après-midi Soirée'.split(' ').map( (title, index) => {
                      return (
                      <Grid item className={classes.containerSelectSlotTimer}>
                        <Grid>
                          <h4>{title}</h4>
                        </Grid>
                        <Grid>
                          <SelectSlotTimer arrayLength={6} index={index*6} slots={timelapses}
                                           bookings={bookings} onChange={this.slotTimerChanged}/>
                        </Grid>
                      </Grid>
                      )
                    })
                  }
                </Grid>
              </Grid>
              :
              null
            }
            <Grid style={{marginTop: 30, marginBottom: 110}}>
              <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button disabled={!this.saveEnabled()} variant={'contained'} color={'primary'} style={{color: 'white'}}
                        onClick={() => this.save()}>Enregistrer</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

export default withStyles(styles, {withTheme: true})(DrawerEditingSchedule);
