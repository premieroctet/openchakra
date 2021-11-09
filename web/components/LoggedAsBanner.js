import {getLoggedUser, isLoggedAs} from '../utils/context'
import React from 'react'

class LoggedAsBanner extends React.Component {

  render = () => {
    if (!isLoggedAs()) {
      return null
    }
    return (
      <div style={{textAlign: 'center', backgroundColor: 'red', fontSize: 'x-large'}}>Vous êtes connecté en tant que {getLoggedUser().firstname}</div>
    )
  }
}

module.exports = LoggedAsBanner
