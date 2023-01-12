import React, {useState} from 'react'
import lodash from 'lodash'
import { ACTIONS } from '../utils/actions'

const withDynamicSelect = Component => {
  const Internal = ({noautosave, dataSource, setComponentValue, ...props}) => {
    let values = dataSource
    let value=lodash.get(dataSource, props.attribute)
    value=value?._id || value
    const [internalValue, setInternalValue]=useState(value)

    const attribute = props.attribute
    const enumValues=props.enum ? JSON.parse(props.enum) : null
    const refValues=props.subDataSource

    const onChange = ev => {
      const {value} = ev.target
      setInternalValue(value)
      if (setComponentValue) {
        setComponentValue(value)
      }
      if (!noautosave) {
        ACTIONS.putValue({
          context: dataSource?._id,
          value: value,
          props,
        })
          .then(() => props.reload())
          .catch(err => console.error(err))
      }
    }

    return (
      <Component {...props} value={internalValue} onChange={onChange}>
        <option value={undefined}></option>
        {refValues ?
          refValues.map(v => (
            <option key={v?._id} value={v?._id}>{lodash.get(v, props.subAttribute)}</option>
          ))
          :enumValues ?
          Object.entries(enumValues).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))
          :
          (values || []).map(v => (
            <option key={v._id} value={v._id}>{attribute ? lodash.get(v, attribute) : v}</option>
          ))
        }
      </Component>
    )
  }

  return Internal
}

export default withDynamicSelect
