import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import Router from 'next/router';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
const  {BigList}=require('../../components/BigList/BigList')
const moment = require('moment-timezone');
moment.locale('fr');
const {insensitiveComparator}=require('../../utils/text')
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')

const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
});

class DataPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

  this.columnDefs=[
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Label", field: "label"},
    ]
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()
    this.loadData()
  }

  onCellClicked = data => {
    if (data) {
      window.open(`/dashboard/billing/view?id=${data._id}`, '_blank')
    }
  }

  onAddClick = () => {
    window.open(`/dashboard/billing/add`, '_blank')
  }

  render() {
    const {classes} = this.props;
    const {billings} = this.state;

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width:'100%'}}>
          <Grid style={{width: '90%'}}>
            <Paper style={{width: '100%'}}>
              <BigList
                data={billings}
                columnDefs={this.columnDefs}
                classes={classes}
                title={"Services d'Alfred"}
                onCellClicked={this.onCellClicked}
		            onAddClick={this.onAddClick}
              />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    );
  };
}

//export default withStyles(styles)(DataPage);
export default DataPage
