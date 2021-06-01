import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import Album from '../../components/Album/Album'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/profile/picture/picture';
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Box from "../../components/Box/Box";
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";
const {getLoggedUserId, isEditableUser}=require('../../utils/context');

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
    const editable = isEditableUser(user);

    return(
      <Grid container sapcing={3} className={classes.pictureContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12} xm={12}>
          <Box>
           <Album user={user}/>
          </Box>
        </Grid>
        {
          !editable ?
            <Grid className={classes.containerAskQuestion} item >
              <Grid style={{width: '70%'}}>
                <AskQuestion user={user}/>
              </Grid>
            </Grid>
         : null
        }
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
        <Grid className={classes.profileLayoutContainer}>
          <ProfileLayout user={user}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Grid>
        <Grid className={classes.LayoutMobileProfile}>
          <LayoutMobileProfile user={user} currentIndex={4}>
            {this.content(classes, user)}
          </LayoutMobileProfile>
        </Grid>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ProfilePictures)
