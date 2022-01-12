import React from 'react'
import parse from 'url-parse'

class BasePage extends React.Component {

  getURLProps = () => {
    if (typeof window=='undefined') {
      return {}
    }
    const url_props = parse(window.location.href, true).query
    return url_props
  }

  getURLProp = key => {
    const props = this.getURLProps() || {}
    return props[key]
  }

}


module.exports = BasePage
