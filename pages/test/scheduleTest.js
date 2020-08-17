import React from 'react';
import Schedule from '../../components/Schedule/Schedule';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import cookie from 'react-cookies'

class scheduleTest extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bookings: [
                {
                    id: 0,
                    service: 'All Day Event very long title',
                    date: new Date(),
                }
            ],
            services: []
        }
    }

    componentDidMount = () => {
      const token = cookie.load('token')
      axios.defaults.headers.common['Authorization'] = token
      axios.get("/myAlfred/api/admin/booking/all")
        .then(response => {
          this.setState({bookings: response.data})
          console.log(`${JSON.stringify(response.data[0])}`)
        }).catch(err => console.log(err))
    }

    render(){
        const {bookings, services} = this.state;

        return(

            <Grid>
                <Schedule
                    selectable={true}
                    nbSchedule={15}
                    bookings={bookings}
                    services={services}
                />
            </Grid>
        );
    }

}

export default scheduleTest
