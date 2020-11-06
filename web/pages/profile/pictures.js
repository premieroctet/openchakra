import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import Album from '../../components/Album/Album'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';
const {getLoggedUserId}=require('../../utils/functions')

class ProfilePictures extends React.Component {

  constructor(props) {
    super(props)
    this.state={}
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  getUserId() {
    return this.props.user || getLoggedUserId()
  }

  render() {
    const {classes}=this.props
    const user=this.getUserId()

    if (!user) {
      return null
    }
    return (
      <ProfileLayout user={user}>
        <Grid container>
          <Grid item xs={12}>
            <Album user={user} classes={classes}/>
            </Grid>
        </Grid>
      </ProfileLayout>
    )
  }

}

export default withStyles(styles)(ProfilePictures)
