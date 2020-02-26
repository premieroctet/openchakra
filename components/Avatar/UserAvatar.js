import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Link from 'next/link';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import { toast } from 'react-toastify';

const { config } = require('../../config/config');
const url = config.apiUrl;

class UserAvatar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {user, className, service, shop, services, userState, isOwner, alfred} = this.props;

    if (user) {
      const picture = user.picture==undefined || user.picture=='' ? null : user.picture;
      console.log("Avatar:"+picture); 
      return picture?
           <Avatar alt="photo de profil" src={"/"+user.picture} className={className} />
           :
           <Avatar alt="photo de profil" className={className}>{user.avatar_letters}</Avatar>
    }
    else {
      return <Avatar alt="photo de profil" src='/static/basicavatar.png' className={className} />
    }
  }
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UserAvatar;
