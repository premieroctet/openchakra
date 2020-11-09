import React from 'react';
import Grid from '@material-ui/core/Grid';
import DrawerSchedule from '../../DrawerSchedule/DrawerSchedule';
import Schedule from '../../Schedule/Schedule';
import {withStyles} from '@material-ui/core/styles'
import styles from './DrawerAndScheduleStyle'

class DrawerAndSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.schedule = React.createRef();
    this.drawer = React.createRef();
    this.state= {
      availabilities: [],
    }
  }

  onDateSelectionChanged = (eventsSelected) => {
    this.drawer.current.onDateSelectionChanged(eventsSelected);
  };

  availabilityUpdate = (avail) => {
    this.props.availabilityUpdate(avail)
  };

  availabilityCreated = (avail) =>{
    this.props.availabilityCreated(avail)
  };

  onAvailabilityChanged = () => {
    this.props.onAvailabilityChanged();
  };

  onDateSelectionCleared = () => {
    this.schedule.current.onDateSelectionCleared()
  };

  isDirty = () => {
    return this.drawer.current && this.drawer.current.isDirty()
  };

  render(){
    const {availabilities, selectable, title, subtitle, booking, nbSchedule, readOnly, classes} = this.props;

    return(
      <Grid className={classes.drawerAndSchedule_mainContainer}>
        <Grid className={readOnly ? classes.drawerAndSchedule_mainContainer : classes.drawerAndSchedule_scheduleContainer}>
          <Schedule
            ref={this.schedule}
            availabilities={availabilities}
            title={title}
            subtitle={subtitle}
            onCreateAvailability={this.availabilityCreated}
            onUpdateAvailability={this.availabilityUpdate}
            selectable={selectable}
            nbSchedule={nbSchedule}
            handleSelection={this.onDateSelectionChanged}
            mode={'month'}
            booking={booking}
            style={classes}
          />
        </Grid>
        {readOnly ? null:
          <Grid>
            <DrawerSchedule ref={this.drawer} onAvailabilityChanged={this.onAvailabilityChanged} onDateSelectionCleared={this.onDateSelectionCleared} style={classes}/>
          </Grid>
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(DrawerAndSchedule)
