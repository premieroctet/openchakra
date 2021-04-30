const {setAxiosAuthentication}=require('../../../utils/authentication')
import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
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
const {MANGOPAY_CONFIG}=require('../../../config/config')
const regions=require('../../../static/assets/data/regions')


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
      users: [],
    };

  this.columnDefs=[
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Statut", field: "status", cellRenderer: 'statusCellRenderer', filter:'statusCellFilter'},
      {headerName: "Prénom", field: "firstname"},
      {headerName: "Nom", field: "name"},
      {headerName: "Email", field: "email"},
      {headerName: "Ville", field: "billing_address.city"},
      {headerName: "CP", field: "billing_address.zip_code"},
      {headerName: "Région", field: "region"},
      {headerName: "Tel", field: "phone"},
      {headerName: "Né(e) le", field: "birthday_moment", cellRenderer: 'dateCellRenderer', filter:'agDateColumnFilter',},
      {headerName: "Inscrit le", field: "creation_date", cellRenderer: 'dateTimeCellRenderer', filter:'agDateColumnFilter', initialSort: 'desc'},
      {headerName: "Création boutique", field: "shop.creation_date", cellRenderer: 'dateTimeCellRenderer', filter:'agDateColumnFilter'},
      {headerName: "Client Mangopay", field: "id_mangopay"},
      {headerName: "Alfred Mangopay", field: "mangopay_provider_id"},
      {headerName: "Warning", field: "warning", cellRenderer: 'warningCellRenderer'},
    ]

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/users/all')
      .then((response) => {
        let users = response.data;
        users=users.map( u => {
          u.status={'alfred':u.is_alfred, 'admin': u.is_admin}
          u.birthday_moment = moment(u.birthday)
          u.shop = u.shop.pop()
          if (!(u.billing_address && u.billing_address.gps && u.billing_address.gps.lat)) {
            u.warning='Adresse incorrecte'
          }
          if (u.billing_address && u.billing_address.zip_code) {
            u.region = (regions.find(r => u.billing_address.zip_code.startsWith(r.num_dep)) || {}).region_name
          }
          return u
        })
        this.setState({users:users});
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          Router.push({pathname: '/login'});
        }
      });
  }

  onCellClicked = event => {
    // window.open(`/dashboard/users/view?id=${data._id}`, '_blank')
    const {colDef, rowIndex, data, value}=event

    if (colDef.field=='shop.creation_date') {
      if (data.shop) {
        window.open(`/profile/services?user=${data._id}&indexAccount=1`, '_blank')
      }
      return
    }
    if (['id_mangopay', 'mangopay_provider_id'].includes(colDef.field)) {
      if (value) {
        const sandbox = MANGOPAY_CONFIG.sandbox
        const mangopay_base_url = sandbox ? 'https://dashboard.sandbox.mangopay.com' : 'https://dashboard.mangopay.com'
        window.open(`${mangopay_base_url}/User/${value}/Details`)
      }
      return
    }

    window.open(`/profile/about?user=${data._id}&indexAccount=0`)
  }

  render() {
    const {classes} = this.props;
    const {users} = this.state;

    if (users.length==0) {
      return null
    }
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
              <BigList
                data={users}
                columnDefs={this.columnDefs}
                classes={classes}
                title={'Utilisateurs'}
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
