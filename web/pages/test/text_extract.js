import axios from 'axios'
import {withTranslation} from 'react-i18next'
import React from 'react'
import lodash from 'lodash'
import Button from '@material-ui/core/Button'
import {setAxiosAuthentication} from '../../utils/authentication'

class TextExtractTest extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      sql_mode: false,
      entities: [],
      queries: [],
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/i18n-items')
      .then(res => {
        this.setState({entities: res.data.split('\n')})
      })
    axios.get('/myAlfred/api/admin/i18n-queries')
      .then(res => {
        this.setState({queries: res.data.split('\n')})
      })
  }

  render() {

    const ids=this.state.sql_mode ? this.state.queries : this.state.entities

    return(
      <>
        <h1>
          <Button variant='outlined' color={this.state.sql_mode ? 'primary': 'black'} onClick={() => this.setState({sql_mode: false})}>Textes</Button>
          <Button variant='outlined' color={this.state.sql_mode ? 'black': 'primary'} onClick={() => this.setState({sql_mode: true})}>Requêtes Mongo</Button> ({ids.length})
        </h1>
        <code>
          {lodash.sortBy(ids).map(id => (
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
