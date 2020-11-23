import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import Album from '../../components/Album/Album'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/profile/picture/picture';
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Box from "../../components/Box/Box";
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";
const {getLoggedUserId}=require('../../utils/functions');

class ProfilePictures extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  static getInitialProps({query: {user, indexAccount}}) {
    return {user: user, index : indexAccount};
  }

  getUserId() {
    return this.props.user || getLoggedUserId()
  }

  content = (classes, user) => {
    return(
      <Grid container sapcing={3} className={classes.pictureContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12} xm={12}>
          <Box>
           <Album user={user}/>
          </Box>
        </Grid>
        <Hidden only={['sm', 'xs']}>
          <Grid item style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Grid style={{width: '70%'}}>
              <AskQuestion user={user}/>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    )
  };


  render() {
    const {classes, index}=this.props;
    const user=this.getUserId();

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Hidden only={['xs']}>
          <ProfileLayout user={user} index={index}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Hidden>
        <Hidden only={['lg', 'xl','sm', 'md']}>
          <LayoutMobileProfile user={user} index={index} currentIndex={4}>
            {this.content(classes, user)}
          </LayoutMobileProfile>
        </Hidden>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ProfilePictures)
