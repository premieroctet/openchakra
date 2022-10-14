import React from 'react'
import lodash from 'lodash'

const withDynamicSelect = Component => {

  const internal = (props) => {
    const values=props.dataSource
    const attribute=props.attribute
    console.log(`Select received ${JSON.stringify(values)}`)
    return (
      <Component>
      {values.map(v =>
        (<option value={v._id}>{attribute ? v[attribute]: v}</option>)
      )}
      </Component>
    )
  }

  return internal
}

export default withDynamicSelect
