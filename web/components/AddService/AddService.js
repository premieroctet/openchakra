import React from 'react';
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/components/AddService/AddService';
import cookie from 'react-cookies';
import {Button} from '@material-ui/core'
import {SHOP} from '../../utils/i18n'
import Box from '../Box/Box'
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Hidden from "@material-ui/core/Hidden";

class AddService extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
  };

  addService() {
    Router.push(`/myShop/services?user={this.props.user}`)
  }

  render() {
    const {classes}=this.props;

    return (
      <Grid className={classes.containerAddService}>
        <Hidden only={['xs', 'sm', 'md']}>
          <h3>Mes services</h3>
        </Hidden>
        <Button classes={{root : classes.buttonAddService}} onClick={this.addService} startIcon={<AddCircleOutlineIcon />}
        >
          {SHOP.addService}
        </Button>
        <Typography className={classes.descriptionAddService}>Développez votre boutique et ajoutez de nouveaux services !</Typography>
      </Grid>
    )
  }
}

export default withStyles(styles)(AddService)
