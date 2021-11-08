import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './style';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import DrawerAndSchedule from '../../components/Drawer/DrawerAndSchedule/DrawerAndSchedule';
import axios from 'axios';
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
const I18N = require('../../utils/i18n');


class scheduleTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      availabilities: [],
    }
  }

  componentDidMount() {
    this.loadAvailabilities()
  }

  loadAvailabilities = () => {
    axios.get('/myAlfred/api/availability/currentAlfred')
      .then(res => {
        this.setState({availabilities: res.data})
      })
      .catch(err => console.error(err))
  }

  availabilityCreated = avail => {

    if (avail._id.length == GID_LEN) {
      avail._id = null
    }
    setAxiosAuthentication()
    axios.post('/myAlfred/api/availability/add', avail)
      .then(() => {
        snackBarSuccess('Disponibilité ajoutée avec succès !')
        axios.get('/myAlfred/api/availability/currentAlfred')
          .then(res => {
            this.setState({availabilities: res.data})
          })
          .catch(err => console.error(err))
      })
      .catch(err => {
        console.error(err)
        snackBarError(err)
      })
  }

  availabilityUpdate = avail => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/availability/update', avail)
      .then(() => {
        axios.get('/myAlfred/api/availability/currentAlfred')
          .then(res => {
            this.setState({availabilities: res.data})
          })
          .catch(err => console.error(err))
      })
  }


  render() {
    const {availabilities} = this.state

    return (
      <Grid>
        <DrawerAndSchedule
          availabilityUpdate={this.availabilityUpdate}
          availabilityCreated={this.availabilityCreated}
          title={ReactHtmlParser(this.props.t('SCHEDULE_TITLE'))}
          SUBTITLE={ReactHtmlParser(this.props.t('SCHEDULE_SUBTITLE'))}
          availabilities={availabilities}
          selectable={true}
        />
      </Grid>
    )
  }

}

scheduleTest.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(scheduleTest)
