import React from 'react';
import Schedule from '../../components/Schedule/Schedule';
import Grid from '@material-ui/core/Grid';

class scheduleTest extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            events: [
                {
                    id: 0,
                    title: 'All Day Event very long title',
                    allDay: true,
                    start: new Date(),
                    end: new Date(),
                }
            ],
            services: []
        }
    }



    render(){
        const {events, services} = this.state;

        return(

            <Grid>
                <Schedule
                    selectable={true}
                    nbSchedule={1}
                    availabilities={events}
                    services={services}
                />
            </Grid>
        );
    }

}

export default scheduleTest
