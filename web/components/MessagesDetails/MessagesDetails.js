import React, {Fragment} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Layout from '../../hoc/Layout/Layout';
import moment from 'moment';
import {withStyles} from '@material-ui/core/styles';
import getDistance from 'geolib/es/getDistance';
import convertDistance from 'geolib/es/convertDistance';
import UserAvatar from '../../components/Avatar/UserAvatar';
import styles from './MessagesDetailsStyle';
import cookie from 'react-cookies';
import Router from 'next/router';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
const {hideIllegal} = require('../../utils/text')

moment.locale('fr');


class MessagesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      userData: {},
      message: '',
      messages: [],
      oldMessagesDisplay: [],
      oldMessages: [],
      roomData: {},
      emitter: '',
      chats: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    localStorage.setItem('path', Router.pathname);

    axios.get(`/myAlfred/api/users/users/${this.props.relative._id}`)
      .then (res => {
        this.setState( {relative: res.data})
      })

    this.setState({chats: this.props.chats})
      const messages=[]
      this.props.chats.forEach( c => {
        if (c.messages.length>0) {
          messages.push(...c.messages)
        }
      })
      messages.sort( (m1, m2) => moment(m1.date)-moment(m2.date))
      this.setState({
        oldMessagesDisplay: messages,
        oldMessage: messages,
      })

    axios.get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({userData: res.data});
        this.setState({emitter: res.data._id});
        this.setState({recipientpic: res.data.picture});
      })
      .catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          cookie.remove('token', {path: '/'});
          Router.push({pathname: '/login'});
        }
      });

    const chatRoomId = this.props.chats.sort( (c1, c2) => moment(c1.latest)-moment(c2.latest))[0]._id

    axios.put('/myAlfred/api/chatRooms/viewMessages/' + chatRoomId)
      .then();
    axios
      .get(`/myAlfred/api/chatRooms/userChatRoom/${chatRoomId}`)
      .then(res => {
        this.setState({
          roomData: res.data,
        }, () => this.grantNotificationPermission());
        this.socket = io();
        this.socket.on('connect', socket => {
          this.socket.emit('room', this.state.roomData.name);
        });
        this.socket.on('displayMessage', data => {
          const messages = [...this.state.messages];
          const oldMessages = [...this.state.oldMessages];
          oldMessages.push(data);
          messages.push(data);
          axios
            .put(
              `/myAlfred/api/chatRooms/saveMessages/${chatRoomId}`,
              {
                messages: oldMessages,
                booking_id: this.props.bookingId,
              },
            )
            .then();
          this.setState({
            messages,
            oldMessages,
          }, () => this.showNotification(data));
        });
      })
      .catch(err => console.error(err));

  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.message.length !== 0 && this.state.message.trim() !== '') {
      //this.setState({ lurecipient: true });
      //this.setState({ lusender: false });
      const messObj = {
        user: this.state.userData.firstname,
        idsender: this.state.userData._id,
        content: hideIllegal(this.state.message),
        date: Date.now(),
        thepicture: this.state.recipientpic,
        //lusender: this.state.lusender,
        //lurecipient: this.state.lurecipient
      };
      event.preventDefault();
      this.socket.emit('message', messObj);
      this.setState({message: ''});
      const div = document.getElementById('chat');
      setTimeout(function () {
        div.scrollTop = 99999;
      }, 50);
    } else {
      event.preventDefault();
    }
  }

  callDrawer = () => {
    this.child.current.handleDrawerToggle();
  };

  showNotification = message => {

    const {userData} = this.state;

    if (message.idsender !== userData._id) {
      const title = message.user;
      const body = message.content;

      new Notification(title, {body});
    }
  };

  grantNotificationPermission = () => {
    if (!('Notification' in window)) {
      alert('Votre navigateur ne supporte pas les notifications');
      return;
    }

    if (
      Notification.permission !== 'denied' ||
      Notification.permission === 'default'
    ) {
      try {
        Notification.requestPermission().then(result => {
          if (result === 'granted') {
            new Notification(
              'Vous recevrez des notifications pour cette conversation',
            );
          }
        });
      } catch (err) {
        if (err instanceof TypeError) {
          Notification.requestPermission((result) => {
            if (result === 'granted') {
              new Notification(
                'Vous recevrez des notifications pour cette conversation',
              );
            }
          });
        }
      }
    }
  };

  render() {
    const {classes} = this.props;
    const {relative, messages, oldMessagesDisplay} = this.state;

    if (!relative) {
      return null
    }

    const dates=messages.concat(oldMessagesDisplay).map(m => moment(m.date))
    const lastMessageDate = Math.max(...dates)

    return (
          <Grid container style={{ width: '100%' }}>
            <Grid item className={classes.Rightcontent} xs={12} sm={12} md={7} >
              <Grid container className={classes.mobilerow} >
                <Grid item style={{marginRight: '5%'}}>
                  <UserAvatar
                    user={relative}
                    className={classes.avatarLetter}/>
                </Grid>
                <Grid item xs={5} md={7}>
                  <Typography style={{fontSize: '1.3rem'}}>
                    {relative.firstname}
                  </Typography>
                  <Typography style={{marginTop: '3px', color: '#9B9B9B'}}>
                  Dernier message {moment(lastMessageDate).calendar()}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
              </Grid>

              <div
                id="chat"
                className={classes.scrollbar}
                style={{
                  height: '57vh',
                  overflow: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {this.state.oldMessagesDisplay.map((oldMessage, index) => {
                  return (
                    <div key={index}>
                      <Grid
                        container
                        style={{
                          flexDirection: 'column',
                          alignItems: 'stretch',
                          maxWidth: '100%',
                        }}
                      >
                        {this.state.emitter === oldMessage.idsender ? (
                          <React.Fragment>
                            <Grid
                              item
                              xs={9}
                              style={{
                                maxWidth: '100%',
                                alignSelf: 'flex-end',
                                marginTop: '15px',
                                marginBottom: '5px',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'stretch',
                                }}
                              >
                                <Typography
                                  style={{
                                    alignSelf: 'flex-end',
                                    marginRight: '40px',
                                  }}
                                  className={classes.currentmsg}
                                >
                                  {oldMessage.content}
                                </Typography>
                                <img
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    alignSelf: 'flex-end',
                                    marginBottom: '15px',
                                    marginTop: '-44px',
                                  }}
                                  src={`../../${oldMessage.thepicture}`}
                                />
                              </div>
                              <Typography className={classes.current}>
                                {moment(oldMessage.date).calendar()}
                              </Typography>
                            </Grid>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Grid
                              item
                              xs={9}
                              style={{
                                maxWidth: '100%',
                                alignSelf: 'flex-start',
                                marginTop: '15px',
                                marginBottom: '5px',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'stretch',
                                }}
                              >
                                <Typography
                                  style={{alignSelf: 'flex-start'}}
                                  className={classes.othermsg}
                                >
                                  {oldMessage.content}
                                </Typography>
                                <img
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    alignSelf: 'flex-start',
                                    marginBottom: '15px',
                                    marginTop: '-44px',
                                  }}
                                  src={`../../${oldMessage.thepicture}`}
                                />
                              </div>
                              <Typography
                                style={{
                                  color: '#6a6a6c',
                                  fontSize: '0.8rem',
                                  marginLeft: '13px',
                                }}
                              >
                                {moment(oldMessage.date).calendar()}
                              </Typography>
                            </Grid>
                          </React.Fragment>
                        )}
                      </Grid>
                    </div>
                  );
                })}
                {typeof this.state.roomData.messages !== 'undefined' ? (
                  <Grid style={{margin: 'auto', marginBottom: '10px'}}>
                    <Grid container className={classes.containerNewMessage}>
                      <Grid item className={classes.widthBar}>
                        <hr
                          style={{
                            background: '#80808070',
                            height: '1px',
                            border: 'none',
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <p
                          style={{
                            width: '100px',
                            textAlign: 'center',
                            margin: 'auto',
                            color: '#adadad',
                          }}
                        >
                          Nouveaux Messages
                        </p>
                      </Grid>
                      <Grid item className={classes.widthBar}>
                        <hr
                          style={{
                            background: '#80808070',
                            height: '1px',
                            border: 'none',
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
                {this.state.messages.map((message, index) => {
                  return (
                    <div key={index}>
                      <Grid
                        container
                        style={{
                          flexDirection: 'column',
                          alignItems: 'stretch',
                          maxWidth: '100%',
                        }}
                      >
                        {this.state.emitter === message.idsender ? (
                          <React.Fragment>
                            <Grid
                              item
                              xs={8}
                              style={{
                                maxWidth: '100%',
                                alignSelf: 'flex-end',
                                marginTop: '5px',
                                marginBottom: '15px',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'stretch',
                                }}
                              >
                                <Typography
                                  style={{
                                    alignSelf: 'flex-end',
                                    marginRight: '40px',
                                  }}
                                  className={classes.currentmsg}
                                >
                                  {message.content}
                                </Typography>
                                <img
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    alignSelf: 'flex-end',
                                    marginBottom: '15px',
                                    marginTop: '-44px',
                                  }}
                                  src={`../../${message.thepicture}`}
                                />
                              </div>
                              <Typography className={classes.current}>
                                {moment(message.date).calendar()}
                              </Typography>
                            </Grid>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Grid
                              item
                              xs={8}
                              style={{
                                maxWidth: '100%',
                                alignSelf: 'flex-start',
                                marginTop: '15px',
                                marginBottom: '5px',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'stretch',
                                }}
                              >
                                <Typography
                                  style={{alignSelf: 'flex-start'}}
                                  className={classes.othermsg}
                                >
                                  {message.content}
                                </Typography>
                                <img
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    alignSelf: 'flex-start',
                                    marginBottom: '15px',
                                    marginTop: '-44px',
                                  }}
                                  src={`../../${message.thepicture}`}
                                />
                              </div>
                              <Typography
                                style={{
                                  color: '#6a6a6c',
                                  fontSize: '0.8rem',
                                  marginLeft: '13px',
                                }}
                              >
                                {moment(message.date).calendar()}
                              </Typography>
                            </Grid>
                          </React.Fragment>
                        )}
                      </Grid>
                    </div>
                  );
                })}
              </div>
              <form
                onSubmit={this.handleSubmit}
                style={{
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  position: 'relative',
                  height: '12vh',
                  boxShadow: '0 -5px 5px -5px rgba(51, 51, 51, 0.29)',
                }}
              >
                <input
                  size={4}
                  style={{
                    fontSize: '18px',
                    width: '90%',
                    border: 'none',
                    boxShadow: '0px 0px 6px rgba(128, 128, 128, 0.29)',
                    height: '60px',
                    alignSelf: 'center',
                    margin: '10px 5%',
                    padding: '20px',
                  }}
                  type="text"
                  placeholder={'Saisissez un message'}
                  autoFocus={true}
                  value={this.state.message}
                  onChange={this.handleChange}
                />
                <img
                  className={classes.send}
                  onClick={this.handleSubmit}
                  src="../../static/arrow/arrowsend.svg"
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '30px',
                  }}
                />
              </form>
            </Grid>
          </Grid>
    );
  }
}

export default withStyles(styles)(MessagesDetails);
