import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import AddService from '../../components/AddService/AddService'
import Services from '../../components/Services/Services'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';

class ProfileServices extends React.Component {

  constructor(props) {
    super(props)
    this.state={
    }
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  render() {
    const {classes, user}=this.props

    return (
      <ProfileLayout user={user}>
        <Grid container>
          <Grid item xs={12}>
            <AddService user={user} classes={classes} />
          </Grid>
          <Grid item xs={12}>
            <Services user={user} classes={classes}/>
          </Grid>
        </Grid>
      </ProfileLayout>
    )
  }

}
export default withStyles(styles)(ProfileServices)
