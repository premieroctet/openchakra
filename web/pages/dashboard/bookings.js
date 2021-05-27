const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../../hoc/Layout/Layout';
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
const {BigList}=require('../../components/BigList/BigList')
const {insensitiveComparator}=require('../../utils/text')


const moment = require('moment');

const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
    marginTop: '20px',
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
      bookings: [],
    };

    this.columnDefs=[
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Date réservation", field: "date", cellRenderer: 'dateTimeCellRenderer'},
      {headerName: "Date prestation", field: "prestation_date", comparator: insensitiveComparator},
      {headerName: "Service", field: "service", comparator: insensitiveComparator},
      {headerName: "Client", field: "user.full_name", comparator: insensitiveComparator},
      {headerName: "Alfred", field: "alfred.full_name", comparator: insensitiveComparator},
      {headerName: "Montant client", field: "amount"},
      {headerName: "Statut", field: "status"},
      {headerName: "Virement", field: "paid", cellRenderer: 'booleanCellRenderer'},
    ]

  }


  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/booking/all')
      .then(response => {
        const bookings = response.data
        bookings.forEach( b => {
          b.prestation_date = `${b.date_prestation} ${moment(b.time_prestation).format('HH:mm')}`
        })
        this.setState({bookings: response.data});
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

    if (colDef.field=='user.full_name') {
      window.open(`/profile/about?user=${data.user._id}`, '_blank')
    }
    if (colDef.field=='alfred.full_name') {
      window.open(`/profile/about?user=${data.alfred._id}`, '_blank')
    }
    if (colDef.field=='service') {
      window.open(`/userServicePreview?id=${data.serviceUserId}`, '_blank')
    }
  }


  render() {
    const {classes} = this.props;
    const {bookings} = this.state;

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width:'100%'}}>
          <Grid style={{width: '90%'}}>
            <Paper style={{width: '100%'}}>
                <BigList
                  data={bookings}
                  columnDefs={this.columnDefs}
                  classes={classes}
                  title={'Réservations'}
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
