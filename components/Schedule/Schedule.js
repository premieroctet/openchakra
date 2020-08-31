import React from 'react'
import { Calendar, Views, momentLocalizer   } from 'react-big-calendar';
import _ from 'lodash'
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {bookings2events, eventUI2availability, LONG_DAYS} from '../../utils/converters';
import {ALL_SERVICES, GID_LEN} from '../../utils/consts.js';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Typography } from '@material-ui/core'; // Import css
import styles from './ScheduleStyle'
import PropTypes from 'prop-types';
const {isDateAvailable}=require('../../utils/dateutils');
moment.locale('fr');


const localizer = momentLocalizer(moment);

class Schedule extends React.Component {
  EMPTY_AVAIL = {
    // Availability data
    servicesSelected: [ALL_SERVICES],
    _id: null,
    selectedDateStart: null,
    selectedTimeStart: null,
    selectedDateEnd: null,
    selectedTimeEnd: null,
    selectedDateEndRecu: null,
    // Days (1=>7)
    recurrDays: new Set(),
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      eventsSelected: new Set(),
      isModalOpen: false,
      dayLayoutAlgorithm: 'no-overlap',
      isExpanded: true,
      services: [ALL_SERVICES, ...(this.props.services || [])] || [ALL_SERVICES],
      ...this.EMPTY_AVAIL,
      view: Views.MONTH,
    };
  }

  resetData = () => {
    this.setState(this.EMPTY_AVAIL)
  };

  onDelete = e => {
    let avail = eventUI2availability(this.state);
    this.closeModal();
  };

  closeModal = () => {
    this.setState({isModalOpen: false})
  };

  selectSlot = ({start, end, action}) => {
    let newDate = moment(start).format('YYYY-MM-DD');
      if(this.state.eventsSelected.has(newDate)){
        this.setState(({eventsSelected}) => {
          const newChecked = new Set(eventsSelected);
          newChecked.delete(newDate);
          return {
            eventsSelected: newChecked
          };
        }, () => this.props.handleSelection(this.state.eventsSelected));
      }else{
        this.setState(({eventsSelected}) => ({eventsSelected: new Set(eventsSelected).add(newDate)}), () => this.props.handleSelection(this.state.eventsSelected));
      }
  };

  availAsText = () => {
    const {selectedDateStart, selectedTimeStart, selectedTimeEnd, selectedDateEndRecu, recurrDays, isExpanded} = this.state;
    let value = "Disponible de "+selectedTimeStart+ " à "+selectedTimeEnd;
    value += (isExpanded ? " à partir du " : " le ")+moment(selectedDateStart).format('DD/MM/YY');
    if (isExpanded && selectedDateEndRecu) {
      value += " jusqu'au "+moment(selectedDateEndRecu).format('DD/MM/YY')
    }
    if (isExpanded) {
      value += " tous les ";
      let count=0;
      for (var i = 0; i<7; i++) {
        if (recurrDays.has(i)) {
          value += LONG_DAYS[i]+(count <recurrDays.size-2 ? ", " : count === recurrDays.size-1 ? "" : " et ");
          count++
        }
      }
    }
    return value
  };

  customToolbar = (toolbar) => {

    const label = () => {
      const date = moment(toolbar.date);
      return (
          <span>
          <span>{date.format('MMMM')}</span>
          <span> {date.format('YYYY')}</span>
        </span>
      );
    };

    return (
        <Grid container>
          <Grid style={{display:'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', marginBottom : 20, }}>
            <Grid>
              <label>{label()}</label>
            </Grid>
          </Grid>
        </Grid >
    );
  };

  render() {
    const { classes, title, subtitle, selectable, height, nbSchedule, bookings} = this.props;
    const { view, addClass } = this.state;

    const half=Math.floor(nbSchedule/2);

    let events = bookings2events(bookings.filter( b => b.calendar_display));

    if (view==Views.MONTH) {
      events = _.uniqBy(events, e => e.start.format('DD/MM/YYYY'))
    }


    const CustomMonthDateHeader = (event) =>{
      let newDate = moment(event.date).format('YYYY-MM-DD');

      if(event.isOffRange){
        return null
      }else{
        return(
          <Grid className={classes.containerLabelSelector} onClick={() => this.selectSlot}>
            <Grid className={this.state.eventsSelected.has(newDate) ? classes.labelSelectorActive : classes.labelSelector} >
              <p style={{cursor:'pointer'}}>{event.label}</p>
            </Grid>
          </Grid>
        )
      }
    };

    const MyDateCellWrapper = (event) =>{

      let propsStyle = event.children.props['className'];
      
      var off_range_style={width: '100%', height :'100%', borderLeft:'1px solid #DDD', backgroundColor: 'white', zIndex:5};
      var today_style = {width: '100%', height :'100%', borderLeft:'1px solid #DDD', backgroundColor: 'rgba(79, 189, 215, 0.2)', cursor:'pointer'};
      var day_style = {width: '100%', height :'100%', borderLeft:'1px solid #DDD', cursor:'pointer'};
      var non_available_style = {width: '100%', height :'100%', borderLeft:'1px solid #DDD', cursor:'pointer', backgroundColor:'lightgrey'};

      const m=moment(event.value);
      const isAvailable = isDateAvailable(m, this.props.availabilities);

      if(propsStyle === 'rbc-day-bg rbc-off-range-bg'){
        return(
            <Grid style={off_range_style}/>
        )
      }
      if(propsStyle === 'rbc-day-bg rbc-today'){
        return (
            <Grid style={today_style}/>
        )
      }else{
        if (isAvailable) {
          return(
            <Grid style={day_style}/>
          )
        }
        else {
          return(
            <Grid style={non_available_style}/>
          )
        }
      }
    };

    const MyEventWrapper = (event) =>{

       return(
            <Grid
                style={{
                  borderTop : '25px solid pink',
                  borderRight: '25px solid transparent',
                  height : 0,
                  width : 0,
                  borderRadius: 0,
                  padding: 0,
                  margin: 0,
                  marginLeft: 1,
            }}/>
        )
    };

    return (
      <Grid className={classes.heightContainer} style={{height: height, overflow: 'hidden'}} >
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
        <Grid container spacing={1} style={{padding: '1%'}}>
          {[...Array(nbSchedule)].map((x, i) =>{
            let date = new Date();
            let month = new Date(date.setMonth(date.getMonth() + (i-half)));
            const monthStr=moment(month).format('M');
            const selEvents=events.filter( e => moment(e.start).format('M')==monthStr);
              return(
                <Grid item xl={6} lg={5} xs={12} style={{height: 500}}>
                  <Calendar
                      selectable={selectable}
                      popup={false}
                      culture='fr-FR'
                      localizer={localizer}
                      // FIX: use state instead of props
                      events={selEvents}
                      views={[this.state.view]}
                      defaultDate={month}
                      onSelectSlot={this.selectSlot}
                      onSelectEvent={this.selectedEvent}
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
                      className={classes.sizeSchedulle}
                      components={{
                        toolbar: this.customToolbar,
                        //event: MyEvent, // used by each view (Month, Day, Week)
                        eventWrapper: MyEventWrapper,
                        //eventContainerWrapper: MyEventContainerWrapper,
                        //dayWrapper: MyDayWrapper,
                        dateCellWrapper: MyDateCellWrapper,
                        //timeSlotWrapper: MyTimeSlotWrapper,
                        //timeGutterHeader: MyTimeGutterWrapper,
                        month:{
                          dateHeader: CustomMonthDateHeader,
                          //header: MyMonthHeader,
                          //event: MyMonthEvent,
                        }
                      }}
                  />
                </Grid>
              )
          }
          )}
        </Grid>

    </Grid>
    )
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (Schedule);
