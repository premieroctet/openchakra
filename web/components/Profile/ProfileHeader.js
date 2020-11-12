import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Link from 'next/link'
import UserAvatar from '../Avatar/UserAvatar'

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
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
        <UserAvatar user={user} />
        <h3>{`Je m'appelle ${user ? user.firstname : ''}`}</h3>
      </div>
      </>
    )
  }
}

module.exports=ProfileHeader
