import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import AddService from '../../components/AddService/AddService'
import Services from '../../components/Services/Services'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/profile/services/services';
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import Box from "../../components/Box/Box";
import axios from "axios";
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";
const {isEditableUser}=require('../../utils/functions');
import Layout from '../../hoc/Layout/Layout'
import UserAvatar from '../../components/Avatar/UserAvatar'
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import cookie from 'react-cookies'
const moment=require('moment');
import MessageSummary from '../../components/MessageSummary/MessageSummary'
import _ from 'lodash'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MessagesDetails from '../../components/MessagesDetails/MessagesDetails'
import LayoutMessages from "../../hoc/Layout/LayoutMessages";
import {getLoggedUserId} from '../../utils/functions'
import Divider from '@material-ui/core/Divider';

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state={
      tabIndex:0,
      chats: [],
      visibleDetails: false,
    };
    setTimeout( () => this.setState({visibleDetails: true}), 1000)
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get('/myAlfred/api/chatRooms/userChatRooms')
      .then( res => {
        const chats=res.data.filter(c => c.latest && c.booking && c.booking.alfred && c.messages && c.messages.length>0)
        this.setState({chats: chats})
      })
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  getRelatives = () => {
    var {chats, tabIndex} = this.state;
    if (!chats || chats.length===0) {
      return []
    }
    // Tab index 0 : Alfred, 1 : client
    // Filter chats for Alfred or client
    if (tabIndex===0) {
      chats=chats.filter(c => c.booking.alfred===this.props.user)
    }
    else {
      chats=chats.filter(c => c.booking.alfred!==this.props.user)
    }
    chats = chats.sort( (c1, c2) => moment(c2.latest)-moment(c1.latest));
    const users=_.uniqBy(chats.map( c => c.emitter._id.toString()===this.props.user ? c.recipient : c.emitter), '_id');
    return users
  };

  openMessagesDetails = relativeId => {
    this.setState({ relativeDetails: relativeId})
  };

  messageDetails = () => {
    const {relativeDetails, chats}=this.state;
    const filteredChats = chats.filter(c => c.emitter._id===relativeDetails || c.recipient._id===relativeDetails);

    return (
      <Dialog
        style={{width: '100%'}}
        open={this.state.relativeDetails}
        onClose={() => this.setState({relativeDetails: null})}
      >
        <DialogContent>
          <MessagesDetails
            chatroomId={'5f1827ec04711c1f1e3b82e7'}
            id={'5f1827ec04711c1f1e3b82e7'}
            booking={'5f1827ec04711c1f1e3b82e8'}
            relative={this.state.relativeDetails}
            chats={filteredChats}/>
        </DialogContent>
      </Dialog>
    )
  };

  handleChange = () => {
    let childState = this.child.current.state;
    this.setState({tabIndex: childState.tabIndex})
  };

  content = (classes) => {
    const relatives = this.getRelatives();
    return(
      <Grid style={{width: '100%'}}>
        <Grid>
          <Grid>
            <h2>Mes messages</h2>
          </Grid>
          <Grid>
            <Typography>{`Vous avez ${relatives.length} conversations `}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{marginTop: '3vh', marginBottom: '3vh'}}/>
        </Grid>
        {relatives.map( m => {
          return (
            <Grid>
              <Grid>
                <MessageSummary chats={this.state.chats} relative={m} cbDetails={this.openMessagesDetails}/>
              </Grid>
              <Grid>
                <Divider style={{marginTop: '3vh', marginBottom: '3vh'}}/>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  };

  render() {
    const {classes, user}=this.props;

    return (
      <React.Fragment>
        <Hidden only={['xs']}>
          <LayoutMessages ref={this.child} user={user} handleChange={this.handleChange} {...this.state}>
            {this.content(classes)}
          </LayoutMessages>
        </Hidden>
        <Hidden only={['lg', 'xl',  'sm', 'md']}>
          <LayoutMobileProfile user={user}>
            {this.content(classes)}
          </LayoutMobileProfile>
        </Hidden>
      { this.messageDetails() }
      </React.Fragment>
    )
  }

}
export default withStyles(styles)(Messages)
