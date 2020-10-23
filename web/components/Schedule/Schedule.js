import React from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import _ from 'lodash';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import {bookings2events} from '../../utils/converters';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const {isDateAvailable, isMomentAvailable} = require('../../utils/dateutils');
moment.locale('fr');

const localizer = momentLocalizer(moment);

/***TODO nbSchedule size manage by parent not itself
 ***/

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsSelected: new Set(),
      view: Views.MONTH,
      currentDate: new Date(),
    };
  }

  toggleSelection = ({start, end, action}) => {
    // Don't select dates before today
    if (moment(start).isBefore(moment().startOf('day'))) {
      return
    }
    let newDate = moment(start).format('YYYY-MM-DD');
    var eventsSelected=this.state.eventsSelected;
    // Single selection : replace
    if (this.props.singleSelection) {
      eventsSelected = new Set([newDate])
    }
    // Multiple selection : toggle
    else {
      if (!eventsSelected.delete(newDate)) { eventsSelected.add(newDate) }
    }
    this.setState(
      { eventsSelected: eventsSelected},
      () => this.props.handleSelection(this.state.eventsSelected, start, this.props.mode)
    )
  };

  onDateSelectionCleared = () => {
    this.setState({eventsSelected: new Set()})
  };

  previousMonth = () => {
      let date = new Date(this.state.currentDate);
      date.setDate(1);
      date.setMonth(date.getMonth() - 1);
      this.setState({currentDate : date})
  };

  nextMonth = () => {
      let date = new Date(this.state.currentDate);
      date.setDate(1);
      date.setMonth(date.getMonth() + 1);
      this.setState({currentDate : date})
  };

  render() {
    const {title, subtitle, selectable, nbSchedule, bookings, mode, style} = this.props;
    const {view, eventsSelected, currentDate} = this.state;

    let events = [];
    if (bookings !== undefined) {
      events = bookings2events(bookings.filter(b => b.calendar_display));
    }

    if (view === Views.MONTH) {
      events = _.uniqBy(events, e => e.start.format('DD/MM/YYYY'));
    }

    const customToolbar = (toolbar) => {
      const goToBack = () => {
        if(this.props.mode === 'month'){
          toolbar.date.setMonth(toolbar.date.getMonth() - 1);
          toolbar.onNavigate('prev');
        }else{
          toolbar.onNavigate('PREV');
        }
      };

      const goToNext = () => {
        if(this.props.mode === 'month'){
          toolbar.date.setMonth(toolbar.date.getMonth() + 1);
          toolbar.onNavigate('prev');
        }else{
          toolbar.onNavigate('NEXT');
        }
      };

      const label = () => {
        const date = moment(toolbar.date);
        return (
          <Grid container className={style.schedule_containerToolbar}
                style={{justifyContent: this.props.nbSchedule === 1 ? 'space-between' : 'center'}}>
            {
              this.props.nbSchedule === 1 ?
                <Grid item>
                  <Button onClick={goToBack} variant={'contained'}>&#8249;</Button>
                </Grid> : null
            }
            <Grid item>
              <span>{date.format('MMMM') + ' ' + date.format('YYYY')}</span>
            </Grid>
            {
              this.props.nbSchedule === 1 ?
                <Grid item>
                  <Button onClick={goToNext} variant={'contained'}>&#8250;</Button>
                </Grid> : null
            }
          </Grid>
        );
      };

      return (
        <Grid container>
          <Grid className={style.schedule_customToolbarStyle}>
            <Grid style={{width: '100%'}}>
              <Grid>{label()}</Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    };


    const customMonthDateHeader = (event) => {
      let newDate = moment(event.date).format('YYYY-MM-DD');
      if (event.isOffRange) {
        return null
      }
      else if (moment(event.date).isBefore(moment().startOf('day'))) {
        return <p className={style.schedule_monthDateHeaderLabelOldDay}>{event.label}</p>
      }
      else {
        return (
          <Grid className={style.schedule_containerLabelSelector}>
            <Grid className={eventsSelected.has(newDate) ? style.schedule_labelSelectorActive : style.schedule_labelSelector}>
              <p className={style.schedule_monthDateHeaderLabel}>{event.label}</p>
            </Grid>
          </Grid>
        )
      }
    };

    const customMonthDateCellWrapper = (event) => {

      let propsStyle = event.children.props['className'];

      const m = moment(event.value);
      const isAvailable = isDateAvailable(m, this.props.availabilities);

      if (propsStyle === 'rbc-day-bg rbc-off-range-bg') {
        return (
          <Grid className={style.schedule_off_range_style}/>
        );
      } else if (isAvailable && propsStyle === 'rbc-day-bg rbc-today') {
        return (
          <Grid className={style.schedule_today_style_avail}>
            <Grid className={style.schedule_today_style}/>
          </Grid>
        );
      } else if (!isAvailable && propsStyle === 'rbc-day-bg rbc-today') {
        return (
          <Grid className={style.style_today_style_off}>
            <Grid className={style.schedule_today_style}/>
          </Grid>
        );
      }
      else {
        if (isAvailable) {
          return (
            <Grid className={style.schedule_day_style}/>
          );
        } else {
          return (
            <Grid className={style.schedule_non_available_style}/>
          );
        }
      }
    };

    const customMonthEventWrapper = () => {
      return (
        <Grid className={style.schedule_myEventWrapperStyle}/>
      );
    };

    const customWeekHeader = (header) => {
      let label = header.label.split(' ');
      const headerContent = () =>{
        const m = moment(header.date);
        return(
          <Grid container>
            <Grid item style={{width: '100%'}}>
              <span style={{color: m.isBefore(moment().startOf('day')) ? '#999999' : 'black'}}>
                {label[1] + ' ' + label[0]}</span>
            </Grid>
          </Grid>
        )
      };

      return(
        <Grid>
          <Grid>
            {headerContent()}
          </Grid>
        </Grid>
      )
    };


    const customMyTimeSlotWrapper = (event) => {

      const label = () => {

        let date = moment(event.value);
        let resource = event.resource;
        const isAvailable = isMomentAvailable(date, this.props.availabilities);

        if(typeof resource === "undefined") {
          if (date.minutes() === 0){
            return(
              <Grid className={style.schedule_timeSlotWrapper}>
                <span>{date.hours() + ':' + date.format('mm')}</span>
              </Grid>
            )
          }
          else {
            return (
              <Grid/>
            )
          }
        }
        if (!isAvailable) {
          return(
            <Grid className={style.schedule_non_available_style}/>
          )
        }
      };

      return(
        <Grid container className={style.schedule_containerTimeSlotWrapper}>
          {label()}
        </Grid>
      )
    };

    return (
      <Grid className={style.schedule_heightContainer}>
        {title || subtitle ?
          <Grid>
            {title ?
              <Grid>
                <Typography className={style.schedule_policySizeTitle}>{title}</Typography>
              </Grid> : null
            }
            {subtitle ?
              <Grid>
                <p className={style.schedule_policySizeContent}>{subtitle}</p>
              </Grid> : null
            }
          </Grid>
          : null
        }
        { this.props.mode === 'month' ?
          <Grid container style={{justifyContent: 'space-between'}}>
            <Grid>
              <Button onClick={this.previousMonth} variant={'contained'}>&#8249;</Button>
            </Grid>
            <Grid>
            <Button onClick={this.nextMonth} variant={'contained'}>&#8250;</Button>
            </Grid>
          </Grid>
          :
          null
        }
        <Grid container spacing={2} style={{padding: 5}}>
          {[...Array(nbSchedule)].map((x, i) => {
            let date = new Date(currentDate);
            date.setDate(1);
            date.setMonth(date.getMonth() + (i-1));
            const monthStr = moment(date).format('M');
            const monthEvents = events.filter(e => moment(e.start).format('M') === monthStr);
            return (
              <Grid item xl={nbSchedule === 1 ? 11 : 4} lg={nbSchedule === 1 ? 11 : 4} md={nbSchedule === 1 ? 11 : 6}
                    sm={nbSchedule === 1 ? 11 : 6} xs={12} className={style.schedule_height} key={i}>
                <Calendar
                  key={date}
                  selectable={selectable}
                  popup={false}
                  culture={'fr-FR'}
                  localizer={localizer}
                  events={monthEvents}
                  views={[Views.MONTH, Views.WEEK]}
                  defaultView={mode}
                  defaultDate={mode === 'month' ? date : new Date()}
                  onSelectSlot={this.toggleSelection}
                  dayLayoutAlgorithm={'no-overlap'}
                  scrollToTime={date}
                  className={style.schedule_scheduleMainStyle}
                  components={{
                    /* event: MyEvent, // used by each view (Month, Day, Week)
                     *   eventWrapper: MyEventWrapper,
                     *   eventContainerWrapper: MyEventContainerWrapper,
                     *   dateCellWrapper: MyDateCellWrapper,
                     *   timeSlotWrapper: MyTimeSlotWrapper,
                     *   timeGutterHeader: MyTimeGutterWrapper,
                     *   toolbar: MyToolbar,
                     *   agenda: {
                     *   	 event: MyAgendaEvent // with the agenda view use a different component to render events
                     *     time: MyAgendaTime,
                     *     date: MyAgendaDate,
                     *   },
                     *   day: {
                     *     header: MyDayHeader,
                     *     event: MyDayEvent,
                     *   },
                     *   week: {
                     *     header: MyWeekHeader,
                     *     event: MyWeekEvent,
                     *   },
                     *   month: {
                     *     header: MyMonthHeader,
                     *     dateHeader: MyMonthDateHeader,
                     *     event: MyMonthEvent,
                     *   }*/
                    month: {
                      dateHeader: customMonthDateHeader,
                      eventWrapper: customMonthEventWrapper,
                      dateCellWrapper: customMonthDateCellWrapper,
                      toolbar: customToolbar,
                    },
                    week:{
                      toolbar: customToolbar,
                      header: customWeekHeader,
                      timeSlotWrapper: customMyTimeSlotWrapper,
                    }
                  }}
                />
              </Grid>
            );
            },
          )}
        </Grid>
      </Grid>
    );
  }
}

export default Schedule;
