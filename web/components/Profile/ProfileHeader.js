import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Link from 'next/link'

class ProfileHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state= {}
  }

  render() {
    const {user}=this.props

    if (!user) {
      return null
    }
    return (
      <>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h3>{`Je m'appelle ${user ? user.firstname : ''}`}</h3>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ul style={{display: 'inline'}}>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/about?user=${user._id}`} >A propos</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/services?user=${user._id}`} >Mes services</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/pictures?user=${user._id}`} >Mes photos</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/reviews?user=${user._id}`} >Mes avis</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/calendar?user=${user._id}`} >Mon calendrier</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/statistics?user=${user._id}`} >Mes statistiques</Link></li>
        </ul>
      </div>
      </>
    )
  }
}

module.exports=ProfileHeader
