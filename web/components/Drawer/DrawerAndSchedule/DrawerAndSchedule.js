import React from 'react';
import Grid from '@material-ui/core/Grid';
import DrawerSchedule from '../../DrawerSchedule/DrawerSchedule';
import Schedule from '../../Schedule/Schedule';
import {withStyles} from '@material-ui/core/styles';
import styles from './DrawerAndScheduleStyle';

class DrawerAndSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.schedule = React.createRef();
    this.child = React.createRef();
    this.state= {
      availabilities: [],
    }
  }

  sendToDrawer = (eventsSelected) => {
    this.child.current.getEventsSelected(eventsSelected);
  };

  availabilityUpdate = (avail) => {
    this.props.availabilityUpdate(avail)
  };

  availabilityCreated = (avail) =>{
    this.props.availabilityCreated(avail)
  };

  render(){
    const {classes, availabilities, selectable, title, subtitle} = this.props;

    return(
      <Grid>
        <Grid className={classes.toggle}>
          <Grid>
            <DrawerSchedule ref={this.child} onAvailabilityChanged={this.onAvailabilityChanged} removeEventsSelected={this.removeEventsSelected}/>
          </Grid>
        </Grid>
        <Grid container className={classes.containercalendar} style={{width: ' 65%'}}>
          <Grid>
            <Schedule
              ref={this.schedule}
              availabilities={availabilities}
              title={title}
              subtitle={subtitle}
              onCreateAvailability={this.availabilityCreated}
              onUpdateAvailability={this.availabilityUpdate}
              selectable={selectable}
              nbSchedule={12}
              handleSelection={this.sendToDrawer}
              mode={'month'}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DrawerAndSchedule);
