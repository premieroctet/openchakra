import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import About from '../../components/About/About'
import Presentation from '../../components/Presentation/Presentation'
import Skills from '../../components/Skills/Skills'
import Badges from '../../components/Badges/Badges'

class ProfileAbout extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      user: '5ec3df2a701b6d48c05b46bd', // Sabrina
    }
  }

  render() {
    const {user}=this.state

    return (
      <ProfileLayout>
        <Grid container>
          <Grid item xs={4}>
            <About user={user} />
          </Grid>
          <Grid item xs={8}>
            <Presentation user={user} />
          </Grid>
          <Grid item xs={6}>
            <Skills user={user} />
          </Grid>
          <Grid item xs={6}>
            <Badges user={user} />
          </Grid>
        </Grid>
      </ProfileLayout>
    )
  }

}

export default ProfileAbout
