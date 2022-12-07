import React, {Component} from 'react'
import {withTranslation} from 'react-i18next'
import Router from 'next/router'

class login extends Component {

  componentDidMount() {
    Router.push('/?login=true')
  }

  render() {
    return (
      <></>
    )
  }
}

export default withTranslation(null, {withRef: true})(login)
