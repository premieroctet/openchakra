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
            services: []
        };
        this.changeIconLogo = this.changeIconLogo.bind(this)
    }

    componentDidMount = () => {
      const token = cookie.load('token')
      axios.defaults.headers.common['Authorization'] = token
      axios.get("/myAlfred/api/admin/booking/all")
        .then(response => {
          this.setState({bookings: response.data})
          console.log(`${JSON.stringify(response.data[0])}`)
        }).catch(err => console.log(err))
    };

    callDrawer = () =>{
        this.child.current.handleDrawerToggle();
    };

    changeIconLogo = () =>{
        //console.log(this.child.current.state)
        console.log('bonjour')
    };

    render(){
        const {bookings, services} = this.state;
        const { classes } = this.props;

        return(

            <Grid>
                <Grid className={classes.toggle}>
                    <Grid>
                        <DrawerSchedule ref={this.child} bonjour={() => this.changeIconLogo}/>
                    </Grid>
                    <Grid>
                        <Grid style={{position: 'fixed', bottom: '2%', zIndex: 6, right: 0}}>
                            <Fab color="primary" aria-label="add"
                                 onClick={this.callDrawer}
                                 className={classes.menuButton}>
                                <AddIcon style={{color: 'white'}}/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={classes.containercalendar} style={{width:' 70%'}}>
                    <Grid>
                        <Schedule
                            selectable={true}
                            nbSchedule={15}
                            bookings={bookings}
                            services={services}
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
