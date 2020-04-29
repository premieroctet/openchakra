import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import styles from './UserAvatarStyle'

class UserAvatar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      anchorEl: null,
    }
  }

  handlePopoverOpen = (event) => {
    this.setState({anchorEl: event.currentTarget})
  };

  handlePopoverClose = () => {
    this.setState({anchorEl: null})
  };


  render(){
    const {user, className, classes} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);
    const kyc = this.props.user.kyc_errors;

      return(
        <Grid>
          <Badge
            classes={{badge: kyc !== undefined ? kyc.length !== 0 ? classes.badge : classes.badgeOk : classes.badge}}
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
                <Avatar alt="photo de profil" className={className}>{user.avatar_letters}</Avatar>
                :
                <Avatar alt="photo de profil" src={"/"+user.picture} className={className} />
            }
          </Badge>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open && kyc.length !== 0}
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
              kyc !== undefined ?
                kyc.map(res => (
                  <p>- {res}</p>
                )) :
                null
            }
          </Popover>
        </Grid>
      )
  }
}

export default withStyles(styles, { withTheme: true }) (UserAvatar);
