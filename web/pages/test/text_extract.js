import {withTranslation} from 'react-i18next'
import React from 'react'
const i18n = require('../../utils/i18n')

class TextExtractTest extends React.Component {
  constructor(props) {
    super(props)
    this.state={
    }
  }

  getIdentifiers = (prefix, data) => {
    console.log(`Handling ${prefix}`)
    if (typeof data=='string') {
      return `${prefix}=${data}`
    }
    if (['object'].includes(typeof data)) {
      return Object.keys(data).map(k => this.getIdentifiers(`${prefix}${prefix ? '.' :''}${k}`, data[k]))
    }
  }

  componentDidMount() {
  }

  render() {

    const ids=this.getIdentifiers('', i18n).flat(6)

    console.log(ids)
    return(
      <>
        <h1>Textes</h1>
        {ids.map(id => (
          <>
          <div>{id}</div>
          <div>&nbsp;</div>
          </>
        ))}
      </>
    )
  }

}

export default withTranslation()(TextExtractTest)
