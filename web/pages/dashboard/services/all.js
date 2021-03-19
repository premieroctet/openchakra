const {clearAuthenticationToken}=require('../../../utils/authentication')
const {setAxiosAuthentication}=require('../../../utils/authentication')
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
      service: [],
    };
  this.columnDefs=[
      {headerName: "Label", field: "label"},
      {headerName: "Catégorie", field: "category_label"},
      {headerName: "Pros", field: "professional_access", cellRenderer:'booleanCellRenderer'},
      {headerName: "Particuliers", field: "particular_access", cellRenderer:'booleanCellRenderer'},
      {headerName: "Illustration", field: "picture", cellRenderer:'pictureCellRenderer'},
    ]
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/service/all')
      .then((response) => {
        let service = response.data;
        this.setState({
          service: service.map( s => {
            s.picture='/'+s.picture;
            console.log(JSON.stringify(s.category))
            s.category_label = [s.category.particular_label, s.category.professional_label].join('/');
            return s
          })
        });
      }).catch((error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 403) {
        clearAuthenticationToken()
        Router.push({pathname: '/login'});
      }
    });
  }

  onRowClicked = event => {
    if (event) {
      window.open(`/dashboard/services/view?id=${event.data._id}`, '_blank')
    }
  }

  onAddClick = () => {
    window.open(`/dashboard/services/add`, '_blank')
  }

  render() {
    const {classes} = this.props;
    const {service} = this.state;
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
               <BigList data={service} columnDefs={this.columnDefs} classes={classes}
                        title={'Services'} onRowClicked={this.onRowClicked} onAddClick={this.onAddClick}/>
              </Paper>
            </Grid>
        </Grid>
      </Layout>
    );
  };
}

export default withStyles(styles)(all);
