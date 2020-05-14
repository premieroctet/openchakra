import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {
  Typography
}
from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  withStyles
}
from '@material-ui/core/styles';
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
      selectedService: '',
      services: [],
      circles: [],
    }
    this.onChangeService = this.onChangeService.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const auth = localStorage.getItem('token');
    if (auth === null) {
      Router.push('/login')
    }
    else {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.get("/myAlfred/api/service/all")
        .then(response => {
          this.setState({
            allServices: response.data,
          })
        })
        .catch(err => console.error(err));
      axios.get("/myAlfred/api/serviceUser/all")
        .then(response => {
          const circles = response.data.map(s => ({
            coordinates: s.service_address.gps,
            label: `${s.user.firstname}-${s.service.label}`,
            link: `/userServicePreview?id=${s._id}`,
          }))
          this.setState({
            services: response.data,
            circles: circles
          })
        })
        .catch(err => console.error(err));
    }
  }

  onChangeService = ev => {
    const {
      name,
      value
    } = ev.target;
    const filtered = this.state.services.filter(s => s.service._id.toString() == value)
    const circles = filtered.map(s => ({
      coordinates: s.service_address.gps,
      label: `${s.user.firstname}-${s.service.label}`,
      link: `/userServicePreview?id=${s._id}`,
    }))
    this.setState({
      selectedService: value,
      circles: circles
    })
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      circles,
      allServices,
      serviceSelected
    } = this.state;

    return (
      <Layout>
        <Grid style={{width : '100%', height:600}}>
            { /* <MapComponent position={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]} perimeter={serviceUser.perimeter*1000} alfred={alfred.firstname}/> */ }
            <MapComponent position={[46.71, 1.71]} zoom={6} circles={circles}/>
          </Grid>
          <Grid style={{width : '100%'}}>
          <Typography>{circles.length} services</Typography>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            renderValue={selected => allServices.filter(s => s._id===selected)[0].label}
            value={serviceSelected}
            onChange={this.onChangeService}
          >
            {allServices.map(s => (
              <MenuItem value={s._id}>{s.label}</MenuItem>
            ))}

            </Select>
          </Grid>
      </Layout>
    );
  };
}

export default withStyles(styles)(ServicesMap);
