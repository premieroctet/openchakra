const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')
import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
const  {BigList}=require('../../../components/BigList/BigList')
const moment = require('moment-timezone');
moment.locale('fr');

const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
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
});

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
});

class all extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };

  this.columnDefs=[
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Label", field: "label"},
      {headerName: "Titre", field: "title"},
      {headerName: "Description", field: "description"},
    ]
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/tags/all')
      .then((response) => {
        let tags = response.data;
        this.setState({tags: tags});
      }).catch((error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 403) {
        Router.push({pathname: '/login'});
      }
    });
  }

  onRowClick = data => {
    if (data) {
      window.open(`/dashboard/tags/view?id=${data._id}`, '_blank')
    }
  }


  render() {
    const {classes} = this.props;
    const {tags} = this.state;

    return (
      <Layout>
        <Grid container style={{marginTop: 70}}>
        </Grid>
        <Grid container className={classes.signupContainer} style={{width:'100%'}}>
	  <Link href={'/dashboard/home'}>

            <Typography className="retour"><HomeIcon className="retour2"/> <span>Retour dashboard</span></Typography>
	  </Link>
            <Grid style={{width: '90%'}}>
              <Paper style={{width: '100%'}}>
               <BigList data={tags} columnDefs={this.columnDefs} classes={classes}
                        title={'Tags'} onRowClick={this.onRowClick} />
              </Paper>
            </Grid>
        </Grid>
      </Layout>
    );
  };
}

export default withStyles(styles)(all);
