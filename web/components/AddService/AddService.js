import React from 'react';
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './AddServiceStyle';
import cookie from 'react-cookies';
import WithTopic from "../../hoc/Topic/Topic"
import {Button} from '@material-ui/core'
import {SHOP} from '../../utils/i18n'
import Box from '../Box/Box'

class AddService extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
  }

  addService() {
    Router.push(`/myShop/services?user={this.props.user}`)
  }

  render() {
    const {classes}=this.props

    return (
      <Box>
      <div style={{ display: 'flex', flexDirection:'column', alignItems:'center', padding:'7%'}}>
        <h3>Mes services</h3>
        <div>Ajoutez un service dans votre boutique</div>
        <Button variant={'outlined'} classes={{root : classes.newsLetterButton}} onClick={this.addService}>
          {SHOP.addService}
        </Button>
      </div>
      </Box>
    )
  }
}

export default withStyles(styles, {withTheme: true})(AddService)
