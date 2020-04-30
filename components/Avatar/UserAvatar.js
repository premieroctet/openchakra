import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import styles from './UserAvatarStyle'
const jwt = require('jsonwebtoken');

class UserAvatar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      anchorEl: null,
      currentUser: ''
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.setState({ logged: true });
      const token2 = localStorage.getItem('token').split(' ')[1];
      const decode = jwt.decode(token2);
      const alfred_id = decode.id;
      this.setState({currentUser: alfred_id})
    }

  }

  handlePopoverOpen = (event) => {
    this.setState({anchorEl: event.currentTarget})
  };

  handlePopoverClose = () => {
    this.setState({anchorEl: null})
  };

  avatarWithPics(user, className) {
    return(
      <Avatar alt="photo de profil" src={"/"+user.picture} className={className} />
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
    const kyc = this.props.user.kyc_errors;
    const owner = currentUser === this.props.user._id;

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
                    user.picture===undefined || user.picture==='' ?
                      this.avatarWithoutPics(user, className)
                      :
                      this.avatarWithPics(user, className)
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
                  <Typography>Veuillez compléter votre profil :</Typography>
                  {

                      kyc.map(res => (
                        <p>- {res}</p>
                      ))
                  }
                </Popover>
              </Grid> :
              <Grid>
                {
                  user.picture===undefined || user.picture==='' ?
                    this.avatarWithoutPics(user, className)
                    :
                    this.avatarWithPics(user, className)
                }
              </Grid>
          }

        </Grid>
      )
  }
}

export default withStyles(styles, { withTheme: true }) (UserAvatar);
