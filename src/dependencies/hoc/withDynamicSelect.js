import React, {useState} from 'react'

const withDynamicSelect = Component => {

  const Internal = ({datavalue, ...props}) => {

    const [internalDataValue, setInternalDataValue]=useState(datavalue)

    const onChange = ev => {
      setInternalDataValue(ev.target.value)
    }

    const values=props.dataSource
    const attribute=props.attribute
    return (
      <Component onChange={onChange} datavalue={internalDataValue} {...props}>
      {(values||[]).map(v =>
        (<option value={v._id}>{attribute ? v[attribute]: v}</option>)
      )}
      </Component>
    )
  }

  return Internal
}

export default withDynamicSelect
