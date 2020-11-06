import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import About from '../../components/About/About'
import Presentation from '../../components/Presentation/Presentation'
import Skills from '../../components/Skills/Skills'
import Badges from '../../components/Badges/Badges'
import Hashtags from '../../components/Hashtags/Hashtags'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';

class ProfileAbout extends React.Component {

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
          <Grid item xs={4}>
            <About user={user} />
          </Grid>
          <Grid item xs={8}>
            <Presentation user={user} />
          </Grid>
          <Grid item xs={6}>
            <Skills alfred={user} />
          </Grid>
          <Grid item xs={6}>
            <Badges user={user} />
          </Grid>
          <Grid item xs={12}>
            <Hashtags user={user} />
          </Grid>
        </Grid>
      </ProfileLayout>
    )
  }

}

export default withStyles(styles)(ProfileAbout)
