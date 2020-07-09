import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import styles from './UserAvatarStyle'
import cookie from 'react-cookies'
const jwt = require('jsonwebtoken');

class UserAvatar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      anchorEl: null,
      currentUser: '',
      kyc: null,
      owner: false,
      userId: ''
    }
  }

  componentDidMount() {
    const token = cookie.load('token')
    if (token) {
      const token2 = token.split(' ')[1];
      const decode = jwt.decode(token2);
      const alfred_id = decode.id;
      this.setState({currentUser: alfred_id},
        () => {
          // Check once then every 20s
          if (this.props.warnings==true) {
            this.checkWarnings(token)
            setInterval(() => this.checkWarnings(token) , 20000)
          }
        }
      )
    }
  }

  checkWarnings = token => {
    axios.defaults.headers.common["Authorization"] = token
    axios.get('/myAlfred/api/chatRooms/nonViewedMessagesCount')
      .then( res => {
        const nbMessages=res.data
        if (nbMessages>0) {
          const plural = nbMessages==1 ? "" : "s"
          this.setState({kyc: [`Vous avez ${res.data} message${plural} non lu${plural}`]})
        }
        else {
          this.setState({kyc: null})
        }
      })
      .catch (err => console.error(err))
  }

  ifOwner(){
    if(this.state.currentUser === this.state.userId){
      this.setState({owner : true})
    }
  };

  handlePopoverOpen = (event) => {
    this.setState({anchorEl: event.currentTarget})
  };

  handlePopoverClose = () => {
    this.setState({anchorEl: null})
  };

  avatarWithPics(user, className) {
    const url = user.picture.match(/^https?:\/\//)?user.picture:'/'+user.picture
    return(
      <Avatar alt="photo de profil" src={url} className={className} />
    )
  }

  avatarWithoutPics(user, className){
    return (
      <Avatar alt="photo de profil" className={className}>{user.avatar_letters}</Avatar>

    )
  }

  render(){
    const {user, className, classes} = this.props;
    const {anchorEl, currentUser} = this.state;
    const open = Boolean(anchorEl);

    if(user){
      var owner = currentUser === user._id;
      var kyc = this.state.kyc
    }

    if(user){
      return(
        <Grid>
          {
            owner && kyc ?
              <Grid>
                <Badge
                  classes={{badge: classes.badge}}
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                  aria-owns={anchorEl ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                >
                  {
                    user.picture ?
                      this.avatarWithPics(user, className)
                      :
                      this.avatarWithoutPics(user, className)
                  }
                </Badge>
                <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={this.handlePopoverClose}
                  disableRestoreFocus
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <ul>
                  {
                    kyc.map(res => (
                      <li>{res}</li>
                    ))
                  }
                  </ul>
                </Popover>
              </Grid> :
              <Grid>
                {
                  user.picture ?
                    this.avatarWithPics(user, className)
                    :
                    this.avatarWithoutPics(user, className)
                }
              </Grid>
          }

        </Grid>
      )

    }else{
      return(
       <Avatar alt="photo de profil" src='/static/basicavatar.png' className={className} />
      )
    }

  }
}

export default withStyles(styles, { withTheme: true }) (UserAvatar);
