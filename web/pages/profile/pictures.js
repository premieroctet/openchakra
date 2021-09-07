import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'

import Album from '../../components/Album/Album'
import AskQuestion from '../../components/AskQuestion/AskQuestion'
import BasePage from '../basePage'
import Box from '../../components/Box/Box'
import LayoutMobileProfile from '../../hoc/Layout/LayoutMobileProfile'
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import styles from '../../static/css/pages/profile/picture/picture'

const {getLoggedUserId, isEditableUser}=require('../../utils/context')

class ProfilePictures extends BasePage {

  constructor(props) {
    super(props)
    this.state={}
  }

  getUserId() {
    return this.getURLProps().user || getLoggedUserId()
  }

  content = (classes, user) => {
    const editable = isEditableUser(user)

    return(
      <Grid container sapcing={3} className={classes.pictureContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12} xm={12}>
          <Box>
            <Album user={user}/>
          </Box>
        </Grid>
        {
          !editable &&
            <Grid className={classes.containerAskQuestion} item >
              <Grid style={{width: '70%'}}>
                <AskQuestion user={user}/>
              </Grid>
            </Grid>
        }
      </Grid>
    )
  }


  render() {
    const {classes}=this.props
    const user=this.getUserId()

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

export default withTranslation()(withStyles(styles)(ProfilePictures))
