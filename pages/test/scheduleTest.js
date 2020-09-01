import React from 'react';
import Schedule from '../../components/Schedule/Schedule';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import cookie from 'react-cookies'
import DrawerSchedule from '../../components/DrawerSchedule/DrawerSchedule';
import Fab from '@material-ui/core/Fab';
import styles from './style';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import moment from 'moment';


class scheduleTest extends React.Component{
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.scheduleChild = React.createRef();
        this.state={
            bookings: [
                {
                    id: 0,
                    service: 'All Day Event very long title',
                    date: new Date(),
                }
            ],
            services: []
        };
    }

    componentDidMount = () => {
      const token = cookie.load('token');
      axios.defaults.headers.common['Authorization'] = token;
      axios.get("/myAlfred/api/admin/booking/all")
        .then(response => {
          this.setState({bookings: response.data});
          console.log(`${JSON.stringify(response.data[0])}`)
        }).catch(err => console.log(err))
    };

    sendToDrawer = (eventsSelected) => {
        this.child.current.getEventsSelected(eventsSelected );
    };

    render(){
        const {bookings, services} = this.state;
        const { classes } = this.props;

        return(

            <Grid>
                <Grid className={classes.toggle}>
                    <Grid>
                        <DrawerSchedule ref={this.child}/>
                    </Grid>
                </Grid>
                <Grid container className={classes.containercalendar} style={{width:' 65%'}}>
                    <Grid style={{width: '100%'}}>
                        <Schedule
                            ref={this.scheduleChild}
                            selectable={true}
                            nbSchedule={6}
                            bookings={bookings}
                            services={services}
                            handleSelection={this.sendToDrawer}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}

scheduleTest.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true }) (scheduleTest);
