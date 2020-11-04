import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import SummaryCommentary from '../../components/SummaryCommentary/SummaryCommentary'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';

class ProfileReviews extends React.Component {

  constructor(props) {
    super(props)
    this.state={}
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  render() {
    const {user}=this.props

    console.log(`User:${user}`)
    if (!user) {
      return null
    }
    return (
      <ProfileLayout user={user}>
        <Grid container>
          <Grid item xs={12}>
            <SummaryCommentary user={user} />
          </Grid>
        </Grid>
      </ProfileLayout>
    )
  }

}

export default withStyles(styles)(ProfileReviews)
