import React from 'react'
import parse from 'url-parse'

class BasePage extends React.Component {

  constructor(props) {
    super(props)
  }

  getURLProps = () => {
    if (typeof window=='undefined') {
      return {}
    }
    const url_props = parse(window.location.href, true).query
    return url_props
  }

  getURLProp = key => {
    const url_props = parse(window.location.href, true).query
    return url_props[key]
  }

}


module.exports = BasePage
