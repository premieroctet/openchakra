import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import MapComponent from '../../components/map';


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
          services:[],
        }
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const auth = localStorage.getItem('token');
        if(auth === null) {
            Router.push('/login')
        } else {
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
          axios.get("/myAlfred/api/serviceUser/all")
            .then( response => {
              this.setState({services: response.data})
              console.log("Services:"+response.data.length)

            })
            .catch (err => console.error(err));
        }
    }


    render() {
        const { classes } = this.props;

        const circles=this.state.services.map( s => ({coordinates:s.service_address.gps, perimeter:s.perimeter*10}))
        return (
            <Layout>
              <Grid style={{width : '100%', height:600}}>
                  { /* <MapComponent position={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]} perimeter={serviceUser.perimeter*1000} alfred={alfred.firstname}/> */ }
                  <MapComponent position={[46.71, 1.71]} zoom={6} circles={circles}/>
                </Grid>
            </Layout>

        );
    };
}

export default withStyles(styles)(ServicesMap);
