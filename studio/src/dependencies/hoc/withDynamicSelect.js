import React from 'react'

const withDynamicSelect = Component => {
  const Internal = props => {
    let values = props.dataSource
    const attribute = props.attribute
    const enumValues=props.enum ? JSON.parse(props.enum) : null

    return (
      <Component {...props}>
        <option value={null}></option>
        {enumValues ?
          Object.entries(enumValues).map(([k, v]) => (
            <option value={k}>{v}</option>
          ))
          :
          (values || []).map(v => (
            <option value={v._id}>{attribute ? v[attribute] : v}</option>
          ))
        }
      </Component>
    )
  }

  return Internal
}

export default withDynamicSelect
