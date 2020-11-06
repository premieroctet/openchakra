import React from 'react';
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './AddServiceStyle';
import cookie from 'react-cookies';
import {Button} from '@material-ui/core'
import {SHOP} from '../../utils/i18n'
import Box from '../Box/Box'
import Typography from "@material-ui/core/Typography";

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
      <Box>
        <Grid style={{ display: 'flex', flexDirection:'column', alignItems:'center'}}>
          <h3>Mes services</h3>
          <Typography>Ajoutez un service dans votre boutique</Typography>
          <Button variant={'outlined'} classes={{root : classes.newsLetterButton}} onClick={this.addService}>
            {SHOP.addService}
          </Button>
        </Grid>
      </Box>
    )
  }
}

export default withStyles(styles)(AddService)
