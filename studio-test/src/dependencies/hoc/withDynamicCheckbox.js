import React, {useState} from 'react'
import lodash from 'lodash'
import { ACTIONS } from '../utils/actions'

const withDynamicCheckbox = Component => {
  const Internal = ({ dataSource, context, noautosave, subDataSource, subAttribute, enum: enums, backend, ...props }) => {

    const checkOptions = enums ? Object.entries(JSON.parse(enums)) : []
    const initialValue = lodash.get(dataSource, props.attribute)
    const [retainedvalue, setValue]=useState(initialValue)

    const onChange = ev => {
      setValue(!!ev.target.checked)
      ACTIONS.putValue({
        context: dataSource?._id,
        value: !!ev.target.checked,
        props,
        backend,
      }).then(() => props.reload())
    }

    const onEnumChange = ev => {
      setValue(ev.target.value)
      if (!noautosave) {
        ACTIONS.putValue({
          context: dataSource?._id,
          value: ev.target.value,
          props,
          backend,
        }).then(() => props.reload())
      }
    }

    const pr={...props, isChecked: retainedvalue, value: retainedvalue}
    return (enums ? 
      <div>
        {checkOptions.map(([key, value]) => {
          console.log({key, value})
          return (
            <Component {...lodash.omit(props, ['id'])} value={key} isChecked={retainedvalue === key} onChange={onEnumChange}>{value}</Component>
          )
        })}
        </div>
      : <div {...pr}>
        <Component {...lodash.omit(props, ['id'])} isChecked={retainedvalue} onChange={onChange} />
      </div>
    )
  }

  return Internal
}

export default withDynamicCheckbox
