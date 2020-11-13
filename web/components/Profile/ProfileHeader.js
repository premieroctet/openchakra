import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Link from 'next/link'
import Grid from "@material-ui/core/Grid";
import UserAvatar from "../Avatar/UserAvatar";
import styles from '../../static/css/components/Profile/ProfileHeader'
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";

class ProfileHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state= {}
  }

  render() {
    const {user, classes}=this.props;

    if (!user) {
      return null
    }
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default withStyles (styles) (ProfileHeader);
