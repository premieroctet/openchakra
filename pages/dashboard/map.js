import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import MapComponent from '../../components/map';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import cookie from "react-cookies";

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
      selectedService: 'all',
      services: [],
      serviceCircles: [],
      userCircles: [],
      displayUsers:false,
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
      axios.get("/myAlfred/api/serviceUser/all")
        .then(response => {
          const serviceCircles = response.data.map(s => ({
            coordinates: s.service_address.gps,
            label: `${s.user.firstname}-${s.service.label}`,
            link: `/userServicePreview?id=${s._id}`,
          }))
          this.setState({
            services: response.data,
            serviceCircles: serviceCircles
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

  onChange = ev => {
    const { name, value } = ev.target;
    if (name=='selectedService') {
      const filtered = value=='all' ? this.state.services : value=='none' ? [] : this.state.services.filter(s => s.service._id.toString() == value)
      const serviceCircles = filtered.map(s => ({
        coordinates: s.service_address.gps,
        label: `${s.user.firstname}-${s.service.label}`,
        link: `/userServicePreview?id=${s._id}`,
      }))
      this.setState({
        selectedService: value,
        serviceCircles: serviceCircles
      })
    }
    if (name=='displayUsers') {
      this.setState({[name]: ev.target.checked})
    }
  }

  render() {
    const { classes } = this.props;
    const { serviceCircles, userCircles, allServices, selectedService, displayUsers, } = this.state;

    const allCircles= displayUsers ? userCircles.concat(serviceCircles) : serviceCircles
    return (
      <Layout>
        <Grid style={{width : '100%', height:700}}>
            { /* <MapComponent position={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]} perimeter={serviceUser.perimeter*1000} alfred={alfred.firstname}/> */ }
            <MapComponent position={[47.5, 1.71]} zoom={6} circles={allCircles}/>
          </Grid>
          <Grid style={{width : '100%'}}>
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
            <Typography>{serviceCircles.length} services</Typography>
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
