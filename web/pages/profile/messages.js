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
import _ from 'lodash'

class ProfileServices extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      tabIndex:0,
      chats: []
    }
    this.formatMessage = this.formatMessage.bind(this)
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get('/myAlfred/api/chatRooms/userChatRooms')
      .then( res => {
        this.setState({chats: res.data})
      })
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  handleChange = (event, newValue) => {
    this.setState({tabIndex: newValue})
  }

  formatMessage = () => {
    var {chats, tabIndex} = this.state

    chats=chats.filter(c => c.latest && c.booking && c.booking.alfred && c.messages && c.messages.length>0)

    if (!chats || chats.length==0) {
      console.log('No message')
      return []
    }

    // Tab index 0 : Alfred, 1 : client
    // Filter chats for Alfred or client
    if (tabIndex==0) {
      chats=chats.filter(c => c.booking.alfred==this.props.user)
    }
    else {
      chats=chats.filter(c => c.booking.alfred!=this.props.user)
    }
    chats = chats.sort( (c1, c2) => moment(c2.latest)-moment(c1.latest))

    const users=_.uniq(chats.map( c => c.emitter._id.toString()==this.props.user ? c.recipient._id : c.emitter._id))
    console.log(JSON.stringify(users))

    var res=[]
    chats.forEach( c => {
      res.push(...c.messages)
    });

    return res
  }

  render() {
    const {classes, user}=this.props;
    const {tabIndex}=this.state
    const messages = this.formatMessage()

    return (
      <Layout>
      <Grid className={classes.profilLayoutMainContainer}>
        <Grid className={classes.profilLayoutContainer}>
          <Grid className={classes.profilLayoutBackgroundContainer}>
            <Grid className={classes.profilLayoutMargin}>
              <Grid className={classes.profilLayoutBox}>
                <Grid className={classes.profilLayoutBannerImg}>
                </Grid>
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
            <Grid className={classes.profilLayoutChildren}>
              { messages.map( m => {
                return (
                  <div>{m.date} {m.user} {m.idsender} {m.content}</div>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      </Layout>
    )
  }

}
export default withStyles(styles)(ProfileServices)
