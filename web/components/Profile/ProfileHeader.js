import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Link from 'next/link'

class ProfileHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      user: null,
    }
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { user: res.data})
      })
      .catch (err => {
        console.error(err)
      })
  }

  render() {
    const {user}=this.state

    return (
      <>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h3>{`Je m'appelle ${user ? user.firstname : ''}`}</h3>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ul style={{display: 'inline'}}>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/about`} >A propos</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/services`} >Mes services</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/pictures`} >Mes photos</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/reviews`} >Mes avis</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/calendar`} >Mon calendrier</Link></li>
          <li style={{display: 'inline', margin: '5px'}} ><Link href={`/profile/statistics`} >Mes statistiques</Link></li>
        </ul>
      </div>
      </>
    )
  }
}

module.exports=ProfileHeader
