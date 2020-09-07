import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import MapComponent from '../../components/map';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import cookie from 'react-cookies';
import AlgoliaPlaces from 'algolia-places-react';

const jwt = require('jsonwebtoken');
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

});

class ServicesMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allServices: [],
      selectedService: 'none',
      services: [],
      allServiceCircles: [],
      displayedServiceCircles: [],
      userCircles: [],
      displayUsers:false,
      centerLat: 47.5,
      centerLon: 1.71,
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const auth = cookie.load('token')
    if (!auth) {
      Router.push('/login')
    }
    else {
      axios.defaults.headers.common['Authorization'] = auth
      axios.get("/myAlfred/api/service/allCount")
        .then(response => {
          this.setState({ allServices: response.data })
        })
        .catch(err => console.error(err));
      // Services
      axios.get("/myAlfred/api/admin/serviceUsersMap")
        .then(response => {
          const serviceCircles = response.data.map(s => ({
            coordinates: s.service_address.gps,
            label: `${s.user.firstname}-${s.service.label}`,
            link: `/userServicePreview?id=${s._id}`,
            service: s.service._id,
          }))
          this.setState({
            services: response.data,
            allServiceCircles: serviceCircles
          })
        })
        .catch(err => console.error(err));

      // Users
      axios.get("/myAlfred/api/admin/users/users")
        .then(response => {
          const userCircles = response.data.map(user => ({
            coordinates: user.billing_address.gps,
            label: `${user.firstname}`,
            link: `/viewProfile?id=${user._id}`,
          }))
          this.setState({
            userCircles: userCircles
          })
        })
        .catch(err => console.error(err));
    }
  }

  onChangeCity = suggestion => {
    const lat = suggestion.suggestion.latlng.lat
    const lon = suggestion.suggestion.latlng.lng
    this.setState({ centerLat: lat, centerLon: lon})
  }

  onChange = ev => {
    const { name, value } = ev.target;
    if (name=='selectedService') {
      const displayedServiceCircles = value=='all' ? this.state.allServiceCircles : value=='none' ? [] : this.state.allServiceCircles.filter(s => s.service == value)
      this.setState({
        selectedService: value,
        displayedServiceCircles: displayedServiceCircles
      })
    }
    if (name=='displayUsers') {
      this.setState({[name]: ev.target.checked})
    }
  }

  render() {
    const { classes } = this.props;
    const { displayedServiceCircles, userCircles, allServices, selectedService, displayUsers, centerLat, centerLon} = this.state;

    const allCircles= displayUsers ? userCircles.concat(displayedServiceCircles) : displayedServiceCircles
    return (
      <Layout>
        <Grid style={{width : '100%', height:700}}>
            { /* <MapComponent position={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]} perimeter={serviceUser.perimeter*1000} alfred={alfred.firstname}/> */ }
            <MapComponent position={[centerLat, centerLon]} zoom={6} circles={allCircles}/>
          </Grid>
          <Grid style={{width : '100%'}}>
          <Grid><AlgoliaPlaces
            placeholder='Centrer sur une ville'
            style={{color: '#505050'}}
            options={{
              appId: 'plKATRG826CP',
              apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
              language: 'fr',
              countries: ['fr'],
              type: 'city',
            }}
            onChange={(suggestion) =>this.onChangeCity(suggestion)}
            onClear={()=>this.setState({city:'', gps:null})}
          /></Grid>
          <Grid style={{display: 'flex', 'align-items':'center'}}>
          <Select
            renderValue={selected => selected=='all' ? 'Tous' : selected=='none' ? 'Aucun' : allServices.filter(s => s._id===selected)[0].label}
            name={`selectedService`}
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
            <Grid style={{display: 'flex', 'align-items':'center'}}>
            <Checkbox name={`displayUsers`} checked={this.state.displayUsers} onChange={this.onChange}/>
            <Typography>Afficher les non-Alfred</Typography>
            </Grid>
          </Grid>
      </Layout>
    );
  };
}

export default withStyles(styles)(ServicesMap);
