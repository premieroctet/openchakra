const withParams = require('../../components/withParams')
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'

import {isEditableUser} from '../../utils/context'
import AskQuestion from '../../components/AskQuestion/AskQuestion'

import Box from '../../components/Box/Box'
import LayoutMobileProfile from '../../hoc/Layout/LayoutMobileProfile'
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import SummaryCommentary from '../../components/SummaryCommentary/SummaryCommentary'
import styles from '../../static/css/pages/profile/reviews/reviews'
import Head from 'next/head'

class ProfileReviews extends React.Component {

  constructor(props) {
    super(props)
    this.state={

    }
  }

  content = (classes, user) => {
    const editable = isEditableUser(user)

    return(
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <SummaryCommentary user={user} />
          </Box>
        </Grid>
        {
          !editable ?
            <Grid item className={classes.containerAskQuestion}>
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
    const {classes}=this.props
    const {user}=this.props

    if (!user) {
      return null
    }
    return (
      <React.Fragment>
        <Head>
          <title>{user ? user.full_name : 'Services'}</title>
          <meta property="og:description" content={user ? user.firstname : ''}/>
          <meta property="description" content={user ? user.firstname: ''}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://my-alfred.io"/>
        </Head>
        <Grid className={classes.containerProfileLayout}>
          <ProfileLayout user={user}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Grid>
        <Grid className={classes.containerLayoutMobileProfile}>
          <LayoutMobileProfile user={user} currentIndex={4}>
            {this.content(classes, user)}
          </LayoutMobileProfile>
        </Grid>
      </React.Fragment>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(ProfileReviews)))
