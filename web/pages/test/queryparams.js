import withParams from '../../components/withParams'
import React from 'react'

class QueryParamsTest extends React.Component {

  render() {
    return (
      <p>Params : {JSON.stringify(this.props.params.value)}</p>
    )
  }
}

module.exports=withParams(QueryParamsTest)
