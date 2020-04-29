import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import styles from './UserAvatarStyle'

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#f87280',
    color: '#f87280',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

class UserAvatar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      anchorEl: false,
      setAnchorEl: false
    }
  }

   handlePopoverOpen = (event) => {
    this.setState({setAnchorEl: true})
  };

  handlePopoverClose = () => {
    this.setState({setAnchorEl: false})
  };


  render(){
    const {user, className, classes} = this.props;
    const {anchorEl, setAnchorEl} = this.state;


    if (user) {
      const picture = user.picture===undefined || user.picture==='' ? null : user.picture;
      return picture?
        <Grid>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            onMouseEnter={this.handlePopoverOpen}
            onMouseLeave={this.handlePopoverClose}
          >
            <Avatar alt="photo de profil" src={"/"+user.picture} className={className} />
          </StyledBadge>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={setAnchorEl}
            onClose={this.handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>I use Popover.</Typography>
          </Popover>
        </Grid>
         :
        <Grid>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            onMouseEnter={this.handlePopoverOpen}
            onMouseLeave={this.handlePopoverClose}
          >
            <Avatar alt="photo de profil" className={className}>{user.avatar_letters}</Avatar>
          </StyledBadge>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={setAnchorEl}
            onClose={this.handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>I use Popover.</Typography>
          </Popover>
        </Grid>


    }
    else {
      return <Avatar alt="photo de profil" src='/static/basicavatar.png' className={className} />
    }
  }
}

export default withStyles(styles, { withTheme: true }) (UserAvatar);
