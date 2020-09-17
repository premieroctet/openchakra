import React from 'react';
import Grid from '@material-ui/core/Grid';
import DrawerSchedule from '../../DrawerSchedule/DrawerSchedule';
import Schedule from '../../Schedule/Schedule';

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

  onAvailabilityChanged = () => {
    this.props.onAvailabilityChanged();
  };

  removeEventsSelected = () => {
    this.schedule.current.removeEventsSelected()
  };

  render(){
    const {availabilities, selectable, title, subtitle, booking, nbSchedule, style} = this.props;

    return(
      <Grid className={style.drawerAndSchedule_mainContainer}>
        <Grid className={style.drawerAndSchedule_scheduleContainer}>
          <Schedule
            ref={this.schedule}
            availabilities={availabilities}
            title={title}
            subtitle={subtitle}
            onCreateAvailability={this.availabilityCreated}
            onUpdateAvailability={this.availabilityUpdate}
            selectable={selectable}
            nbSchedule={nbSchedule}
            handleSelection={this.sendToDrawer}
            mode={'month'}
            booking={booking}
            style={style}
          />
        </Grid>
        <Grid className={style.drawerAndSchedule_drawerScheduleContainer}>
          <DrawerSchedule ref={this.child} onAvailabilityChanged={this.onAvailabilityChanged} removeEventsSelected={this.removeEventsSelected} style={style}/>
        </Grid>
      </Grid>
    );
  }
}

export default DrawerAndSchedule;
