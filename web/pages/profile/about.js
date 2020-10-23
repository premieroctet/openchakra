import React from 'react'
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
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <About user={user} />
            <Presentation user={user} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <Skills user={user} />
            <Badges user={user} />
          </div>
        </div>
      </ProfileLayout>
    )
  }

}

export default ProfileAbout
