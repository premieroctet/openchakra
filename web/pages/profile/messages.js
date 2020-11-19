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
const moment=require('moment')
import MessageSummary from '../../components/MessageSummary/MessageSummary'
import _ from 'lodash'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MessagesDetails from '../../components/MessagesDetails/MessagesDetails'
import {getLoggedUserId} from '../../utils/functions'

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      tabIndex:0,
      chats: [],
      visibleDetails: false,
    }
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

  handleChange = (event, newValue) => {
    this.setState({tabIndex: newValue})
  }

  getChatsRelative = relativeId => {
    return this.state.chats.slice().filter( c=>
      (c.emitter._id==this.props.user && c.recipient._id==relativeId)
      ||
      (c.emitter._id==relativeId && c.recipient._id==this.props.user)
    )
  }

  getRelatives = () => {
    var {chats, tabIndex} = this.state
    if (!chats || chats.length==0) {
      return []
    }
    // Tab index 0 : Alfred, 1 : client
    // Filter chats for Alfred or client
    chats=chats.slice()
    if (tabIndex==0) {
      chats=chats.filter(c => c.booking.alfred==this.props.user)
    }
    else {
      chats=chats.filter(c => c.booking.user==this.props.user)
    }

    chats = chats.sort( (c1, c2) => moment(c2.latest)-moment(c1.latest))
    const users=_.uniqBy(chats.map( c => c.emitter._id.toString()==this.props.user ? c.recipient : c.emitter), '_id')
    return users
  }

  openMessagesDetails = relative => {
    this.setState({ relativeDetails: relative})
  }

  messageDetails = () => {
    const {relativeDetails, chats}=this.state
    const filteredChats = this.getChatsRelative(relativeDetails._id)

    return (
      <Dialog style={{width: '100%'}}
        open={Boolean(this.state.relativeDetails)}
        onClose={() => this.setState({relativeDetails: null})}
      >
        <DialogContent>
          <MessagesDetails chatroomId={'5f1827ec04711c1f1e3b82e7'} id={'5f1827ec04711c1f1e3b82e7'}
          booking={'5f1827ec04711c1f1e3b82e8'} relative={this.state.relativeDetails} chats={filteredChats}/>
        </DialogContent>
      </Dialog>
    )
  }

  render() {
    const {classes, user}=this.props;
    const {tabIndex, chats, relativeDetails}=this.state
    const relatives = this.getRelatives()

    return (
      <Layout>
      <Grid className={classes.profilLayoutMainContainer}>
        <Grid className={classes.profilLayoutContainer}>
          <Grid className={classes.profilLayoutBackgroundContainer} style={{ display:'flex', alignItems:'center', flexDirection:'column'}}>
            <Grid className={classes.profilLayoutMargin}>
              <Grid className={classes.profilLayoutBox}>
                <Grid style={{display: 'flex', justifyContent: 'center', height: '40%', alignItems: 'center'}}>
                  <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <Grid>
                      <h3>Mes messages</h3>
                    </Grid>
                    <Tabs
                      orientation="horizontal"
                      variant="scrollable"
                      value={tabIndex}
                      onChange={this.handleChange}
                      aria-label="scrollable force tabs"
                      scrollButtons="on"
                      classes={{indicator: classes.scrollMenuIndicator}}
                    >
                      <Tab label={'Mes messages Alfred'} className={classes.scrollMenuTab} />
                      <Tab label={"Mes messages d'utilisateur"} className={classes.scrollMenuTab} />
                    </Tabs>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.profilLayoutChildren} style={{width:'80%'}}>
            <Box>
              <Typography style={{ fontSize: 30 }}>Mes messages</Typography>
              { relatives.map( m => {
                return (
                  <MessageSummary chats={this.getChatsRelative(m._id)} relative={m} cbDetails={this.openMessagesDetails}/>
                )
              })}
            </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      { relativeDetails ? this.messageDetails() : null }
      </Layout>
    )
  }

}
export default withStyles(styles)(Messages)
