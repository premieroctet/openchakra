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


class scheduleTest extends React.Component{
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state={
            bookings: [
                {
                    id: 0,
                    service: 'All Day Event very long title',
                    date: new Date(),
                }
            ],
            services: [],
            availabilities: [],
        };
        this.changeIconLogo = this.changeIconLogo.bind(this)
    }

    componentDidMount = () => {
      const token = cookie.load('token')
      axios.defaults.headers.common['Authorization'] = token
      axios.get("/myAlfred/api/admin/booking/all")
        .then(response => {
          console.log(`Got ${response.data.length} bookings`)
          this.setState({bookings: response.data})
        }).catch(err => console.log(err))
        axios.get("/myAlfred/api/availability/all")
          .then(response => {
            this.setState({availabilities: response.data.slice(0, 2)})
          }).catch(err => console.log(err))
    }

    callDrawer = () =>{
        this.child.current.handleDrawerToggle();
    };

    changeIconLogo = () =>{
        //console.log(this.child.current.state)
        console.log('bonjour')
    };

    render(){
        const {bookings, services, availabilities} = this.state;
        const { classes } = this.props;

        return(

            <Grid>
                <Schedule
                    selectable={true}
                    nbSchedule={5}
                    bookings={bookings}
                    availabilities={availabilities}
                />
            </Grid>
        );
    }

}

scheduleTest.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true }) (scheduleTest);
