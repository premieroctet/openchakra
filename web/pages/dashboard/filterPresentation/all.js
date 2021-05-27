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
      filterPresentation: [],
    };
  this.columnDefs=[
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Label", field: "label", comparator: insensitiveComparator},
    ]
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/filterPresentation/all')
      .then((response) => {
        let filterPresentation = response.data;
        this.setState({filterPresentation: filterPresentation});
      }).catch((error) => {
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
    window.open(`/dashboard/filterPresentation/view?id=${data._id}`, '_blank')
  }

  render() {
    const {classes} = this.props;
    const {filterPresentation} = this.state;

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width:'100%'}}>
          <Grid style={{width: '90%'}}>
            <Paper style={{width: '100%'}}>
              <BigList
                data={filterPresentation}
                columnDefs={this.columnDefs}
                classes={classes}
                title={"Filtres de présentation"}
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
