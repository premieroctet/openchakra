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
      </>
    )
  }
}

module.exports=ProfileHeader
