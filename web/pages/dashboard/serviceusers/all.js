const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')
import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
const  {BigList}=require('../../../components/BigList/BigList')
const moment = require('moment-timezone');
moment.locale('fr');
const {insensitiveComparator}=require('../../../utils/text')


const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',
  },
});

class all extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };

  this.columnDefs=[
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Email", field: "user.email", comparator: insensitiveComparator},
      {headerName: "Pro", field: "user.shop.is_professional", cellRenderer: 'booleanCellRenderer'},
      {headerName: "Service", field: "service.label", comparator: insensitiveComparator},
      {headerName: "Catégorie", field: "service.category.label", comparator: insensitiveComparator},
      {headerName: "Localisation (Client/Alfred/Visio)", field: "location", cellRenderer: 'locationRenderer'},
      {headerName: "Code postal", field: "service_address.zip_code"},
      {headerName: "Ville", field: "service_address.city", comparator: insensitiveComparator},
    ]

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/serviceusers/all')
      .then( response => {
        let services = response.data;
        services.forEach( s => {
          try {
            s.user.shop.is_professional = Boolean(s.user.shop[0].is_professional)
          }
          catch (error) {
            console.error(`Err on ${s._id}:${error}`)
          }
        });
        this.setState({services: services});
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401 || error.response.status === 403) {
	  clearAuthenticationToken()
          Router.push({pathname: '/'});
        }
      });
  }

  onCellClicked = event => {
    // window.open(`/dashboard/users/view?id=${data._id}`, '_blank')
    const {colDef, rowIndex, data, value}=event

    if (colDef.field=='service.label') {
      window.open(`/userServicePreview?id=${data._id}`, '_blank')
    }
    else {
      window.open(`/profile/about?user=${data.user._id}`, '_blank')
    }
  }

  render() {
    const {classes} = this.props;
    const {services} = this.state;

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width:'100%'}}>
          <Grid style={{width: '90%'}}>
            <Paper style={{width: '100%'}}>
              <BigList
                data={services}
                columnDefs={this.columnDefs}
                classes={classes}
                title={"Services d'Alfred"}
                onCellClicked={this.onCellClicked}
              />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    );
  };
}

export default withStyles(styles)(all);
