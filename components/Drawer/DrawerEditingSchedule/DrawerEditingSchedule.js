import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import SelectSlotTimer from '../../SelectSlotTimer/SelectSlotTimer';
import {Button} from '@material-ui/core';
import React from 'react';
import styles from './DrawerEditingScheduleStyle'
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import axios from "axios";

class DrawerEditingSchedule extends React.Component{

    constructor(props) {
      super(props);
      this.state={
        available: true,
        eventsSelected: new Set(),
        selectedDateStart: null,
        selectedDateEnd: null,
        timelapses: new Set(),
      }
      this.getEventsSelected = this.getEventsSelected.bind(this)
    }

    getEventsSelected = (eventsSelected) =>{
      console.log(`DrawerEditingSchedule:Selected:${JSON.stringify(Array(...eventsSelected))}`)
        this.setState({eventsSelected : new Set(eventsSelected)});
    };

    handleAvailabilities = (event) => {
        this.setState({availabilities: event.target.value});
    };

    toggleAvailability = () => {
        this.setState({available: !this.state.available})
    }

    slotTimerChanged = (slotIndex, add) => {
      var timelapses = this.state.timelapses
      if (add) {
        timelapses.add(slotIndex)
      }
      else {
        timelapses.delete(slotIndex)
      }
      this.setState({timelapses: timelapses})
    }

    save = () => {
      axios.post('/myAlfred/api/availability/addPunctual', {
        dates: Array(...this.state.eventsSelected),
        available: this.state.available,
        timelapses: Array(...this.state.timelapses),
      })
      .then ( res => {
        this.props.onAvailabilitySaved ? this.props.onAvailabilitySaved() : () => {}
      })
    }

    saveEnabled = () => {
      const enabled= !this.state.available || this.state.timelapses.size>0
      return enabled
    }

    render(){

        const {classes} = this.props;
        const {availabilities} = this.state;

        return (
            <Grid>
                <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                        <h1>Modifier vos disponibilités</h1>
                    </Grid>
                    <Hidden smUp implementation="css">
                        <Grid>
                            <IconButton aria-label="CLOSE">
                                <CloseIcon color={'secondary'} onClick={this.props.handleDrawer} />
                            </IconButton>
                        </Grid>
                    </Hidden>
                </Grid>
                <Divider />
                <Grid>
                    <Grid style={{width: '100%'}}>

                        <Grid>
                            <Grid>
                                <h3>Êtes-vous disponible ?</h3>
                            </Grid>
                            <Grid container>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="availabilities" name="availabilities" value={availabilities} onChange={this.handleAvailabilities}>
                                        <FormControlLabel onChange={this.toggleAvailability} checked={!this.state.available} value="notavailabilities" control={<Radio  color="primary"/>} label="Indisponible pour la journée" />
                                        <FormControlLabel onChange={this.toggleAvailability} checked={this.state.available} value="availabilities" control={<Radio color="primary"/>} label="Disponible sur ces horaires : " />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        { this.state.available ?
                        <Grid>
                            <Grid container>
                                <Grid item className={classes.containerSelectSlotTimer}>
                                    <Grid>
                                        <h4>Nuit</h4>
                                    </Grid>
                                    <Grid>
                                        <SelectSlotTimer arrayLength={6} index={0} slots={this.state.timelapses} onChange={this.slotTimerChanged}/>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.containerSelectSlotTimer}>
                                    <Grid>
                                        <h4>Matin</h4>
                                    </Grid>
                                    <Grid >
                                        <SelectSlotTimer arrayLength={12} index={6} slots={this.state.timelapses} onChange={this.slotTimerChanged}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item className={classes.containerSelectSlotTimer}>
                                    <Grid>
                                        <h4>Après-midi</h4>
                                    </Grid>
                                    <Grid>
                                        <SelectSlotTimer arrayLength={18} index={12} slots={this.state.timelapses} onChange={this.slotTimerChanged}/>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.containerSelectSlotTimer}>
                                    <Grid>
                                        <h4>Soirée</h4>
                                    </Grid>
                                    <Grid>
                                        <SelectSlotTimer arrayLength={24} index={18} slots={this.state.timelapses} onChange={this.slotTimerChanged}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        null
                        }
                        <Grid style={{marginTop: 30}}>
                            <Grid style={{display:'flex', flexDirection:'row-reverse'}}>
                                <Button disabled={!this.saveEnabled()} variant={'contained'} color={'primary'} style={{color: 'white'}} onClick={ () => this.save() }>Enregistrer</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

}

export default  withStyles(styles, { withTheme: true }) (DrawerEditingSchedule)
