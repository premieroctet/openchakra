import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import Router from 'next/router'
import Select from '@material-ui/core/Select'
import axios from 'axios'

import Layout from '../../hoc/Layout/Layout'
import LocationSelect from '../../components/Geo/LocationSelect'
import MapComponent from '../../components/map'

const {getLoggedUserId}=require('../../utils/context')
const {setAxiosAuthentication}=require('../../utils/authentication')

const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
    marginTop: '100px',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
  mediumAvatar: {
    width: 100,
    height: 100,
    marginTop: -10,
    fontSize: 50,
  },
  bigAvatar: {
    width: 200,
    height: 200,
    marginTop: -10,
    fontSize: 100,
  },

})

class ServicesMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allServices: [],
      selectedService: 'none',
      services: [],
      allServiceCircles: [],
      displayedServiceCircles: [],
      userCircles: [],
      displayUsers: false,
      centerLat: 47.5,
      centerLon: 1.71,
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    if (!getLoggedUserId()) {
      Router.push('/login')
    }
    else {
      setAxiosAuthentication()
      axios.get('/myAlfred/api/service/allCount')
        .then(response => {
          this.setState({allServices: response.data})
        })
        .catch(err => console.error(err))
      // Services
      axios.get('/myAlfred/api/admin/serviceUsersMap')
        .then(response => {
          const serviceCircles = response.data.map(s => ({
            coordinates: s.service_address.gps,
            label: <>{s.user.full_name}<br/>{s.service.label}<br/>{s.service_address.city}</>,
            link: `/userServicePreview?id=${s._id}`,
            service: s.service._id,
          }))
          this.setState({
            services: response.data,
            allServiceCircles: serviceCircles,
          })
        })
        .catch(err => console.error(err))

      // Users
      axios.get('/myAlfred/api/admin/users/users')
        .then(response => {
          const userCircles = response.data.map(user => ({
            coordinates: user.billing_address.gps,
            label: <>{user.full_name}<br/>{user.billing_address.city}</>,
            link: `/viewProfile?id=${user._id}`,
          }))
          this.setState({
            userCircles: userCircles,
          })
        })
        .catch(err => console.error(err))
    }
  }

  onChangeCity = suggestion => {
    const lat = suggestion.suggestion.latlng.lat
    const lon = suggestion.suggestion.latlng.lng
    this.setState({centerLat: lat, centerLon: lon})
  };

  onChange = ev => {
    const {name, value} = ev.target
    if (name == 'selectedService') {
      const displayedServiceCircles = value == 'all' ? this.state.allServiceCircles : value == 'none' ? [] : this.state.allServiceCircles.filter(s => s.service == value)
      this.setState({
        selectedService: value,
        displayedServiceCircles: displayedServiceCircles,
      })
    }
    if (name == 'displayUsers') {
      this.setState({[name]: ev.target.checked})
    }
  };

  render() {
    const {classes} = this.props
    const {displayedServiceCircles, userCircles, allServices, selectedService, displayUsers, centerLat, centerLon} = this.state

    const allCircles = displayUsers ? userCircles.concat(displayedServiceCircles) : displayedServiceCircles
    return (
      <Layout>
        <Grid style={{width: '100%', height: 700}}>
          { /* <MapComponent position={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]} perimeter={serviceUser.perimeter*1000} alfred={alfred.firstname}/> */}
          <MapComponent position={[centerLat, centerLon]} zoom={6} circles={allCircles}/>
        </Grid>
        <Grid style={{width: '100%'}}>
          <Grid style={{display: 'flex', 'align-items': 'center'}}>
            <h2>Centrer sur une ville</h2>&nbsp;
            <LocationSelect
              placeholder='Centrer sur une ville'
              style={{color: '#505050'}}
              type='city'
              onChange={suggestion => this.onChangeCity(suggestion)}
              onClear={() => this.setState({city: '', gps: null})}
            /></Grid>
          <Grid style={{display: 'flex', 'align-items': 'center'}}>
            <h2>Sélectionner les services</h2>&nbsp;
            <Select
              renderValue={selected => (selected == 'all' ? 'Tous' : selected == 'none' ? 'Aucun' : allServices.filter(s => s._id === selected)[0].label)}
              name={'selectedService'}
              value={selectedService}
              onChange={this.onChange}
            >
              <MenuItem value={'all'}>Tous</MenuItem>
              <MenuItem value={'none'}>Aucun</MenuItem>
              {allServices.map(s => (
                <MenuItem value={s._id}>{s.label}</MenuItem>
              ))}

            </Select>
            <Typography>{displayedServiceCircles.length} services</Typography>
          </Grid>
          <Grid style={{display: 'flex', 'align-items': 'center'}}>
            <Checkbox name={'displayUsers'} checked={this.state.displayUsers} onChange={this.onChange}/>
            <Typography>Afficher les non-Alfred</Typography>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default withStyles(styles)(ServicesMap)
