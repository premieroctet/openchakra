import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import Album from '../../components/Album/Album'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import AskQuestion from "../../components/AskQuestion/AskQuestion";
const {getLoggedUserId}=require('../../utils/functions');

class ProfilePictures extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  getUserId() {
    return this.props.user || getLoggedUserId()
  }

  content = (classes, user) => {
    return(
      <Grid container sapcing={3}>
        <Grid item xs={12}>
          <Album user={user} classes={classes}/>
        </Grid>
        <Grid item style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Grid style={{width: '70%'}}>
            <AskQuestion user={user}/>
          </Grid>
        </Grid>
      </Grid>
    )
  };


  render() {
    const {classes}=this.props;
    const user=this.getUserId();

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Hidden only={['xs', 'sm', 'md']}>
          <ProfileLayout user={user}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ProfilePictures)
