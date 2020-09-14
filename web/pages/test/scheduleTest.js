import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './style';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import DrawerAndSchedule from '../../components/Drawer/DrawerAndSchedule/DrawerAndSchedule';
import axios from 'axios';
import cookie from 'react-cookies';
import {toast} from 'react-toastify';
const I18N = require('../../utils/i18n');



class scheduleTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availabilities: []
    };
  }

  componentDidMount(){
    this.loadAvailabilities();
  }

  loadAvailabilities = () => {
    axios.get('/myAlfred/api/availability/currentAlfred')
      .then(res => {
        this.setState({availabilities: res.data});
      })
      .catch(err => console.error(err));
  };

  availabilityCreated = (avail) => {

    if (avail._id.length == GID_LEN) {
      avail._id = null;
    }
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.post('/myAlfred/api/availability/add', avail)
      .then(res => {
        toast.info('Disponibilité ajoutée avec succès !');
        axios.get('/myAlfred/api/availability/currentAlfred')
          .then(res => {
            this.setState({availabilities: res.data});
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
        toast.error(err);
      });
  };

  availabilityUpdate = (avail) => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.post('/myAlfred/api/availability/update', avail)
      .then(res => {


        axios.get('/myAlfred/api/availability/currentAlfred')
          .then(res => {
            this.setState({availabilities: res.data});
          })
          .catch(err => console.error(err));
      });
  };



  render() {
    const {availabilities} = this.state;
    const {classes} = this.props;

    return (

      <Grid>
        <DrawerAndSchedule
          availabilityUpdate={this.availabilityUpdate}
          availabilityCreated={this.availabilityCreated}
          title={I18N.SCHEDULE_TITLE}
          SUBTITLE={I18N.SCHEDULE_SUBTITLE}
          availabilities={availabilities}
          onAvailabilityChanged={this.loadAvailabilities}
          removeEventsSelected={this.removeEventsSelected}
        />
      </Grid>
    );
  }

}

scheduleTest.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(scheduleTest);
