import React from 'react'

class ProfileHeader extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>Je suis l'en-tête du profil</div>
    )
  }
}

module.exports=ProfileHeader
