import {withTranslation} from 'react-i18next'
import React from 'react'
const i18n = require('../../utils/i18n')
import _ from 'lodash'

class TextExtractTest extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      sql_mode: false,
    }
  }

  getIdentifiers = (prefix, data) => {
    console.log(`Handling ${prefix}`)
    if (typeof data=='string') {
      return {[prefix]: data}
    }
    if (['object'].includes(typeof data)) {
      return Object.keys(data).map(k => this.getIdentifiers(`${prefix}${prefix ? '.' :''}${k}`, data[k]))
    }
  }

  getQueries = () => {
    const ids=this.getIdentifiers('', i18n).flat(6)
    const queries=ids.filter(i => i).map(obj => {
      console.log(obj)
      const [k, v]=Object.entries(obj)[0]
      return `db.uiconfigurations.update(
        {page: 'textes', component: '${k}', label: '${v}'},
        {$set : {classname: 'null', type:'content', attributes: [{name:'content', value: '${v}'}]}},
        {upsert: true})`
    })
    return queries
  }

  render() {

    const ids=this.getQueries()//this.getIdentifiers('', i18n).flat(6)

    return(
      <>
        <h1>Textes ({ids.length})</h1>
        {_.sortBy(ids).map(id => (
          <>
            <div>{id}</div>
          </>
        ))}
      </>
    )
  }

}

export default withTranslation('custom', {withRef: true})(TextExtractTest)
