import React, {Component,Fragment} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr'
import 'react-big-calendar/lib/css/react-big-calendar.css';


const axios = require('axios');


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);// or globalizeLocalizer


class Calendar extends Component {

    constructor(...args) {
        super(...args);

        this.state = { cal_events: [] };


    }


    componentDidMount() {
        let self = this;
        axios.get('http://localhost:3122/myAlfred/api/calendar/all')
            .then(function (response) {

                let events = response.data;

                for (let i = 0; i < events.length; i++) {

                    for (let j =0; j< events[i].events.length; j++){

                        events[i].events[j].start = moment.utc(events[i].events[j].start).toDate();
                        events[i].events[j].end = moment.utc(events[i].events[j].end).toDate();


                    }
                    self.setState({
                        cal_events:events[i].events
                    })
                }


            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name');
        if (title){
            this.setState({
                cal_events: [
                    ...this.state.cal_events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('http://localhost:3122/myAlfred/api/calendar/add', {
            title: title,
            start: start,
            end: end
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            window.location.reload();
    }};
    onDeleteClick(id) {
        const r = window.confirm("Would you like to remove this event?");
        if(r) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios
                .delete(`http://localhost:3122/myAlfred/api/calendar/event/${id}`)
                .then(res =>
                    console.log(res)
                )
                .catch(err =>
                    console.log(err)
                );





        }
    }








    render() {
        const { cal_events } = this.state;
        const events = cal_events.map(event => (

            <tr key={event._id}>
                <td>{event.title}</td>
                <td>{moment(event.start).format('l')}</td>
                <td>
                    <button
                        onClick={this.onDeleteClick.bind(this, event._id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>

        ));

        return (
            <Fragment>
            <div style={{height: 700}}>
                <BigCalendar
                    selectable
                    localizer={localizer}
                    events={cal_events}
                    defaultView={'week'}
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={this.handleSelect}
                />
            </div>
            <div><table>
    <tbody>{events}</tbody>
            </table></div>
            </Fragment>
        )
    }
}


export default Calendar
