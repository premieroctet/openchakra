import ReactHtmlParser from 'react-html-parser'


import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import React from 'react'
import Router from 'next/router'
import SendIcon from '@material-ui/icons/Send'
import Typography from '@material-ui/core/Typography'
import lodash from 'lodash'
import axios from 'axios'
import Hidden from '@material-ui/core/Hidden'
import {MESSAGES} from '../../utils/i18n'

import LayoutMessages from '../../hoc/Layout/LayoutMessages'
import LayoutMobileMessages from '../../hoc/Layout/LayoutMobileMessages'
import MessageSummary from '../../components/MessageSummary/MessageSummary'
import MessagesDetails from '../../components/MessagesDetails/MessagesDetails'
import UserAvatar from '../../components/Avatar/UserAvatar'
import styles from '../../static/css/pages/profile/messages/messages'

const moment=require('moment')
const withParams = require('../../components/withParams')

const {setAxiosAuthentication}=require('../../utils/authentication')

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

class Messages extends React.Component {

  constructor(props) {
    super(props)
    this.messageDetailsRef = React.createRef()
    this.state={
      tabIndex: 0,
      chats: [],
      relativeDetails: null,
      message: '',
      lastMessageDate: '',
      user: {},
    }
  }

  componentDidMount() {
    this.loadChats(true)
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let result = res.data
        this.setState({
          user: result,
          tabIndex: result.is_alfred ? 0 : 1,
        })
      })
      .catch(err => {
        if (err.response && [401, 403].includes(err.response.status)) {
          localStorage.setItem('path', Router.asPath)
          Router.push('/')
        }
      })
  }

  loadChats = checkRelative => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/chatRooms/userChatRooms')
      .then(res => {
        const chats=res.data.filter(c => c.booking && c.booking.alfred && c.messages)
        const relative = this.props.relative
        if (checkRelative && relative) {
          axios.get(`/myAlfred/api/users/users/${relative}`)
            .then(res => this.setState({chats: chats, relativeDetails: res.data}))
        }
        else {
          this.setState({chats: chats})
        }
      })

  }

  getChatsRelative = relativeId => {
    const user=this.props.user
    return this.state.chats.slice().filter(c =>
      (c.emitter._id===user && c.recipient._id===relativeId)
      ||
      (c.emitter._id===relativeId && c.recipient._id===user),
    )
  }

  getRelatives = () => {
    const user=this.props.user

    let {chats, tabIndex} = this.state
    if (!chats || chats.length===0) {
      return []
    }
    // Tab index 0 : Alfred, 1 : client
    // Filter chats for Alfred or client
    chats=chats.slice()
    if (tabIndex===0) {
      chats=chats.filter(c => c.booking.alfred===user)
    }
    else {
      chats=chats.filter(c => c.booking.user===user)
    }

    chats = chats.sort((c1, c2) => moment(c2.latest)-moment(c1.latest))
    const users=lodash.uniqBy(chats.map(c => (c.emitter._id.toString()===user ? c.recipient : c.emitter)), '_id')
    return users
  }

  openMessagesDetails = relative => {
    this.setState({relativeDetails: relative})
  }

  handleChangeMessage = event => {
    this.setState({message: event.target.value}, () => this.messageDetailsRef.current.getMessage(this.state.message))
  }

  handleSubmitMessage = event => {
    this.setState({message: ''})
    this.messageDetailsRef.current.handleSubmit(event)
  }

  getOldMessages = () => {
    let childState = this.messageDetailsRef.current.state
    const dates = childState.messages.concat(childState.oldMessagesDisplay).map(m => moment(m.date))
    const lastMessageDate = dates.length>0 ? Math.max(...dates) : null

    if(this.state.lastMessageDate !== lastMessageDate) {
      this.setState({lastMessageDate: lastMessageDate})
    }
  }

  getBookingId = chats => {
    let sortedChats = chats.slice().sort((c1, c2) => c2.latest-c1.latest)
    return sortedChats[0].booking
  }

  onDetailsClosed = () => {
    this.setState({relativeDetails: null, message: ''})
    this.loadChats()
  }

  messageDetails = classes => {
    const filteredChats = this.getChatsRelative(this.state.relativeDetails._id)
    const bookingId = this.getBookingId(filteredChats)
    return (
      <Dialog
        style={{width: '100%'}}
        open={Boolean(this.state.relativeDetails)}
        onClose={this.onDetailsClosed}
        classes={{paper: classes.messagesDialog}}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.onDetailsClosed}>
          <Grid className={classes.dialogTitleMessages}>
            <Grid>
              <UserAvatar
                user={this.state.relativeDetails}
                className={classes.avatarLetter}
              />
            </Grid>
            <Grid className={classes.dialogTitleMessagesContent}>
              <Grid>
                <Typography>{this.state.relativeDetails.firstname}</Typography>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'center', whiteSpace: 'nowrap'}}>
                  {this.state.lastMessageDate ? ReactHtmlParser(this.props.t('MESSAGES.last_message')) + moment(this.state.lastMessageDate).calendar() : ReactHtmlParser(this.props.t('MESSAGES.no_message'))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <Divider/>
          </Grid>
        </DialogTitle>
        <DialogContent id={'chat'}>
          <MessagesDetails
            relative={this.state.relativeDetails}
            chats={filteredChats}
            ref={this.messageDetailsRef}
            bookingId={bookingId}
            sendOldMessages={this.getOldMessages}
          />
        </DialogContent>
        <DialogActions classes={{root: classes.dialogActionRoot}}>
          <Grid>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="standard-adornment">{ReactHtmlParser(this.props.t('MESSAGES.dialog_title_content'))}</InputLabel>
              <OutlinedInput
                id="standard-adornment-password"
                type={'text'}
                multiline={true}
                value={this.state.message}
                onChange={this.handleChangeMessage}
                // onKeyDown={e => {if (e.key === 'Enter') this.handleSubmitMessage(e)}}
                label={ReactHtmlParser(this.props.t('MESSAGES.label'))}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      classes={{root: classes.iconButton}}
                      onClick={this.handleSubmitMessage}
                      aria-label="toggle password visibility"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }

  handleChangeTab = (event, newValue) => {
    this.setState({tabIndex: newValue})
  }

  content = () => {
    const relatives = this.getRelatives()
    const countChats=relatives.length

    const msg_descr = countChats===0 ? ReactHtmlParser(this.props.t('MESSAGES.no_conversation')) : countChats === 1 ? ReactHtmlParser(this.props.t('MESSAGES.one_conversation')) : `${ReactHtmlParser(this.props.t('MESSAGES.you_got')) } ${ countChats }${MESSAGES.conversation}`

    return(
      <Grid style={{width: '100%'}}>
        <Grid>
          <Grid>
            <h2 className={'custommessagestitle'}>{ReactHtmlParser(this.props.t('MESSAGES.my_messages'))}</h2>
          </Grid>
          <Grid>
            <Typography>{msg_descr}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{marginTop: '3vh', marginBottom: '3vh'}} className={'custommessagesdivider'}/>
        </Grid>
        {relatives.map((m, index) => {
          return (
            <Grid key={index}>
              <Grid>
                <MessageSummary chats={this.getChatsRelative(m._id)} relative={m} cbDetails={this.openMessagesDetails}/>
              </Grid>
              <Grid>
                <Divider style={{marginTop: '3vh', marginBottom: '3vh'}}/>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  render() {
    const {classes}=this.props
    const {relativeDetails, user}=this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Hidden only={['xs']}>
          <LayoutMessages handleChange={this.handleChangeTab} {...this.state} user={user}>
            {this.content(classes)}
          </LayoutMessages>
        </Hidden>
        <Hidden only={['xl', 'lg', 'md', 'sm']}>
          <LayoutMobileMessages handleChange={this.handleChangeTab} {...this.state} currentIndex={3} user={user}>
            {this.content(classes)}
          </LayoutMobileMessages>
        </Hidden>
        {relativeDetails ? this.messageDetails(classes) : null}
      </React.Fragment>
    )
  }

}
export default withTranslation(null, {withRef: true})(withStyles(styles)(withParams(Messages)))
