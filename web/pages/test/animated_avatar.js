import UserAvatar from '../../components/Avatar/UserAvatar'
import {setAxiosAuthentication} from '../../utils/authentication'
import axios from 'axios'
import React from 'react'

class AnimatedAvatarTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      user: null,
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({user: res.data})
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const {user}=this.state
    if (!user) {
      return null
    }
    return (
      <UserAvatar user={user} />
    )
  }

}

export default AnimatedAvatarTest
