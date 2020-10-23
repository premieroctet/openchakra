import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './IntroductionStyle';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import cookie from 'react-cookies';
import WithTopic from "../../hoc/Topic/Topic"
import ListAlfredConditions from "../ListAlfredConditions/ListAlfredConditions";
import RoomIcon from '@material-ui/icons/Room';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

class Introduction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { user: res.data})
      })
      .catch (err => console.error(err))
  }

  render() {

    const {user} = this.state
    var places= user ?`${user.billing_address.city}, ${user.billing_address.country}` : ''
    /**
    if (user) {
      user.service_address.forEach( sa => {
        places+=`;${sa.city}, France`
        }
      )
    }
    */

    const wrapperComponentProps= user ?
      [
        {
          label: 'Lieux',
          summary: places,
          IconName: user.firstname ? <RoomIcon fontSize="large"/> : ''
        },
        {
          label: 'Langues',
          summary: user.languages.join(',') || 'Français',
          IconName:  user.firstname ? <ChatBubbleOutlineOutlinedIcon fontSize="large"/> : ''
        },
        {
          label:  'Vérification',
          summary: user.id_card_status_text,
          IconName:  user.firstname ? <CheckCircleOutlineIcon fontSize="large"/> : ''
        },
      ]
      :
      null

    return (
      <ListAlfredConditions wrapperComponentProps={wrapperComponentProps} />
    )
  }


}

export default withStyles(styles, {withTheme: true})(Introduction)
