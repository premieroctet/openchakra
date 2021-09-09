import {withTranslation} from 'react-i18next'
import React from 'react'
const i18n = require('../../utils/i18n')
import _ from 'lodash'
import Button from '@material-ui/core/Button'

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
      let [k, v]=Object.entries(obj)[0]
      const compName=k.split('.')[0]
      v=v.replace(/['’]/g, "\\'")
      return `db.uiconfigurations.update(
        {page: 'textes', component: '${compName}', label: '${v}'},
        {$set : {classname: '${k}', type:'content', attributes: [{name:'content', value: '${v}'}]}},
        {upsert: true})`
    })
    return queries
  }

  render() {

    const ids=this.state.sql_mode ?
      this.getQueries():
      this.getIdentifiers('', i18n).flat(6).map(o => o && Object.entries(o).map(i=>i.join('=')))

    return(
      <>
        <h1>
          <Button variant='outlined' color={this.state.sql_mode ? 'primary': 'black'} onClick={() => this.setState({sql_mode: false})}>Textes</Button>
          <Button variant='outlined' color={this.state.sql_mode ? 'black': 'primary'} onClick={() => this.setState({sql_mode: true})}>Requêtes Mongo</Button> ({ids.length})
        </h1>
        <code>
          {_.sortBy(ids).map(id => (
            <>
              <div>{id}</div>
            </>
          ))}
        </code>
      </>
    )
  }

}

export default withTranslation('custom', {withRef: true})(TextExtractTest)
