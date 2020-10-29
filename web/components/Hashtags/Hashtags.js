import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './HashtagsStyle';
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
import PersonIcon from '@material-ui/icons/Person';
import UserAvatar from '../Avatar/UserAvatar'
const {frenchFormat} = require('../../utils/text')
const moment=require('moment')
moment.locale('fr')

class InnerHashtags extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props

    return (
      <div style={{display: 'flex', flexDirection:'column'}}>
        HASHTAGS
      </div>
    )
  }

}

const OuterHastags=WithTopic(InnerHashtags)

class Hashtags extends React.Component {

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
    return (
      <OuterHastags user={user} titleTopic={`Les tags de ${user ? user.firstname:''}`} />
    )
  }

}

export default withStyles(styles, {withTheme: true})(Hashtags)
