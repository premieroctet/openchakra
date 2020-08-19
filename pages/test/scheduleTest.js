import React from 'react';
import Schedule from '../../components/Schedule/Schedule';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import cookie from 'react-cookies'

class scheduleTest extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bookings: [],
            services: [],
            availabilities: [],
        }
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

    render(){
        const {bookings, services, availabilities} = this.state;

        return(

            <Grid>
                <Schedule
                    selectable={true}
                    nbSchedule={1}
                    bookings={bookings}
                    services={services}
                    availabilities={availabilities}
                />
            </Grid>
        );
    }

}

export default scheduleTest
