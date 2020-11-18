import Link from 'next/link';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/components/About/About';
import cookie from 'react-cookies';
import ListAlfredConditions from "../ListAlfredConditions/ListAlfredConditions";
import RoomIcon from '@material-ui/icons/Room';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import UserAvatar from '../Avatar/UserAvatar'
import Box from '../Box/Box'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Topic from '../../hoc/Topic/Topic'
import AlgoliaPlaces from 'algolia-places-react'
import MultipleSelect from 'react-select'
import {LANGUAGES} from '../../utils/consts'
import CreateIcon from '@material-ui/icons/Create'
import {isEditableUser} from '../../utils/functions'
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from '@material-ui/icons/Delete';

const {frenchFormat} = require('../../utils/text');
const moment=require('moment');
moment.locale('fr');

class MessageSummary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      relativeDetails: null,
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get('/myAlfred/api/chatRooms/userChatRooms')

  }
  getLastMessage = () => {
    var {chats, relative}=this.props
    const messages=[]
    chats = chats.filter(c => c.emitter._id==relative._id || c.recipient._id==relative._id)
    chats = chats.sort( (c1, c2) => c2.latest-c1.latest)
    return chats[0].messages.reverse()[0]
  }

  deleteMessages = e => {
    e.stopPropagation()
    window.alert('Delete')
  }

  render() {
    const {relative, chats}=this.props

    const last = this.getLastMessage()
    return (
      <Grid container style={{ width:'100%', display:'flex', flexDirection:'row'}} onClick={() => this.props.cbDetails(relative._id)}>
        <Grid xs={1}>
        <UserAvatar user={relative} />
        </Grid>
        <Grid xs={7} container style={{ width:'100%', display:'flex', flexDirection:'column'}}>
          <Grid item>
            <div>{relative.firstname}</div>
          </Grid>
          <Grid item>
            <div>{last.content}</div>
          </Grid>
        </Grid>
        <Grid xs={2} container style={{ width:'100%', display:'flex', flexDirection:'column'}}>
          <Grid item>
            {`Le ${moment(last.date).format('DD/MM')}`}
          </Grid>
          <Grid item>
            <DeleteIcon onClick={this.deleteMessages} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(MessageSummary)
